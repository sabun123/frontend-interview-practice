"use client"

import { Question } from "@/types"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChevronDown, ChevronUp, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

export function QuestionCard({ question }: { question: Question }) {
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/10 text-green-500'
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-500'
      case 'advanced':
        return 'bg-red-500/10 text-red-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  return (
    <div className="border rounded-lg p-6 space-y-4 bg-card">
      <div className="flex justify-between items-start gap-4">
        <h3 className="font-semibold text-lg">{question.question}</h3>
        <span className={`text-sm px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {question.tags?.map((tag) => (
          <span key={tag} className="flex items-center gap-1 text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
            <Tag className="h-3 w-3" />
            {tag}
          </span>
        )) || null}
      </div>

      {question.type === 'multiple-choice' && (
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn(
                "w-full justify-start h-auto p-4 text-left whitespace-normal",
                showAnswer && index === question.correctAnswer && "border-green-500 bg-green-500/10",
                showAnswer && selectedOption === index && index !== question.correctAnswer && "border-red-500 bg-red-500/10"
              )}
              onClick={() => !showAnswer && setSelectedOption(index)}
            >
              {option}
            </Button>
          ))}
        </div>
      )}

      <Button
        variant="ghost"
        className="w-full justify-between"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer ? "Hide Answer" : "Show Answer"}
        {showAnswer ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      {showAnswer && (
        <div className="pt-4 border-t space-y-4">
          {question.type === 'text' ? (
            <p className="whitespace-pre-wrap text-muted-foreground">
              {question.answer}
            </p>
          ) : (
            <div className="space-y-2">
              <p className="font-medium">Explanation:</p>
              <p className="text-muted-foreground">{question.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}