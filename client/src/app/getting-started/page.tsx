import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import Link from "next/link"
import { Muse } from "@/src/components/muse"
import { BookOpen, Pen, Users, ArrowRight } from "lucide-react"

export default function GettingStartedPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">Getting Started with PoetCraft</h1>
      <div className="flex justify-center mb-12">
        <Muse variant="welcome" className="w-32 h-32" />
      </div>

      <div className="max-w-3xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Welcome to Your Poetic Journey</h2>
          <p className="text-purple-600 mb-4">
            PoetCraft is your gateway to mastering the art of poetry. Whether you're a beginner or looking to refine
            your skills, we're here to guide you every step of the way.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Your Path to Poetic Mastery</h2>
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start">
                <BookOpen className="w-8 h-8 text-purple-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">1. Learn</h3>
                  <p className="text-purple-600 mb-2">
                    Start with our comprehensive lessons on poetic meter, form, and technique. Each lesson is crafted to
                    build your understanding step by step.
                  </p>
                  <Link href="/learn">
                    <Button variant="link" className="p-0">
                      Explore Lessons <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start">
                <Pen className="w-8 h-8 text-purple-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">2. Practice</h3>
                  <p className="text-purple-600 mb-2">
                    Reinforce your learning with interactive exercises. Practice scansion, experiment with different
                    poetic forms, and challenge yourself with writing prompts.
                  </p>
                  <Link href="/practice/scansion">
                    <Button variant="link" className="p-0">
                      Try Exercises <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start">
                <Users className="w-8 h-8 text-purple-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">3. Connect</h3>
                  <p className="text-purple-600 mb-2">
                    Join our vibrant community of poets. Share your work, participate in discussions, and get
                    constructive feedback from fellow poetry enthusiasts.
                  </p>
                  <Link href="/community">
                    <Button variant="link" className="p-0">
                      Join Community <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Ready to Begin?</h2>
          <p className="text-purple-600 mb-6">
            Start your journey by creating an account or diving into our first lesson.
          </p>
          <div className="space-x-4">
            <Link href="/signup">
              <Button size="lg">Create Account</Button>
            </Link>
            <Link href="/lessons/how-to-scan-a-poem/lesson1">
              <Button size="lg" variant="outline">
                Start First Lesson
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

