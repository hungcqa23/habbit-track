"use client"

import React from 'react'
import { AvatarBuilder } from './AvatarBuilder'
import { OutfitSelector } from './OutfitSelector'
import { Button } from '@/components/ui/button'
import type { AvatarFeature } from '@/lib/types'

interface AvatarCustomizerProps {
  avatar: {
    faceShape: AvatarFeature
    hair: AvatarFeature
    hairColor: string
    accessories: AvatarFeature[]
    clothing: AvatarFeature
    eyes?: AvatarFeature
    mouth?: AvatarFeature
  }
  onUpdate: (updates: Partial<typeof avatar>) => void
}

export function AvatarCustomizer({ avatar, onUpdate }: AvatarCustomizerProps) {
  const handleOutfitSelect = (style: string) => {
    onUpdate({
      clothing: {
        ...avatar.clothing,
        option: style
      }
    })
  }

  const categories = [
    { name: 'Face', active: true },
    { name: 'Hair', active: false },
    { name: 'Style', active: false },
  ]

  return (
    <div className="flex flex-col gap-6">
      <AvatarBuilder
        avatar={avatar}
        className="rounded-full"
      />

      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant="outline"
            className={`aspect-square size-8 p-0 ${
              category.active ? 'border-primary border-2' : ''
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Outfit Style</h3>
        <OutfitSelector
          selectedStyle={avatar.clothing.option}
          onSelect={handleOutfitSelect}
        />
      </div>
    </div>
  )
}


