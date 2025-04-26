"use client"

import type { AvatarFeature } from "@/lib/types"
import { AvatarBuilder } from "@/components/avatar"

interface AvatarPreviewProps {
  avatar: {
    faceShape: AvatarFeature
    eyes: AvatarFeature
    eyebrows: AvatarFeature
    nose: AvatarFeature
    mouth: AvatarFeature
    hair: AvatarFeature
    facialHair: AvatarFeature
    skinColor: string
    hairColor: string
    accessories: AvatarFeature[]
    clothing: AvatarFeature
  }
}

export function AvatarPreview({ avatar }: AvatarPreviewProps) {
  return (
    <div className="flex items-center justify-center">
      <AvatarBuilder
        avatar={avatar}
        size={200}
        className="shadow-lg"
      />
    </div>
  )
}
