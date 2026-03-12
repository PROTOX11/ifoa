"use client"

import { useState, useCallback } from "react"
import { QuizHeader } from "./quiz-header"
import { LevelProgress } from "./level-progress"
import { QuestionCard, Question } from "./question-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, RotateCcw } from "lucide-react"

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the primary purpose of a SIGMET (Significant Meteorological Information)?",
    options: [
      "To provide routine weather forecasts for airports",
      "To warn aircraft of potentially hazardous weather phenomena",
      "To report actual weather conditions at airports",
      "To provide wind and temperature data for flight planning"
    ],
    correctAnswer: 1,
    explanation: "A SIGMET is issued to advise aircraft of significant meteorological phenomena that may affect the safety of all aircraft, such as severe turbulence, icing, thunderstorms, volcanic ash, and sandstorms.",
    category: "Meteorology"
  },
  {
    id: 2,
    question: "In aviation navigation, what does VOR stand for?",
    options: [
      "Variable Omni Range",
      "VHF Omnidirectional Range",
      "Visual Orientation Reference",
      "Vertical Obstacle Radar"
    ],
    correctAnswer: 1,
    explanation: "VOR stands for VHF Omnidirectional Range, a type of short-range radio navigation system that allows aircraft with receiving units to determine their position and stay on course by receiving radio signals transmitted by a network of fixed ground stations.",
    category: "Navigation"
  },
  {
    id: 3,
    question: "What is the standard atmospheric pressure at mean sea level according to ICAO?",
    options: [
      "1023.25 hPa",
      "1013.25 hPa",
      "1003.25 hPa",
      "1033.25 hPa"
    ],
    correctAnswer: 1,
    explanation: "The ICAO International Standard Atmosphere (ISA) defines standard atmospheric pressure at mean sea level as 1013.25 hPa (hectopascals) or 29.92 inches of mercury.",
    category: "Meteorology"
  },
  {
    id: 4,
    question: "What is the purpose of an ETOPS (Extended-range Twin-engine Operational Performance Standards) approval?",
    options: [
      "To allow single-engine aircraft to fly over water",
      "To permit twin-engine aircraft to operate on routes beyond normal diversion limits",
      "To certify aircraft for high-altitude operations",
      "To approve new engine types for commercial use"
    ],
    correctAnswer: 1,
    explanation: "ETOPS approval allows twin-engine aircraft to fly routes that are more than 60 minutes flying time from the nearest adequate airport, enabling them to operate efficiently over oceanic and remote areas.",
    category: "Flight Planning"
  },
  {
    id: 5,
    question: "What does the term 'Cumulonimbus' (CB) indicate to a flight dispatcher?",
    options: [
      "Fair weather conditions with light winds",
      "Low visibility due to fog",
      "Potential severe weather including thunderstorms",
      "Stable atmospheric conditions"
    ],
    correctAnswer: 2,
    explanation: "Cumulonimbus clouds are associated with severe weather phenomena including thunderstorms, heavy precipitation, lightning, strong winds, and turbulence. Flight dispatchers must route aircraft around these clouds for safety.",
    category: "Meteorology"
  },
  {
    id: 6,
    question: "What is the minimum fuel reserve requirement for domestic IFR flights under EASA regulations?",
    options: [
      "30 minutes at normal cruise consumption",
      "45 minutes at normal cruise consumption",
      "60 minutes at normal cruise consumption",
      "90 minutes at normal cruise consumption"
    ],
    correctAnswer: 1,
    explanation: "EASA regulations require a minimum final reserve fuel of 45 minutes at normal cruise consumption for domestic IFR flights, ensuring aircraft have sufficient fuel to handle delays and diversions safely.",
    category: "Flight Planning"
  },
  {
    id: 7,
    question: "In GNSS navigation, what does RAIM stand for?",
    options: [
      "Radio Altitude Integrity Monitor",
      "Receiver Autonomous Integrity Monitoring",
      "Remote Aircraft Information Module",
      "Range Accuracy Improvement Method"
    ],
    correctAnswer: 1,
    explanation: "RAIM (Receiver Autonomous Integrity Monitoring) is a GPS technology that allows the receiver to verify the integrity of navigation signals by using redundant signals from additional satellites to detect faulty signals.",
    category: "Navigation"
  },
  {
    id: 8,
    question: "What information is provided in a TAF (Terminal Aerodrome Forecast)?",
    options: [
      "Current weather conditions at an airport",
      "Expected weather conditions at an airport for a specified period",
      "Pilot weather reports along a route",
      "Significant weather phenomena affecting en-route flight"
    ],
    correctAnswer: 1,
    explanation: "A TAF provides a forecast of weather conditions expected at an airport over a specified period, typically 24 to 30 hours. It includes information on wind, visibility, weather phenomena, and cloud cover.",
    category: "Meteorology"
  },
  {
    id: 9,
    question: "What is the primary function of an FMS (Flight Management System)?",
    options: [
      "To control the aircraft's engines",
      "To manage fuel distribution",
      "To compute and manage the flight path and navigation",
      "To handle communication with air traffic control"
    ],
    correctAnswer: 2,
    explanation: "The FMS is an integrated system that computes and manages the aircraft's flight path, optimizing route navigation, fuel efficiency, and providing guidance to the autopilot and flight director systems.",
    category: "Navigation"
  },
  {
    id: 10,
    question: "What does MEL stand for in aviation operations?",
    options: [
      "Maximum Engine Load",
      "Minimum Equipment List",
      "Maintenance Engineering Log",
      "Multiple Engine Limitation"
    ],
    correctAnswer: 1,
    explanation: "MEL stands for Minimum Equipment List, which specifies the equipment that must be operational for a particular aircraft type to be dispatched. It allows aircraft to fly with certain items inoperative under specific conditions.",
    category: "Flight Planning"
  }
]

export function QuizContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const currentQuestion = sampleQuestions[currentQuestionIndex]

  const handleSelectAnswer = useCallback((index: number) => {
    setSelectedAnswer(index)
  }, [])

  const handleSubmit = useCallback(() => {
    if (selectedAnswer === null) return
    setIsSubmitted(true)
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectAnswers(prev => prev + 1)
    }
  }, [selectedAnswer, currentQuestion.correctAnswer])

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setIsSubmitted(false)
      // Update level based on progress
      const newLevel = Math.floor(((currentQuestionIndex + 1) / sampleQuestions.length) * 10) + 1
      setCurrentLevel(Math.min(newLevel, 10))
    } else {
      setIsComplete(true)
    }
  }, [currentQuestionIndex])

  const handleRestart = useCallback(() => {
    setCurrentQuestionIndex(0)
    setCurrentLevel(1)
    setSelectedAnswer(null)
    setIsSubmitted(false)
    setCorrectAnswers(0)
    setIsComplete(false)
  }, [])

  if (isComplete) {
    const percentage = Math.round((correctAnswers / sampleQuestions.length) * 100)
    
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <QuizHeader currentLevel={10} />
        <main className="flex flex-1 items-center justify-center p-4">
          <Card className="w-full max-w-lg border-border bg-card shadow-lg">
            <CardContent className="flex flex-col items-center p-8 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Trophy className="h-10 w-10 text-primary" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Quiz Complete!</h2>
              <p className="mb-6 text-muted-foreground">
                You&apos;ve completed all questions in this session.
              </p>
              <div className="mb-6 rounded-lg bg-secondary p-6">
                <div className="text-4xl font-bold text-primary">{percentage}%</div>
                <p className="text-sm text-muted-foreground">
                  {correctAnswers} of {sampleQuestions.length} correct
                </p>
              </div>
              <Button onClick={handleRestart} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Start New Quiz
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <QuizHeader currentLevel={currentLevel} />
      <main className="flex flex-1 flex-col items-center px-4 py-8">
        <div className="w-full max-w-2xl space-y-6">
          <LevelProgress currentLevel={currentLevel} />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestionIndex + 1} of {sampleQuestions.length}</span>
            <span>{correctAnswers} correct so far</span>
          </div>
          <QuestionCard
            question={currentQuestion}
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
