import { Card } from "@/src/components/ui/card"
import Link from "next/link"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-purple-800 mb-8">Poetry Resources</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Glossary</h2>
          <p className="text-purple-600 mb-4">A comprehensive list of poetic terms and definitions.</p>
          <Link href="/resources/glossary" className="text-purple-600 hover:underline">
            Explore Glossary
          </Link>
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Recommended Reading</h2>
          <p className="text-purple-600 mb-4">Curated list of poetry collections and books on poetic craft.</p>
          <Link href="/resources/reading-list" className="text-purple-600 hover:underline">
            View Reading List
          </Link>
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Poetry Tools</h2>
          <p className="text-purple-600 mb-4">
            Useful tools for poets, including rhyme dictionaries and meter analyzers.
          </p>
          <Link href="/resources/tools" className="text-purple-600 hover:underline">
            Access Tools
          </Link>
        </Card>
      </div>
    </div>
  )
}

