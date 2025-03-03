"use client"

import { useAuth } from "@/src/contexts/auth-context"
import { Card } from "@/src/components/ui/card"
import { ProgressTracker } from "@/src/components/progress-tracker"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"

export default function ProfilePage() {
  const { user } = useAuth()

  // This would typically come from a database or API
  const completedLessons = 3
  const totalLessons = 11

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">Please log in to view your profile</h1>
        <Link href="/login">
          <Button>Log In</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-purple-800 mb-8">Your Profile</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">User Information</h2>
          <p className="text-purple-600 mb-2">Email: {user.email}</p>
          {/* Add more user information here */}
        </Card>
        <ProgressTracker completedLessons={completedLessons} totalLessons={totalLessons} />
      </div>
      <div className="mt-8">
        <Link href="/learn">
          <Button>Continue Learning</Button>
        </Link>
      </div>
    </div>
  )
}

