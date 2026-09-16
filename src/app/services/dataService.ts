import { supabase, accountToEmail } from '../lib/supabaseClient';
import { extractQuizStats, percentageToGrade } from '../utils/gradeCalculator';

// ============================================================================
// Types
// ============================================================================

export interface UserData {
  id: string;
  account: string;
  name: string;
  course: string;
  year: string;
  subject: string;
  section: string;
  role: 'student' | 'admin';
  profileImage: string | null;
  mustResetPassword: boolean;
}

export interface RegisterPayload {
  account: string;
  password: string;
  name: string;
  course: string;
  year: string;
  subject: string;
  section: string;
}

export interface ActivityRecord {
  name: string;
  timeAndDate: string;
  correctAnswers: number;
  attempts: number;
  subject: string;
  day: number;
  tabSwitches?: number;
}

export interface CompletedQuest {
  subject: string;
  day: number;
  date: string;
  difficulty?: 'knowledge' | 'practical';
}

export interface UserProgress {
  account: string;
  monthlyProgress: number;
  completedQuests: CompletedQuest[];
  lastUpdated: string;
}

export interface SubjectGradeData {
  subject: string;
  surpriseCorrect: number;
  surpriseTotal: number;
  knowledgeCorrect: number;
  knowledgeTotal: number;
  practicalCorrect: number;
  practicalTotal: number;
  completedQuests: number;
  availableQuests: number;
  weightedPercentage: number;
  grade: number;
}

export interface UserGrades {
  name: string;
  account: string;
  grades: SubjectGradeData[];
}

function mapProfileRow(row: any): UserData {
  return {
    id: row.id,
    account: row.account,
    name: row.name,
    course: row.course,
    year: row.year,
    subject: row.subject,
    section: row.section,
    role: row.role,
    profileImage: row.profile_image,
    mustResetPassword: row.must_reset_password,
  };
}

// ============================================================================
// Auth / registration
// ============================================================================

export async function verifyUser(account: string, password: string): Promise<UserData | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: accountToEmail(account),
    password,
  });

  if (error || !data.user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profileError || !profile) {
    await supabase.auth.signOut();
    return null;
  }

  return mapProfileRow(profile);
}

export async function registerUser(payload: RegisterPayload): Promise<boolean> {
  try {
    const { error } = await supabase.auth.signUp({
      email: accountToEmail(payload.account),
      password: payload.password,
      options: {
        data: {
          account: payload.account,
          name: payload.name,
          course: payload.course,
          year: payload.year,
          subject: payload.subject,
          section: payload.section,
        },
      },
    });

    if (error) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function getCurrentUser(): Promise<UserData | null> {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) return null;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', sessionData.session.user.id)
    .single();

  if (error || !profile) return null;
  return mapProfileRow(profile);
}

export async function changePassword(newPassword: string): Promise<boolean> {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return false;
  await supabase.rpc('clear_must_reset_password');
  return true;
}

export async function uploadAvatar(file: File): Promise<string | null> {
  const { data: sessionData } = await supabase.auth.getSession();
  const uid = sessionData.session?.user.id;
  if (!uid) return null;

  const ext = file.name.split('.').pop() || 'png';
  const path = `${uid}/avatar-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, {
    upsert: true,
    cacheControl: '3600',
  });
  if (uploadError) return null;

  const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(path);
  const url = publicUrlData.publicUrl;

  const { error: rpcError } = await supabase.rpc('update_own_avatar', { new_url: url });
  if (rpcError) return null;

  return url;
}

// ============================================================================
// Activity / progress (student-facing)
// ============================================================================

export async function recordActivity(activity: ActivityRecord): Promise<boolean> {
  const { data: sessionData } = await supabase.auth.getSession();
  const uid = sessionData.session?.user.id;
  if (!uid) return false;

  const { error } = await supabase.from('activity_log').insert({
    user_id: uid,
    name: activity.name,
    time_and_date: activity.timeAndDate,
    correct_answers: activity.correctAnswers,
    attempts: activity.attempts,
    subject: activity.subject,
    day: activity.day,
    tab_switches: activity.tabSwitches || 0,
  });

  return !error;
}

export async function getUserProgress(_account: string): Promise<UserProgress | null> {
  const { data: sessionData } = await supabase.auth.getSession();
  const uid = sessionData.session?.user.id;
  if (!uid) return null;

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', uid)
    .maybeSingle();

  if (error || !data) return null;

  const completedQuests = (data.completed_quests || []).map((q: any) => ({
    ...q,
    difficulty: q.difficulty || 'knowledge',
  }));

  return {
    account: _account,
    monthlyProgress: data.monthly_progress || 0,
    completedQuests,
    lastUpdated: data.last_updated || new Date().toISOString(),
  };
}

export async function updateUserProgress(progress: UserProgress): Promise<boolean> {
  const { data: sessionData } = await supabase.auth.getSession();
  const uid = sessionData.session?.user.id;
  if (!uid) return false;

  const { error } = await supabase.from('user_progress').upsert({
    user_id: uid,
    monthly_progress: progress.monthlyProgress,
    completed_quests: progress.completedQuests,
    last_updated: new Date().toISOString(),
  });

  return !error;
}

// ============================================================================
// Grades — computed from activity_log + user_progress (replaces the manual
// "Grades" Google Sheet).
// ============================================================================

const SUBJECTS = [
  'Digital Electronics',
  'Internet of Things',
  'Physics for Automotive',
  'Automotive Trivia',
];

/**
 * Quest completion is scored against a rough estimate of "quests unlocked so
 * far": 2 difficulty levels (knowledge + practical) per subject per calendar
 * day elapsed this month. This mirrors what the old manual Grades sheet did
 * by hand.
 */
function computeSubjectGrades(
  activityRows: Array<{ subject: string; correct_answers: number; attempts: number }>,
  completedQuests: CompletedQuest[]
): SubjectGradeData[] {
  const activities = activityRows.map((row) => ({
    subject: row.subject,
    correctAnswers: row.correct_answers,
    attempts: row.attempts,
  }));

  const stats = extractQuizStats(activities);
  const availableQuestsPerSubject = new Date().getDate() * 2;

  return SUBJECTS.map((subject) => {
    const s = stats.get(subject)!;
    const completedForSubject = completedQuests.filter((q) => q.subject === subject).length;
    const completionPct =
      availableQuestsPerSubject > 0 ? (completedForSubject / availableQuestsPerSubject) * 100 : 0;

    const surprisePct = s.surpriseQuiz.total > 0 ? (s.surpriseQuiz.correct / s.surpriseQuiz.total) * 100 : 0;
    const knowledgePct = s.knowledgeQuiz.total > 0 ? (s.knowledgeQuiz.correct / s.knowledgeQuiz.total) * 100 : 0;
    const practicalPct = s.practicalQuiz.total > 0 ? (s.practicalQuiz.correct / s.practicalQuiz.total) * 100 : 0;

    const weightedPercentage =
      surprisePct * 0.23 + knowledgePct * 0.07 + practicalPct * 0.2 + completionPct * 0.5;

    return {
      subject,
      surpriseCorrect: s.surpriseQuiz.correct,
      surpriseTotal: s.surpriseQuiz.total,
      knowledgeCorrect: s.knowledgeQuiz.correct,
      knowledgeTotal: s.knowledgeQuiz.total,
      practicalCorrect: s.practicalQuiz.correct,
      practicalTotal: s.practicalQuiz.total,
      completedQuests: completedForSubject,
      availableQuests: availableQuestsPerSubject,
      weightedPercentage,
      grade: percentageToGrade(weightedPercentage),
    };
  });
}

export async function getUserGrades(account: string): Promise<UserGrades | null> {
  const { data: sessionData } = await supabase.auth.getSession();
  const uid = sessionData.session?.user.id;
  if (!uid) return null;

  const [{ data: activityRows }, { data: progressRow }, { data: profile }] = await Promise.all([
    supabase.from('activity_log').select('subject, correct_answers, attempts').eq('user_id', uid),
    supabase.from('user_progress').select('completed_quests').eq('user_id', uid).maybeSingle(),
    supabase.from('profiles').select('name').eq('id', uid).single(),
  ]);

  const completedQuests: CompletedQuest[] = progressRow?.completed_quests || [];
  const grades = computeSubjectGrades(activityRows || [], completedQuests);

  return {
    name: profile?.name || '',
    account,
    grades,
  };
}

// ============================================================================
// Admin — reads go through RLS (role = 'admin' policies). Privileged writes
// (password reset, account deletion) go through /api/admin/* serverless
// functions that use the Supabase service role key.
// ============================================================================

export async function adminListProfiles(): Promise<UserData[]> {
  const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
  if (error || !data) return [];
  return data.map(mapProfileRow);
}

export interface ActivityRow {
  id: number;
  userId: string;
  name: string;
  account: string;
  timeAndDate: string;
  correctAnswers: number;
  attempts: number;
  subject: string;
  day: number;
  tabSwitches: number;
}

export async function adminListActivity(limit = 500): Promise<ActivityRow[]> {
  const { data, error } = await supabase
    .from('activity_log')
    .select('id, user_id, name, time_and_date, correct_answers, attempts, subject, day, tab_switches, profiles(account)')
    .order('id', { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return data.map((row: any) => ({
    id: row.id,
    userId: row.user_id,
    name: row.name,
    account: row.profiles?.account || '',
    timeAndDate: row.time_and_date,
    correctAnswers: row.correct_answers,
    attempts: row.attempts,
    subject: row.subject,
    day: row.day,
    tabSwitches: row.tab_switches,
  }));
}

export async function adminListGrades(): Promise<UserGrades[]> {
  const [{ data: profiles }, { data: activity }, { data: progress }] = await Promise.all([
    supabase.from('profiles').select('id, name, account').eq('role', 'student'),
    supabase.from('activity_log').select('user_id, subject, correct_answers, attempts'),
    supabase.from('user_progress').select('user_id, completed_quests'),
  ]);

  if (!profiles) return [];

  return profiles.map((p: any) => {
    const rows = (activity || []).filter((a: any) => a.user_id === p.id);
    const progressRow = (progress || []).find((pr: any) => pr.user_id === p.id);
    const completedQuests: CompletedQuest[] = progressRow?.completed_quests || [];
    return {
      name: p.name,
      account: p.account,
      grades: computeSubjectGrades(rows, completedQuests),
    };
  });
}

export async function adminUpdateProfile(
  id: string,
  fields: Partial<Pick<UserData, 'account' | 'name' | 'course' | 'year' | 'subject' | 'section'>>
): Promise<boolean> {
  const { error } = await supabase.from('profiles').update(fields).eq('id', id);
  return !error;
}

async function callAdminApi(path: string, body: Record<string, unknown>): Promise<{ success: boolean; message?: string }> {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;
  if (!token) return { success: false, message: 'Not signed in' };

  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      return { success: false, message: json.message || `Request failed (${response.status})` };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Network error' };
  }
}

export async function adminResetPassword(userId: string): Promise<{ success: boolean; message?: string }> {
  return callAdminApi('/api/admin/reset-password', { userId });
}

export async function adminDeleteUser(userId: string): Promise<{ success: boolean; message?: string }> {
  return callAdminApi('/api/admin/delete-user', { userId });
}
