"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Link2, Briefcase, Clock, Calendar, User, Shield, Eye, Bell } from "lucide-react"
import type { Profile } from "@/lib/types"

interface ProfilePreviewProps {
  profile: Profile
}

export function ProfilePreview({ profile }: ProfilePreviewProps) {
  // Format join date
  const formatJoinDate = () => {
    const date = new Date()
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date)
  }

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="h-24 bg-gradient-to-r from-primary/40 via-primary/30 to-primary/20 relative">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <CardHeader className="pt-0 pb-4">
        <div className="-mt-12 flex justify-center">
          <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
            <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
            <AvatarFallback className="text-3xl bg-primary/20">{getInitials(profile.name)}</AvatarFallback>
          </Avatar>
        </div>

        <CardTitle className="text-center text-2xl mt-3">{profile.name}</CardTitle>

        {profile.occupation && (
          <div className="flex justify-center mt-1">
            <Badge variant="outline" className="flex items-center gap-1.5">
              <Briefcase className="h-3 w-3" />
              {profile.occupation}
            </Badge>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {profile.badges?.map((badge, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5 px-3 py-1"
            >
              <Shield className="h-3 w-3" />
              {badge}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="text-center pb-2">
        <p className="text-sm text-muted-foreground">{profile.bio}</p>
      </CardContent>

      <CardContent className="pt-0 pb-4">
        <div className="space-y-2">
          {profile.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{profile.location}</span>
            </div>
          )}

          {profile.website && (
            <div className="flex items-center gap-2 text-sm">
              <Link2 className="h-4 w-4 text-muted-foreground" />
              <a href={profile.website} className="text-primary hover:underline truncate">
                {profile.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}

          {profile.timezone && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{profile.timezone}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Joined {formatJoinDate()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 flex flex-col items-start gap-2">
        <div className="w-full">
          <h3 className="text-sm font-medium mb-2">Preferences</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-xs bg-muted/50 p-2 rounded-md">
              <Bell className="h-3 w-3 text-primary" />
              <span>{profile.preferences?.emailNotifications ? "Email On" : "Email Off"}</span>
            </div>

            <div className="flex items-center gap-2 text-xs bg-muted/50 p-2 rounded-md">
              <Eye className="h-3 w-3 text-primary" />
              <span>{profile.preferences?.profileVisibility || "Public"} Profile</span>
            </div>

            <div className="flex items-center gap-2 text-xs bg-muted/50 p-2 rounded-md">
              <User className="h-3 w-3 text-primary" />
              <span>{profile.preferences?.theme || "System"} Theme</span>
            </div>

            <div className="flex items-center gap-2 text-xs bg-muted/50 p-2 rounded-md">
              <Shield className="h-3 w-3 text-primary" />
              <span>{profile.preferences?.activityVisibility || 50}% Activity</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
