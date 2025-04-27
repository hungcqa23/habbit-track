"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useProfile } from "@/lib/hooks/use-profile"
import type { AvatarFeature, Avatar } from "@/lib/types"

// Define profile setup data structure
export interface ProfileSetupData {
  name: string
  bio: string
  avatar: Avatar
  initialFocus: string[]
  preferredCategories: string[]
}

// Initial state for the profile setup
const initialProfileData: ProfileSetupData = {
  name: "",
  bio: "",
  avatar: {
    faceShape: { type: "faceShape", option: "01" },
    hair: { type: "hair", option: "style01" },
    hairColor: "#5E3719",
    accessories: [],
    clothing: { type: "clothing", option: "01" },
    eyes: { type: "eyes", option: "normal" },
    mouth: { type: "mouth", option: "normalSmile1" }
  },
  initialFocus: [],
  preferredCategories: []
}

export function useProfileSetup() {
  const [step, setStep] = useState(0)
  const [profileData, setProfileData] = useState<ProfileSetupData>(initialProfileData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { updateProfile } = useProfile()

  // Steps in the wizard
  const steps = [
    { id: "welcome", title: "Welcome" },
    { id: "avatar", title: "Create Your Avatar" },
    { id: "profile", title: "Your Profile" },
    { id: "preferences", title: "Preferences" },
    { id: "complete", title: "All Set!" }
  ]

  // Go to next step
  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    }
  }

  // Go to previous step
  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  // Update profile data
  const updateProfileData = (data: Partial<ProfileSetupData>) => {
    setProfileData(prev => ({ ...prev, ...data }))
  }

  // Update avatar feature
  const updateAvatarFeature = (feature: string, value: AvatarFeature | string) => {
    setProfileData(prev => ({
      ...prev,
      avatar: {
        ...prev.avatar,
        [feature]: value
      }
    }))
  }

  // Generate random avatar
  const generateRandomAvatar = () => {
    // This is a placeholder - we'll implement the actual randomization logic later
    toast({
      title: "Random Avatar",
      description: "Generated a random avatar for you!",
    })

    // Example random avatar with Notion styles
    const randomAvatar = {
      faceShape: { type: "faceShape", option: ["01", "02", "03", "04", "05", "07", "08"][Math.floor(Math.random() * 7)] },
      hair: { type: "hair", option: ["style01", "style02", "style04", "style05", "style08", "bald"][Math.floor(Math.random() * 6)] },
      hairColor: ["#5E3719", "#D6B97B", "#CB607E", "#000000", "#FFFFFF"][Math.floor(Math.random() * 5)],
      accessories: [{
        type: "accessories",
        option: ["none", "glasses", "roundedGlasses", "futuristicGlasses", "stylishGlasses", "mask", "cap", "earphone"][Math.floor(Math.random() * 8)]
      }],
      clothing: { type: "clothing", option: ["01", "02", "04", "05", "22", "24"][Math.floor(Math.random() * 6)] },
      eyes: { type: "eyes", option: ["normal", "closed", "thin", "angry", "cynic", "sad"][Math.floor(Math.random() * 6)] },
      mouth: { type: "mouth", option: ["normalSmile1", "normalSmile2", "openMouth", "openTooth", "eat", "whistle", "angry", "sad", "hate", "nervous", "mouth11"][Math.floor(Math.random() * 11)] }
    }

    setProfileData(prev => ({
      ...prev,
      avatar: randomAvatar
    }))
  }

  // Submit profile data
  const submitProfile = async () => {
    setIsSubmitting(true)

    try {
      // In a real app, you would send this data to your backend
      // For now, we'll just update the local profile
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call

      const { profile } = useProfile()

      // Update the profile with the new data
      updateProfile({
        ...profile,
        name: profileData.name,
        bio: profileData.bio,
        avatar: profileData.avatar,
        initialFocus: profileData.initialFocus,
        preferredCategories: profileData.preferredCategories,
        // Add a new activity for profile creation
        recentActivities: [
          {
            type: "profile_updated",
            description: "Profile setup completed",
            timestamp: new Date().toISOString(),
          },
          ...profile.recentActivities,
        ],
      })

      toast({
        title: "Profile Created",
        description: "Your profile has been set up successfully!",
      })

      // Redirect to main app
      router.push("/main")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create your profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    step,
    steps,
    profileData,
    isSubmitting,
    nextStep,
    prevStep,
    updateProfileData,
    updateAvatarFeature,
    generateRandomAvatar,
    submitProfile
  }
}
