"use client"

import type React from "react"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface GoalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  habitId: string
  currentGoal: number
  onUpdateGoal: (habitId: string, goal: number) => void
}

export function GoalDialog({ open, onOpenChange, habitId, currentGoal, onUpdateGoal }: GoalDialogProps) {
  const [goal, setGoal] = useState<number>(currentGoal)

  useEffect(() => {
    setGoal(currentGoal)
  }, [currentGoal, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateGoal(habitId, goal)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Set Goal</DialogTitle>
            <DialogDescription>Set a target streak goal for this habit.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="goal">Goal (days)</Label>
              <Input
                id="goal"
                type="number"
                min="0"
                value={goal}
                onChange={(e) => setGoal(Number.parseInt(e.target.value) || 0)}
                placeholder="Set a target streak"
              />
              <p className="text-xs text-muted-foreground">Set to 0 to remove the goal</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Goal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
