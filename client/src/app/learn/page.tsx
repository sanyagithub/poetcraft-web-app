import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export default function LearnPage() {
  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-purple-800 mb-8">Learn the Art of Poetry</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">
              Poetic Meter
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 inline-block ml-2 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The rhythmic structure of a poem, typically measured in syllables and stresses.</p>
                </TooltipContent>
              </Tooltip>
            </h2>
            <p className="text-purple-600 mb-4">
              Explore the rhythmic structure of poetry and learn how to analyze and create various metrical patterns.
            </p>
            <Link href="/lessons/how-to-scan-a-poem">
              <Button>Start Learning</Button>
            </Link>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">
              Poetic Forms
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 inline-block ml-2 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Specific structures and patterns used in poetry, such as sonnets, haikus, or villanelles.</p>
                </TooltipContent>
              </Tooltip>
            </h2>
            <p className="text-purple-600 mb-4">
              Discover different poetic forms, from sonnets to haikus, and learn how to craft your own structured poems.
            </p>
            <Link href="/lessons/advanced-poetic-forms">
              <Button>Explore Forms</Button>
            </Link>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}

