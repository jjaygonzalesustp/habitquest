/**
 * Grade Calculation System
 *
 * Calculates student grades based on:
 * - Quest Completion: 50% (completed quests / available quests) - HIGHEST PRIORITY
 * - Surprise Quiz: 23% (all subjects combined)
 * - Practical Quiz: 20% (per subject)
 * - Knowledge Quiz: 7% (per subject)
 */

import { ALL_SUBJECTS } from '../data/subjects';

export interface QuizStats {
  correct: number;
  total: number;
}

export interface SubjectGrade {
  subject: string;
  surpriseQuiz: QuizStats;
  knowledgeQuiz: QuizStats;
  practicalQuiz: QuizStats;
  percentage: number;
  grade: number;
}

/**
 * Convert percentage to grade using the grading scale
 */
export function percentageToGrade(percentage: number): number {
  if (percentage >= 97) return 1.00;
  if (percentage >= 94) return 1.25;
  if (percentage >= 91) return 1.50;
  if (percentage >= 88) return 2.00;
  if (percentage >= 85) return 2.25;
  if (percentage >= 82) return 2.50;
  if (percentage >= 79) return 2.75;
  if (percentage >= 75) return 3.00;
  return 5.00; // Failed
}

/**
 * Calculate quiz percentage
 */
function calculatePercentage(correct: number, total: number): number {
  if (total === 0) return 0;
  return (correct / total) * 100;
}

/**
 * Extract quiz statistics from activity log
 */
export function extractQuizStats(activities: any[]): Map<string, SubjectGrade> {
  const subjects = new Map<string, SubjectGrade>();

  // Initialize subjects
  ALL_SUBJECTS.forEach(subject => {
    subjects.set(subject, {
      subject,
      surpriseQuiz: { correct: 0, total: 0 },
      knowledgeQuiz: { correct: 0, total: 0 },
      practicalQuiz: { correct: 0, total: 0 },
      percentage: 0,
      grade: 0
    });
  });

  // Process activities
  activities.forEach(activity => {
    const subjectName = activity.subject?.replace(/\s*\(.*?\)\s*/g, '').trim(); // Remove (knowledge/practical/Surprise Quiz)
    const isKnowledge = activity.subject?.includes('(knowledge)');
    const isPractical = activity.subject?.includes('(practical)');
    const isSurprise = activity.subject?.includes('(Surprise Quiz');

    const subjectData = subjects.get(subjectName);
    if (!subjectData) return;

    const correct = activity.correctAnswers || 0;
    const attempts = activity.attempts || 0;

    if (isSurprise) {
      subjectData.surpriseQuiz.correct += correct;
      subjectData.surpriseQuiz.total += attempts;
    } else if (isKnowledge) {
      subjectData.knowledgeQuiz.correct += correct;
      subjectData.knowledgeQuiz.total += attempts;
    } else if (isPractical) {
      subjectData.practicalQuiz.correct += correct;
      subjectData.practicalQuiz.total += attempts;
    }
  });

  // Calculate grades
  subjects.forEach((data, subject) => {
    const surprisePercentage = calculatePercentage(
      data.surpriseQuiz.correct,
      data.surpriseQuiz.total
    );
    const knowledgePercentage = calculatePercentage(
      data.knowledgeQuiz.correct,
      data.knowledgeQuiz.total
    );
    const practicalPercentage = calculatePercentage(
      data.practicalQuiz.correct,
      data.practicalQuiz.total
    );

    // Weighted average: Completion 50%, Surprise 23%, Practical 20%, Knowledge 7%
    // Note: Completion rate is calculated in Google Sheets, not here
    const weightedPercentage =
      (surprisePercentage * 0.23) +
      (knowledgePercentage * 0.07) +
      (practicalPercentage * 0.20) +
      (0 * 0.50); // Completion component (not calculated locally)

    data.percentage = weightedPercentage;
    data.grade = percentageToGrade(weightedPercentage);

    subjects.set(subject, data);
  });

  return subjects;
}

/**
 * Format grade for display
 */
export function formatGrade(grade: number): string {
  return grade.toFixed(2);
}

/**
 * Get grade description
 */
export function getGradeDescription(grade: number): string {
  if (grade === 1.00) return 'Excellent';
  if (grade <= 1.50) return 'Very Good';
  if (grade <= 2.00) return 'Good';
  if (grade <= 2.50) return 'Satisfactory';
  if (grade <= 3.00) return 'Pass';
  return 'Failed';
}
