"use client"

import { useMemo } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "@/components/ui/chart"
import type { Habit } from "@/lib/types"

interface CategoryDistributionChartProps {
  habits: Habit[]
}

export function CategoryDistributionChart({ habits }: CategoryDistributionChartProps) {
  // Group habits by category and count
  const categoryData = useMemo(() => {
    const categories: Record<string, number> = {}

    habits.forEach((habit) => {
      const category = habit.category || "Uncategorized"
      categories[category] = (categories[category] || 0) + 1
    })

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
    }))
  }, [habits])

  // Colors for the pie chart
  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--primary) / 0.8)",
    "hsl(var(--primary) / 0.6)",
    "hsl(var(--primary) / 0.4)",
    "hsl(var(--secondary))",
    "hsl(var(--secondary) / 0.8)",
    "hsl(var(--secondary) / 0.6)",
    "hsl(var(--accent))",
    "hsl(var(--accent) / 0.8)",
    "hsl(var(--muted))",
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} habits`, "Count"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
