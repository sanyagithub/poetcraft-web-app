"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { Textarea } from "@/src/components/ui/textarea"
import { Card } from "@/src/components/ui/card"

interface QASectionProps {
  question: string
  lessonId: string
}

interface Answer {
  id: string
  content: string
  userId: string // This would typically be the actual user's ID
}

const QASection: React.FC<QASectionProps> = ({ question, lessonId }) => {
  const [answer, setAnswer] = useState("")
  const [answers, setAnswers] = useState<Answer[]>([])

  useEffect(() => {
    // Here you would typically fetch answers from your backend
    // For now, we'll use mock data
    setAnswers([
      { id: "1", content: "This is a sample answer.", userId: "user1" },
      { id: "2", content: "Another sample answer.", userId: "user2" },
    ])
  }, []) // Removed lessonId from dependencies

  const handleSubmit = () => {
    if (answer.trim()) {
      // Here you would typically send the answer to your backend
      const newAnswer: Answer = {
        id: Date.now().toString(),
        content: answer,
        userId: "currentUser", // This would typically be the actual user's ID
      }
      setAnswers([...answers, newAnswer])
      setAnswer("")
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{question}</h2>
      <Textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className="mb-4"
      />
      <Button onClick={handleSubmit}>Submit Answer</Button>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Other Answers:</h3>
        {answers.map((ans) => (
          <div key={ans.id} className="mb-4 p-4 bg-purple-50 rounded">
            <p>{ans.content}</p>
            <p className="text-sm text-purple-600 mt-2">- User {ans.userId}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default QASection

