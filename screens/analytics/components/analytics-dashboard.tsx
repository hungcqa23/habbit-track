"use client"
import { BarChart, LineChart, PieChart, Award } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompletionRateChart } from "./completion-rate-chart"
import { StreakChart } from "./streak-chart"
import { CategoryDistributionChart } from "./category-distribution-chart"
import { AchievementsView } from "@/components/achievements-view"
import { useAnalyticsData } from "../hooks"

export function AnalyticsDashboard() {
  const {
    habits,
    activeHabits,
    totalHabits,
    habitsCompletedToday,
    todayCompletionRate,
    averageStreak,
    totalAchievements
  } = useAnalyticsData()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHabits}</div>
              <p className="text-xs text-muted-foreground mt-1">Active habits being tracked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayCompletionRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {habitsCompletedToday} of {totalHabits} habits completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageStreak} days</div>
              <p className="text-xs text-muted-foreground mt-1">Across all active habits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAchievements}</div>
              <p className="text-xs text-muted-foreground mt-1">Total badges earned</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="completion">
        <TabsList>
          <TabsTrigger value="completion" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Completion Rate</span>
          </TabsTrigger>
          <TabsTrigger value="streaks" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Streaks</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>Categories</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>Achievements</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="completion" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Habit Completion Rate</CardTitle>
              <CardDescription>Your daily habit completion rate over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <CompletionRateChart habits={activeHabits} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streaks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Streak Progress</CardTitle>
              <CardDescription>Current streak length for each habit</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <StreakChart habits={activeHabits} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Habit Categories</CardTitle>
              <CardDescription>Distribution of habits by category</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <CategoryDistributionChart habits={activeHabits} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <AchievementsView habits={habits} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
