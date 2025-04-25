import type React from "react"
import { Award, Trophy, Medal, Star, Flame, Shield, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Habit } from "@/lib/types"

interface AchievementsViewProps {
  habits: Habit[]
}

export function AchievementsView({ habits }: AchievementsViewProps) {
  // Get all unique achievements across all habits
  const allAchievements = new Set<string>()
  habits.forEach((habit) => {
    habit.achievements.forEach((achievement) => {
      allAchievements.add(achievement)
    })
  })

  // Count how many habits have each achievement
  const achievementCounts: Record<string, number> = {}
  allAchievements.forEach((achievement) => {
    achievementCounts[achievement] = habits.filter((habit) => habit.achievements.includes(achievement)).length
  })

  // Define achievement metadata
  const achievementMetadata: Record<
    string,
    {
      icon: React.ElementType
      color: string
      description: string
    }
  > = {
    "First Week": {
      icon: Flame,
      color: "text-orange-500",
      description: "Maintain a habit for 7 consecutive days",
    },
    "Two Weeks": {
      icon: Zap,
      color: "text-yellow-500",
      description: "Maintain a habit for 14 consecutive days",
    },
    "21 Day Habit": {
      icon: Star,
      color: "text-amber-500",
      description: "Officially form a habit with 21 consecutive days",
    },
    "30 Day Streak": {
      icon: Medal,
      color: "text-green-500",
      description: "Maintain a habit for a full month",
    },
    "60 Day Streak": {
      icon: Shield,
      color: "text-blue-500",
      description: "Maintain a habit for 60 consecutive days",
    },
    "100 Day Streak": {
      icon: Trophy,
      color: "text-indigo-500",
      description: "Reach the impressive milestone of 100 days",
    },
    "180 Day Streak": {
      icon: Award,
      color: "text-purple-500",
      description: "Maintain a habit for half a year",
    },
    "365 Day Streak": {
      icon: Award,
      color: "text-pink-500",
      description: "Complete a full year of your habit",
    },
  }

  // Sort achievements by rarity (fewest habits have them)
  const sortedAchievements = [...allAchievements].sort((a, b) => {
    // First sort by count (ascending)
    const countDiff = achievementCounts[a] - achievementCounts[b]
    if (countDiff !== 0) return countDiff

    // Then sort by "prestige" (hardest achievements first)
    const prestigeOrder = [
      "365 Day Streak",
      "180 Day Streak",
      "100 Day Streak",
      "60 Day Streak",
      "30 Day Streak",
      "21 Day Habit",
      "Two Weeks",
      "First Week",
    ]
    return prestigeOrder.indexOf(a) - prestigeOrder.indexOf(b)
  })

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Your Achievements
          </CardTitle>
          <CardDescription>Badges and milestones you've earned through consistent habit tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedAchievements.map((achievement) => {
              const metadata = achievementMetadata[achievement] || {
                icon: Award,
                color: "text-primary",
                description: "A special achievement",
              }
              const Icon = metadata.icon

              return (
                <div key={achievement} className="flex items-start gap-3 p-3 rounded-lg border bg-background">
                  <div className={`p-2 rounded-full bg-muted ${metadata.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{achievement}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{metadata.description}</p>
                    <p className="text-xs mt-2">
                      Earned with <span className="font-medium">{achievementCounts[achievement]}</span> habits
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {sortedAchievements.length === 0 && (
            <div className="text-center p-6">
              <p className="text-muted-foreground">
                You haven't earned any achievements yet. Keep building your streaks!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
