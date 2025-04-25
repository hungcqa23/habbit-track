"use client"

import { useState } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useHabits } from "@/lib/hooks/use-habits"

export function CalendarView() {
  const { habits } = useHabits()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedHabit, setSelectedHabit] = useState<string | "all">("all")

  const activeHabits = habits.filter((habit) => !habit.archived)

  // Get days in current month
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Filter completions by selected habit
  const filteredHabits =
    selectedHabit === "all" ? activeHabits : activeHabits.filter((habit) => habit.id === selectedHabit)

  // Previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // Next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Check if a date has completions
  const getCompletionsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return filteredHabits.filter((habit) => habit.completedDates.includes(dateString))
  }

  // Calculate completion intensity (0-4) for heatmap
  const getCompletionIntensity = (date: Date) => {
    if (!isSameMonth(date, currentDate)) return 0

    const completions = getCompletionsForDate(date)
    const totalHabits = filteredHabits.length

    if (totalHabits === 0) return 0

    const completionRate = completions.length / totalHabits

    if (completionRate === 0) return 0
    if (completionRate <= 0.25) return 1
    if (completionRate <= 0.5) return 2
    if (completionRate <= 0.75) return 3
    return 4
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Calendar View</h2>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="mx-4 text-lg font-medium">{format(currentDate, "MMMM yyyy")}</div>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Select value={selectedHabit} onValueChange={setSelectedHabit}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select habit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Habits</SelectItem>
              {activeHabits.map((habit) => (
                <SelectItem key={habit.id} value={habit.id}>
                  {habit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Habit Completion Calendar
            </CardTitle>
            <CardDescription>View your habit completion patterns over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium py-1">
                  {day}
                </div>
              ))}

              {daysInMonth.map((day, i) => {
                const intensity = getCompletionIntensity(day)
                const completions = getCompletionsForDate(day)
                const isToday = isSameDay(day, new Date())

                return (
                  <div
                    key={i}
                    className={`
                      aspect-square flex flex-col items-center justify-center rounded-md text-sm
                      ${!isSameMonth(day, currentDate) ? "text-muted-foreground/30" : ""}
                      ${isToday ? "ring-2 ring-primary" : ""}
                      ${intensity === 0 ? "bg-muted/30" : ""}
                      ${intensity === 1 ? "bg-primary/20" : ""}
                      ${intensity === 2 ? "bg-primary/40" : ""}
                      ${intensity === 3 ? "bg-primary/60" : ""}
                      ${intensity === 4 ? "bg-primary/80" : ""}
                    `}
                    title={`${format(day, "MMM d, yyyy")}: ${completions.length} habits completed`}
                  >
                    <div className="font-medium">{format(day, "d")}</div>
                    {completions.length > 0 && <div className="text-xs mt-1">{completions.length}</div>}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-center mt-6 gap-2">
              <div className="text-xs">Less</div>
              <div className="w-4 h-4 bg-muted/30 rounded-sm"></div>
              <div className="w-4 h-4 bg-primary/20 rounded-sm"></div>
              <div className="w-4 h-4 bg-primary/40 rounded-sm"></div>
              <div className="w-4 h-4 bg-primary/60 rounded-sm"></div>
              <div className="w-4 h-4 bg-primary/80 rounded-sm"></div>
              <div className="text-xs">More</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
