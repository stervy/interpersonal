"use client"

import { useState } from "react"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ScenarioTest {
  id: string
  title: string
  category: string
  currentPrompt: string
  testCases: string[]
  feedback?: {
    rating: number
    notes: string
    suggestedImprovements: string
  }
}

const testScenarios: ScenarioTest[] = [
  {
    id: "breakup-1",
    title: "Breaking Up - Compassionate Ending",
    category: "Relationships",
    currentPrompt: `You are breaking up with someone you've been dating for several months. While you care about them, you know the relationship isn't right for you long-term. They may not see it coming or may try to convince you to stay. Your goal is to be clear, compassionate, and firm in your decision. Focus on expressing your truth while minimizing harm. Be honest but kind, specific but not cruel, and firm but gentle.`,
    testCases: [
      "They ask 'why?' and want specific reasons",
      "They say 'I can change' and try to convince you to stay",
      "They become emotional and you feel guilty",
      "They ask if there's someone else",
    ],
  },
  {
    id: "boundaries-1",
    title: "Setting Boundaries - Friend Who's Too Much",
    category: "Boundaries",
    currentPrompt: `A close friend has been calling and texting you constantly, expecting immediate responses at all hours, and getting upset when you don't reply quickly. You value the friendship but need more space and healthier boundaries. Your goal is to set clear limits while preserving the relationship. Be kind but firm, specific about your needs, and open to negotiation on what works for both of you.`,
    testCases: [
      "Friend says 'I thought we were closer than that'",
      "Friend gets defensive and accuses you of not caring",
      "Friend asks for examples of what they've done wrong",
      "Friend asks if you're upset with them",
    ],
  },
  {
    id: "conflict-friend-1",
    title: "Addressing Hurt Feelings - Friend Conflict",
    category: "Friendship",
    currentPrompt: `A good friend made a comment that hurt your feelings. You've been stewing on it and know you need to address it, but you're worried it will create drama or end the friendship. Your goal is to express your feelings clearly without blame, give them a chance to explain, and work toward repair. Use "I" statements, express impact without assuming intent, and be open to their perspective.`,
    testCases: [
      "Friend says 'I was just joking, you're too sensitive'",
      "Friend gets defensive and turns it back on you",
      "Friend apologizes immediately and you feel better",
      "Friend doesn't remember the comment and you have to explain",
    ],
  },
  {
    id: "family-boundaries-1",
    title: "Setting Boundaries - Overbearing Family",
    category: "Family",
    currentPrompt: `A family member constantly gives unsolicited advice, asks intrusive personal questions, and doesn't respect your boundaries. You love them but need them to back off. Your goal is to set clear limits while maintaining the relationship. Be respectful but firm, specific about what you need, and consistent in enforcing boundaries.`,
    testCases: [
      "Family member says 'But I'm just trying to help'",
      "Family member gets offended and says you don't appreciate them",
      "Family member asks why you're suddenly so distant",
      "Family member agrees but then crosses the boundary again",
    ],
  },
  {
    id: "apology-1",
    title: "Apologizing After a Fight",
    category: "Repair",
    currentPrompt: `You had a big fight with someone close to you and said things you regret. You want to apologize genuinely and repair the relationship. Your goal is to take full responsibility, express genuine remorse, avoid excuses, and create a path forward. Focus on their feelings, not your intentions, and be specific about what you're sorry for.`,
    testCases: [
      "They say 'Sorry isn't enough this time'",
      "They accept the apology but seem distant",
      "They want to know why you said those things",
      "They bring up past issues and you feel defensive",
    ],
  },
]

export default function TestScenariosPage() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioTest | null>(null)
  const [editedPrompt, setEditedPrompt] = useState("")
  const [userInput, setUserInput] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [notes, setNotes] = useState("")
  const [improvements, setImprovements] = useState("")
  const [feedbackSaved, setFeedbackSaved] = useState(false)
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini")

  const modelNames: Record<string, string> = {
    "gpt-4o-mini": "GPT-4o Mini",
    "gpt-3.5-turbo": "GPT-3.5 Turbo",
    "gpt-4o": "GPT-4o",
    "gpt-4-turbo": "GPT-4 Turbo",
  }

  const handleScenarioSelect = (scenario: ScenarioTest) => {
    setSelectedScenario(scenario)
    setEditedPrompt(scenario.currentPrompt)
    setUserInput("")
    setAiResponse("")
    setRating(null)
    setNotes("")
    setImprovements("")
    setFeedbackSaved(false)
  }

  const handleTest = async () => {
    if (!selectedScenario || !userInput.trim()) return

    setIsLoading(true)
    setAiResponse("")

    try {
      const response = await fetch("/api/scenarios/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scenarioId: selectedScenario.id,
          prompt: editedPrompt,
          userInput: userInput.trim(),
          model: selectedModel,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to test scenario")
      }

      const data = await response.json()
      setAiResponse(data.response)
    } catch (error) {
      console.error(error)
      setAiResponse("Error: Failed to test scenario. Check console for details.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveFeedback = async () => {
    if (!selectedScenario || !rating) return

    try {
      const response = await fetch("/api/scenarios/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scenarioId: selectedScenario.id,
          rating,
          notes: notes.trim(),
          improvements: improvements.trim(),
          prompt: editedPrompt,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save feedback")
      }

      setFeedbackSaved(true)
      setTimeout(() => setFeedbackSaved(false), 3000)

      // Clear form after saving
      setNotes("")
      setImprovements("")
      setRating(null)
    } catch (error) {
      console.error(error)
      alert("Failed to save feedback. Check console for details.")
    }
  }

  return (
    <>
      <Section className="bg-gradient-to-b from-brand-accent/30 to-background pt-8">
        <Container>
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-ink">
              Scenario Testing Lab
            </h1>
            <p className="text-lg text-muted-foreground">
              Test scenarios, refine prompts, and provide feedback to help us build the best simulations.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Scenario List */}
              <div className="lg:col-span-1">
                <h2 className="font-serif text-2xl font-bold text-brand-ink mb-4">Scenarios to Test</h2>
                <div className="space-y-4">
                  {testScenarios.map((scenario) => (
                    <Card
                      key={scenario.id}
                      className={`cursor-pointer transition-all hover:border-brand ${
                        selectedScenario?.id === scenario.id ? "border-brand" : ""
                      }`}
                      onClick={() => handleScenarioSelect(scenario)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-base">{scenario.title}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {scenario.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">
                          {scenario.testCases.length} test case{scenario.testCases.length !== 1 ? "s" : ""}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border bg-muted/30 p-4">
                  <h3 className="text-sm font-semibold mb-2">How to Test</h3>
                  <ol className="text-xs space-y-2 text-muted-foreground list-decimal list-inside">
                    <li>Select a scenario to test</li>
                    <li>Review and edit the prompt as needed</li>
                    <li>Enter a test input (user message)</li>
                    <li>Run the test and review the AI response</li>
                    <li>Provide feedback with rating and notes</li>
                  </ol>
                </div>
              </div>

              {/* Testing Interface */}
              <div className="lg:col-span-2 space-y-6">
                {selectedScenario ? (
                  <>
                    <Card>
                      <CardHeader>
                        <CardTitle>{selectedScenario.title}</CardTitle>
                        <CardDescription>
                          Category: {selectedScenario.category}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Prompt Editor */}
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            System Prompt (editable)
                          </label>
                          <textarea
                            value={editedPrompt}
                            onChange={(e) => setEditedPrompt(e.target.value)}
                            className="w-full min-h-[150px] rounded-lg border bg-background px-3 py-2 text-sm font-mono"
                            placeholder="Enter the system prompt..."
                          />
                        </div>

                        <Separator />

                        {/* Test Cases */}
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Suggested Test Cases
                          </label>
                          <div className="space-y-2">
                            {selectedScenario.testCases.map((testCase, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 rounded-lg border bg-muted/30 p-2 text-sm cursor-pointer hover:bg-muted/50"
                                onClick={() => setUserInput(testCase)}
                              >
                                <span className="text-brand">•</span>
                                <span>{testCase}</span>
                                <span className="ml-auto text-xs text-muted-foreground">Click to use</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Model Selector */}
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
                          {selectedModel && (
                            <p className="mt-1 text-xs font-semibold text-brand">
                              Selected: {modelNames[selectedModel] || selectedModel}
                            </p>
                          )}
                        </div>

                        <Separator />

                        {/* Test Input */}
                        <div>
                          <label className="block text-sm font-semibold mb-2">Test Input</label>
                          <textarea
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="w-full min-h-[80px] rounded-lg border bg-background px-3 py-2 text-sm"
                            placeholder="Enter test input or click a test case above..."
                          />
                        </div>

                        <Button onClick={handleTest} disabled={!userInput.trim() || isLoading} className="w-full">
                          {isLoading ? "Testing..." : "Run Test"}
                        </Button>

                        {/* AI Response */}
                        {aiResponse && (
                          <div className="rounded-lg border bg-muted/30 p-4">
                            <label className="block text-sm font-semibold mb-2">AI Response</label>
                            <div className="whitespace-pre-wrap text-sm text-muted-foreground">{aiResponse}</div>
                          </div>
                        )}

                        <Separator />

                        {/* Feedback Form */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-semibold">Feedback & Rating</h3>

                          <div>
                            <label className="block text-sm font-semibold mb-2">
                              Rating (1-5): {rating ?? "Not rated"}
                            </label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((num) => (
                                <Button
                                  key={num}
                                  type="button"
                                  variant={rating === num ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setRating(num)}
                                >
                                  {num}
                                </Button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2">Notes</label>
                            <textarea
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              className="w-full min-h-[100px] rounded-lg border bg-background px-3 py-2 text-sm"
                              placeholder="What worked well? What didn&apos;t? Any observations..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-2">
                              Suggested Prompt Improvements
                            </label>
                            <textarea
                              value={improvements}
                              onChange={(e) => setImprovements(e.target.value)}
                              className="w-full min-h-[100px] rounded-lg border bg-background px-3 py-2 text-sm"
                              placeholder="How could the prompt be improved? What should be added or changed?"
                            />
                          </div>

                          <Button
                            onClick={handleSaveFeedback}
                            disabled={!rating || feedbackSaved}
                            className="w-full"
                          >
                            {feedbackSaved ? "Feedback Saved ✓" : "Save Feedback"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">
                        Select a scenario from the list to start testing and refining prompts.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

