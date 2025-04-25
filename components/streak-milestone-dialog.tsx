"use client"

import { useEffect, useState } from "react"
import { Award, Flame, PartyPopper, Trophy } from "lucide-react"
import confetti from "canvas-confetti"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button
} from "@/components/ui"
import type { Habit } from "@/lib/types"

interface StreakMilestoneDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  habit: Habit
}

export function StreakMilestoneDialog({ open, onOpenChange, habit }: StreakMilestoneDialogProps) {
  const [animationPlayed, setAnimationPlayed] = useState(false)

  // Get milestone message based on streak
  const getMilestoneMessage = () => {
    if (habit.streak >= 365) return "One Year Streak! Legendary!"
    if (habit.streak >= 180) return "180 Day Streak! Phenomenal!"
    if (habit.streak >= 100) return "100 Day Streak! Incredible!"
    if (habit.streak >= 60) return "60 Day Streak! Amazing!"
    if (habit.streak >= 30) return "30 Day Streak! Fantastic!"
    if (habit.streak >= 21) return "21 Day Streak! Habit Formed!"
    if (habit.streak >= 14) return "14 Day Streak! Impressive!"
    if (habit.streak >= 7) return "7 Day Streak! Great Start!"
    return "New Milestone Reached!"
  }

  // Get milestone icon based on streak
  const getMilestoneIcon = () => {
    if (habit.streak >= 100) return Trophy
    if (habit.streak >= 30) return Award
    if (habit.streak >= 7) return Flame
    return PartyPopper
  }

  const MilestoneIcon = getMilestoneIcon()

  // Play confetti animation when dialog opens
  useEffect(() => {
    if (open && !animationPlayed) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          clearInterval(interval)
          setAnimationPlayed(true)
          return
        }

        confetti({
          particleCount: 3,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { y: 0.6 },
          colors: [
            "#f44336",
            "#e91e63",
            "#9c27b0",
            "#673ab7",
            "#3f51b5",
            "#2196f3",
            "#03a9f4",
            "#00bcd4",
            "#009688",
            "#4CAF50",
            "#8BC34A",
            "#CDDC39",
            "#FFEB3B",
            "#FFC107",
            "#FF9800",
            "#FF5722",
          ],
        })
      }, 150)

      return () => clearInterval(interval)
    }
  }, [open, animationPlayed])

  // Reset animation state when dialog closes
  useEffect(() => {
    if (!open) {
      setAnimationPlayed(false)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] text-center">
        <DialogHeader className="space-y-4">
          <div className="mx-auto bg-primary/10 p-4 rounded-full">
            <MilestoneIcon className="h-12 w-12 text-primary" />
          </div>
          <DialogTitle className="text-2xl">Congratulations!</DialogTitle>
          <DialogDescription className="text-lg font-medium">{getMilestoneMessage()}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="mb-4">
            You've maintained your <span className="font-bold">{habit.name}</span> habit for {habit.streak} consecutive
            days!
          </p>

          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">
              {habit.streak >= 21
                ? "You've officially formed a habit! It takes about 21 days to form a new habit, and you've done it!"
                : "Keep going! It takes about 21 days to form a new habit."}
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button className="w-full" onClick={() => onOpenChange(false)}>
            Keep Going!
          </Button>
          <p className="text-xs text-muted-foreground">This achievement has been added to your collection.</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
