import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Topics } from "@/components/topics"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b">
        <div className="flex h-16 items-center px-4 container mx-auto justify-between">
          <h2 className="text-lg font-semibold">Frontend Interview Practice</h2>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to Frontend Interview Practice</h1>
          <p className="text-lg text-muted-foreground">
            Prepare for your frontend interviews with interactive exercises and real-world scenarios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">Browse Topics</Button>
          </div>

          {/* Topics Section */}
          <div className="pt-8">
            <h2 className="text-2xl font-semibold mb-6">Practice Topics</h2>
            <Topics />
          </div>
        </section>
      </main>
    </div>
  )
}
