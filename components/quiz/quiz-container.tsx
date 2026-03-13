"use client"

import { useState, useEffect, useCallback } from "react"
import { QuizHeader } from "./quiz-header"
import { LevelProgress } from "./level-progress"
import { QuestionCard, Question } from "./question-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, RotateCcw, Loader2 } from "lucide-react"

export function QuizContainer() {
  const TOTAL_QUESTIONS = 10

  const [currentLevel, setCurrentLevel] = useState(1)
  const [questionIndex, setQuestionIndex] = useState(0)

  const [question, setQuestion] = useState<Question | null>(null)

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ─────────────────────────────────────
  // Fetch AI-generated question
  // ─────────────────────────────────────
  const fetchQuestion = useCallback(async (level: number) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/generate-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level }),
      })

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }

      const json = await res.json()

      const newQuestion: Question = {
        id: Date.now(),
        question: json.data.question,
        options: json.data.options,
        correctAnswer: json.data.correctAnswer,
        explanation: json.data.explanation ?? "No explanation available",
        category: json.data.category ?? "Aviation",
      }

      setQuestion(newQuestion)
    } catch (err: any) {
      console.error(err)
      setError("Failed to generate question")
    } finally {
      setLoading(false)
    }
  }, [])

  // Load first question
  useEffect(() => {
    fetchQuestion(1)
  }, [fetchQuestion])

  // ─────────────────────────────────────
  // Select answer
  // ─────────────────────────────────────
  const handleSelectAnswer = (index: number) => {
    if (isSubmitted) return
    setSelectedAnswer(index)
  }

  // ─────────────────────────────────────
  // Submit answer
  // ─────────────────────────────────────
  const handleSubmit = () => {
    if (selectedAnswer === null || !question) return

    setIsSubmitted(true)

    if (selectedAnswer === question.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1)
    }
  }

  // ─────────────────────────────────────
  // Next question logic (adaptive)
  // ─────────────────────────────────────
  const handleNextQuestion = () => {
    if (!question) return

    let nextLevel = currentLevel

    if (selectedAnswer === question.correctAnswer) {
      nextLevel = Math.min(currentLevel + 1, TOTAL_QUESTIONS)
    } else {
      nextLevel = Math.max(currentLevel - 1, 1)
    }

    const nextIndex = questionIndex + 1

    if (nextIndex >= TOTAL_QUESTIONS) {
      setIsComplete(true)
      return
    }

    setQuestionIndex(nextIndex)
    setCurrentLevel(nextLevel)

    setSelectedAnswer(null)
    setIsSubmitted(false)

    fetchQuestion(nextLevel)
  }

  // ─────────────────────────────────────
  // Restart quiz
  // ─────────────────────────────────────
  const handleRestart = () => {
    setCurrentLevel(1)
    setQuestionIndex(0)
    setCorrectAnswers(0)

    setSelectedAnswer(null)
    setIsSubmitted(false)

    setIsComplete(false)
    setError(null)

    fetchQuestion(1)
  }

  // ─────────────────────────────────────
  // QUIZ COMPLETE SCREEN
  // ─────────────────────────────────────
  if (isComplete) {
    const percentage = Math.round((correctAnswers / TOTAL_QUESTIONS) * 100)

    return (
      <div className="flex min-h-screen flex-col bg-background">
        <QuizHeader currentLevel={10} />

        <main className="flex flex-1 items-center justify-center p-4">
          <Card className="w-full max-w-lg shadow-lg">
            <CardContent className="flex flex-col items-center p-8 text-center">

              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Trophy className="h-10 w-10 text-primary" />
              </div>

              <h2 className="text-2xl font-bold mb-2">
                Quiz Complete!
              </h2>

              <p className="text-muted-foreground mb-6">
                You answered {correctAnswers} of {TOTAL_QUESTIONS} correctly.
              </p>

              <div className="mb-6 text-4xl font-bold text-primary">
                {percentage}%
              </div>

              <Button onClick={handleRestart} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Restart Quiz
              </Button>

            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  // ─────────────────────────────────────
  // ERROR STATE
  // ─────────────────────────────────────
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => fetchQuestion(currentLevel)}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────
  // LOADING STATE
  // ─────────────────────────────────────
  if (loading || !question) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="animate-spin h-6 w-6" />
          Generating aviation question...
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────
  // MAIN QUIZ UI
  // ─────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col bg-background">

      <QuizHeader currentLevel={currentLevel} />

      <main className="flex flex-1 flex-col items-center px-4 py-8">

        <div className="w-full max-w-2xl space-y-6">

          <LevelProgress currentLevel={currentLevel} />

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Question {questionIndex + 1} / {TOTAL_QUESTIONS}
            </span>

            <span>
              {correctAnswers} correct
            </span>
          </div>

          <QuestionCard
            question={question}
            selectedAnswer={selectedAnswer}
            isSubmitted={isSubmitted}
            onSelectAnswer={handleSelectAnswer}
            onSubmit={handleSubmit}
            onNextQuestion={handleNextQuestion}
          />

        </div>

      </main>
    </div>
  )
}