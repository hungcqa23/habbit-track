"use client"

import { AvatarBuilder } from './AvatarBuilder'
import { useProfile } from '@/lib/hooks/use-profile'

interface UserAvatarProps {
  size?: number
  className?: string
}

export function UserAvatar({ size = 40, className }: UserAvatarProps) {
  const { profile } = useProfile()

  // If profile doesn't have avatar data yet, return a placeholder
  if (!profile.avatar) {
    return (
      <div
        className={`bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold ${className}`}
        style={{ width: size, height: size }}
      >
        {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
      </div>
    )
  }

  return (
    <AvatarBuilder
      avatar={profile.avatar}
      size={size}
      className={`rounded-full ${className || ''}`}
    />
  )
}
