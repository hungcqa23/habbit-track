import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Settings, Trophy, Star, Award } from "lucide-react"
import type { Profile } from "@/lib/types"

interface ProfileCardProps {
  profile: Profile
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="h-32 bg-gradient-to-r from-primary/40 via-primary/30 to-primary/20 relative">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
      </div>
      <CardHeader className="pt-0 pb-4">
        <div className="-mt-16 flex justify-center">
          <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="text-3xl bg-primary/20">{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-center text-2xl mt-3">{profile.name}</CardTitle>
        <div className="flex items-center justify-center gap-2 mt-1">
          <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5" />
            Level {profile.level}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {profile.badges.map((badge, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5 px-3 py-1"
            >
              {index % 2 === 0 ? <Star className="h-3 w-3" /> : <Award className="h-3 w-3" />}
              {badge}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="text-center pb-2">
        <p className="text-sm text-muted-foreground">{profile.bio}</p>
      </CardContent>
      <CardFooter className="flex justify-center gap-2 pt-0 pb-6">
        <Button variant="outline" size="sm" className="gap-1 rounded-full px-4">
          <Edit className="h-3.5 w-3.5" />
          Edit Profile
        </Button>
        <Button variant="ghost" size="sm" className="gap-1 rounded-full px-4">
          <Settings className="h-3.5 w-3.5" />
          Settings
        </Button>
      </CardFooter>
    </Card>
  )
}
