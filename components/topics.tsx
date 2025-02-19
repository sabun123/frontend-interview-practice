"use client"

import { Button } from "@/components/ui/button"
import { Code, FileType, Layout, Package, Code2, Server, LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { TopicIcon, Topic } from "@/types"

const iconMap: Record<TopicIcon, LucideIcon> = {
  code: Code,
  "file-type": FileType,
  layout: Layout,
  package: Package,
  "code-2": Code2,
  server: Server,
}

export function Topics({ topics }: { topics: Topic[] }) {
  const router = useRouter()

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {topics.map((topic) => {
        const Icon = iconMap[topic.icon as TopicIcon] || Code // Fallback to Code icon if not found
        return (
          <Button
            key={topic.id}
            variant="outline"
            className="h-24 w-full transition-all hover:scale-105 hover:shadow-lg hover:border-primary"
            onClick={() => router.push(`/topic/${topic.id}`)}
          >
            <div className="flex flex-col items-center gap-2">
              <Icon className="h-6 w-6" />
              <span className="font-medium">{topic.name}</span>
            </div>
          </Button>
        )
      })}
    </div>
  )
}