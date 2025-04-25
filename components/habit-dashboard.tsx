"use client"

import { useState } from "react"
import { PlusCircle, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HabitList } from "@/components/habit-list"
import { NewHabitDialog } from "@/components/new-habit-dialog"
import { CategoryFilter } from "@/components/category-filter"
import { useHabits } from "@/lib/hooks/use-habits"
import { StreakLeaderboard } from "@/components/streak-leaderboard"

export function HabitDashboard() {
  const { habits, addHabit, toggleHabitCompletion, deleteHabit, archiveHabit, updateHabitGoal, useStreakFreeze } =
    useHabits()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showCategoryFilter, setShowCategoryFilter] = useState(false)

  // Filter habits by selected category
  const filteredHabits = selectedCategory
    ? habits.filter((habit) => !habit.archived && habit.category === selectedCategory)
    : habits.filter((habit) => !habit.archived)

  // Get unique categories from habits
  const categories = [...new Set(habits.map((habit) => habit.category))].filter(Boolean)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Habits</h2>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCategoryFilter(!showCategoryFilter)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add Habit
          </Button>
        </div>
      </div>

      {showCategoryFilter && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          className="mt-4 mb-6"
        />
      )}

      <StreakLeaderboard habits={habits.filter((h) => !h.archived)} className="mt-6 mb-8" />

      <HabitList
        habits={filteredHabits}
        onToggleCompletion={toggleHabitCompletion}
        onDelete={deleteHabit}
        onArchive={archiveHabit}
        onUpdateGoal={updateHabitGoal}
        onUseStreakFreeze={useStreakFreeze}
      />

      <NewHabitDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onAddHabit={addHabit} />
    </div>
  )
}
