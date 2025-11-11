"use client"

import { FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Section } from "@/components/section"
import { Container } from "@/components/container"

export default function ComingSoonPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/coming-soon-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        const { message } = await response.json()
        setError(message ?? "Incorrect password. Please try again.")
        return
      }

      const redirectTo = searchParams.get("redirectTo") ?? "/"
      router.push(redirectTo)
      router.refresh()
    } catch (error) {
      console.error(error)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section className="min-h-screen flex items-center bg-gradient-to-b from-brand-accent/40 to-background">
      <Container>
        <div className="mx-auto max-w-md text-center space-y-8 bg-card border rounded-3xl p-8 shadow-sm">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Interpersonal</p>
            <h1 className="font-serif text-4xl font-bold text-brand-ink">Coming Soon</h1>
            <p className="text-muted-foreground">
              We&apos;re putting the finishing touches on something special. Enter the password to preview the
              site.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Checking..." : "Enter"}
            </Button>
          </form>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </Container>
    </Section>
  )
}
