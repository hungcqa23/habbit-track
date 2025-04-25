"use client"

import { useMemo } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "@/components/ui/chart"
import type { Habit } from "@/lib/types"

interface StreakChartProps {
  habits: Habit[]
}

export function StreakChart({ habits }: StreakChartProps) {
  // Sort habits by streak (descending)
  const sortedHabits = useMemo(() => {
    return [...habits].sort((a, b) => b.streak - a.streak).slice(0, 10) // Show top 10 habits by streak
  }, [habits])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={sortedHabits} layout="vertical" margin={{ left: 80 }}>
        <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          type="category"
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={80}
        />
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <Tooltip
          formatter={(value) => [`${value} days`, "Current Streak"]}
          labelFormatter={(label) => `Habit: ${label}`}
        />
        <Bar dataKey="streak" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Current Streak" />
      </BarChart>
    </ResponsiveContainer>
  )
}
