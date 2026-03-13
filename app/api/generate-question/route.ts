import OpenAI from "openai"
import { NextResponse } from "next/server"

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
})

export async function POST(req: Request) {

    const { level } = await req.json()

    const prompt = `
Generate ONE UNIQUE aviation multiple-choice question for EASA Flight Dispatcher training.

Topic: Navigation or Meteorology
Difficulty level: ${level}/10

IMPORTANT:
- Do NOT repeat previous questions
- Use a different aviation concept each time
- Only one correct answer

Return STRICT JSON ONLY:

{
 "question": "string",
 "options": ["option1","option2","option3","option4"],
 "correctAnswer": 0,
 "explanation": "short explanation",
 "category": "Navigation or Meteorology"
}
`

    try {

        const completion = await client.chat.completions.create({
            model: "openrouter/free",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
        })
        console.log(completion)
        const text = completion.choices[0].message.content || ""

        const clean = text.replace(/```json|```/g, "").trim()

        const parsed = JSON.parse(clean)

        return NextResponse.json({ data: parsed })

    } catch (err) {

        console.error("OpenRouter error:", err)

        return NextResponse.json({
            data: {
                question: "What effect does a headwind have on aircraft ground speed?",
                options: [
                    "Increase ground speed",
                    "Decrease ground speed",
                    "No effect",
                    "Change aircraft altitude"
                ],
                correctAnswer: 1,
                explanation: "Headwinds oppose aircraft motion and reduce ground speed.",
                category: "Navigation"
            }
        })
    }
}