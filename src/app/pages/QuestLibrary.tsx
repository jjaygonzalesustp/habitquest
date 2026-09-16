import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { ArrowLeft, Lock, CheckCircle2, Circle, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { getDaysInMonth, format, parseISO } from 'date-fns';

export default function QuestLibrary() {
  const navigate = useNavigate();
  const { user, currentSubject, setCurrentDay, setCurrentDifficulty, completedQuests, nextQuestTime, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear } = useApp();
  const [currentDayNumber, setCurrentDayNumber] = useState(new Date().getDate());

  const currentDate = new Date();
  const displayedDate = new Date(selectedYear, selectedMonth, 1);
  const daysInMonth = getDaysInMonth(displayedDate);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    setCurrentDayNumber(currentDate.getDate());
  }, []);

  const isQuestAvailable = (day: number) => {
    // Available: current month (up to today) + previous month (all days)
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // If viewing current month, allow up to current day
    if (selectedYear === currentYear && selectedMonth === currentMonth) {
      return day <= currentDay;
    }

    // If viewing previous month, allow all days
    const isPreviousMonth =
      (selectedYear === currentYear && selectedMonth === currentMonth - 1) ||
      (selectedYear === currentYear - 1 && selectedMonth === 11 && currentMonth === 0);

    if (isPreviousMonth) {
      return true; // All days in previous month are available
    }

    // Otherwise, not available (future months or months before previous)
    return false;
  };

  const getQuestStatus = (day: number) => {
    // Filter quests for selected month/year
    const questsForDay = completedQuests.filter(q => {
      if (q.subject !== currentSubject || q.day !== day) return false;
      const questDate = parseISO(q.date);
      return questDate.getMonth() === selectedMonth && questDate.getFullYear() === selectedYear;
    });

    const knowledgeCompleted = questsForDay.some(
      q => q.difficulty === 'knowledge' || !q.difficulty
    );
    const practicalCompleted = questsForDay.some(
      q => q.difficulty === 'practical'
    );

    return {
      knowledgeCompleted,
      practicalCompleted,
      fullyCompleted: knowledgeCompleted && practicalCompleted
    };
  };

  const handleQuestClick = (day: number) => {
    if (!isQuestAvailable(day)) {
      toast.error('Quest Locked', {
        description: 'This quest is not yet available.',
      });
      return;
    }

    const status = getQuestStatus(day);

    if (status.fullyCompleted) {
      toast.info('Quest Fully Completed', {
        description: 'You have completed both Knowledge and Practical levels!',
      });
      return;
    }

    setCurrentDay(day);

    // Start with knowledge if not completed, otherwise start practical
    if (!status.knowledgeCompleted) {
      setCurrentDifficulty('knowledge');
      toast.info('Starting Knowledge Level', {
        description: 'Complete this to unlock Practical level.',
      });
    } else {
      setCurrentDifficulty('practical');
      toast.info('Starting Practical Level', {
        description: 'Advanced difficulty unlocked!',
      });
    }

    navigate('/question');
  };

  const canGoToPreviousMonth = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Can only go back 1 month
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    return !(selectedMonth === previousMonth && selectedYear === previousYear);
  };

  const canGoToNextMonth = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return !(selectedMonth === currentMonth && selectedYear === currentYear);
  };

  const handlePreviousMonth = () => {
    if (!canGoToPreviousMonth()) return;

    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (!canGoToNextMonth()) return;

    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/quest')}
            className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-300"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="flex-1 text-2xl font-bold text-center text-amber-400 mr-10">
            {currentSubject}
          </h1>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-4 mb-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePreviousMonth}
              disabled={!canGoToPreviousMonth()}
              className="text-amber-400 hover:text-amber-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold text-slate-300">
              {format(displayedDate, 'MMMM yyyy')}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextMonth}
              disabled={!canGoToNextMonth()}
              className="text-amber-400 hover:text-amber-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-6 mb-4">
          <p className="text-sm text-slate-300 text-center mb-3">
            Complete Knowledge level to unlock Practical level. All past quests remain accessible!
          </p>
          <div className="flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Circle className="h-3 w-3 text-blue-400" />
              <span className="text-slate-400">Knowledge</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3 text-purple-400" />
              <span className="text-slate-400">Practical</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-400" />
              <span className="text-slate-400">Both Done</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const available = isQuestAvailable(day);
            const status = getQuestStatus(day);
            const isCurrent = day === currentDayNumber;

            return (
              <button
                key={day}
                onClick={() => handleQuestClick(day)}
                disabled={!available}
                className={`relative p-6 rounded-xl border transition-all duration-300 ${
                  status.fullyCompleted
                    ? 'bg-green-500/20 border-green-500/50 hover:bg-green-500/30'
                    : status.knowledgeCompleted
                    ? 'bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/30 hover:scale-105 active:scale-95'
                    : available
                    ? 'bg-slate-700/50 border-amber-500/30 hover:bg-slate-700 hover:border-amber-500 hover:scale-105 active:scale-95'
                    : 'bg-slate-800/30 border-slate-700/30 opacity-50 cursor-not-allowed'
                } ${isCurrent && available && !status.fullyCompleted ? 'ring-2 ring-amber-500 shadow-lg shadow-amber-500/20' : ''}`}
              >
                <div className="flex flex-col items-center gap-2">
                  {status.fullyCompleted ? (
                    <CheckCircle2 className="h-8 w-8 text-green-400" />
                  ) : status.knowledgeCompleted ? (
                    <Award className="h-8 w-8 text-purple-400" />
                  ) : available ? (
                    <Circle className="h-8 w-8 text-amber-400" />
                  ) : (
                    <Lock className="h-8 w-8 text-slate-500" />
                  )}
                  <div>
                    <p className="text-2xl font-bold text-slate-200">Day {day}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {status.fullyCompleted ? 'All Done' : status.knowledgeCompleted ? 'Practical Ready' : available ? 'Available' : 'Locked'}
                    </p>
                  </div>
                </div>
                {isCurrent && available && !status.fullyCompleted && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
