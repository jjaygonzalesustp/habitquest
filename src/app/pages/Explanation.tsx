import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import Footer from '../components/Footer';

interface QuestionResult {
  question: {
    question: string;
    choices: string[];
    correctAnswer: number;
    explanation: string;
  };
  selectedAnswer: number;
  isCorrect: boolean;
}

export default function Explanation() {
  const navigate = useNavigate();
  const { user } = useApp();
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [showButton, setShowButton] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideTimeRemaining, setSlideTimeRemaining] = useState(0);
  const TOTAL_TIME = 60; // 1 minute total

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const savedResults = localStorage.getItem('quest_results');
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      setResults(parsedResults);

      // Calculate time per slide
      const timePerSlide = Math.floor(TOTAL_TIME / parsedResults.length);
      setSlideTimeRemaining(timePerSlide);
    }
  }, []);

  // Slideshow timer - auto-advance to next explanation
  useEffect(() => {
    if (results.length === 0) return;
    if (currentSlide >= results.length) {
      setShowButton(true);
      return;
    }

    const timer = setInterval(() => {
      setSlideTimeRemaining((prev) => {
        if (prev <= 1) {
          // Move to next slide
          setCurrentSlide((current) => current + 1);

          // Reset timer for next slide
          const timePerSlide = Math.floor(TOTAL_TIME / results.length);
          return timePerSlide;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [results, currentSlide]);

  const handleReturnHome = () => {
    localStorage.removeItem('quest_results');
    navigate('/home');
  };

  if (!user) {
    return null;
  }

  const correctCount = results.filter(r => r.isCorrect).length;
  const totalQuestions = results.length;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 pb-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-6 mb-6">
          <h1 className="text-3xl font-bold text-center text-amber-400 mb-4">Quest Complete!</h1>

          <div className="flex justify-center items-center gap-8 mb-4">
            <div className="text-center">
              <p className="text-5xl font-bold text-amber-400">{correctCount}/{totalQuestions}</p>
              <p className="text-sm text-slate-400 mt-1">Correct Answers</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-amber-400">{score}%</p>
              <p className="text-sm text-slate-400 mt-1">Score</p>
            </div>
          </div>

          {correctCount === totalQuestions && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
              <p className="text-green-400 text-center font-semibold">
                🎉 Perfect Score! You've earned 0.68% to your monthly progress!
              </p>
            </div>
          )}

          {!showButton && (
            <div className="text-center mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <p className="text-sm text-amber-400 mb-2">
                Reading explanation {currentSlide + 1} of {totalQuestions}
              </p>
              <div className="flex gap-1 justify-center mb-2">
                {results.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index < currentSlide
                        ? 'w-8 bg-green-500'
                        : index === currentSlide
                        ? 'w-12 bg-amber-500'
                        : 'w-8 bg-slate-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-400">
                Next in {slideTimeRemaining}s
              </p>
            </div>
          )}
        </div>

        {/* Slideshow - Show one explanation at a time */}
        <div className="space-y-4">
          {results.length > 0 && currentSlide < results.length && (
            <div
              className={`bg-slate-800/50 backdrop-blur-lg rounded-xl border p-6 transform transition-all duration-500 ${
                results[currentSlide].isCorrect ? 'border-green-500/30' : 'border-red-500/30'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                {results[currentSlide].isCorrect ? (
                  <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-100 mb-2">
                    Question {currentSlide + 1}: {results[currentSlide].question.question}
                  </h3>

                  <div className="space-y-2 mb-4">
                    {(results[currentSlide].question.choices || []).map((choice, choiceIndex) => (
                      <div
                        key={choiceIndex}
                        className={`p-2 rounded-lg text-sm ${
                          choiceIndex === results[currentSlide].question.correctAnswer
                            ? 'bg-green-500/20 border border-green-500/30 text-green-200'
                            : choiceIndex === results[currentSlide].selectedAnswer && !results[currentSlide].isCorrect
                            ? 'bg-red-500/20 border border-red-500/30 text-red-200'
                            : 'text-slate-400'
                        }`}
                      >
                        {choice}
                        {choiceIndex === results[currentSlide].question.correctAnswer && (
                          <span className="ml-2 text-xs font-semibold text-green-400">✓ Correct</span>
                        )}
                        {choiceIndex === results[currentSlide].selectedAnswer && !results[currentSlide].isCorrect && (
                          <span className="ml-2 text-xs font-semibold text-red-400">✗ Your Answer</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-700/50 p-4 rounded-lg border-l-4 border-amber-500">
                    <p className="text-xs font-semibold text-amber-400 mb-2">Explanation:</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{results[currentSlide].question.explanation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Show all viewed explanations in summary after slideshow */}
          {showButton && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-amber-400 text-center mb-4">Review All Explanations</h2>
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`bg-slate-800/50 backdrop-blur-lg rounded-xl border p-6 ${
                    result.isCorrect ? 'border-green-500/30' : 'border-red-500/30'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {result.isCorrect ? (
                      <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-100 mb-2">
                        Question {index + 1}: {result.question.question}
                      </h3>

                      <div className="space-y-2 mb-4">
                        {(result.question.choices || []).map((choice, choiceIndex) => (
                          <div
                            key={choiceIndex}
                            className={`p-2 rounded-lg text-sm ${
                              choiceIndex === result.question.correctAnswer
                                ? 'bg-green-500/20 border border-green-500/30 text-green-200'
                                : choiceIndex === result.selectedAnswer && !result.isCorrect
                                ? 'bg-red-500/20 border border-red-500/30 text-red-200'
                                : 'text-slate-400'
                            }`}
                          >
                            {choice}
                            {choiceIndex === result.question.correctAnswer && (
                              <span className="ml-2 text-xs font-semibold text-green-400">✓ Correct</span>
                            )}
                            {choiceIndex === result.selectedAnswer && !result.isCorrect && (
                              <span className="ml-2 text-xs font-semibold text-red-400">✗ Your Answer</span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="bg-slate-700/50 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-amber-400 mb-1">Explanation:</p>
                        <p className="text-sm text-slate-300">{result.question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showButton && (
          <div className="mt-6">
            <Button
              onClick={handleReturnHome}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold transition-all duration-300 hover:scale-[1.02] py-6 text-lg"
            >
              Return to Home
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
