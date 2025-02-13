"use client"

import { useEffect, useState } from 'react';
import { Question, MultipleChoiceQuestion } from '@/types';
import { Button } from './ui/button';
import { shuffle } from '@/lib/utils';
import topics from '@/data/topics.json';

const QUESTION_COUNT = 5;
const TIME_PER_QUESTION = 30; // seconds

async function getAllQuestions(): Promise<MultipleChoiceQuestion[]> {
  const allQuestions: MultipleChoiceQuestion[] = [];
  
  for (const topic of topics.topics) {
    const questions = await import(`@/data/${topic.questionsFile}`);
    const multipleChoiceQuestions = questions.default.questions.filter(
      (q: Question): q is MultipleChoiceQuestion => q.type === 'multiple-choice'
    );
    allQuestions.push(...multipleChoiceQuestions);
  }
  
  return allQuestions;
}

interface QuestionState {
  question: MultipleChoiceQuestion;
  answered: boolean;
  selectedAnswer: number | null;
  timeLeft: number;
}

export function QuickStudyComponent() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    async function initializeQuestions() {
      const allQuestions = await getAllQuestions();
      const shuffledQuestions = shuffle(allQuestions)
        .slice(0, QUESTION_COUNT)
        .map(q => ({
          question: q,
          answered: false,
          selectedAnswer: null,
          timeLeft: TIME_PER_QUESTION
        }));
      setQuestions(shuffledQuestions);
      setLoading(false);
    }
    
    initializeQuestions();
  }, []);

  useEffect(() => {
    if (loading || isComplete) return;
    
    const timer = setInterval(() => {
      setQuestions(prevQuestions => {
        const newQuestions = [...prevQuestions];
        const currentQuestion = newQuestions[currentQuestionIndex];
        
        if (currentQuestion && !currentQuestion.answered) {
          if (currentQuestion.timeLeft > 0) {
            currentQuestion.timeLeft--;
          } else {
            currentQuestion.answered = true;
            // Move to next question after time runs out
            setTimeout(() => {
              if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
              } else {
                setIsComplete(true);
              }
            }, 1000);
          }
        }
        return newQuestions;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, loading, isComplete, questions.length]);

  if (loading) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (optionIndex: number) => {
    if (currentQuestion.answered) return;

    setQuestions(prev => {
      const newQuestions = [...prev];
      newQuestions[currentQuestionIndex].answered = true;
      newQuestions[currentQuestionIndex].selectedAnswer = optionIndex;
      
      if (optionIndex === currentQuestion.question.correctAnswer) {
        setScore(prev => prev + 1);
      }
      
      return newQuestions;
    });

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 1000);
  };

  if (isComplete) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Study Session Complete!</h2>
        <div className="text-xl">
          Your score: {score} out of {questions.length} ({Math.round(score/questions.length * 100)}%)
        </div>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>Question {currentQuestionIndex + 1} of {questions.length}</div>
        <div className="text-lg font-semibold">Time left: {currentQuestion.timeLeft}s</div>
      </div>
      
      <div className="p-6 border rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">{currentQuestion.question.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.question.options.map((option, index) => {
            const isSelected = currentQuestion.selectedAnswer === index;
            const isCorrect = currentQuestion.question.correctAnswer === index;
            const showResult = currentQuestion.answered;
            
            let buttonClass = "w-full justify-start text-left";
            if (showResult) {
              if (isCorrect) buttonClass += " bg-green-100 hover:bg-green-100";
              else if (isSelected) buttonClass += " bg-red-100 hover:bg-red-100";
            }
            
            return (
              <Button
                key={index}
                variant="outline"
                className={buttonClass}
                onClick={() => handleAnswerSelect(index)}
                disabled={currentQuestion.answered}
              >
                {option}
              </Button>
            );
          })}
        </div>
        
        {currentQuestion.answered && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <p className="font-semibold">Explanation:</p>
            <p>{currentQuestion.question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}