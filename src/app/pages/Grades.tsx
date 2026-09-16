import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Home, User, Trophy, GraduationCap } from 'lucide-react';
import { formatGrade, getGradeDescription } from '../utils/gradeCalculator';
import { getUserGrades, SubjectGradeData } from '../services/dataService';

export default function Grades() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [subjectGrades, setSubjectGrades] = useState<SubjectGradeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const loadGrades = async () => {
      setLoading(true);

      // Fetch grades from Google Sheets Grades sheet
      const gradesData = await getUserGrades(user.account);

      if (gradesData && gradesData.grades.length > 0) {
        setSubjectGrades(gradesData.grades);
      } else {
        // No data from sheets, show empty
        setSubjectGrades([]);
      }

      setLoading(false);
    };

    loadGrades();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading grades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <div className="flex-1 px-4 py-6 pb-24">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center text-amber-400 mb-2">My Grades</h1>
          <p className="text-center text-slate-400 text-sm mb-8">
            Based on Quiz Performance & Quest Completion
          </p>

          <div className="space-y-4">
            {subjectGrades.map((data) => {
              const hasData = data.surpriseTotal > 0 || data.knowledgeTotal > 0 || data.practicalTotal > 0;

              return (
                <div
                  key={data.subject}
                  className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-6"
                >
                  <h2 className="text-xl font-bold text-amber-400 mb-4">{data.subject}</h2>

                  {!hasData ? (
                    <p className="text-slate-400 text-sm text-center py-4">
                      No quiz attempts yet
                    </p>
                  ) : (
                    <>
                      {/* Quiz Statistics */}
                      <div className="space-y-3 mb-4">
                        {/* Quest Completion - Priority */}
                        <div className="bg-slate-700/30 rounded-lg p-3 border-2 border-amber-500/50">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-slate-300 font-semibold">Quest Completion</span>
                            <span className="text-sm font-bold text-amber-400">50%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400">
                              {data.completedQuests} / {data.availableQuests}
                            </span>
                            <span className="text-xs text-slate-300">
                              {data.availableQuests > 0
                                ? ((data.completedQuests / data.availableQuests) * 100).toFixed(1)
                                : 0}%
                            </span>
                          </div>
                        </div>

                        {/* Surprise Quiz */}
                        <div className="bg-slate-700/30 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-slate-300">Surprise Quiz</span>
                            <span className="text-sm font-semibold text-amber-400">23%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400">
                              {data.surpriseCorrect} / {data.surpriseTotal}
                            </span>
                            <span className="text-xs text-slate-300">
                              {data.surpriseTotal > 0
                                ? ((data.surpriseCorrect / data.surpriseTotal) * 100).toFixed(1)
                                : 0}%
                            </span>
                          </div>
                        </div>

                        {/* Practical Quiz */}
                        <div className="bg-slate-700/30 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-slate-300">Practical Quiz</span>
                            <span className="text-sm font-semibold text-amber-400">20%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400">
                              {data.practicalCorrect} / {data.practicalTotal}
                            </span>
                            <span className="text-xs text-slate-300">
                              {data.practicalTotal > 0
                                ? ((data.practicalCorrect / data.practicalTotal) * 100).toFixed(1)
                                : 0}%
                            </span>
                          </div>
                        </div>

                        {/* Knowledge Quiz */}
                        <div className="bg-slate-700/30 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-slate-300">Knowledge Quiz</span>
                            <span className="text-sm font-semibold text-amber-400">7%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-400">
                              {data.knowledgeCorrect} / {data.knowledgeTotal}
                            </span>
                            <span className="text-xs text-slate-300">
                              {data.knowledgeTotal > 0
                                ? ((data.knowledgeCorrect / data.knowledgeTotal) * 100).toFixed(1)
                                : 0}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Final Grade */}
                      <div className="border-t border-slate-600 pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-300">Weighted Average</span>
                          <span className="text-sm text-slate-400">{data.weightedPercentage.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-amber-400">Final Grade</span>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-amber-400">
                              {formatGrade(data.grade)}
                            </div>
                            <div className="text-xs text-slate-400">
                              {getGradeDescription(data.grade)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            {subjectGrades.length === 0 && (
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-8 text-center">
                <p className="text-slate-400">
                  No quiz data available yet. Start completing quests to see your grades!
                </p>
              </div>
            )}
          </div>

          {/* Grading Scale Reference */}
          <div className="mt-8 bg-slate-800/30 rounded-xl border border-slate-700/50 p-4">
            <h3 className="text-sm font-semibold text-amber-400 mb-3">Grading Scale</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">97-100%</span>
                <span className="text-slate-300">1.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">94-96%</span>
                <span className="text-slate-300">1.25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">91-93%</span>
                <span className="text-slate-300">1.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">88-90%</span>
                <span className="text-slate-300">2.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">85-87%</span>
                <span className="text-slate-300">2.25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">82-84%</span>
                <span className="text-slate-300">2.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">79-81%</span>
                <span className="text-slate-300">2.75</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">75-78%</span>
                <span className="text-slate-300">3.00</span>
              </div>
              <div className="flex justify-between col-span-2">
                <span className="text-slate-400">Below 75%</span>
                <span className="text-red-400">5.00 (Failed)</span>
              </div>
            </div>
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
            className="flex flex-col items-center gap-1 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110"
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
