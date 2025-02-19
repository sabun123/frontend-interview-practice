'use client'

import { Button } from "@/components/ui/button";
import { Topic } from "@/types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useTopicStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function GetStarted() {
  const topics = useTopicStore((state) => state.topics);
  const isLoading = useTopicStore((state) => state.isLoading);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            Welcome to Frontend Interview Practice! Here&apos;s how to make the
            most of your preparation:
          </p>

          <div className="grid gap-6 mt-6">
            <div className="border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold mb-2">
                1. Choose Your Path
              </h3>
              <p className="text-muted-foreground mb-4">
                We recommend starting with these topics in order:
              </p>
              <ol className="space-y-2">
                {topics.map((topic: Topic) => (
                  <li key={topic.id} className="text-muted-foreground">
                    <Link
                      href={`/topic/${topic.id}`}
                      className="hover:text-primary"
                    >
                      {topic.name} - {topic.description}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold mb-2">
                2. Practice Strategy
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Start with beginner questions in each topic</li>
                <li>• Try to answer without looking at the solution first</li>
                <li>
                  • Review explanations thoroughly, even for questions you got
                  right
                </li>
                <li>• Revisit topics regularly to reinforce learning</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold mb-2">
                3. Test Your Knowledge
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  • Multiple choice questions help verify your understanding
                </li>
                <li>
                  • Text-based questions simulate real interview scenarios
                </li>
                <li>• Pay attention to the difficulty levels</li>
                <li>• Use the tags to focus on specific areas</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Link href={`/topic/${topics[0].id}`}>
              <Button size="lg">Start with {topics[0].name}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
