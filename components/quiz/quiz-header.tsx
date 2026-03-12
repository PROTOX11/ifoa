"use client"

import { Plane } from "lucide-react"

interface QuizHeaderProps {
  currentLevel: number
  maxLevel?: number
}

export function QuizHeader({ currentLevel, maxLevel = 10 }: QuizHeaderProps) {
  return (
    <header className="w-full border-b border-border bg-card">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Plane className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              AI Flight Dispatcher Quiz
            </h1>
            <p className="text-sm text-muted-foreground">EASA Training Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Level</span>
          <div className="flex h-8 items-center rounded-full bg-primary/10 px-3">
            <span className="text-sm font-semibold text-primary">
              {currentLevel} / {maxLevel}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
