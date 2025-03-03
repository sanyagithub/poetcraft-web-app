import Link from "next/link"
import { LoginForm } from "@/src/components/login-form"
import { Button } from "@/src/components/ui/button"

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">Log In to PoetCraft</h1>
      <LoginForm />
      <div className="mt-4 text-center">
        <p className="text-purple-600 mb-2">Don't have an account?</p>
        <Link href="/signup">
          <Button variant="outline">Sign Up</Button>
        </Link>
      </div>
    </div>
  )
}

