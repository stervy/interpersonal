import { NextResponse } from "next/server"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export async function POST(request: Request) {
  try {
    const { scenarioId, conversation } = await request.json()

    if (!conversation || !Array.isArray(conversation) || conversation.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid conversation data" },
        { status: 400 }
      )
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      )
    }

    // Build conversation summary for feedback prompt
    const conversationText = conversation
      .map((msg: { role: string; content: string }) => `${msg.role === "user" ? "You" : "Them"}: ${msg.content}`)
      .join("\n\n")

    const feedbackPrompt = `You are a compassionate interpersonal skills coach. Review this conversation where someone was practicing a difficult conversation, and provide brief, constructive feedback (2-3 short paragraphs).

Focus on:
1. What they did well (specific examples)
2. What could be improved or alternative approaches
3. One key takeaway for future practice

Be encouraging and specific. Keep it concise and actionable.

Conversation:
${conversationText}`

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: feedbackPrompt }],
        temperature: 0.7,
        max_tokens: 300,
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
    const feedback = data.choices[0]?.message?.content

    if (!feedback) {
      return NextResponse.json({ error: "No feedback generated" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      feedback,
      metadata: {
        scenarioId,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error generating feedback:", error)
    return NextResponse.json(
      { error: "Failed to generate feedback. Check server logs." },
      { status: 500 }
    )
  }
}

