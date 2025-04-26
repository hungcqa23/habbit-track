"use client"
import { ArchiveRestore, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useArchivedHabits } from "../hooks"

export function ArchivedHabits() {
  const { archivedHabits, deleteHabit, restoreHabit, hasArchivedHabits } = useArchivedHabits()

  if (!hasArchivedHabits) {
    return (
      <div className="mt-8 text-center p-8 border border-dashed rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Archive</h2>
        <p className="text-muted-foreground">You don't have any archived habits.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Archived Habits</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {archivedHabits.map((habit) => (
          <Card key={habit.id} className="opacity-80">
            <CardHeader>
              <CardTitle>{habit.name}</CardTitle>
              <CardDescription>{habit.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">Final Streak:</div>
                <div className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-sm font-medium">
                  {habit.streak} {habit.streak === 1 ? "day" : "days"}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="gap-2" onClick={() => restoreHabit(habit.id)}>
                <ArchiveRestore className="h-4 w-4" />
                Restore
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive gap-2"
                onClick={() => deleteHabit(habit.id)}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
