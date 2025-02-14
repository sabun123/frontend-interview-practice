import { Button } from "@/components/ui/button"
import { Topics } from "@/components/topics"
import Link from "next/link"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Study smart with self-testing!</h1>
        <p className="text-lg text-muted-foreground">
          Prepare for your frontend interviews with interactive exercises and real-world scenarios.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/get-started">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/quick-study">
            <Button size="lg" variant="outline" className="bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 dark:text-purple-100">
              Quick Study Mode
            </Button>
          </Link>
          <Link href="#topics">
            <Button size="lg" variant="outline">Browse Topics</Button>
          </Link>
        </div>

        {/* Topics Section */}
        <div className="pt-8" id="topics">
          <h2 className="text-2xl font-semibold mb-6">Practice Topics</h2>
          <Topics />
        </div>
      </section>
    </main>
  )
}
