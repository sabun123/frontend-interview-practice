import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import topics from "@/data/topics.json"

export default function GetStarted() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">Getting Started</h1>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2>How to Use This Platform</h2>
          <p className="text-lg text-muted-foreground">
            Welcome to Frontend Interview Practice! Here's how to make the most of your preparation:
          </p>
          
          <div className="grid gap-6 mt-6">
            <div className="border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold mb-2">1. Choose Your Path</h3>
              <p className="text-muted-foreground mb-4">
                We recommend starting with these topics in order:
              </p>
              <ol className="space-y-2">
                {topics.topics.map((topic, index) => (
                  <li key={topic.id} className="text-muted-foreground">
                    <Link href={`/topic/${topic.id}`} className="hover:text-primary">
                      {topic.name} - {topic.description}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold mb-2">2. Practice Strategy</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Start with beginner questions in each topic</li>
                <li>• Try to answer without looking at the solution first</li>
                <li>• Review explanations thoroughly, even for questions you got right</li>
                <li>• Revisit topics regularly to reinforce learning</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold mb-2">3. Test Your Knowledge</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Multiple choice questions help verify your understanding</li>
                <li>• Text-based questions simulate real interview scenarios</li>
                <li>• Pay attention to the difficulty levels</li>
                <li>• Use the tags to focus on specific areas</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Link href={`/topic/${topics.topics[0].id}`}>
              <Button size="lg">
                Start with {topics.topics[0].name}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )