'use client'

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { Card } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Muse } from "@/src/components/muse"
import { Button } from "@/src/components/ui/button"
import { Progress } from "@/src/components/ui/progress"
import QASection from "@/src/components/qa-section"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/contexts/auth-context"

// This would typically come from a database or API
const modules = [
  {
    id: "how-to-scan-a-poem",
    title: "How to Scan a Poem",
    lessons: [
      { id: "lesson1", title: "The Importance of Poetic Meter" },
      { id: "lesson2", title: "Identifying Stressed Syllables in Poetry" },
      { id: "lesson3", title: "Understanding Poetic Lines and Meter" },
      { id: "lesson4", title: "Defining and Identifying Poetic Beats" },
      { id: "lesson5", title: "Scansion - Marking Poetic Rhythm" },
      { id: "lesson6", title: "The Iamb - Basic Unit of English Poetry" },
      { id: "lesson7", title: "Variations in Meter - Trochees and Spondees" },
      { id: "lesson8", title: "Reading Poetry Aloud - Bringing Meter to Life" },
      { id: "lesson9", title: "Advanced Scansion Techniques" },
      { id: "lesson10", title: "Meter in Free Verse and Contemporary Poetry" },
      { id: "lesson11", title: "Nuances in Scansion - The Half Wand" },
    ],
  },
  {
    id: "advanced-poetic-forms",
    title: "Advanced Poetic Forms",
    lessons: [
      { id: "advanced-lesson1", title: "Introduction to Advanced Poetic Forms" },
      // Add more lessons here
    ],
  },
  // You can add more modules here
]

const questions = [
  "What is a poem to you?",
  "How many heartbeats do you feel each time you breathe in or out ?",
  "What do you think are beats?",
  "What is the next syllable that gets a beat?",
  "What symbols do we use to mark the stronger syllables?",
  "Write down the syllables with the strong accents below..",
  "How are these syllables you marked different from the other syllables?",
  "What are the 3 things that make stressed syllables different from the unstressed syllables?",
  "What are the syllables that get a cup? ",
  "Where will we mark the next edge?",
  "What was the final pattern in the poem?",
]

export default function LessonPage({ params }: { params: { moduleId: string; lessonId: string } }) {
  const [lessonContent, setLessonContent] = useState<string>("")
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const router = useRouter()
  const { user } = useAuth()

  const currentModule = modules.find((module) => module.id === params.moduleId)
  const currentLesson = currentModule?.lessons.find((lesson) => lesson.id === params.lessonId)
  const currentModuleIndex = modules.findIndex((module) => module.id === params.moduleId)
  const currentLessonIndex = currentModule?.lessons.findIndex((lesson) => lesson.id === params.lessonId) ?? -1

  const previousLesson = currentLessonIndex > 0 ? currentModule?.lessons[currentLessonIndex - 1] : null
  const nextLesson =
      currentLessonIndex < (currentModule?.lessons.length ?? 0) - 1
          ? currentModule?.lessons[currentLessonIndex + 1]
          : null

  useEffect(() => {
    if (!user && currentLessonIndex > 0) {
      router.push("/login")
      return
    }

    const fetchLessonContent = async () => {
      if (currentModule && currentLesson) {
        try {
          const response = await fetch(`/api/lessonContent?moduleId=${params.moduleId}&lessonId=${params.lessonId}`)
          if (response.ok) {
            const data = await response.json()
            console.log(data.content);
            setLessonContent(data.content)
          } else {
            throw new Error('Failed to fetch lesson content')
          }
        } catch (error) {
          console.error("Failed to fetch lesson content:", error)
          setLessonContent("We're having trouble loading this lesson. Please try again later or contact support if the problem persists.")
        }
      }
    }
    fetchLessonContent()
  }, [params.moduleId, params.lessonId, currentModule, currentLesson, user, currentLessonIndex, router])

  const handleMarkAsCompleted = () => {
    setIsCompleted(true)
    setProgress(100)
    // Here you would typically send a request to your backend to mark the lesson as completed
  }

  if (!currentModule || !currentLesson) {
    return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-4">Lesson Not Found</h1>
          <p className="text-purple-600 mb-4">Sorry, we couldn't find the lesson you're looking for.</p>
          <Button onClick={() => router.push("/lessons")}>Return to Lessons</Button>
        </div>
    )
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-purple-800">{currentModule.title}</h1>
            <h2 className="text-2xl font-semibold text-purple-700 mt-2">{currentLesson.title}</h2>
          </div>
          <Muse variant="writing" className="w-24 h-24" />
        </div>

        <div className="mb-6">
          <Progress value={progress} className="w-full" />
        </div>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Lesson Content</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="qa">Q&A</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="mt-4">
            <Card className="p-6">
              <div className="prose prose-purple max-w-none">
                <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
                      p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
                      li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                      code: ({ node, inline, ...props }) =>
                          inline ? (
                              <code className="bg-purple-100 text-purple-800 px-1 rounded" {...props} />
                          ) : (
                              <code className="block bg-purple-100 text-purple-800 p-2 rounded mb-4" {...props} />
                          ),
                    }}
                >
                  {lessonContent}
                </ReactMarkdown>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="video" className="mt-4">
            <Card className="aspect-video bg-purple-900 flex items-center justify-center text-white">
              Video Player Placeholder
            </Card>
          </TabsContent>
          <TabsContent value="qa" className="mt-4">
            <QASection question={questions[currentLessonIndex]} lessonId={params.lessonId} />
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-between items-center">
          {previousLesson ? (
              <Link href={`/lessons/${params.moduleId}/${previousLesson.id}`}>
                <Button variant="outline" className="flex items-center">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous Lesson
                </Button>
              </Link>
          ) : (
              <div></div> // Empty div to maintain layout when there's no previous lesson
          )}

          <Button onClick={handleMarkAsCompleted} disabled={isCompleted}>
            {isCompleted ? "Completed" : "Mark as Completed"}
          </Button>

          {nextLesson ? (
              <Link href={`/lessons/${params.moduleId}/${nextLesson.id}`}>
                <Button variant="outline" className="flex items-center">
                  Next Lesson <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
          ) : (
              <div></div> // Empty div to maintain layout when there's no next lesson
          )}
        </div>
      </div>
  )
}
