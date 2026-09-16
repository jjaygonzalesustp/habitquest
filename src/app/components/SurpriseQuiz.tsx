import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { QuestionType, Question, PracticalQuestion } from '../data/questionBank';
import { questionBank, getQuestionsForDay, generatePracticalChoices } from '../data/questionsHelper';
import { toast } from 'sonner';
import { Zap } from 'lucide-react';
import { recordActivity } from '../services/dataService';
import { format } from 'date-fns';

export default function SurpriseQuiz() {
  const { user, currentSubject: activeSubject, currentDifficulty } = useApp();
  const location = useLocation();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);
  const [currentSubject, setCurrentSubject] = useState<string>('');
  const [practicalChoices, setPracticalChoices] = useState<string[]>([]);
  const [practicalCorrectIndex, setPracticalCorrectIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(20);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [quizDifficulty, setQuizDifficulty] = useState<'knowledge' | 'practical'>('knowledge');
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Get timing based on difficulty
  const getQuizInterval = (difficulty: 'knowledge' | 'practical') => {
    return difficulty === 'knowledge' ? 20000 : 90000; // 20s or 90s
  };

  const getQuizCountdown = (difficulty: 'knowledge' | 'practical') => {
    return difficulty === 'knowledge' ? 20 : 40; // 20s or 40s
  };

  const handleAutoSubmit = useCallback(async () => {
    setHasAnswered(true);

    let isCorrect = false;
    let correctAnswerText = '';

    if (currentQuestion) {
      if (quizDifficulty === 'knowledge') {
        const kq = currentQuestion as Question;
        isCorrect = selectedAnswer !== null && selectedAnswer === kq.correctAnswer;
        correctAnswerText = kq.choices[kq.correctAnswer];
      } else {
        isCorrect = selectedAnswer !== null && selectedAnswer === practicalCorrectIndex;
        correctAnswerText = practicalChoices[practicalCorrectIndex];
      }
    }

    const correctAnswers = isCorrect ? 1 : 0;

    // Record activity to Google Sheets
    if (user && currentQuestion && currentSubject) {
      await recordActivity({
        name: user.name,
        timeAndDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        correctAnswers,
        attempts: 1,
        subject: currentSubject + ` (Surprise Quiz ${quizDifficulty})`,
        day: 0, // 0 indicates surprise quiz, not a regular day quest
        tabSwitches: tabSwitchCount,
      });
    }

    if (selectedAnswer === null || !currentQuestion) {
      toast.error('Time\'s up!', {
        description: 'No answer selected.',
      });
    } else {
      if (isCorrect) {
        toast.success('Correct!', {
          description: currentQuestion.explanation,
        });
      } else {
        toast.error('Time\'s up! Incorrect!', {
          description: `The correct answer was: ${correctAnswerText}`,
        });
      }
    }

    setTimeout(() => {
      setShowQuiz(false);
    }, 2000);
  }, [selectedAnswer, currentQuestion, currentSubject, user, quizDifficulty, practicalChoices, practicalCorrectIndex, tabSwitchCount]);

  const triggerSurpriseQuiz = useCallback(() => {
    // Only trigger during active quest
    if (!user || location.pathname !== '/question' || !activeSubject) {
      return;
    }

    // Match the current quest difficulty
    const difficulty = currentDifficulty;
    setQuizDifficulty(difficulty);

    const subjectData = questionBank[activeSubject];
    if (!subjectData) return;

    let randomQuestion: QuestionType;

    if (difficulty === 'knowledge') {
      const knowledgeQuestions = subjectData.knowledge;
      randomQuestion = knowledgeQuestions[Math.floor(Math.random() * knowledgeQuestions.length)];
    } else {
      const practicalQuestions = subjectData.practical;
      const pq = practicalQuestions[Math.floor(Math.random() * practicalQuestions.length)];
      randomQuestion = pq;

      // Generate practical choices
      const { choices, correctIndex } = generatePracticalChoices(pq);
      setPracticalChoices(choices);
      setPracticalCorrectIndex(correctIndex);
    }

    const quizCountdown = getQuizCountdown(difficulty);

    setCurrentQuestion(randomQuestion);
    setCurrentSubject(activeSubject);
    setShowQuiz(true);
    setCountdown(quizCountdown);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setTabSwitchCount(0); // Reset counter for each quiz

    toast.info(`⚡ Surprise Quiz (${difficulty})!`, {
      description: `You have ${quizCountdown} seconds to answer!`,
    });
  }, [user, location.pathname, activeSubject, currentDifficulty]);

  // Timer for triggering surprise quiz - only during active quest, every 15 seconds
  useEffect(() => {
    if (!user) return;

    const isActiveQuest = location.pathname === '/question';

    if (!isActiveQuest) {
      // Clear timer when not in active quest
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const scheduleNextQuiz = () => {
      // Get interval based on current difficulty
      const interval = getQuizInterval(currentDifficulty);

      timerRef.current = setTimeout(() => {
        triggerSurpriseQuiz();
        scheduleNextQuiz();
      }, interval);
    };

    scheduleNextQuiz();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [user, location.pathname, triggerSurpriseQuiz]);

  // Track tab switches during surprise quiz
  useEffect(() => {
    if (!showQuiz || hasAnswered) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(prev => prev + 1);
      }
    };

    const handleBlur = () => {
      setTabSwitchCount(prev => prev + 1);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [showQuiz, hasAnswered]);

  // Countdown timer
  useEffect(() => {
    if (!showQuiz || hasAnswered) return;

    if (countdown === 0) {
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [showQuiz, countdown, hasAnswered, handleAutoSubmit]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null || !currentQuestion) return;

    setHasAnswered(true);

    let isCorrect = false;
    let correctAnswerText = '';

    if (quizDifficulty === 'knowledge') {
      const kq = currentQuestion as Question;
      isCorrect = selectedAnswer === kq.correctAnswer;
      correctAnswerText = kq.choices[kq.correctAnswer];
    } else {
      isCorrect = selectedAnswer === practicalCorrectIndex;
      correctAnswerText = practicalChoices[practicalCorrectIndex];
    }

    const correctAnswers = isCorrect ? 1 : 0;

    // Record activity to Google Sheets
    if (user && currentSubject) {
      await recordActivity({
        name: user.name,
        timeAndDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        correctAnswers,
        attempts: 1,
        subject: currentSubject + ` (Surprise Quiz ${quizDifficulty})`,
        day: 0, // 0 indicates surprise quiz, not a regular day quest
        tabSwitches: tabSwitchCount,
      });
    }

    if (isCorrect) {
      toast.success('Correct!', {
        description: currentQuestion.explanation,
      });
    } else {
      toast.error('Incorrect!', {
        description: `The correct answer was: ${correctAnswerText}`,
      });
    }

    setTimeout(() => {
      setShowQuiz(false);
    }, 2000);
  };

  if (!currentQuestion) return null;

  const displayChoices = quizDifficulty === 'knowledge'
    ? (currentQuestion as Question).choices
    : practicalChoices;

  const correctAnswerIndex = quizDifficulty === 'knowledge'
    ? (currentQuestion as Question).correctAnswer
    : practicalCorrectIndex;

  return (
    <Dialog open={showQuiz} onOpenChange={(open) => !hasAnswered && setShowQuiz(open)}>
      <DialogContent
        className="bg-slate-800 border-amber-500/50 max-w-md"
        onInteractOutside={(e) => hasAnswered && e.preventDefault()}
        onEscapeKeyDown={(e) => hasAnswered && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-amber-400 flex items-center gap-2">
            <Zap className="h-6 w-6" />
            Surprise Quiz ({quizDifficulty})!
          </DialogTitle>
          <DialogDescription className="sr-only">
            Answer this surprise question within {getQuizCountdown(quizDifficulty)} seconds
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 capitalize">{currentQuestion.topic} - {quizDifficulty}</span>
            <div className={`text-2xl font-bold ${countdown <= 10 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>
              {countdown}s
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-100">{currentQuestion.question}</h3>

          <div className="space-y-2">
            {displayChoices.map((choice: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={hasAnswered}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all duration-300 ${
                  hasAnswered
                    ? index === correctAnswerIndex
                      ? 'border-green-500 bg-green-500/20'
                      : index === selectedAnswer
                      ? 'border-red-500 bg-red-500/20'
                      : 'border-slate-600 bg-slate-700/30 opacity-50'
                    : selectedAnswer === index
                    ? 'border-amber-500 bg-amber-500/20'
                    : 'border-slate-600 bg-slate-700/30 hover:border-amber-500/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      hasAnswered && index === correctAnswerIndex
                        ? 'border-green-500 bg-green-500'
                        : hasAnswered && index === selectedAnswer
                        ? 'border-red-500 bg-red-500'
                        : selectedAnswer === index
                        ? 'border-amber-500 bg-amber-500'
                        : 'border-slate-500'
                    }`}
                  >
                    {selectedAnswer === index && !hasAnswered && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-slate-200 text-sm">{choice}</span>
                </div>
              </button>
            ))}
          </div>

          {!hasAnswered && (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold disabled:opacity-50"
            >
              Submit Answer
            </Button>
          )}

          {hasAnswered && (
            <div className="text-center text-sm text-slate-400">
              Closing in a moment...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
