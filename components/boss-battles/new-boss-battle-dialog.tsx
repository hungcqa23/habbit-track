"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Swords, Plus, Calendar, Shield, Trophy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import type { BossBattle, BossBattleRequirement, BossBattleReward } from "@/lib/types"

interface NewBossBattleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddBossBattle: (bossBattle: Omit<BossBattle, "id" | "status" | "currentProgress" | "completedDate">) => void
}

export function NewBossBattleDialog({ open, onOpenChange, onAddBossBattle }: NewBossBattleDialogProps) {
  // Form state
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState<BossBattle["difficulty"]>("medium")
  const [requiredProgress, setRequiredProgress] = useState(7)
  const [hasDeadline, setHasDeadline] = useState(false)
  const [deadline, setDeadline] = useState<Date | undefined>(undefined)
  const [requirements, setRequirements] = useState<BossBattleRequirement[]>([{ description: "", completed: false }])
  const [rewards, setRewards] = useState<BossBattleReward[]>([{ type: "coins", amount: 50 }])

  // Template selection
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  // Templates for quick setup
  const templates = [
    {
      id: "workout-week",
      name: "Workout Week Challenge",
      description: "Complete a full week of daily workouts to build your strength",
      difficulty: "medium" as const,
      requiredProgress: 7,
      requirements: [
        { description: "Complete 7 days of workouts", detail: "At least 30 minutes each day", completed: false },
        { description: "Include 3 cardio sessions", completed: false },
        { description: "Include 3 strength training sessions", completed: false },
      ],
      rewards: [
        { type: "strength" as const, amount: 10 },
        { type: "coins" as const, amount: 100 },
        { type: "experience" as const, amount: 200 },
      ],
    },
    {
      id: "reading-challenge",
      name: "Reading Marathon",
      description: "Read consistently for two weeks to boost your knowledge",
      difficulty: "medium" as const,
      requiredProgress: 14,
      requirements: [
        { description: "Read for at least 30 minutes daily", completed: false },
        { description: "Finish at least one book", completed: false },
        { description: "Take notes on what you've learned", completed: false },
      ],
      rewards: [
        { type: "smart" as const, amount: 15 },
        { type: "coins" as const, amount: 150 },
        { type: "experience" as const, amount: 300 },
      ],
    },
    {
      id: "productivity-sprint",
      name: "Productivity Sprint",
      description: "Complete all your daily tasks for 5 consecutive days",
      difficulty: "hard" as const,
      requiredProgress: 5,
      requirements: [
        { description: "Complete all planned tasks each day", completed: false },
        {
          description: "No procrastination",
          detail: "Start your most important task first thing in the morning",
          completed: false,
        },
        {
          description: "Maintain a distraction-free environment",
          detail: "No social media during work hours",
          completed: false,
        },
      ],
      rewards: [
        { type: "smart" as const, amount: 8 },
        { type: "strength" as const, amount: 5 },
        { type: "coins" as const, amount: 200 },
        { type: "experience" as const, amount: 250 },
      ],
    },
    {
      id: "early-riser",
      name: "Early Riser Challenge",
      description: "Wake up at 6 AM every day for a week",
      difficulty: "epic" as const,
      requiredProgress: 7,
      requirements: [
        { description: "Wake up at 6 AM every day", completed: false },
        { description: "No snoozing", completed: false },
        { description: "Complete a morning routine", detail: "Exercise, meditation, or journaling", completed: false },
      ],
      rewards: [
        { type: "strength" as const, amount: 12 },
        { type: "smart" as const, amount: 8 },
        { type: "coins" as const, amount: 250 },
        { type: "experience" as const, amount: 350 },
      ],
    },
  ]

  // Apply template
  const applyTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (!template) return

    setName(template.name)
    setDescription(template.description)
    setDifficulty(template.difficulty)
    setRequiredProgress(template.requiredProgress)
    setRequirements([...template.requirements])
    setRewards([...template.rewards])
    setSelectedTemplate(templateId)
  }

  // Add requirement
  const addRequirement = () => {
    setRequirements([...requirements, { description: "", completed: false }])
  }

  // Update requirement
  const updateRequirement = (index: number, field: keyof BossBattleRequirement, value: string | boolean) => {
    const updatedRequirements = [...requirements]
    updatedRequirements[index] = {
      ...updatedRequirements[index],
      [field]: value,
    }
    setRequirements(updatedRequirements)
  }

  // Remove requirement
  const removeRequirement = (index: number) => {
    if (requirements.length <= 1) return
    setRequirements(requirements.filter((_, i) => i !== index))
  }

  // Add reward
  const addReward = () => {
    setRewards([...rewards, { type: "coins", amount: 50 }])
  }

  // Update reward
  const updateReward = (index: number, field: keyof BossBattleReward, value: string | number) => {
    const updatedRewards = [...rewards]
    updatedRewards[index] = {
      ...updatedRewards[index],
      [field]: field === "amount" ? Number(value) : value,
    }
    setRewards(updatedRewards)
  }

  // Remove reward
  const removeReward = (index: number) => {
    if (rewards.length <= 1) return
    setRewards(rewards.filter((_, i) => i !== index))
  }

  // Reset form
  const resetForm = () => {
    setName("")
    setDescription("")
    setDifficulty("medium")
    setRequiredProgress(7)
    setHasDeadline(false)
    setDeadline(undefined)
    setRequirements([{ description: "", completed: false }])
    setRewards([{ type: "coins", amount: 50 }])
    setSelectedTemplate(null)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!name.trim() || !description.trim() || requirements.some((req) => !req.description.trim())) {
      return
    }

    // Create new boss battle
    const newBossBattle: Omit<BossBattle, "id" | "status" | "currentProgress" | "completedDate"> = {
      name,
      description,
      difficulty,
      requiredProgress,
      currentProgress: 0,
      startDate: new Date().toISOString(),
      deadline: hasDeadline && deadline ? deadline.toISOString() : undefined,
      requirements,
      rewards,
    }

    onAddBossBattle(newBossBattle)
    resetForm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Swords className="h-5 w-5 text-primary" />
              Create New Boss Battle
            </DialogTitle>
            <DialogDescription>
              Set up a challenging habit milestone as a boss battle. Complete it to earn special rewards.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="custom" className="mt-5">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="template">Use Template</TabsTrigger>
              <TabsTrigger value="custom">Custom Battle</TabsTrigger>
            </TabsList>

            <TabsContent value="template" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`
                      cursor-pointer rounded-lg border p-4 transition-all
                      ${selectedTemplate === template.id ? "border-primary bg-primary/5" : "hover:border-primary/50"}
                    `}
                    onClick={() => applyTemplate(template.id)}
                  >
                    <div className="font-medium mb-1">{template.name}</div>
                    <div className="text-sm text-muted-foreground mb-2">{template.description}</div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="capitalize">
                        {template.difficulty}
                      </Badge>
                      <div className="text-xs text-muted-foreground">{template.requiredProgress} days</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Battle Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., 30-Day Fitness Challenge"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the challenge and what you need to do to complete it"
                    className="resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      value={difficulty}
                      onValueChange={(value) => setDifficulty(value as BossBattle["difficulty"])}
                    >
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="epic">Epic</SelectItem>
                        <SelectItem value="legendary">Legendary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="requiredProgress">Required Days</Label>
                    <Input
                      id="requiredProgress"
                      type="number"
                      min="1"
                      max="365"
                      value={requiredProgress}
                      onChange={(e) => setRequiredProgress(Number(e.target.value))}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasDeadline"
                    checked={hasDeadline}
                    onCheckedChange={(checked) => setHasDeadline(checked === true)}
                  />
                  <Label htmlFor="hasDeadline">Set a deadline</Label>
                </div>

                {hasDeadline && (
                  <div className="grid gap-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal" id="deadline">
                          <Calendar className="mr-2 h-4 w-4" />
                          {deadline ? format(deadline, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={deadline}
                          onSelect={setDeadline}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4 py-4 border-t">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Battle Requirements
              </h4>
              <Button type="button" variant="outline" size="sm" onClick={addRequirement} className="h-8 gap-1">
                <Plus className="h-3.5 w-3.5" />
                Add
              </Button>
            </div>

            <div className="space-y-3">
              {requirements.map((req, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-1 space-y-2">
                    <Input
                      value={req.description}
                      onChange={(e) => updateRequirement(index, "description", e.target.value)}
                      placeholder="Requirement description"
                      required
                    />
                    <Input
                      value={req.detail || ""}
                      onChange={(e) => updateRequirement(index, "detail", e.target.value)}
                      placeholder="Additional details (optional)"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRequirement(index)}
                    disabled={requirements.length <= 1}
                    className="h-8 px-2 text-destructive hover:text-destructive"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 py-4 border-t">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                Battle Rewards
              </h4>
              <Button type="button" variant="outline" size="sm" onClick={addReward} className="h-8 gap-1">
                <Plus className="h-3.5 w-3.5" />
                Add
              </Button>
            </div>

            <div className="space-y-3">
              {rewards.map((reward, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <Select value={reward.type} onValueChange={(value) => updateReward(index, "type", value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Reward type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coins">Coins 💰</SelectItem>
                      <SelectItem value="strength">Strength 💪</SelectItem>
                      <SelectItem value="smart">Smart 🧠</SelectItem>
                      <SelectItem value="experience">Experience ⭐</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    min="1"
                    value={reward.amount}
                    onChange={(e) => updateReward(index, "amount", e.target.value)}
                    className="w-24"
                    required
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeReward(index)}
                    disabled={rewards.length <= 1}
                    className="h-8 px-2 text-destructive hover:text-destructive"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button type="button" variant="outline" onClick={resetForm}>
              Reset
            </Button>
            <Button type="submit">Create Boss Battle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
