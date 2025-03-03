import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import Link from "next/link"
import { Muse } from "@/src/components/muse"
import { ArrowRight, BookOpen, Users, Pen } from "lucide-react"

export default function Home() {
  return (
      <div className="relative">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-screen overflow-hidden">
          <video
              className="absolute top-0 left-0 min-w-full min-h-full object-cover opacity-20 animate-zoom-in"
              autoPlay
              loop
              muted
              playsInline
          >
            <source src="/videos/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-12">
            <section className="text-center mb-16">
              <h1 className="text-4xl font-bold text-purple-800 mb-4">Make Your Poems Memorable</h1>
              <p className="text-xl text-purple-600 mb-8">
                Explore the art of poetry with expert guidance from Annie Finch
              </p>
              <div className="flex justify-center mb-8">
                <Muse variant="welcome" className="w-48 h-48" />
              </div>
              <Link href="/getting-started">
                <Button size="lg" className="mb-4">
                  New to PoetCraft? Start Here <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-purple-800 mb-8 text-center">How It Works</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6 hover:shadow-lg transition-shadow bg-white bg-opacity-80">
                  <BookOpen className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-2xl font-semibold text-purple-800 mb-2">1. Learn</h3>
                  <p className="text-purple-600 mb-4">Dive into comprehensive lessons on poetic meter.</p>
                  <Link href="/lessons">
                    <Button className="w-full">
                      Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow bg-white bg-opacity-80">
                  <Pen className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-2xl font-semibold text-purple-800 mb-2">2. Practice</h3>
                  <p className="text-purple-600 mb-4">Hone your skills with interactive exercises and challenges.</p>
                  <Link href="/practice">
                    <Button className="w-full" variant="secondary">
                      Practice Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </Card>

                {/*<Card className="p-6 hover:shadow-lg transition-shadow bg-white bg-opacity-80">*/}
                {/*  <Users className="w-12 h-12 text-purple-600 mb-4" />*/}
                {/*  <h3 className="text-2xl font-semibold text-purple-800 mb-2">3. Connect</h3>*/}
                {/*  <p className="text-purple-600 mb-4">Join the community to share your work and get feedback.</p>*/}
                {/*  <Link href="/community">*/}
                {/*    <Button className="w-full" variant="outline">*/}
                {/*      Join Community <ArrowRight className="ml-2 h-4 w-4" />*/}
                {/*    </Button>*/}
                {/*  </Link>*/}
                {/*</Card>*/}
              </div>
            </section>

            <section className="text-center mb-16">
              {/*<h2 className="text-3xl font-bold text-purple-800 mb-4">Featured Poem</h2>*/}
              <Card className="p-6 max-w-2xl mx-auto bg-white bg-opacity-80">
                <h3 className="text-xl font-semibold text-purple-700 mb-2">Sonnet 18</h3>
                <p className="text-purple-600 mb-4">by William Shakespeare</p>
                <p className="text-purple-800 italic">
                  Shall I compare thee to a summer's day?
                  <br />
                  Thou art more lovely and more temperate:
                  <br />
                  Rough winds do shake the darling buds of May,
                  <br />
                  And summer's lease hath all too short a date...
                </p>
              </Card>
            </section>

            <section className="text-center">
              <h2 className="text-3xl font-bold text-purple-800 mb-4">Ready to Start Your Poetic Journey?</h2>
              <p className="text-xl text-purple-600 mb-8">Join PoetCraft today and unlock your creative potential.</p>
              <Link href="/signup">
                <Button size="lg">Sign Up Now</Button>
              </Link>
            </section>
          </div>
        </div>
      </div>
  )
}

