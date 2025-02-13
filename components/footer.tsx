"use client"

import { Github, Linkedin } from "lucide-react"
import { Button } from "./ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const displayYear = currentYear > 2025 ? `2025 - ${currentYear}` : '2025'

  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {displayYear} Yusuf Ismail bin Shukor
        </p>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}