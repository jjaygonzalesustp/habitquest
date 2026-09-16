import { rawQuestionBank, Question, PracticalQuestion, SubjectQuestions, QuestionType } from './questionBank';
import { practicalQuestions as customPracticalQuestions } from './practicalQuestions';

// Convert legacy format to new structure with knowledge and practical tiers
export const questionBank: SubjectQuestions = Object.keys(rawQuestionBank).reduce((acc, subject) => {
  const questions = rawQuestionBank[subject];

  // Add difficulty property to all knowledge questions
  const knowledgeQuestions: Question[] = questions.map(q => ({
    ...q,
    difficulty: 'knowledge' as const
  }));

  // Use custom practical questions if available, otherwise generate from knowledge
  let practicalQuestions: PracticalQuestion[];

  if (customPracticalQuestions[subject] && customPracticalQuestions[subject].length > 0) {
    // Use custom practical questions from practicalQuestions.ts
    practicalQuestions = customPracticalQuestions[subject];
  } else {
    // Fallback: Generate practical questions from knowledge questions
    practicalQuestions = questions.map(q => {
      const allChoices = q.choices as string[];
      const correctAnswer = allChoices[q.correctAnswer];
      const wrongAnswers = allChoices.filter((_: any, idx: number) => idx !== q.correctAnswer);

      return {
        id: q.id + '_practical',
        question: q.question,
        correctPool: [correctAnswer],
        wrongPool: wrongAnswers,
        explanation: q.explanation,
        topic: q.topic,
        difficulty: 'practical' as const
      };
    });
  }

  acc[subject] = {
    knowledge: knowledgeQuestions,
    practical: practicalQuestions
  };

  return acc;
}, {} as SubjectQuestions);

// Generate random choices for practical questions
export function generatePracticalChoices(question: PracticalQuestion): { choices: string[]; correctIndex: number } {
  const correctAnswer = question.correctPool[Math.floor(Math.random() * question.correctPool.length)];

  // Shuffle wrong pool and pick 3 unique wrong answers
  const shuffledWrong = [...question.wrongPool].sort(() => Math.random() - 0.5);
  const wrongAnswers = shuffledWrong.slice(0, 3);

  // Combine and shuffle
  const allChoices = [correctAnswer, ...wrongAnswers];
  const shuffled = allChoices.sort(() => Math.random() - 0.5);

  const correctIndex = shuffled.indexOf(correctAnswer);

  return {
    choices: shuffled,
    correctIndex
  };
}

// Seeded random for knowledge questions (existing logic)
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getQuestionsForDay(
  subject: string,
  dayNumber: number,
  difficulty: 'knowledge' | 'practical'
): QuestionType[] {
  const subjectData = questionBank[subject];
  if (!subjectData) return [];

  if (difficulty === 'knowledge') {
    const seed = subject.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) * dayNumber;
    const shuffled = shuffleArray(subjectData.knowledge, seed);
    return shuffled.slice(0, 4);
  } else {
    // Practical: random selection (not seeded)
    const shuffled = [...subjectData.practical].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }
}
