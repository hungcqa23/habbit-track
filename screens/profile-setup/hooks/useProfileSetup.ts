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
    faceShape: { type: "faceShape", option: "round" },
    eyes: { type: "eyes", option: "default" },
    eyebrows: { type: "eyebrows", option: "default" },
    nose: { type: "nose", option: "default" },
    mouth: { type: "mouth", option: "default" },
    hair: { type: "hair", option: "short" },
    facialHair: { type: "facialHair", option: "none" },
    skinColor: "#F8D5C2",
    hairColor: "#5E3719",
    accessories: [],
    clothing: { type: "clothing", option: "tshirt" }
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

    // Example random avatar (would be more sophisticated in real implementation)
    const randomAvatar = {
      faceShape: { type: "faceShape", option: ["round", "oval", "square"][Math.floor(Math.random() * 3)] },
      eyes: { type: "eyes", option: ["default", "round", "smiling"][Math.floor(Math.random() * 3)] },
      eyebrows: { type: "eyebrows", option: ["default", "raised", "lowered"][Math.floor(Math.random() * 3)] },
      nose: { type: "nose", option: ["default", "round", "pointed"][Math.floor(Math.random() * 3)] },
      mouth: { type: "mouth", option: ["default", "smile", "serious"][Math.floor(Math.random() * 3)] },
      hair: { type: "hair", option: ["short", "long", "curly", "bald"][Math.floor(Math.random() * 4)] },
      facialHair: { type: "facialHair", option: ["none", "beard", "mustache"][Math.floor(Math.random() * 3)] },
      skinColor: ["#F8D5C2", "#EDB98A", "#D08B5B", "#AE5D29", "#614335"][Math.floor(Math.random() * 5)],
      hairColor: ["#5E3719", "#D6B97B", "#CB607E", "#000000", "#FFFFFF"][Math.floor(Math.random() * 5)],
      accessories: [],
      clothing: { type: "clothing", option: ["tshirt", "formal", "hoodie"][Math.floor(Math.random() * 3)] }
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
