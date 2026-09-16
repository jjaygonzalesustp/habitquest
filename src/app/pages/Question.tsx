import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getQuestionsForDay, generatePracticalChoices } from '../data/questionsHelper';
import { QuestionType, PracticalQuestion } from '../data/questionBank';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { recordActivity, updateUserProgress } from '../services/dataService';
import { format } from 'date-fns';

interface Answer {
  questionIndex: number;
  selectedAnswer: number;
}

interface PracticalQuestionState {
  question: PracticalQuestion;
  choices: string[];
  correctIndex: number;
}

export default function Question() {
  const navigate = useNavigate();
  const { user, currentSubject, currentDay, currentDifficulty, setMonthlyProgress, monthlyProgress, completedQuests, addCompletedQuest, setNextQuestTime, selectedMonth, selectedYear } = useApp();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [practicalStates, setPracticalStates] = useState<PracticalQuestionState[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!currentSubject) {
      toast.error('No subject selected', {
        description: 'Please select a subject first.',
      });
      navigate('/quest');
      return;
    }

    const loadedQuestions = getQuestionsForDay(currentSubject, currentDay, currentDifficulty);
    console.log('Loading questions for:', currentSubject, 'Day:', currentDay, 'Difficulty:', currentDifficulty, 'Questions:', loadedQuestions.length);

    if (loadedQuestions.length === 0) {
      toast.error('No questions available', {
        description: 'Please go back and try again.',
      });
      navigate('/quest-library');
      return;
    }

    setQuestions(loadedQuestions);

    // Generate practical question choices if needed
    if (currentDifficulty === 'practical') {
      const states = loadedQuestions.map(q => {
        const pq = q as PracticalQuestion;
        const { choices, correctIndex } = generatePracticalChoices(pq);
        return {
          question: pq,
          choices,
          correctIndex
        };
      });
      setPracticalStates(states);
    }

    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
  }, [currentSubject, currentDay, currentDifficulty, navigate]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Increment tab switch counter
        setTabSwitchCount(prev => prev + 1);
        toast.warning('Tab Switch Detected', {
          description: `Switched ${tabSwitchCount + 1} time(s). This is being recorded.`,
        });
      }
    };

    const handleBlur = () => {
      // Window lost focus (user switched to another app/window)
      setTabSwitchCount(prev => prev + 1);
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.key === 'w') ||
        (e.ctrlKey && e.key === 't') ||
        (e.altKey && e.key === 'Tab') ||
        (e.metaKey && e.key === 'w')
      ) {
        e.preventDefault();
        toast.warning('Action Blocked', {
          description: 'Closing tabs or switching is not allowed during the quest!',
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tabSwitchCount]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast.warning('Please select an answer', {
        description: 'You must choose one of the options before proceeding.',
      });
      return;
    }

    const newAnswer: Answer = {
      questionIndex: currentQuestionIndex,
      selectedAnswer,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setAttempts(attempts + 1);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      handleSubmit(updatedAnswers);
    }
  };

  const handleSubmit = async (finalAnswers: Answer[]) => {
    setIsSubmitting(true);

    try {
      let correctCount = 0;
      const results = finalAnswers.map((answer) => {
        const question = questions[answer.questionIndex];
        if (!question) {
          console.error('Question not found for index:', answer.questionIndex);
          return null;
        }

        let isCorrect = false;
        let normalizedQuestion: any;

        if (currentDifficulty === 'knowledge') {
          const kq = question as any;
          isCorrect = kq.correctAnswer === answer.selectedAnswer;
          normalizedQuestion = {
            question: kq.question,
            choices: kq.choices,
            correctAnswer: kq.correctAnswer,
            explanation: kq.explanation
          };
        } else {
          // Practical question
          const practicalState = practicalStates[answer.questionIndex];
          isCorrect = practicalState.correctIndex === answer.selectedAnswer;
          normalizedQuestion = {
            question: question.question,
            choices: practicalState.choices,
            correctAnswer: practicalState.correctIndex,
            explanation: question.explanation
          };
        }

        if (isCorrect) correctCount++;
        return {
          question: normalizedQuestion,
          selectedAnswer: answer.selectedAnswer,
          isCorrect
        };
      }).filter(Boolean);

      const progressIncrease = correctCount * 0.17;
      setMonthlyProgress(monthlyProgress + progressIncrease);

      // Use selected month/year for the quest date
      const questDate = new Date(selectedYear, selectedMonth, currentDay);
      const dateStr = format(questDate, 'yyyy-MM-dd');
      addCompletedQuest({
        subject: currentSubject,
        day: currentDay,
        date: dateStr,
        difficulty: currentDifficulty,
      });

      await recordActivity({
        name: user?.name || 'Unknown',
        timeAndDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        correctAnswers: correctCount,
        attempts: 4,
        subject: currentSubject + ` (${currentDifficulty})`,
        day: currentDay,
        tabSwitches: tabSwitchCount,
      });

      const newProgress = monthlyProgress + progressIncrease;
      const newQuest = { subject: currentSubject, day: currentDay, date: dateStr, difficulty: currentDifficulty };
      const updatedQuests = [...completedQuests, newQuest];

      await updateUserProgress({
        account: user?.account || '',
        monthlyProgress: newProgress,
        completedQuests: updatedQuests,
        lastUpdated: new Date().toISOString(),
      });

      localStorage.setItem('quest_results', JSON.stringify(results));
      navigate('/explanation');
    } catch (error) {
      console.error('Error submitting quest:', error);
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-center">
        <div className="text-center text-slate-300">
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  // Get choices based on difficulty
  const choices = currentDifficulty === 'practical'
    ? practicalStates[currentQuestionIndex]?.choices || []
    : (currentQuestion as any).choices || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 flex items-center justify-center relative">
      {isSubmitting && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-slate-800/90 rounded-2xl border border-amber-500/30 p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mx-auto mb-4"></div>
            <p className="text-amber-400 text-lg font-semibold">Submitting Quest...</p>
            <p className="text-slate-400 text-sm mt-2">Please wait while we save your progress</p>
          </div>
        </div>
      )}
      <div className="max-w-md w-full">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <span className="text-sm text-slate-400">{currentSubject}</span>
                <span className="text-xs text-amber-400 capitalize">{currentDifficulty} Level</span>
              </div>
              <span className="text-sm font-semibold text-amber-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-slate-100 mb-6">{currentQuestion.question}</h2>

            <div className="space-y-3">
              {choices.map((choice: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    selectedAnswer === index
                      ? 'border-amber-500 bg-amber-500/20 scale-[1.02]'
                      : 'border-slate-600 bg-slate-700/30 hover:border-amber-500/50 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedAnswer === index
                          ? 'border-amber-500 bg-amber-500'
                          : 'border-slate-500'
                      }`}
                    >
                      {selectedAnswer === index && (
                        <div className="w-3 h-3 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-slate-200">{choice}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Quest'}
          </Button>

          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-xs text-red-400 text-center">
              ⚠️ Do not close this tab or switch apps until you complete all questions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
