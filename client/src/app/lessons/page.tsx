"use client"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Muse } from "@/src/components/muse"
import Link from "next/link"
import { useAuth } from "@/src/contexts/auth-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion"

// This would typically come from a database or API
const modules = [
  {
    id: "how-to-scan-a-poem",
    title: "How to Scan a Poem",
    description: "Learn the fundamentals of scanning poetry and identifying meter.",
    lessons: [
      {
        title: "The Importance of Poetic Meter",
        duration: "15 mins",
        description: "Understand why meter is crucial in poetry.",
        id: "lesson1",
      },
      {
        title: "Identifying Stressed Syllables in Poetry",
        duration: "20 mins",
        description: "Learn to recognize stressed syllables in poetic lines.",
        id: "lesson2",
      },
      {
        title: "Understanding Poetic Lines and Meter",
        duration: "18 mins",
        description: "Explore the structure of poetic lines and meter.",
        id: "lesson3",
      },
      {
        title: "Defining and Identifying Poetic Beats",
        duration: "17 mins",
        description: "Understand what constitutes a 'beat' in poetry.",
        id: "lesson4",
      },
      {
        title: "Scansion - Marking Poetic Rhythm",
        duration: "22 mins",
        description: "Learn the process of marking rhythms in poetry.",
        id: "lesson5",
      },
      {
        title: "The Iamb - Basic Unit of English Poetry",
        duration: "16 mins",
        description: "Explore the most common metrical foot in English poetry.",
        id: "lesson6",
      },
      {
        title: "Variations in Meter - Trochees and Spondees",
        duration: "19 mins",
        description: "Discover variations in metrical feet.",
        id: "lesson7",
      },
      {
        title: "Reading Poetry Aloud - Bringing Meter to Life",
        duration: "21 mins",
        description: "Learn techniques for effectively reading metered poetry aloud.",
        id: "lesson8",
      },
      {
        title: "Advanced Scansion Techniques",
        duration: "25 mins",
        description: "Delve deeper into scansion with advanced techniques and analysis.",
        id: "lesson9",
      },
      {
        title: "Meter in Free Verse and Contemporary Poetry",
        duration: "20 mins",
        description: "Explore rhythm and metrical elements in non-traditional poetic forms.",
        id: "lesson10",
      },
      {
        title: "Nuances in Scansion - The Half Wand",
        duration: "18 mins",
        description: "Learn about subtle variations in stress levels and the concept of the half wand.",
        id: "lesson11",
      },
    ],
  },
  // Placeholder for additional modules
  {
    id: "advanced-poetic-forms",
    title: "Advanced Poetic Forms",
    description: "Explore complex poetic structures and their unique metrical patterns.",
    lessons: [
      {
        title: "Introduction to Advanced Poetic Forms",
        duration: "20 mins",
        description: "Overview of complex poetic structures.",
        id: "advanced-lesson1",
      },
      // Add more lessons here
    ],
  },
  // You can add more modules here
]

export default function LessonsPage() {
  const { user } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-purple-800">PoetCraft Modules</h1>
        <Muse variant="writing" className="w-24 h-24" />

        {!user && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
            <p className="font-bold">Note:</p>
            <p>Only the first lesson of each module is available for free. Please log in to access all lessons.</p>
          </div>
        )}

        <Accordion type="single" collapsible className="w-full max-w-4xl">
          {modules.map((module, moduleIndex) => (
            <AccordionItem value={`module-${moduleIndex}`} key={moduleIndex}>
              <AccordionTrigger className="text-xl font-semibold text-purple-800">{module.title}</AccordionTrigger>
              <AccordionContent>
                <p className="text-purple-600 mb-4">{module.description}</p>
                <div className="grid gap-4">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <Card key={lessonIndex} className="p-4 hover:shadow-lg transition-shadow">
                      <h3 className="text-lg font-semibold text-purple-800 mb-2">{lesson.title}</h3>
                      <p className="text-sm text-purple-600 mb-2">Duration: {lesson.duration}</p>
                      <p className="text-purple-600 mb-4">{lesson.description}</p>
                      {user || lessonIndex === 0 ? (
                        <Link href={`/lessons/${module.id}/${lesson.id}`}>
                          <Button className="w-full">Start Lesson</Button>
                        </Link>
                      ) : (
                        <Button className="w-full" disabled>
                          Login to Access
                        </Button>
                      )}
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {!user && (
          <div className="mt-8">
            <Link href="/login">
              <Button variant="outline">Log In to Access All Lessons</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

