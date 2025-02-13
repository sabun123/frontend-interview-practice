import { notFound } from "next/navigation"
import topics from "@/data/topics.json"
import { QuestionCard } from "@/components/question-card"
import { Topic, QuestionsData } from "@/types"

async function getTopicQuestions(topicId: string): Promise<QuestionsData> {
  const topic = (topics.topics as Topic[]).find((t) => t.id === topicId)
  if (!topic) return notFound()
  
  try {
    const questions = await import(`@/data/${topic.questionsFile}`)
    return questions.default || questions
  } catch (error) {
    return notFound()
  }
}

export default async function TopicPage({
  params,
}: {
  params: { topic: string }
}) {
  const questions = await getTopicQuestions(params.topic)
  const topic = (topics.topics as Topic[]).find((t) => t.id === params.topic)

  if (!topic) return notFound()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{topic.name}</h1>
          <p className="text-lg text-muted-foreground mt-2">{topic.description}</p>
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