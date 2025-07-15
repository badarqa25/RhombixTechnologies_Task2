import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: `You are a helpful customer support chatbot for a modern web service company. Your role is to:

1. Provide friendly, professional, and helpful responses
2. Answer questions about common topics like:
   - Account management and billing
   - Technical support and troubleshooting
   - Product features and usage
   - General company information
   - Pricing and plans

3. For complex issues, guide users to contact human support
4. Always maintain a positive, solution-oriented tone
5. Keep responses concise but informative
6. If you don't know something specific about the company, acknowledge it and offer to connect them with human support

Remember: You're representing a professional service, so be courteous, accurate, and helpful at all times.`,
      messages,
      temperature: 0.7,
      maxTokens: 500,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
