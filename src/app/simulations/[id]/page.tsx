"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Clock, CheckCircle2, AlertCircle } from "lucide-react"

const SIMULATION_DURATION = 180 // 3 minutes in seconds

const scenarios: Record<
  string,
  {
    title: string
    description: string
    prompt: string
    initialMessage: string
  }
> = {
  "breaking-up": {
    title: "Breaking Up with Someone",
    description: "You're ending a relationship with someone you've been dating for several months. They may not see it coming.",
    prompt: `You are someone being broken up with. The person breaking up with you is someone you've been dating for several months. You care about them and don't want to lose the relationship. You may feel shocked, hurt, or try to convince them to stay. Respond naturally and emotionally. Keep responses relatively brief (1-2 sentences).`,
    initialMessage:
      "Hey, can we talk? There's something I need to say...",
  },
  "breaking-up-firm": {
    title: "Breaking Up When They Won't Accept It",
    description: "You've already broken up, but they keep trying to get back together or won't accept your decision.",
    prompt: `You are someone who was broken up with but won't accept it. You keep trying to convince your ex to get back together. You may ask "why?", say "I can change", try to convince them, or become emotional. Keep responses brief (1-2 sentences).`,
    initialMessage:
      "I know you said it's over, but I've been thinking... I really think we can make this work. Can we please try again?",
  },
  "rejection": {
    title: "Rejecting Someone Gracefully",
    description: "Someone has asked you out or expressed romantic interest. You need to say no kindly and clearly.",
    prompt: `You are someone who just asked someone out or expressed romantic interest. You're waiting for their response. You may be nervous, hopeful, or excited. Keep responses brief (1-2 sentences).`,
    initialMessage:
      "Hey, I've really enjoyed getting to know you. Would you like to go on a date with me?",
  },
  "what-are-we": {
    title: "The 'What Are We?' Conversation",
    description: "You've been seeing someone for a while. It's time to define the relationship and see where you both stand.",
    prompt: `You are someone who's been casually seeing someone for a while. You have feelings for them but aren't sure how they feel. You may be nervous about having this conversation. Keep responses brief (1-2 sentences).`,
    initialMessage:
      "So... I've been wondering. What are we? I mean, are we exclusive? Where do you see this going?",
  },
  "boundaries-friend": {
    title: "Setting Boundaries with a Friend",
    description: "A close friend has been calling/texting constantly and expecting immediate responses. You need to set boundaries.",
    prompt: `You are a friend who has been calling and texting someone constantly, expecting immediate responses. You don't realize you're being too much. When they bring it up, you may feel hurt, defensive, or confused. Keep responses brief (1-2 sentences).`,
    initialMessage:
      "Hey! Haven't heard from you in a while. Everything okay? I've been texting but you haven't replied...",
  },
  "boundaries-family": {
    title: "Setting Boundaries with Family",
    description: "A family member constantly gives unsolicited advice and asks intrusive questions. You need to set limits.",
    prompt: `You are a family member who gives lots of advice and asks personal questions because you care. When someone sets boundaries, you may feel hurt or think they don't appreciate you. Keep responses brief (1-2 sentences).`,
    initialMessage:
      "Hi sweetie! I was just thinking about you. Have you found a job yet? And what about dating? Are you seeing anyone?",
  },
  "saying-no-friend": {
    title: "Saying No to a Friend's Request",
    description: "A friend is asking for a big favor that you can't or don't want to do. You need to say no without damaging the friendship.",
    prompt: `You are a friend asking for a favor. You may really need help, or you may just be testing boundaries. When they say no, you may be disappointed or try to convince them. Keep responses brief (1-2 sentences).`,
    initialMessage:
      "Hey, I know this is a big ask, but could you help me move this weekend? I really need the help and you're the only person I can ask...",
  },
  "boundaries-roommate": {
    title: "Setting Boundaries with a Roommate",
    description: "Your roommate is leaving dishes in the sink, using your things without asking, and having guests over late. Time to address it.",
    prompt: `You are a roommate who has been leaving dishes, borrowing things without asking, and having guests over late. You may not realize it's bothering your roommate. When confronted, you may be defensive. Keep responses brief (1-2 sentences).`,
    initialMessage:
      "Oh hey! My friends are coming over tonight, is that cool? Also, did you see my favorite mug? I couldn't find it this morning.",
  },
  "apologizing": {
    title: "Apologizing After a Fight",
    description: "You had a big fight with someone close and said things you regret. You want to apologize genuinely and repair the relationship.",
    prompt: `You are someone who was hurt during a fight. The other person said hurtful things. You may still be angry, hurt, or not ready to accept an apology. Keep responses brief (1-2 sentences).`,
    initialMessage:
      "I don't really want to talk right now. I'm still pretty upset about what happened...",
  },
  "hurt-feelings-friend": {
    title: "Addressing Hurt Feelings with a Friend",
    description: "A good friend made a comment that hurt your feelings. You need to address it without creating drama.",
    prompt: `You are a friend who made a comment that may have hurt someone's feelings. You may not remember the comment, think you were just joking, or not realize the impact. Keep responses brief (1-2 sentences).`,
    initialMessage:
      "Oh hey! What's up? Everything good?",
  },
  "ending-friendship": {
    title: "Ending a Friendship Gracefully",
    description: "A friendship has run its course. You need to close it with respect and clarity, even though it's difficult.",
    prompt: `You are a friend who is being told the friendship is ending. You may be shocked, hurt, or not understand why. You may ask for reasons or try to fix things. Keep responses brief (1-2 sentences).`,
    initialMessage:
      "Hey! It's been a while since we've talked. Everything okay? I feel like we've been drifting apart...",
  },
}

export default function SimulationPage() {
  const params = useParams()
  const router = useRouter()
  const scenarioId = params.id as string
  const scenario = scenarios[scenarioId]

  const [timeLeft, setTimeLeft] = useState(SIMULATION_DURATION)
  const [isActive, setIsActive] = useState(false)
  const [conversation, setConversation] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [userInput, setUserInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini")
  const inputRef = useRef<HTMLInputElement>(null)

  const modelNames: Record<string, string> = {
    "gpt-4o-mini": "GPT-4o Mini",
    "gpt-3.5-turbo": "GPT-3.5 Turbo",
    "gpt-4o": "GPT-4o",
    "gpt-4-turbo": "GPT-4 Turbo",
  }

  useEffect(() => {
    if (!scenario) {
      router.push("/simulations")
      return
    }

    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false)
      setIsComplete(true)
      handleSimulationEnd()
    }
  }, [timeLeft, isActive, scenario])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => {
    setIsActive(true)
    setConversation([{ role: "assistant", content: scenario.initialMessage }])
    inputRef.current?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim() || isLoading || !isActive) return

    const userMessage = userInput.trim()
    setUserInput("")
    setConversation((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      // Include the new user message in conversation history
      const updatedConversation = [...conversation, { role: "user", content: userMessage }]

      const response = await fetch("/api/scenarios/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId,
          prompt: scenario.prompt,
          userInput: userMessage,
          model: selectedModel,
          conversationHistory: conversation, // Send history before adding user message
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      setConversation((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error(error)
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble responding right now. Could you try again?",
        },
      ])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleSimulationEnd = async () => {
    // Generate feedback
    const feedbackResponse = await fetch("/api/scenarios/feedback-generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scenarioId,
        conversation,
      }),
    })

    if (feedbackResponse.ok) {
      const data = await feedbackResponse.json()
      setFeedback(data.feedback)
    }
  }

  if (!scenario) {
    return null
  }

  if (!isActive && !isComplete) {
    return (
      <Section className="min-h-screen flex items-center">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Button variant="ghost" onClick={() => router.push("/simulations")} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Simulations
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{scenario.title}</CardTitle>
                <p className="text-muted-foreground mt-2">{scenario.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-brand" />
                    <span className="font-semibold">Duration: 3 minutes</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You&apos;ll practice having this difficult conversation with an AI. Respond naturally and see how the
                    conversation unfolds.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">AI Model</label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o-mini">
                        GPT-4o Mini - Fast & Cheap ($0.15/1M)
                      </SelectItem>
                      <SelectItem value="gpt-3.5-turbo">
                        GPT-3.5 Turbo - Very Fast & Very Cheap ($0.50/1M)
                      </SelectItem>
                      <SelectItem value="gpt-4o">
                        GPT-4o - High Quality ($5/1M)
                      </SelectItem>
                      <SelectItem value="gpt-4-turbo">
                        GPT-4 Turbo - Highest Quality ($10/1M)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Choose a cheaper model for quick testing or an expensive one for higher quality responses
                  </p>
                </div>

                <Button onClick={handleStart} size="lg" className="w-full">
                  Start Simulation
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section className="min-h-screen">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-6 gap-4">
            <Button variant="ghost" onClick={() => router.push("/simulations")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Exit
            </Button>
            <div className="flex items-center gap-4">
              <Select value={selectedModel} onValueChange={setSelectedModel} disabled={isComplete}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 rounded-lg border px-4 py-2">
                <Clock className="h-4 w-4 text-brand" />
                <span className={`font-mono font-semibold ${timeLeft < 60 ? "text-destructive" : ""}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>{scenario.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {conversation.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        msg.role === "user"
                          ? "bg-brand text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-2">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce delay-75" />
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce delay-150" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {!isComplete ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your response..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !userInput.trim()}>
                Send
              </Button>
            </form>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Simulation Complete
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {feedback && (
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <h3 className="font-semibold mb-2">Reflection</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{feedback}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button onClick={() => router.push("/simulations")} className="flex-1">
                    Back to Simulations
                  </Button>
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </Section>
  )
}

