"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Target, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { ProfileSetupData } from "../../hooks/useProfileSetup"

interface PreferencesStepProps {
  initialFocus: string[]
  preferredCategories: string[]
  onUpdate: (data: Partial<ProfileSetupData>) => void
  onNext: () => void
  onBack: () => void
}

export function PreferencesStep({ 
  initialFocus, 
  preferredCategories, 
  onUpdate, 
  onNext, 
  onBack 
}: PreferencesStepProps) {
  const [focusAreas, setFocusAreas] = useState<string[]>(initialFocus)
  const [categories, setCategories] = useState<string[]>(preferredCategories)
  
  // Focus areas options
  const focusOptions = [
    { id: "health", label: "Health & Fitness" },
    { id: "productivity", label: "Productivity" },
    { id: "learning", label: "Learning & Education" },
    { id: "mindfulness", label: "Mindfulness & Mental Health" },
    { id: "creativity", label: "Creativity & Hobbies" }
  ]
  
  // Categories options
  const categoryOptions = [
    { id: "morning", label: "Morning Routine" },
    { id: "work", label: "Work & Career" },
    { id: "exercise", label: "Exercise" },
    { id: "nutrition", label: "Nutrition" },
    { id: "reading", label: "Reading" },
    { id: "meditation", label: "Meditation" },
    { id: "sleep", label: "Sleep" },
    { id: "social", label: "Social & Relationships" }
  ]
  
  const toggleFocusArea = (id: string) => {
    setFocusAreas(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    )
  }
  
  const toggleCategory = (id: string) => {
    setCategories(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    )
  }
  
  const handleNext = () => {
    onUpdate({
      initialFocus: focusAreas,
      preferredCategories: categories
    })
    onNext()
  }
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Your Preferences</h2>
        <p className="text-muted-foreground">
          Select your focus areas and preferred habit categories to personalize your experience.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            What are your main focus areas?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {focusOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-2">
                <Checkbox 
                  id={`focus-${option.id}`} 
                  checked={focusAreas.includes(option.id)}
                  onCheckedChange={() => toggleFocusArea(option.id)}
                />
                <Label 
                  htmlFor={`focus-${option.id}`}
                  className="leading-none pt-0.5"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            Which habit categories interest you?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categoryOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-2">
                <Checkbox 
                  id={`category-${option.id}`} 
                  checked={categories.includes(option.id)}
                  onCheckedChange={() => toggleCategory(option.id)}
                />
                <Label 
                  htmlFor={`category-${option.id}`}
                  className="leading-none pt-0.5"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleNext} className="gap-2">
          Continue
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
