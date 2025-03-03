import Link from "next/link"
import { SignupForm } from "@/src/components/signup-form"
import { Button } from "@/src/components/ui/button"

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">Sign Up for PoetCraft</h1>
      <SignupForm />
      <div className="mt-4 text-center">
        <p className="text-purple-600 mb-2">Already have an account?</p>
        <Link href="/login">
          <Button variant="outline">Log In</Button>
        </Link>
      </div>
    </div>
  )
}

