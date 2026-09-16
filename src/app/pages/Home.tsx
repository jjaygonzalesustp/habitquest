import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Home as HomeIcon, User, Trophy, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { getDaysInMonth, format, startOfMonth, parseISO } from 'date-fns';

export default function Home() {
  const navigate = useNavigate();
  const { user, monthlyProgress, completedQuests, nextQuestTime, setNextQuestTime, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear } = useApp();
  const [timeRemaining, setTimeRemaining] = useState('');

  const currentDate = new Date();
  const displayedDate = new Date(selectedYear, selectedMonth, 1);
  const daysInMonth = getDaysInMonth(displayedDate);
  const monthStart = startOfMonth(displayedDate);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = nextQuestTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining('New quests available!');
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        if (tomorrow.getTime() !== nextQuestTime.getTime()) {
          setNextQuestTime(tomorrow);
        }
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextQuestTime, setNextQuestTime]);

  const getDateStatus = (day: number) => {
    // Get all quests for this day in the selected month/year
    const questsForDay = completedQuests.filter(q => {
      if (q.day !== day) return false;
      // Parse the date string to check if it matches selected month/year
      const questDate = parseISO(q.date);
      return questDate.getMonth() === selectedMonth && questDate.getFullYear() === selectedYear;
    });

    // Count unique subjects (regardless of difficulty)
    const subjects = new Set(questsForDay.map(q => q.subject));
    const uniqueSubjectCount = subjects.size;

    // Check if all 4 subjects have BOTH knowledge AND practical complete
    const allSubjects = ["Digital Electronics", "Internet of Things", "Physics for Automotive", "Automotive Trivia"];
    const fullyCompleted = allSubjects.every(subject => {
      const hasKnowledge = questsForDay.some(q => q.subject === subject && (q.difficulty === 'knowledge' || !q.difficulty));
      const hasPractical = questsForDay.some(q => q.subject === subject && q.difficulty === 'practical');
      return hasKnowledge && hasPractical;
    });

    console.log(`Calendar Day ${day}: ${uniqueSubjectCount} subjects, fully complete: ${fullyCompleted}`, questsForDay);

    // Return 8 if fully completed (triggers cross-out), otherwise return unique subject count
    return fullyCompleted ? 8 : uniqueSubjectCount;
  };

  const renderCalendar = () => {
    const days = [];
    const firstDay = monthStart.getDay();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const status = getDateStatus(day);
      const isToday = day === currentDate.getDate();

      days.push(
        <div
          key={day}
          className={`aspect-square flex items-center justify-center rounded-lg border relative transition-all duration-300 ${
            isToday
              ? 'border-amber-500 bg-amber-500/20 scale-110 shadow-lg shadow-amber-500/20'
              : 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50'
          }`}
        >
          <span className={`text-sm ${status === 8 ? 'line-through text-slate-500' : 'text-slate-300'}`}>
            {day}
          </span>
          {status > 0 && status < 8 && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
              {[...Array(Math.min(status, 4))].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              ))}
            </div>
          )}
          {status === 8 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-amber-500 rotate-12" />
            </div>
          )}
        </div>
      );
    }

    return days;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <div className="flex-1 px-4 py-6 pb-24">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-center text-amber-400 mb-8">HabitQuest</h1>

          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
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
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs text-slate-400 font-semibold">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Legend:</span>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Subject progress</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-0.5 bg-amber-500" />
                    <span>All levels done</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-6 mb-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-300">Monthly Progress</span>
                  <span className="text-sm font-semibold text-amber-400">{monthlyProgress.toFixed(2)}%</span>
                </div>
                <Progress value={monthlyProgress} className="h-3 bg-slate-700" />
              </div>

              <div className="text-center pt-4 border-t border-slate-700">
                <p className="text-sm text-slate-400 mb-2">Next Quest Available In</p>
                <p className="text-3xl font-bold text-amber-400 font-mono">{timeRemaining}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-amber-500/20">
        <div className="max-w-md mx-auto flex justify-around items-center h-20">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110"
            onClick={() => navigate('/home')}
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110"
            onClick={() => navigate('/profile')}
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110"
            onClick={() => navigate('/grades')}
          >
            <GraduationCap className="h-6 w-6" />
            <span className="text-xs">Grades</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110"
            onClick={() => navigate('/quest')}
          >
            <Trophy className="h-6 w-6" />
            <span className="text-xs">Quest</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
