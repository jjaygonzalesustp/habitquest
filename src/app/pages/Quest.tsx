import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Home, User, Trophy, Cpu, Wifi, Zap, Car, GraduationCap } from 'lucide-react';

const subjects = [
  {
    name: 'Digital Electronics',
    icon: Cpu,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Internet of Things',
    icon: Wifi,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Physics for Automotive',
    icon: Zap,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    name: 'Automotive Trivia',
    icon: Car,
    gradient: 'from-green-500 to-emerald-500',
  },
];

export default function Quest() {
  const navigate = useNavigate();
  const { user, setCurrentSubject } = useApp();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubjectClick = (subjectName: string) => {
    setCurrentSubject(subjectName);
    navigate('/quest-library');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <div className="flex-1 px-4 py-6 pb-24">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center text-amber-400 mb-2">Quest Selection</h1>
          <p className="text-center text-slate-400 mb-8">Choose a subject to begin your quest</p>

          <div className="grid grid-cols-1 gap-4">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <button
                  key={subject.name}
                  onClick={() => handleSubjectClick(subject.name)}
                  className="group relative bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-semibold text-slate-100 group-hover:text-amber-400 transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-slate-400">Tap to view quests</p>
                    </div>
                    <div className="text-slate-500 group-hover:text-amber-400 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-amber-500/20">
        <div className="max-w-md mx-auto flex justify-around items-center h-20">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110"
            onClick={() => navigate('/home')}
          >
            <Home className="h-6 w-6" />
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
            className="flex flex-col items-center gap-1 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110"
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
