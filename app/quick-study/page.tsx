import { Suspense } from "react";
import type { Metadata } from "next";
import { QuickStudyComponent } from "@/components/quick-study";
import { topicsData } from "@/app/data/topics";
import { MultipleChoiceQuestion, Question } from "@/types";

export const metadata: Metadata = {
  title: "Quick Study Mode",
  description: "Test your knowledge with timed multiple-choice questions",
};

export default async function QuickStudyPage() {
  const allQuestions: MultipleChoiceQuestion[] = [];

  for (const topic of topicsData.topics) {
    try {
      const questionFile = await import(`@/app/data/${topic.questionsFile}`);
      const questionsData = questionFile.default;

      const multipleChoiceQuestions = questionsData.questions.filter(
        (q: Question): q is MultipleChoiceQuestion =>
          q.type === "multiple-choice"
      );
      allQuestions.push(...multipleChoiceQuestions);
    } catch (error) {
      console.error(`Error loading questions for ${topic.name}:`, error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold tracking-tight mb-6">
        Quick Study Mode
      </h1>
      <Suspense fallback={<div>Loading questions...</div>}>
        <QuickStudyComponent allQuestions={allQuestions} />
      </Suspense>
    </div>
  );
}
