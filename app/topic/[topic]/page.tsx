import { QuestionCard } from "@/components/question-card"
import { Button } from "@/components/ui/button"
import topics from "@/data/topics.json"
import { QuestionsData, Topic } from "@/types"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    topic: string;
  };
}

async function getTopicQuestions(topicId: string): Promise<QuestionsData> {
  const topic = (topics.topics as Topic[]).find((t) => t.id === topicId);
  if (!topic) return notFound();

  try {
    const questions = await import(`@/data/${topic.questionsFile}`);
    return questions.default || questions;
  } catch {
    return notFound();
  }
}

export default async function TopicPage({ params }: PageProps) {
  const questions = await getTopicQuestions(params.topic)
  const topic = (topics.topics as Topic[]).find((t) => t.id === params.topic);

  if (!topic) return notFound();

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
