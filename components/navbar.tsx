import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto justify-between">
        <Link href="/" className="text-lg font-semibold hover:opacity-80">
          Frontend Interview Practice
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  )