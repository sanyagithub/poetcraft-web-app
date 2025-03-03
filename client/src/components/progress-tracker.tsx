import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"

interface ProgressTrackerProps {
  completedLessons: number
  totalLessons: number
}

export function ProgressTracker({ completedLessons, totalLessons }: ProgressTrackerProps) {
  const progress = (completedLessons / totalLessons) * 100

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-purple-800 mb-2">Your Progress</h3>
      <Progress value={progress} className="mb-2" />
      <p className="text-sm text-purple-600">
        {completedLessons} of {totalLessons} lessons completed
      </p>
    </Card>
  )
}

