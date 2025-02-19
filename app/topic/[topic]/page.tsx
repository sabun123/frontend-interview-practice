import { QuestionCard } from "@/components/question-card";
import { Button } from "@/components/ui/button";
import { QuestionsData } from "@/types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { topicsData } from "@/app/data/topics";

interface TopicPageProps {
  params: Promise<{
    topic: string;
  }>;
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { topic: topicId } = await params;
  const topic = topicsData.topics.find((t) => t.id === topicId);
  if (!topic) return { title: "Not Found" };
  return {
    title: topic.name,
    description: topic.description,
  };
}

export function generateStaticParams() {
  return topicsData.topics.map((topic) => ({
    topic: topic.id,
  }));
}

async function getTopicQuestions(topicId: string): Promise<QuestionsData> {
  const topic = topicsData.topics.find((t) => t.id === topicId);
  if (!topic) throw notFound();

  try {
    const questionFile = await import(`@/public/data/${topic.questionsFile}`);
    return questionFile.default as QuestionsData;
  } catch (error) {
    console.error("Error loading questions:", error);
    throw notFound();
  }
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic: topicId } = await params;
  const topic = topicsData.topics.find((t) => t.id === topicId);
  if (!topic) return notFound();

  const questions = await getTopicQuestions(topicId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{topic.name}</h1>
            <p className="text-lg text-muted-foreground mt-2">
              {topic.description}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {questions.questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
}
