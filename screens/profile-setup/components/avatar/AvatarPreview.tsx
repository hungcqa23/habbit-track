"use client"

import type { AvatarFeature } from "@/lib/types"
import { AvatarBuilder } from "@/components/avatar"

interface AvatarPreviewProps {
  avatar: {
    faceShape: AvatarFeature
    hair: AvatarFeature
    hairColor: string
    accessories: AvatarFeature[]
    clothing: AvatarFeature
    eyes?: AvatarFeature
    mouth?: AvatarFeature
  }
}

export function AvatarPreview({ avatar }: AvatarPreviewProps) {
  return (
    <div className="flex items-center justify-center">
      <AvatarBuilder
        avatar={avatar}
        size={200}
        className="rounded-full"
      />
    </div>
  )
}
