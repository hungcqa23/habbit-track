"use client"

import { Check, Trash2, Archive, Target, Award, Shield, Flame } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { GoalDialog } from "@/components/goal-dialog"
import type { Habit } from "@/lib/types"
import { StreakBadge } from "@/components/streak-badge"
import { StreakMilestoneDialog } from "@/components/streak-milestone-dialog"

interface HabitListProps {
  habits: Habit[]
  onToggleCompletion: (id: string) => void
  onDelete: (id: string) => void
  onArchive: (id: string) => void
  onUpdateGoal: (id: string, goal: number) => void
  onUseStreakFreeze: (id: string) => void
}

export function HabitList({
  habits,
  onToggleCompletion,
  onDelete,
  onArchive,
  onUpdateGoal,
  onUseStreakFreeze,
}: HabitListProps) {
  const today = new Date().toISOString().split("T")[0]
  const [goalDialogOpen, setGoalDialogOpen] = useState(false)
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null)
  const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false)
  const [milestoneHabit, setMilestoneHabit] = useState<Habit | null>(null)

  const openGoalDialog = (habitId: string) => {
    setSelectedHabitId(habitId)
    setGoalDialogOpen(true)
  }

  // Check if a habit has reached a milestone
  const checkMilestone = (habit: Habit, prevStreak: number, newStreak: number) => {
    const milestones = [7, 14, 21, 30, 60, 90, 100, 180, 365]

    for (const milestone of milestones) {
      if (prevStreak < milestone && newStreak >= milestone) {
        setMilestoneHabit(habit)
        setMilestoneDialogOpen(true)
        return
      }
    }
  }

  const handleToggleCompletion = (habit: Habit) => {
    const prevStreak = habit.streak
    onToggleCompletion(habit.id)

    // Only check for milestones when increasing streak
    if (!habit.completedDates.includes(today)) {
      checkMilestone(habit, prevStreak, prevStreak + 1)
    }
  }

  if (habits.length === 0) {
    return (
      <div className="mt-8 text-center p-8 border border-dashed rounded-lg">
        <p className="text-muted-foreground">You haven't added any habits yet. Add one to get started!</p>
      </div>
    )
  }

  return (
    <>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {habits.map((habit) => {
          const isCompletedToday = habit.completedDates.includes(today)
          const completionRate = habit.goal ? Math.min(100, Math.round((habit.streak / habit.goal) * 100)) : 0

          return (
            <Card
              key={habit.id}
              className={`
              ${isCompletedToday ? "border-primary/50" : ""}
              ${habit.streak >= 10 ? "bg-gradient-to-br from-background to-primary/5" : ""}
            `}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="flex flex-col gap-1">
                    <span>{habit.name}</span>
                    {habit.category && (
                      <Badge variant="outline" className="w-fit text-xs">
                        {habit.category}
                      </Badge>
                    )}
                  </CardTitle>
                  <Button
                    variant={isCompletedToday ? "default" : "outline"}
                    size="icon"
                    className={`h-8 w-8 rounded-full ${isCompletedToday ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                    onClick={() => handleToggleCompletion(habit)}
                  >
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Mark as {isCompletedToday ? "incomplete" : "complete"}</span>
                  </Button>
                </div>
                <CardDescription>{habit.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Flame className={`h-5 w-5 ${habit.streak > 0 ? "text-orange-500" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">Streak:</span>
                    </div>
                    <StreakBadge streak={habit.streak} />
                  </div>

                  {habit.streakFreezes > 0 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span className="text-xs">Streak Freezes:</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs px-2 text-blue-500"
                        onClick={() => onUseStreakFreeze(habit.id)}
                      >
                        Use ({habit.streakFreezes})
                      </Button>
                    </div>
                  )}

                  {habit.goal > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress to goal</span>
                        <span>
                          {habit.streak} / {habit.goal} days
                        </span>
                      </div>
                      <Progress value={completionRate} className="h-2" />
                    </div>
                  )}

                  {habit.achievements && habit.achievements.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {habit.achievements.slice(0, 3).map((achievement, index) => (
                        <Badge key={index} variant="secondary" className="text-xs gap-1 bg-primary/10">
                          <Award className="h-3 w-3 text-primary" />
                          {achievement}
                        </Badge>
                      ))}
                      {habit.achievements.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{habit.achievements.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <div className="text-xs text-muted-foreground">{habit.frequency}</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openGoalDialog(habit.id)}>
                      <Target className="mr-2 h-4 w-4" />
                      <span>Set Goal</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onArchive(habit.id)}>
                      <Archive className="mr-2 h-4 w-4" />
                      <span>Archive</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(habit.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {selectedHabitId && (
        <GoalDialog
          open={goalDialogOpen}
          onOpenChange={setGoalDialogOpen}
          habitId={selectedHabitId}
          currentGoal={habits.find((h) => h.id === selectedHabitId)?.goal || 0}
          onUpdateGoal={onUpdateGoal}
        />
      )}

      {milestoneHabit && (
        <StreakMilestoneDialog
          open={milestoneDialogOpen}
          onOpenChange={setMilestoneDialogOpen}
          habit={milestoneHabit}
        />
      )}
    </>
  )
}
