"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | null
  isSubmitted: boolean
  onSelectAnswer: (index: number) => void
  onSubmit: () => void
  onNextQuestion: () => void
}

export function QuestionCard({
  question,
  selectedAnswer,
  isSubmitted,
  onSelectAnswer,
  onSubmit,
  onNextQuestion,
}: QuestionCardProps) {
  const isCorrect = selectedAnswer === question.correctAnswer

  return (
    <Card className="w-full border-border bg-card shadow-lg">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {question.category}
          </span>
        </div>
        <h2 className="text-xl font-semibold leading-relaxed text-foreground">
          {question.question}
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrectOption = index === question.correctAnswer
            
            let optionStyle = "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
            
            if (isSubmitted) {
              if (isCorrectOption) {
                optionStyle = "border-success bg-success/10 text-foreground"
              } else if (isSelected && !isCorrectOption) {
                optionStyle = "border-destructive bg-destructive/10 text-foreground"
              } else {
                optionStyle = "border-border bg-card opacity-50"
              }
            } else if (isSelected) {
              optionStyle = "border-primary bg-primary/10"
            }

            return (
              <button
                key={index}
                onClick={() => !isSubmitted && onSelectAnswer(index)}
                disabled={isSubmitted}
                className={cn(
                  "flex w-full items-center gap-4 rounded-lg border-2 p-4 text-left transition-all",
                  optionStyle,
                  !isSubmitted && "cursor-pointer"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold",
                    isSubmitted && isCorrectOption
                      ? "border-success bg-success text-success-foreground"
                      : isSubmitted && isSelected && !isCorrectOption
                        ? "border-destructive bg-destructive text-destructive-foreground"
                        : isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1 text-foreground">{option}</span>
                {isSubmitted && isCorrectOption && (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                )}
                {isSubmitted && isSelected && !isCorrectOption && (
                  <XCircle className="h-5 w-5 text-destructive" />
                )}
              </button>
            )
          })}
        </div>

        {isSubmitted && (
          <div
            className={cn(
              "mt-6 rounded-lg p-4",
              isCorrect ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"
            )}
          >
            <div className="mb-2 flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="font-semibold text-success">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-destructive" />
                  <span className="font-semibold text-destructive">Incorrect</span>
                </>
              )}
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <HelpCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{question.explanation}</p>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          {!isSubmitted ? (
            <Button
              onClick={onSubmit}
              disabled={selectedAnswer === null}
              className="min-w-32"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={onNextQuestion} className="min-w-32">
              Next Question
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
