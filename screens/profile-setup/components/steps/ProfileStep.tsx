"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, User, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ProfileSetupData } from "../../hooks/useProfileSetup"

interface ProfileStepProps {
  name: string
  bio: string
  onUpdate: (data: Partial<ProfileSetupData>) => void
  onNext: () => void
  onBack: () => void
}

export function ProfileStep({ name, bio, onUpdate, onNext, onBack }: ProfileStepProps) {
  const [nameValue, setNameValue] = useState(name)
  const [bioValue, setBioValue] = useState(bio)
  const [errors, setErrors] = useState({ name: "" })
  
  const handleNext = () => {
    // Validate
    if (!nameValue.trim()) {
      setErrors({ name: "Name is required" })
      return
    }
    
    // Update profile data
    onUpdate({
      name: nameValue,
      bio: bioValue
    })
    
    // Go to next step
    onNext()
  }
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Your Profile</h2>
        <p className="text-muted-foreground">
          Tell us a bit about yourself. This information will be displayed on your profile.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Name
          </Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={nameValue}
            onChange={(e) => {
              setNameValue(e.target.value)
              if (e.target.value.trim()) {
                setErrors({ name: "" })
              }
            }}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Bio
          </Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself (optional)"
            value={bioValue}
            onChange={(e) => setBioValue(e.target.value)}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            This will be displayed on your profile page. You can change it anytime.
          </p>
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
