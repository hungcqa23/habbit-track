"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { ProfileEditor } from "@/components/profile-maker/profile-editor"
import { ProfilePreview } from "@/components/profile-maker/profile-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui"
import { UserCircle, Settings, Eye } from "lucide-react"
import { useProfile } from "@/lib/hooks/use-profile"
import type { Profile } from "@/lib/types"

export default function ProfileMakerPage() {
  const { profile: currentProfile, updateProfile } = useProfile()
  const [editedProfile, setEditedProfile] = useState<Profile>(currentProfile)

  const handleProfileUpdate = (updatedProfile: Partial<Profile>) => {
    setEditedProfile({ ...editedProfile, ...updatedProfile })
  }

  const handleSaveProfile = () => {
    updateProfile(editedProfile)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <AppHeader />
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <span className="bg-primary/10 p-1.5 rounded-md">
              <UserCircle className="h-6 w-6 text-primary" />
            </span>
            Profile Maker
          </h1>
          <p className="text-muted-foreground">Customize your profile to make HabitTrack uniquely yours</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="basic" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Preferences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="mt-0">
                <ProfileEditor
                  profile={editedProfile}
                  onUpdate={handleProfileUpdate}
                  onSave={handleSaveProfile}
                  section="basic"
                />
              </TabsContent>

              <TabsContent value="preferences" className="mt-0">
                <ProfileEditor
                  profile={editedProfile}
                  onUpdate={handleProfileUpdate}
                  onSave={handleSaveProfile}
                  section="preferences"
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:col-span-2">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Preview</h2>
              </div>
              <ProfilePreview profile={editedProfile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
