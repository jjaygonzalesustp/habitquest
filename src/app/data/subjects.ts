export const ALL_SUBJECTS = [
  'Digital Electronics',
  'Internet of Things',
  'Physics for Automotive',
  'Automotive Trivia',
  'Computer Programming',
] as const;

export type SubjectName = (typeof ALL_SUBJECTS)[number];
