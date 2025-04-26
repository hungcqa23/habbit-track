"use client"

import { ChevronLeft, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AvatarPreview } from "../avatar/AvatarPreview"
import type { ProfileSetupData } from "../../hooks/useProfileSetup"

interface CompleteStepProps {
  profileData: ProfileSetupData
  isSubmitting: boolean
  onSubmit: () => void
  onBack: () => void
}

export function CompleteStep({ 
  profileData, 
  isSubmitting, 
  onSubmit, 
  onBack 
}: CompleteStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <div className="flex justify-center">
          <div className="bg-primary/10 p-3 rounded-full">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">You're All Set!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your profile is ready to go. Here's a summary of what you've set up.
        </p>
      </div>
      
      <div className="bg-card border rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-shrink-0">
            <AvatarPreview avatar={profileData.avatar} />
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-lg font-bold">{profileData.name}</h3>
              <p className="text-muted-foreground">
                {profileData.bio || "No bio provided"}
              </p>
            </div>
            
            {profileData.initialFocus.length > 0 && (
              <div>
                <h4 className="text-sm font-medium">Focus Areas:</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profileData.initialFocus.map(focus => (
                    <span 
                      key={focus} 
                      className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {profileData.preferredCategories.length > 0 && (
              <div>
                <h4 className="text-sm font-medium">Preferred Categories:</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profileData.preferredCategories.map(category => (
                    <span 
                      key={category} 
                      className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} className="gap-2" disabled={isSubmitting}>
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting} className="gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating Profile...
            </>
          ) : (
            "Complete Setup"
          )}
        </Button>
      </div>
    </div>
  )
}
