import { NextResponse } from "next/server"

// Pricing per 1M tokens (input)
const MODEL_PRICING: Record<string, { input: number; output: number }> = {
  "gpt-4o-mini": { input: 0.15, output: 0.6 },
  "gpt-3.5-turbo": { input: 0.5, output: 1.5 },
  "gpt-4o": { input: 5, output: 15 },
  "gpt-4-turbo": { input: 10, output: 30 },
}

function calculateCost(usage: { prompt_tokens: number; completion_tokens: number } | undefined, model: string) {
  if (!usage) return 0
  const pricing = MODEL_PRICING[model] || MODEL_PRICING["gpt-4o-mini"]
  const inputCost = (usage.prompt_tokens / 1_000_000) * pricing.input
  const outputCost = (usage.completion_tokens / 1_000_000) * pricing.output
  return inputCost + outputCost
}

export async function POST(request: Request) {
  try {
    const {
      scenarioId,
      prompt,
      userInput,
      model = "gpt-4o-mini",
      conversationHistory = [],
    } = await request.json()

    if (!scenarioId || !prompt || !userInput) {
      return NextResponse.json(
        { error: "Missing required fields: scenarioId, prompt, and userInput" },
        { status: 400 }
      )
    }

    // Validate model selection
    const validModels = ["gpt-4o-mini", "gpt-3.5-turbo", "gpt-4o", "gpt-4-turbo"]
    const selectedModel = validModels.includes(model) ? model : "gpt-4o-mini"

    // Build messages array with conversation history
    const messages = [{ role: "system", content: prompt }]

    // Add conversation history (converting user/assistant to OpenAI format)
    conversationHistory.forEach((msg: { role: string; content: string }) => {
      if (msg.role === "user" || msg.role === "assistant") {
        messages.push({ role: msg.role, content: msg.content })
      }
    })

    // Add current user input
    messages.push({ role: "user", content: userInput })

    // Connect to OpenAI
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Please add OPENAI_API_KEY to .env.local" },
        { status: 500 }
      )
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: messages,
          temperature: 0.7,
          max_tokens: 200,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("OpenAI API error:", errorData)
        return NextResponse.json(
          { error: `OpenAI API error: ${response.statusText}` },
          { status: response.status }
        )
      }

      const data = await response.json()
      const aiResponse = data.choices[0]?.message?.content

      if (!aiResponse) {
        return NextResponse.json(
          { error: "No response from OpenAI" },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        response: aiResponse,
        metadata: {
          scenarioId,
          model: data.model,
          usage: data.usage,
          cost: calculateCost(data.usage, selectedModel),
          timestamp: new Date().toISOString(),
        },
      })
    } catch (error) {
      console.error("Error calling OpenAI API:", error)
      return NextResponse.json(
        { error: "Failed to call OpenAI API. Check server logs." },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Error testing scenario:", error)
    return NextResponse.json(
      { error: "Failed to test scenario. Check server logs." },
      { status: 500 }
    )
  }
}

