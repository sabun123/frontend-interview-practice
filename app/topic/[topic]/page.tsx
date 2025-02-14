import { QuestionCard } from "@/components/question-card"
import { Button } from "@/components/ui/button"
import topics from "@/data/topics.json"
import { QuestionsData, Topic } from "@/types"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'

type TopicPageParams = Promise<{
  topic: string
}>;

export async function generateMetadata({ 
  params 
}: { 
  params: TopicPageParams 
}): Promise<Metadata> {
  const { topic: paramsTopic } = await params;
  const topic = (topics.topics as Topic[]).find((t) => t.id === paramsTopic);
  if (!topic) return { title: 'Not Found' }
  return { title: topic.name }
}

export async function generateStaticParams(): Promise<{ topic: string }[]> {

  return Promise.resolve(
    (topics.topics as Topic[]).map((topic) => ({
      topic: topic.id,
    }))
  )
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

export default async function TopicPage({ 
  params 
}: { 
  params: TopicPageParams 
}) {
  const { topic: paramTopic } = await params;

  const questions = await getTopicQuestions(paramTopic)
  const topic = (topics.topics as Topic[]).find((t) => t.id === paramTopic);

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
  )
}
