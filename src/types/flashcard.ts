export interface FlashcardQuestion {
  id: string;
  question: string;
  category: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface DeckCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  questionCount: number;
}

export type GameScreenState = 'start' | 'playing' | 'score';

export interface UserAnswerRecord {
  questionId: string;
  question: string;
  selectedOptionIndex: number;
  selectedOptionText: string;
  correctOptionIndex: number;
  correctOptionText: string;
  isCorrect: boolean;
  explanation: string;
}

export interface GameSummary {
  deckCategory: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  accuracyPercentage: number;
  answers: UserAnswerRecord[];
}
