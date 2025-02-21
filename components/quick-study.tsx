"use client";

import { useEffect, useState, useRef } from "react";
import { MultipleChoiceQuestion } from "@/types";
import { Button } from "./ui/button";
import { shuffle } from "@/lib/utils";
import Link from "next/link";

const QUESTION_COUNT = 5;
const TIME_PER_QUESTION = 30; // seconds

interface QuestionState {
  question: MultipleChoiceQuestion;
  answered: boolean;
  selectedAnswer: number | null;
  timeLeft: number;
}

function TimerCircle({
  timeLeft,
  totalTime,
}: {
  timeLeft: number;
  totalTime: number;
}) {
  const progress = (timeLeft / totalTime) * 100;
  const circumference = 2 * Math.PI * 45; // radius is 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-[100px] h-[100px] -rotate-90">
        <circle
          cx="50"
          cy="50"
          r="45"
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeWidth="5"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          className="stroke-blue-500 dark:stroke-blue-400 transition-all duration-1000 ease-linear"
          strokeWidth="5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className="absolute text-2xl font-semibold">{timeLeft}</span>
    </div>
  );
}

export function QuickStudyComponent({
  allQuestions,
}: {
  allQuestions: MultipleChoiceQuestion[];
}) {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const explanationRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const scrollToExplanation = () => {
    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set multiple timeouts to ensure the scroll happens
    scrollTimeout.current = setTimeout(() => {
      if (explanationRef.current) {
        explanationRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center", // Center the element instead of nearest
        });
        // Focus the element to ensure it's in view
        explanationRef.current.focus();

        // Double-check scroll position after a short delay
        setTimeout(() => {
          const rect = explanationRef.current?.getBoundingClientRect();
          if (rect && (rect.top < 0 || rect.bottom > window.innerHeight)) {
            explanationRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 150);
      }
    }, 200); // Increased initial delay for more reliability
  };

  useEffect(() => {
    if (!allQuestions || allQuestions.length === 0) return;

    async function initializeQuestions() {
      const shuffledQuestions = shuffle(allQuestions)
        .slice(0, QUESTION_COUNT)
        .map((q) => ({
          question: q,
          answered: false,
          selectedAnswer: null,
          timeLeft: TIME_PER_QUESTION,
        }));
      setQuestions(shuffledQuestions);
      setLoading(false);
    }

    initializeQuestions();
  }, [allQuestions]);

  useEffect(() => {
    if (loading || isComplete) return;

    const timer = setInterval(() => {
      setQuestions((prevQuestions) => {
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
                setCurrentQuestionIndex((prev) => prev + 1);
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
    return (
      <div className="text-lg dark:text-gray-300">Loading questions...</div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (optionIndex: number) => {
    if (currentQuestion.answered) return;

    const isCorrect = optionIndex === currentQuestion.question.correctAnswer;

    setQuestions((prev) => {
      const newQuestions = [...prev];
      // Only update if the question hasn't been answered yet
      if (!newQuestions[currentQuestionIndex].answered) {
        newQuestions[currentQuestionIndex].answered = true;
        newQuestions[currentQuestionIndex].selectedAnswer = optionIndex;

        if (isCorrect) {
          setScore((prev) => prev + 1);
        }
      }
      return newQuestions;
    });

    // Call our new scroll function
    scrollToExplanation();

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 5000);
  };

  if (isComplete) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold dark:text-gray-100">
          Study Session Complete!
        </h2>
        <div className="text-xl dark:text-gray-200">
          Your score: {score} out of {questions.length} (
          {Math.round((score / questions.length) * 100)}%)
        </div>
        <div className="flex gap-4">
          <Button onClick={() => window.location.reload()}>Try Again</Button>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="dark:text-gray-200">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <TimerCircle
          timeLeft={currentQuestion.timeLeft}
          totalTime={TIME_PER_QUESTION}
        />
      </div>

      <div className="p-6 border rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800/50">
        <h3 className="text-xl font-semibold mb-4 dark:text-gray-100">
          {currentQuestion.question.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.question.options.map((option, index) => {
            const isSelected = currentQuestion.selectedAnswer === index;
            const isCorrect = currentQuestion.question.correctAnswer === index;
            const showResult = currentQuestion.answered;

            let buttonClass =
              "w-full justify-start text-left whitespace-normal min-h-[2.5rem] py-2 px-4";
            if (showResult) {
              if (isCorrect)
                buttonClass +=
                  " bg-green-100 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/30";
              else if (isSelected)
                buttonClass +=
                  " bg-red-100 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/30";
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
          <div
            ref={explanationRef}
            className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            tabIndex={-1}
          >
            <p className="font-semibold dark:text-gray-100">Explanation:</p>
            <p className="dark:text-gray-300 whitespace-pre-wrap mt-2">
              {currentQuestion.question.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
