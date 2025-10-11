import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  as?: "section" | "div"
}

export function Section({ children, className, as = "section" }: SectionProps) {
  const Component = as
  return (
    <Component className={cn("py-12 md:py-16 lg:py-20", className)}>
      {children}
    </Component>
  )
}

