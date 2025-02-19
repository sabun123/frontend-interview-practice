export type TopicIcon = 'code' | 'file-type' | 'layout' | 'package' | 'code-2' | 'server';

export interface Topic {
  id: string;
  name: string;
  icon: TopicIcon;
  description: string;
  questionsFile: string;
}

export interface TopicsData {
  topics: Topic[];
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

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export type Question = TextQuestion | MultipleChoiceQuestion;

export interface QuestionsData {
  questions: Question[];
}