"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Card } from "@/src/components/ui/card"
import { Muse } from "@/src/components/muse"

interface ScansionExerciseProps {
  line: string
  correctScansion: string
}

const ScansionExercise: React.FC<ScansionExerciseProps> = ({ line, correctScansion }) => {
  const [userInput, setUserInput] = useState("")
  const [feedback, setFeedback] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [museState, setMuseState] = useState<"writing" | "awesome" | "sad">("writing")

  const checkAnswer = () => {
    if (userInput.toLowerCase() === correctScansion.toLowerCase()) {
      setFeedback("Correct! Great job!")
      setMuseState("awesome")
    } else {
      setFeedback("Not quite. Try again!")
      setMuseState("sad")
    }
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-purple-800">Scansion Exercise</h3>
          <p className="text-purple-600">Mark the stressed (/) and unstressed (u) syllables:</p>
        </div>
        <Muse variant={museState} className="w-20 h-20" />
      </div>
      <p className="text-xl font-serif text-purple-900">{line}</p>
      <Input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter scansion (e.g., u/u/u/u/u/)"
        className="font-mono"
      />
      <div className="space-x-2">
        <Button onClick={checkAnswer}>Check Answer</Button>
        <Button variant="outline" onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? "Hide" : "Show"} Answer
        </Button>
      </div>
      {feedback && <p className="text-purple-700 font-semibold">{feedback}</p>}
      {showAnswer && (
        <div className="pt-4 border-t border-purple-200">
          <p className="font-mono text-purple-800">Correct scansion: {correctScansion}</p>
        </div>
      )}
    </Card>
  )
}

export default ScansionExercise

