"use client"

import { useState } from "react"
import { useProfile } from "@/lib/hooks/use-profile"
import { useToast } from "@/components/ui/use-toast"

export function useProfileContent() {
  const { profile, updateProfile, addRewardTransaction } = useProfile()
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [newBio, setNewBio] = useState(profile.bio)
  const { toast } = useToast()

  const handleSaveBio = () => {
    updateProfile({ ...profile, bio: newBio })
    setIsEditingBio(false)
    
    toast({
      title: "Profile Updated",
      description: "Your bio has been updated successfully.",
    })
  }

  const handleCancelEdit = () => {
    setNewBio(profile.bio)
    setIsEditingBio(false)
  }

  return {
    profile,
    isEditingBio,
    setIsEditingBio,
    newBio,
    setNewBio,
    handleSaveBio,
    handleCancelEdit,
    addRewardTransaction
  }
}
