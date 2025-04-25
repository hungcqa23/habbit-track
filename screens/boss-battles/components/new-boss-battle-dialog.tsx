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

  // Battle templates
  const templates = [
    {
      name: "7-Day Streak Challenge",
      description: "Complete a habit for 7 consecutive days",
      difficulty: "easy" as const,
      requiredProgress: 7,
      hasDeadline: true,
      deadlineDays: 10,
      requirements: [
        { description: "Complete the habit every day", completed: false },
        { description: "No streak freezes allowed", completed: false },
      ],
      rewards: [
        { type: "coins" as const, amount: 50 },
        { type: "xp" as const, amount: 100 },
      ],
    },
    {
      name: "30-Day Transformation",
      description: "Maintain a habit for a full month to form a lasting behavior",
      difficulty: "medium" as const,
      requiredProgress: 30,
      hasDeadline: true,
      deadlineDays: 35,
      requirements: [
        { description: "Complete the habit at least 30 days", completed: false },
        { description: "Maximum 2 streak freezes allowed", completed: false },
        { description: "Track progress with photos or notes", completed: false },
      ],
      rewards: [
        { type: "coins" as const, amount: 200 },
        { type: "xp" as const, amount: 300 },
        { type: "achievement" as const, name: "30-Day Champion" },
      ],
    },
    {
      name: "Epic 100-Day Quest",
      description: "The ultimate habit challenge - maintain for 100 days",
      difficulty: "epic" as const,
      requiredProgress: 100,
      hasDeadline: false,
      requirements: [
        { description: "Complete the habit for 100 days", completed: false },
        { description: "Maximum 5 streak freezes allowed", completed: false },
        { description: "Share progress updates weekly", completed: false },
        { description: "Reflect on changes at 25, 50, and 75 day milestones", completed: false },
      ],
      rewards: [
        { type: "coins" as const, amount: 500 },
        { type: "xp" as const, amount: 1000 },
        { type: "achievement" as const, name: "Habit Master" },
        { type: "item" as const, name: "Special Profile Badge" },
      ],
    },
  ]

  // Apply template
  const applyTemplate = (index: number) => {
    const template = templates[index]
    setName(template.name)
    setDescription(template.description)
    setDifficulty(template.difficulty)
    setRequiredProgress(template.requiredProgress)
    setHasDeadline(template.hasDeadline)

    if (template.hasDeadline && template.deadlineDays) {
      const newDeadline = new Date()
      newDeadline.setDate(newDeadline.getDate() + template.deadlineDays)
      setDeadline(newDeadline)
    } else {
      setDeadline(undefined)
    }

    setRequirements([...template.requirements])
    setRewards([...template.rewards])
  }

  // Add requirement
  const addRequirement = () => {
    setRequirements([...requirements, { description: "", completed: false }])
  }

  // Update requirement
  const updateRequirement = (index: number, description: string) => {
    const newRequirements = [...requirements]
    newRequirements[index].description = description
    setRequirements(newRequirements)
  }

  // Remove requirement
  const removeRequirement = (index: number) => {
    if (requirements.length > 1) {
      const newRequirements = [...requirements]
      newRequirements.splice(index, 1)
      setRequirements(newRequirements)
    }
  }

  // Add reward
  const addReward = () => {
    setRewards([...rewards, { type: "coins", amount: 50 }])
  }

  // Update reward
  const updateReward = (index: number, field: string, value: any) => {
    const newRewards = [...rewards]
    ;(newRewards[index] as any)[field] = value
    setRewards(newRewards)
  }

  // Remove reward
  const removeReward = (index: number) => {
    if (rewards.length > 1) {
      const newRewards = [...rewards]
      newRewards.splice(index, 1)
      setRewards(newRewards)
    }
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

            <TabsContent value="template" className="space-y-4 pt-4">
              <div className="grid gap-4">
                {templates.map((template, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-4 border rounded-lg hover:border-primary/50 cursor-pointer transition-all"
                    onClick={() => applyTemplate(index)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <Swords className="h-4 w-4 text-primary" />
                        {template.name}
                      </h3>
                      <Badge
                        className={
                          template.difficulty === "easy"
                            ? "bg-green-500/10 text-green-500"
                            : template.difficulty === "medium"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-purple-500/10 text-purple-500"
                        }
                      >
                        {template.difficulty.charAt(0).toUpperCase() + template.difficulty.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="h-3.5 w-3.5" />
                      <span>{template.requiredProgress} days</span>
                      {template.hasDeadline && (
                        <>
                          <span>•</span>
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{template.deadlineDays} day deadline</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4 pt-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Battle Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., 30-Day Meditation Challenge"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={difficulty} onValueChange={(value) => setDifficulty(value as BossBattle["difficulty"])}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="epic">Epic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the challenge and its purpose"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="progress">Required Progress (days)</Label>
                    <Input
                      id="progress"
                      type="number"
                      min={1}
                      max={365}
                      value={requiredProgress}
                      onChange={(e) => setRequiredProgress(parseInt(e.target.value) || 7)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="deadline">Deadline</Label>
                      <div className="flex items-center gap-2">
                        <Checkbox id="has-deadline" checked={hasDeadline} onCheckedChange={setHasDeadline} />
                        <label htmlFor="has-deadline" className="text-sm cursor-pointer">
                          Set deadline
                        </label>
                      </div>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${!hasDeadline && "opacity-50"}`}
                          disabled={!hasDeadline}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {deadline ? format(deadline, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={deadline}
                          onSelect={setDeadline}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Requirements</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={requirement.description}
                        onChange={(e) => updateRequirement(index, e.target.value)}
                        placeholder="e.g., Complete the habit every day"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRequirement(index)}
                        disabled={requirements.length <= 1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Rewards</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addReward}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  {rewards.map((reward, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Select
                        value={reward.type}
                        onValueChange={(value) => updateReward(index, "type", value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="coins">Coins</SelectItem>
                          <SelectItem value="xp">XP</SelectItem>
                          <SelectItem value="item">Item</SelectItem>
                          <SelectItem value="achievement">Achievement</SelectItem>
                        </SelectContent>
                      </Select>

                      {(reward.type === "coins" || reward.type === "xp") && (
                        <Input
                          type="number"
                          min={1}
                          value={reward.amount}
                          onChange={(e) => updateReward(index, "amount", parseInt(e.target.value) || 0)}
                          placeholder="Amount"
                          required
                        />
                      )}

                      {(reward.type === "item" || reward.type === "achievement") && (
                        <Input
                          value={reward.name || ""}
                          onChange={(e) => updateReward(index, "name", e.target.value)}
                          placeholder={`${reward.type === "item" ? "Item name" : "Achievement name"}`}
                          required
                        />
                      )}

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeReward(index)}
                        disabled={rewards.length <= 1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Boss Battle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
