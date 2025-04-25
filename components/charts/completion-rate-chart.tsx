"use client"

import { useMemo } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "@/components/ui/chart"
import type { Habit } from "@/lib/types"

interface CompletionRateChartProps {
  habits: Habit[]
}

export function CompletionRateChart({ habits }: CompletionRateChartProps) {
  // Generate data for the last 7 days
  const chartData = useMemo(() => {
    const data = []
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateString = date.toISOString().split("T")[0]
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(date)

      // Count habits that existed on this date (we'll assume all habits existed)
      const totalHabits = habits.length

      // Count completions for this date
      const completedHabits = habits.filter((habit) => habit.completedDates.includes(dateString)).length

      // Calculate completion rate
      const completionRate = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0

      data.push({
        date: formattedDate,
        completionRate,
      })
    }

    return data
  }, [habits])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
          domain={[0, 100]}
        />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip formatter={(value) => [`${value}%`, "Completion Rate"]} labelFormatter={(label) => `Date: ${label}`} />
        <Bar dataKey="completionRate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Completion Rate" />
      </BarChart>
    </ResponsiveContainer>
  )
}
