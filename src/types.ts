export type UserLevel = 1 | 2 | 3 | 4 | 5;
export type GrammarCategory = 'counters' | 'movement' | 'reasons' | 'honorifics';
export type QuestionStage = 'main' | 'remedial';
export type QuizPhase = 'main' | 'retry' | 'remedial';
export type QuestionType = 'multiple' | 'short' | 'wordArrange';
export type AppStage =
  | 'splash' | 'miku-intro' | 'mascot' | 'level-select' | 'category-select'
  | 'quiz' | 'retry' | 'remedial' | 'round-complete' | 'result'
  | 'mistake-review' | 'vocabulary' | 'speaking';
export type FeedbackState = 'idle' | 'correct' | 'incorrect';

export type TagID =
  | 'TAG_CNT_PEOPLE'
  | 'TAG_CNT_ANIMAL'
  | 'TAG_CNT_OBJECT'
  | 'TAG_CNT_BOOK'
  | 'TAG_CNT_DRINK'
  | 'TAG_CNT_BOTTLE'
  | 'TAG_CNT_SHEET'
  | 'TAG_CNT_CLOTHING'
  | 'TAG_CNT_PAIR'
  | 'TAG_CNT_VEHICLE'
  | 'TAG_CNT_BOWL'
  | 'TAG_CNT_BOX'
  | 'TAG_CNT_BAG'
  | 'TAG_CNT_FLOWER'
  | 'TAG_CNT_GENERAL'
  | 'TAG_MVT_DIRECTION'
  | 'TAG_RSN_CONNECTIVE'
  | 'TAG_HON_REGISTER'
  | 'TAG_TYPO';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface CategorySelection {
  category: GrammarCategory;
  difficulty: Difficulty;
}

export interface Choice { id: string; text: string; tagId?: TagID; }

export interface Question {
  id: string;
  category: GrammarCategory;
  userLevel: UserLevel | 0;
  stage: QuestionStage;
  type: QuestionType;
  order: number;
  promptKr: string;
  promptRu: string;
  audioText: string;
  choices?: Choice[];
  wordItems?: string[];
  correctAnswer: string;
  acceptedAnswers: string[];
  hint?: string;
  instructionRu: string;
  explanationRu: string;
  exampleKr: string;
  exampleRu: string;
  sentenceTranslationRu?: string;
  primaryTagId?: TagID;
}

export interface UserAnswer {
  questionId: string;
  category: GrammarCategory;
  stage: QuestionStage;
  isCorrect: boolean;
  userInput: string;
  timestamp: number;
}

export interface MistakeEntry {
  question: Question;
  userInput: string;
  timestamp: number;
  reviewedCorrectly?: boolean;
}

export interface VocabWord {
  id: string;
  korean: string;
  russian: string;
  romanization?: string;
  exampleKr?: string;
  exampleRu?: string;
  topic: VocabTopic;
  level: UserLevel;
  emoji?: string;
}

export type VocabTopic =
  | 'home' | 'food' | 'school' | 'places' | 'cleaning'
  | 'daily' | 'body' | 'nature' | 'transport' | 'emotions'
  | 'numbers' | 'time' | 'shopping' | 'work' | 'family';

export interface SavedWord {
  wordId: string;
  savedAt: number;
  known: boolean;
}

export interface UserStats {
  totalCorrect: number;
  totalAnswered: number;
  streak: number;
  lastStudyDate: string;
  hintsUsed: number;
  sessionsCompleted: number;
}
