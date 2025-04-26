"use client"

import type React from "react"

import {
  Award,
  Trophy,
  Medal,
  Star,
  Flame,
  Shield,
  Zap,
  Calendar,
  Target,
  Sparkles,
  LockKeyhole,
  CheckCircle2,
  Clock,
  Dumbbell,
  Brain,
  BookOpen,
  Heart,
  Leaf,
} from "lucide-react"
import { Crown } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Habit } from "@/lib/types"

interface AchievementsListProps {
  habits: Habit[]
}

// Define all possible achievements
const allAchievements = [
  // Streak achievements
  {
    id: "first-week",
    name: "First Week",
    description: "Maintain a habit for 7 consecutive days",
    icon: Flame,
    color: "text-orange-500",
    category: "streaks",
    difficulty: "beginner",
  },
  {
    id: "two-weeks",
    name: "Two Weeks",
    description: "Maintain a habit for 14 consecutive days",
    icon: Zap,
    color: "text-yellow-500",
    category: "streaks",
    difficulty: "beginner",
  },
  {
    id: "21-day-habit",
    name: "21 Day Habit",
    description: "Officially form a habit with 21 consecutive days",
    icon: Star,
    color: "text-amber-500",
    category: "streaks",
    difficulty: "intermediate",
  },
  {
    id: "30-day-streak",
    name: "30 Day Streak",
    description: "Maintain a habit for a full month",
    icon: Medal,
    color: "text-green-500",
    category: "streaks",
    difficulty: "intermediate",
  },
  {
    id: "60-day-streak",
    name: "60 Day Streak",
    description: "Maintain a habit for 60 consecutive days",
    icon: Shield,
    color: "text-blue-500",
    category: "streaks",
    difficulty: "advanced",
  },
  {
    id: "100-day-streak",
    name: "100 Day Streak",
    description: "Reach the impressive milestone of 100 days",
    icon: Trophy,
    color: "text-indigo-500",
    category: "streaks",
    difficulty: "advanced",
  },
  {
    id: "180-day-streak",
    name: "180 Day Streak",
    description: "Maintain a habit for half a year",
    icon: Award,
    color: "text-purple-500",
    category: "streaks",
    difficulty: "expert",
  },
  {
    id: "365-day-streak",
    name: "365 Day Streak",
    description: "Complete a full year of your habit",
    icon: Crown,
    color: "text-pink-500",
    category: "streaks",
    difficulty: "expert",
  },

  // Category achievements
  {
    id: "fitness-enthusiast",
    name: "Fitness Enthusiast",
    description: "Complete 50 fitness habit check-ins",
    icon: Dumbbell,
    color: "text-red-500",
    category: "categories",
    difficulty: "intermediate",
  },
  {
    id: "mindfulness-master",
    name: "Mindfulness Master",
    description: "Complete 50 mindfulness habit check-ins",
    icon: Brain,
    color: "text-blue-500",
    category: "categories",
    difficulty: "intermediate",
  },
  {
    id: "learning-lover",
    name: "Learning Lover",
    description: "Complete 50 learning habit check-ins",
    icon: BookOpen,
    color: "text-emerald-500",
    category: "categories",
    difficulty: "intermediate",
  },
  {
    id: "health-hero",
    name: "Health Hero",
    description: "Complete 50 health habit check-ins",
    icon: Heart,
    color: "text-red-500",
    category: "categories",
    difficulty: "intermediate",
  },

  // Milestone achievements
  {
    id: "habit-collector",
    name: "Habit Collector",
    description: "Track 5 different habits simultaneously",
    icon: CheckCircle2,
    color: "text-blue-500",
    category: "milestones",
    difficulty: "beginner",
  },
  {
    id: "perfect-week",
    name: "Perfect Week",
    description: "Complete all habits every day for a full week",
    icon: Calendar,
    color: "text-green-500",
    category: "milestones",
    difficulty: "intermediate",
  },
  {
    id: "goal-crusher",
    name: "Goal Crusher",
    description: "Reach the goal for a habit 10 times",
    icon: Target,
    color: "text-purple-500",
    category: "milestones",
    difficulty: "intermediate",
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Complete a habit before 8 AM for 10 consecutive days",
    icon: Clock,
    color: "text-amber-500",
    category: "milestones",
    difficulty: "advanced",
  },
  {
    id: "habit-phoenix",
    name: "Habit Phoenix",
    description: "Restore a habit from the archive and reach a 7-day streak",
    icon: Leaf,
    color: "text-green-500",
    category: "milestones",
    difficulty: "intermediate",
  },
]



export function AchievementsList({ habits }: AchievementsListProps) {
  // Get all unique achievements across all habits
  const earnedAchievements = new Set<string>()
  habits.forEach((habit) => {
    habit.achievements.forEach((achievement) => {
      earnedAchievements.add(achievement)
    })
  })

  // Count how many habits have each achievement
  const achievementCounts: Record<string, number> = {}
  earnedAchievements.forEach((achievement) => {
    achievementCounts[achievement] = habits.filter((habit) => habit.achievements.includes(achievement)).length
  })

  // Check if an achievement is earned
  const isAchievementEarned = (name: string) => {
    return Array.from(earnedAchievements).some((earned) => earned === name)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allAchievements.map((achievement) => {
              const earned = isAchievementEarned(achievement.name)
              const Icon = achievement.icon

              return (
                <Card
                  key={achievement.id}
                  className={`
                    transition-all
                    ${earned ? "border-primary/40 bg-primary/5" : "opacity-70 grayscale"}
                  `}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <div
                          className={`p-2 rounded-full ${earned ? `bg-primary/10 ${achievement.color}` : "bg-muted text-muted-foreground"}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span>{achievement.name}</span>
                      </CardTitle>
                      {!earned && <LockKeyhole className="h-5 w-5 text-muted-foreground" />}
                    </div>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant={earned ? "default" : "outline"} className="capitalize">
                        {achievement.difficulty}
                      </Badge>
                      {earned && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Earned × {achievementCounts[achievement.name] || 0}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="streaks">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allAchievements
              .filter((a) => a.category === "streaks")
              .map((achievement) => {
                const earned = isAchievementEarned(achievement.name)
                const Icon = achievement.icon

                return (
                  <Card
                    key={achievement.id}
                    className={`
                      transition-all
                      ${earned ? "border-primary/40 bg-primary/5" : "opacity-70 grayscale"}
                    `}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-full ${earned ? `bg-primary/10 ${achievement.color}` : "bg-muted text-muted-foreground"}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <span>{achievement.name}</span>
                        </CardTitle>
                        {!earned && <LockKeyhole className="h-5 w-5 text-muted-foreground" />}
                      </div>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant={earned ? "default" : "outline"} className="capitalize">
                          {achievement.difficulty}
                        </Badge>
                        {earned && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Earned × {achievementCounts[achievement.name] || 0}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allAchievements
              .filter((a) => a.category === "categories")
              .map((achievement) => {
                const earned = isAchievementEarned(achievement.name)
                const Icon = achievement.icon

                return (
                  <Card
                    key={achievement.id}
                    className={`
                      transition-all
                      ${earned ? "border-primary/40 bg-primary/5" : "opacity-70 grayscale"}
                    `}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-full ${earned ? `bg-primary/10 ${achievement.color}` : "bg-muted text-muted-foreground"}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <span>{achievement.name}</span>
                        </CardTitle>
                        {!earned && <LockKeyhole className="h-5 w-5 text-muted-foreground" />}
                      </div>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant={earned ? "default" : "outline"} className="capitalize">
                          {achievement.difficulty}
                        </Badge>
                        {earned && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Earned × {achievementCounts[achievement.name] || 0}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="milestones">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allAchievements
              .filter((a) => a.category === "milestones")
              .map((achievement) => {
                const earned = isAchievementEarned(achievement.name)
                const Icon = achievement.icon

                return (
                  <Card
                    key={achievement.id}
                    className={`
                      transition-all
                      ${earned ? "border-primary/40 bg-primary/5" : "opacity-70 grayscale"}
                    `}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-full ${earned ? `bg-primary/10 ${achievement.color}` : "bg-muted text-muted-foreground"}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <span>{achievement.name}</span>
                        </CardTitle>
                        {!earned && <LockKeyhole className="h-5 w-5 text-muted-foreground" />}
                      </div>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant={earned ? "default" : "outline"} className="capitalize">
                          {achievement.difficulty}
                        </Badge>
                        {earned && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Earned × {achievementCounts[achievement.name] || 0}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Achievement Progress</CardTitle>
          <CardDescription>
            You've earned {earnedAchievements.size} out of {allAchievements.length} possible achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round((earnedAchievements.size / allAchievements.length) * 100)}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(earnedAchievements.size / allAchievements.length) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
