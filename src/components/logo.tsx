import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={cn(
        "font-serif text-2xl font-bold text-brand-ink hover:opacity-80 transition-opacity",
        className
      )}
    >
      Interpersonal
    </Link>
  )
}

