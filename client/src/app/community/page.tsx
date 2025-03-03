import { Card } from "@/src/components/ui/card"

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-purple-800 mb-8">PoetCraft Community</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Discussion Forums</h2>
          <p className="text-purple-600">
            Connect with fellow poets, share your work, and engage in discussions about poetry.
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Writing Prompts</h2>
          <p className="text-purple-600">Get inspired with daily writing prompts and challenges from the community.</p>
        </Card>
      </div>
    </div>
  )
}

