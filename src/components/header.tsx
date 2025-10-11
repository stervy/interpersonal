"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Container } from "@/components/container"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "T-Groups", href: "/t-groups" },
  { name: "Practice", href: "/practice" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Main navigation">
          <Logo />
          <ul className="flex items-center gap-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg px-3 py-2",
                      isActive ? "text-brand" : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

