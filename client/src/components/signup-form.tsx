"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [experience, setExperience] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, age, experience }),
      })

      if (response.ok) {
        router.push("/login")
      } else {
        const data = await response.json()
        setError(data.message || "An error occurred during signup.")
      }
    } catch (err) {
      setError("An error occurred during signup.")
    }
  }

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">Sign Up for PoetCraft</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div>
          <Select onValueChange={setExperience} required>
            <SelectTrigger>
              <SelectValue placeholder="Poetry Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </Card>
  )
}

