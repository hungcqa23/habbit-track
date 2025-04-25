"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { AvatarUploader } from "@/components/profile-maker/avatar-uploader"
import { User, AtSign, MapPin, Link2, Briefcase, Save, Palette, Bell, Clock, Globe } from "lucide-react"
import type { Profile } from "@/lib/types"

interface ProfileEditorProps {
  profile: Profile
  onUpdate: (updatedProfile: Partial<Profile>) => void
  onSave: () => void
  section: "basic" | "preferences"
}

export function ProfileEditor({ profile, onUpdate, onSave, section }: ProfileEditorProps) {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      onSave()
      setIsSaving(false)
    }, 800)
  }

  const handleAvatarChange = (avatarUrl: string) => {
    onUpdate({ avatar: avatarUrl })
  }

  if (section === "basic") {
    return (
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update your personal information and profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <AvatarUploader currentAvatar={profile.avatar} onAvatarChange={handleAvatarChange} />
            <p className="text-sm text-muted-foreground mt-2">Upload a square image, at least 200x200px</p>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Display Name
              </Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                placeholder="Your name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio" className="flex items-center gap-2">
                <AtSign className="h-4 w-4 text-primary" />
                Bio
              </Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => onUpdate({ bio: e.target.value })}
                placeholder="Tell us about yourself"
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={profile.location || ""}
                  onChange={(e) => onUpdate({ location: e.target.value })}
                  placeholder="City, Country"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="timezone" className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Timezone
                </Label>
                <Select value={profile.timezone || "UTC"} onValueChange={(value) => onUpdate({ timezone: value })}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                    <SelectItem value="UTC+8">China Standard Time (UTC+8)</SelectItem>
                    <SelectItem value="UTC+9">Japan Standard Time (UTC+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-primary" />
                Website
              </Label>
              <Input
                id="website"
                value={profile.website || ""}
                onChange={(e) => onUpdate({ website: e.target.value })}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="occupation" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                Occupation
              </Label>
              <Input
                id="occupation"
                value={profile.occupation || ""}
                onChange={(e) => onUpdate({ occupation: e.target.value })}
                placeholder="Your job title"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Customize your experience and notification settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Appearance
          </h3>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="theme">Theme Preference</Label>
              <Select
                value={profile.preferences?.theme || "system"}
                onValueChange={(value) =>
                  onUpdate({
                    preferences: { ...profile.preferences, theme: value },
                  })
                }
              >
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="accentColor">Accent Color</Label>
              <Select
                value={profile.preferences?.accentColor || "default"}
                onValueChange={(value) =>
                  onUpdate({
                    preferences: { ...profile.preferences, accentColor: value },
                  })
                }
              >
                <SelectTrigger id="accentColor">
                  <SelectValue placeholder="Select accent color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="pink">Pink</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates and reminders via email</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={profile.preferences?.emailNotifications || false}
                onCheckedChange={(checked) =>
                  onUpdate({
                    preferences: { ...profile.preferences, emailNotifications: checked },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
              </div>
              <Switch
                id="pushNotifications"
                checked={profile.preferences?.pushNotifications || false}
                onCheckedChange={(checked) =>
                  onUpdate({
                    preferences: { ...profile.preferences, pushNotifications: checked },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Privacy
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="profileVisibility">Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">Control who can see your profile</p>
              </div>
              <Select
                value={profile.preferences?.profileVisibility || "public"}
                onValueChange={(value) =>
                  onUpdate({
                    preferences: { ...profile.preferences, profileVisibility: value },
                  })
                }
              >
                <SelectTrigger id="profileVisibility" className="w-[180px]">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="friends">Friends Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="activityVisibility">Activity Visibility</Label>
                <span className="text-sm text-muted-foreground">{profile.preferences?.activityVisibility || 50}%</span>
              </div>
              <Slider
                id="activityVisibility"
                defaultValue={[profile.preferences?.activityVisibility || 50]}
                max={100}
                step={10}
                onValueChange={(value) =>
                  onUpdate({
                    preferences: { ...profile.preferences, activityVisibility: value[0] },
                  })
                }
              />
              <p className="text-xs text-muted-foreground">Control how much of your activity is visible to others</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      </CardFooter>
    </Card>
  )
}
