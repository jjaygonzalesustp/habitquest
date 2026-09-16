import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserData, getCurrentUser, getUserProgress } from '../services/dataService';
import { supabase } from '../lib/supabaseClient';

export interface CompletedQuest {
  subject: string;
  day: number;
  date: string;
  difficulty?: 'knowledge' | 'practical'; // Optional for backwards compatibility
}

interface AppContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  authLoading: boolean;
  monthlyProgress: number;
  setMonthlyProgress: (progress: number) => void;
  completedQuests: CompletedQuest[];
  setCompletedQuests: (quests: CompletedQuest[]) => void;
  addCompletedQuest: (quest: CompletedQuest) => void;
  profileImage: string;
  setProfileImage: (image: string) => void;
  currentSubject: string;
  setCurrentSubject: (subject: string) => void;
  currentDay: number;
  setCurrentDay: (day: number) => void;
  currentDifficulty: 'knowledge' | 'practical';
  setCurrentDifficulty: (difficulty: 'knowledge' | 'practical') => void;
  nextQuestTime: Date;
  setNextQuestTime: (time: Date) => void;
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const PLACEHOLDER_AVATAR = 'https://via.placeholder.com/150';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const getDefaultNextQuestTime = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  };

  const [user, setUserState] = useState<UserData | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [monthlyProgress, setMonthlyProgress] = useState(0);
  const [completedQuests, setCompletedQuests] = useState<CompletedQuest[]>([]);
  const [profileImage, setProfileImageState] = useState(PLACEHOLDER_AVATAR);
  const [currentSubject, setCurrentSubject] = useState('');
  const [currentDay, setCurrentDay] = useState(1);
  const [currentDifficulty, setCurrentDifficulty] = useState<'knowledge' | 'practical'>('knowledge');
  const [nextQuestTime, setNextQuestTime] = useState(getDefaultNextQuestTime());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const hydrateFromUser = async (userData: UserData | null) => {
    setUserState(userData);
    setProfileImageState(userData?.profileImage || PLACEHOLDER_AVATAR);

    if (userData) {
      const progress = await getUserProgress(userData.account);
      if (progress) {
        setMonthlyProgress(progress.monthlyProgress);
        setCompletedQuests(progress.completedQuests);
      }
    } else {
      setMonthlyProgress(0);
      setCompletedQuests([]);
    }
  };

  // Restore session on load, and keep in sync with Supabase auth state changes
  // (sign-out triggered from Profile.tsx or a session expiry elsewhere).
  useEffect(() => {
    let active = true;

    (async () => {
      const currentUser = await getCurrentUser();
      if (active) {
        await hydrateFromUser(currentUser);
        setAuthLoading(false);
      }
    })();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        await hydrateFromUser(null);
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const setUser = (userData: UserData | null) => {
    hydrateFromUser(userData);
  };

  const setProfileImage = (image: string) => {
    setProfileImageState(image);
  };

  const addCompletedQuest = (quest: CompletedQuest) => {
    setCompletedQuests((prev) => [...prev, quest]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        authLoading,
        monthlyProgress,
        setMonthlyProgress,
        completedQuests,
        setCompletedQuests,
        addCompletedQuest,
        profileImage,
        setProfileImage,
        currentSubject,
        setCurrentSubject,
        currentDay,
        setCurrentDay,
        currentDifficulty,
        setCurrentDifficulty,
        nextQuestTime,
        setNextQuestTime,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
