export interface Topic {
  id: string;
  name: string;
  icon: string;
  description: string;
  questionsFile: string;
}

export type QuestionType = 'text' | 'multiple-choice';

interface BaseQuestion {
  id: string;
  question: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  type: QuestionType;
}

interface TextQuestion extends BaseQuestion {
  type: 'text';
  answer: string;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export type Question = TextQuestion | MultipleChoiceQuestion;

export interface QuestionsData {
  questions: Question[];
}