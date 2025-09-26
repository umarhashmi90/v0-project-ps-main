"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

interface PasswordStrengthProps {
  password: string
  onStrengthChange?: (strength: number) => void
}

export function PasswordStrength({ password, onStrengthChange }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0)
  const [feedback, setFeedback] = useState<string[]>([])

  useEffect(() => {
    const calculateStrength = () => {
      let score = 0
      const newFeedback: string[] = []

      if (password.length === 0) {
        setStrength(0)
        setFeedback([])
        onStrengthChange?.(0)
        return
      }

      // Length check
      if (password.length >= 8) {
        score += 20
      } else {
        newFeedback.push("At least 8 characters")
      }

      // Uppercase check
      if (/[A-Z]/.test(password)) {
        score += 20
      } else {
        newFeedback.push("One uppercase letter")
      }

      // Lowercase check
      if (/[a-z]/.test(password)) {
        score += 20
      } else {
        newFeedback.push("One lowercase letter")
      }

      // Number check
      if (/\d/.test(password)) {
        score += 20
      } else {
        newFeedback.push("One number")
      }

      // Special character check
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        score += 20
      } else {
        newFeedback.push("One special character")
      }

      setStrength(score)
      setFeedback(newFeedback)
      onStrengthChange?.(score)
    }

    calculateStrength()
  }, [password, onStrengthChange])

  const getStrengthText = () => {
    if (strength === 0) return ""
    if (strength <= 40) return "Weak"
    if (strength <= 60) return "Fair"
    if (strength <= 80) return "Good"
    return "Strong"
  }

  const getStrengthColor = () => {
    if (strength <= 40) return "bg-red-500"
    if (strength <= 60) return "bg-yellow-500"
    if (strength <= 80) return "bg-blue-500"
    return "bg-green-500"
  }

  if (password.length === 0) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Password strength</span>
        <span
          className={`text-sm font-medium ${
            strength <= 40
              ? "text-red-500"
              : strength <= 60
                ? "text-yellow-500"
                : strength <= 80
                  ? "text-blue-500"
                  : "text-green-500"
          }`}
        >
          {getStrengthText()}
        </span>
      </div>
      <Progress value={strength} className="h-2" />
      {feedback.length > 0 && <div className="text-xs text-muted-foreground">Missing: {feedback.join(", ")}</div>}
    </div>
  )
}
