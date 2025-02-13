"use client"

import { Button } from "@/components/ui/button"
import { Code, FileType, Layout, Package, Code2 } from "lucide-react"
import topics from "@/data/topics.json"
import { useRouter } from "next/navigation"

const iconMap = {
  code: Code,
  "file-type": FileType,
  layout: Layout,
  package: Package,
  "code-2": Code2,
}

export function Topics() {
  const router = useRouter()

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {topics.topics.map((topic) => {
        const Icon = iconMap[topic.icon as keyof typeof iconMap]
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