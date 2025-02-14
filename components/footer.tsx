"use client"

import { Github, Linkedin, Coffee } from "lucide-react"
import { Button } from "./ui/button"
import { event } from "@/lib/analytics"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const displayYear = currentYear > 2025 ? `2025 - ${currentYear}` : '2025'

  const handleSocialClick = (platform: string) => {
    event({
      action: 'click',
      category: 'social_link',
      label: platform,
    });
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {displayYear} Yusuf Ismail bin Shukor
        </p>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="transition-transform hover:scale-110 hover:text-primary active:scale-95" 
            asChild
          >
            <a 
              href="https://my.linkedin.com/in/yusuf-ismail-bin-shukor" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              onClick={() => handleSocialClick('linkedin')}
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="transition-transform hover:scale-110 hover:text-primary active:scale-95"
            asChild
          >
            <a 
              href="https://github.com/sabun123" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              onClick={() => handleSocialClick('github')}
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="transition-transform hover:scale-110 hover:text-[#FFDD00] active:scale-95"
            asChild
          >
            <a 
              href="https://buymeacoffee.com/yusufismail" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Buy Me a Coffee"
              onClick={() => handleSocialClick('buymeacoffee')}
            >
              <Coffee className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}