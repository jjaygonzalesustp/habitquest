import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  UserData,
  ActivityRow,
  UserGrades,
  adminListProfiles,
  adminListActivity,
  adminListGrades,
  adminUpdateProfile,
  adminResetPassword,
  adminDeleteUser,
  signOut,
} from '../../services/dataService';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Checkbox } from '../../components/ui/checkbox';
import { ALL_SUBJECTS } from '../../data/subjects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import { LogOut, Pencil, KeyRound, Trash2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { formatGrade, getGradeDescription } from '../../utils/gradeCalculator';

type EditFields = Pick<UserData, 'account' | 'name' | 'course' | 'year' | 'subject' | 'section'> & {
  enrolledSubjects: string[];
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useApp();

  const [profiles, setProfiles] = useState<UserData[]>([]);
  const [activity, setActivity] = useState<ActivityRow[]>([]);
  const [grades, setGrades] = useState<UserGrades[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [editFields, setEditFields] = useState<EditFields | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const [resetTarget, setResetTarget] = useState<UserData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UserData | null>(null);
  const [busyAction, setBusyAction] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    const [p, a, g] = await Promise.all([adminListProfiles(), adminListActivity(), adminListGrades()]);
    setProfiles(p);
    setActivity(a);
    setGrades(g);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    navigate('/admin');
  };

  const openEdit = (profile: UserData) => {
    setEditingUser(profile);
    setEditFields({
      account: profile.account,
      name: profile.name,
      course: profile.course,
      year: profile.year,
      subject: profile.subject,
      section: profile.section,
      enrolledSubjects: profile.enrolledSubjects,
    });
  };

  const toggleEditSubject = (subject: string, checked: boolean) => {
    setEditFields((prev) => {
      if (!prev) return prev;
      const enrolledSubjects = checked
        ? [...prev.enrolledSubjects, subject]
        : prev.enrolledSubjects.filter((s) => s !== subject);
      return { ...prev, enrolledSubjects };
    });
  };

  const saveEdit = async () => {
    if (!editingUser || !editFields) return;
    setSavingEdit(true);
    const success = await adminUpdateProfile(editingUser.id, editFields);
    setSavingEdit(false);

    if (success) {
      toast.success('Account updated');
      setEditingUser(null);
      loadAll();
    } else {
      toast.error('Could not update account');
    }
  };

  const confirmReset = async () => {
    if (!resetTarget) return;
    setBusyAction(true);
    const result = await adminResetPassword(resetTarget.id);
    setBusyAction(false);
    setResetTarget(null);

    if (result.success) {
      toast.success(`Password reset to 123456 for ${resetTarget.account}`);
      loadAll();
    } else {
      toast.error('Could not reset password', { description: result.message });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setBusyAction(true);
    const result = await adminDeleteUser(deleteTarget.id);
    setBusyAction(false);
    setDeleteTarget(null);

    if (result.success) {
      toast.success(`Deleted ${deleteTarget.account}`);
      loadAll();
    } else {
      toast.error('Could not delete account', { description: result.message });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-amber-400">HabitQuest Admin</h1>
            <p className="text-slate-400 text-sm">Signed in as {user.name} ({user.account})</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadAll} className="border-slate-600 text-slate-300">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleLogout} className="border-red-500/50 text-red-400 hover:bg-red-500/10">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading admin data...</div>
        ) : (
          <Tabs defaultValue="accounts">
            <TabsList className="bg-slate-800/50 border border-amber-500/20">
              <TabsTrigger value="accounts">Accounts ({profiles.length})</TabsTrigger>
              <TabsTrigger value="activity">Activity & Attempts ({activity.length})</TabsTrigger>
              <TabsTrigger value="grades">Grades ({grades.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="accounts">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-4 mt-4 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-300">Account</TableHead>
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Course</TableHead>
                      <TableHead className="text-slate-300">Year</TableHead>
                      <TableHead className="text-slate-300">Subject</TableHead>
                      <TableHead className="text-slate-300">Section</TableHead>
                      <TableHead className="text-slate-300">Subjects</TableHead>
                      <TableHead className="text-slate-300">Role</TableHead>
                      <TableHead className="text-slate-300 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="text-slate-200">{p.account}</TableCell>
                        <TableCell className="text-slate-200">{p.name}</TableCell>
                        <TableCell className="text-slate-400">{p.course}</TableCell>
                        <TableCell className="text-slate-400">{p.year}</TableCell>
                        <TableCell className="text-slate-400">{p.subject}</TableCell>
                        <TableCell className="text-slate-400">{p.section}</TableCell>
                        <TableCell className="text-slate-400" title={p.enrolledSubjects.join(', ') || 'None'}>
                          {p.enrolledSubjects.length}/{ALL_SUBJECTS.length}
                        </TableCell>
                        <TableCell>
                          <Badge variant={p.role === 'admin' ? 'default' : 'secondary'}>{p.role}</Badge>
                          {p.mustResetPassword && (
                            <Badge variant="outline" className="ml-1 border-orange-500/50 text-orange-400">
                              pending reset
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <Button size="icon" variant="ghost" onClick={() => openEdit(p)} title="Edit">
                            <Pencil className="h-4 w-4 text-slate-300" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => setResetTarget(p)} title="Reset password">
                            <KeyRound className="h-4 w-4 text-amber-400" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => setDeleteTarget(p)} title="Delete">
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-4 mt-4 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-slate-300">Date/Time</TableHead>
                      <TableHead className="text-slate-300">Account</TableHead>
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Subject</TableHead>
                      <TableHead className="text-slate-300">Day</TableHead>
                      <TableHead className="text-slate-300">Correct</TableHead>
                      <TableHead className="text-slate-300">Attempts</TableHead>
                      <TableHead className="text-slate-300">Tab Switches</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activity.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="text-slate-400 whitespace-nowrap">{a.timeAndDate}</TableCell>
                        <TableCell className="text-slate-200">{a.account}</TableCell>
                        <TableCell className="text-slate-200">{a.name}</TableCell>
                        <TableCell className="text-slate-400">{a.subject}</TableCell>
                        <TableCell className="text-slate-400">{a.day}</TableCell>
                        <TableCell className="text-slate-400">{a.correctAnswers}</TableCell>
                        <TableCell className="text-slate-400">{a.attempts}</TableCell>
                        <TableCell className={a.tabSwitches > 0 ? 'text-red-400' : 'text-slate-400'}>
                          {a.tabSwitches}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="grades">
              <div className="space-y-4 mt-4">
                {grades.map((g) => (
                  <div key={g.account} className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-4">
                    <h3 className="text-amber-400 font-semibold mb-2">
                      {g.name} <span className="text-slate-500 text-sm">({g.account})</span>
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-slate-300">Subject</TableHead>
                          <TableHead className="text-slate-300">Quest Completion</TableHead>
                          <TableHead className="text-slate-300">Surprise</TableHead>
                          <TableHead className="text-slate-300">Practical</TableHead>
                          <TableHead className="text-slate-300">Knowledge</TableHead>
                          <TableHead className="text-slate-300">Weighted %</TableHead>
                          <TableHead className="text-slate-300">Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {g.grades.map((sg) => (
                          <TableRow key={sg.subject}>
                            <TableCell className="text-slate-200">{sg.subject}</TableCell>
                            <TableCell className="text-slate-400">
                              {sg.completedQuests}/{sg.availableQuests}
                            </TableCell>
                            <TableCell className="text-slate-400">
                              {sg.surpriseCorrect}/{sg.surpriseTotal}
                            </TableCell>
                            <TableCell className="text-slate-400">
                              {sg.practicalCorrect}/{sg.practicalTotal}
                            </TableCell>
                            <TableCell className="text-slate-400">
                              {sg.knowledgeCorrect}/{sg.knowledgeTotal}
                            </TableCell>
                            <TableCell className="text-slate-400">{sg.weightedPercentage.toFixed(1)}%</TableCell>
                            <TableCell className="text-amber-400 font-semibold">
                              {formatGrade(sg.grade)}{' '}
                              <span className="text-slate-500 text-xs">({getGradeDescription(sg.grade)})</span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Edit profile dialog */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="bg-slate-800 border-amber-500/30">
          <DialogHeader>
            <DialogTitle className="text-amber-400">Edit Account</DialogTitle>
            <DialogDescription className="sr-only">Edit student account information</DialogDescription>
          </DialogHeader>
          {editFields && (
            <div className="space-y-3 mt-2">
              {(['account', 'name', 'course', 'year', 'subject', 'section'] as const).map((field) => (
                <div key={field}>
                  <Label className="text-slate-300 capitalize">{field}</Label>
                  <Input
                    value={editFields[field]}
                    onChange={(e) => setEditFields({ ...editFields, [field]: e.target.value })}
                    className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100"
                  />
                </div>
              ))}

              <div>
                <Label className="text-slate-300">Enrolled Quest Subjects</Label>
                <p className="text-xs text-slate-500 mb-2">
                  Only checked subjects will appear on this student's Quest page.
                </p>
                <div className="space-y-2">
                  {ALL_SUBJECTS.map((subject) => (
                    <div key={subject} className="flex items-center gap-2">
                      <Checkbox
                        id={`subject-${subject}`}
                        checked={editFields.enrolledSubjects.includes(subject)}
                        onCheckedChange={(checked) => toggleEditSubject(subject, checked === true)}
                        className="border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                      />
                      <label htmlFor={`subject-${subject}`} className="text-sm text-slate-300">
                        {subject}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={saveEdit}
                disabled={savingEdit}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900"
              >
                {savingEdit ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reset password confirm */}
      <AlertDialog open={!!resetTarget} onOpenChange={(open) => !open && setResetTarget(null)}>
        <AlertDialogContent className="bg-slate-800 border-amber-500/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-amber-400">Reset password?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              This sets {resetTarget?.account}'s password to the default <strong>123456</strong>. They will be
              prompted to change it after signing in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-slate-200 border-slate-600">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmReset}
              disabled={busyAction}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900"
            >
              Reset Password
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="bg-slate-800 border-red-500/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">Delete account?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              This permanently deletes {deleteTarget?.account} ({deleteTarget?.name}) and all of their activity,
              progress, and grade history. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-slate-200 border-slate-600">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={busyAction}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
