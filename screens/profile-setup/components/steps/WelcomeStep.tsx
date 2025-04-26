"use client"

import { CalendarCheck2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WelcomeStepProps {
  onNext: () => void
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-6 py-8">
      <div className="bg-primary/10 p-4 rounded-full">
        <CalendarCheck2 className="h-16 w-16 text-primary" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome to HabitTrack</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Let's set up your profile to personalize your habit tracking experience.
          This will only take a few minutes.
        </p>
      </div>

      <div className="space-y-4 max-w-md mx-auto w-full">
        <div className="bg-card border rounded-lg p-4 text-left">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full">
              <span className="text-primary font-bold">1</span>
            </div>
            <div>
              <h3 className="font-medium">Create your avatar</h3>
              <p className="text-sm text-muted-foreground">
                Design a character that represents you in the app
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-4 text-left">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full">
              <span className="text-primary font-bold">2</span>
            </div>
            <div>
              <h3 className="font-medium">Set up your profile</h3>
              <p className="text-sm text-muted-foreground">
                Tell us a bit about yourself
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-4 text-left">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full">
              <span className="text-primary font-bold">3</span>
            </div>
            <div>
              <h3 className="font-medium">Choose your preferences</h3>
              <p className="text-sm text-muted-foreground">
                Select your focus areas and habit categories
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={onNext} size="lg" className="mt-8 gap-2">
        Get Started
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
