"use client"

interface LevelProgressProps {
  currentLevel: number
  maxLevel?: number
}

export function LevelProgress({ currentLevel, maxLevel = 10 }: LevelProgressProps) {
  const progress = (currentLevel / maxLevel) * 100

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Progress</span>
        <span className="text-sm text-muted-foreground">
          Level {currentLevel} of {maxLevel}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between">
        {Array.from({ length: maxLevel }, (_, i) => (
          <div
            key={i}
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-colors ${
              i + 1 <= currentLevel
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
