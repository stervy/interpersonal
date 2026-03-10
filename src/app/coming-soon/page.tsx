"use client"

import { FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Section } from "@/components/section"
import { Container } from "@/components/container"

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_EMAIL_SIGNUP_ID ?? "meereyka"

export default function ComingSoonPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [email, setEmail] = useState("")
  const [emailStatus, setEmailStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [emailError, setEmailError] = useState<string | null>(null)

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!FORMSPREE_ID) {
      setEmailError("Email signup is not configured. Please set NEXT_PUBLIC_FORMSPREE_EMAIL_SIGNUP_ID.")
      return
    }
    setEmailError(null)
    setEmailStatus("submitting")

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "Interpersonal – email signup" }),
      })

      if (response.ok) {
        setEmailStatus("success")
        setEmail("")
      } else {
        const data = await response.json().catch(() => ({}))
        setEmailError(data.error ?? "Something went wrong. Please try again.")
        setEmailStatus("error")
      }
    } catch {
      setEmailError("Something went wrong. Please try again.")
      setEmailStatus("error")
    }
  }

  return (
    <Section className="min-h-screen flex items-center bg-gradient-to-b from-brand-accent/40 to-background py-16">
      <Container>
        <div className="mx-auto max-w-md space-y-10">
          {/* Email signup – primary CTA */}
          <div className="text-center space-y-6 bg-card border rounded-3xl p-8 shadow-sm">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Interpersonal</p>
              <h1 className="font-serif text-4xl font-bold text-brand-ink">Coming Soon</h1>
              <p className="text-muted-foreground">
                We&apos;re putting the finishing touches on something special. Get notified when we launch.
              </p>
            </div>

            {FORMSPREE_ID ? (
              emailStatus === "success" ? (
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  You&apos;re on the list. We&apos;ll be in touch.
                </p>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={emailStatus === "submitting"}
                    className="text-center"
                  />
                  <Button type="submit" className="w-full" disabled={emailStatus === "submitting"}>
                    {emailStatus === "submitting" ? "Signing up..." : "Notify me"}
                  </Button>
                  {emailError && <p className="text-sm text-destructive">{emailError}</p>}
                </form>
              )
            ) : (
              <p className="text-sm text-muted-foreground">
                Email signup coming soon. Use the form below if you have the preview password.
              </p>
            )}
          </div>

          {/* Password entry for preview access */}
          <div className="text-center space-y-4 bg-card/50 border border-muted rounded-2xl p-6">
            <p className="text-sm text-muted-foreground">Already have the password?</p>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <Button type="submit" className="w-full" variant="outline" disabled={isSubmitting}>
                {isSubmitting ? "Checking..." : "Enter"}
              </Button>
            </form>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </div>
      </Container>
    </Section>
  )
}
