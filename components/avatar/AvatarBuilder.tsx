"use client"

import React from 'react'
import {
  Face,
  Eyes,
  Eyebrows,
  Nose,
  Mouth,
  Hair,
  FacialHair,
  Accessories,
  Clothing
} from '@/components/icons/avatar'
import type { AvatarFeature } from '@/lib/types'

interface AvatarBuilderProps {
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
  size?: number
  className?: string
}

export function AvatarBuilder({ avatar, size = 200, className }: AvatarBuilderProps) {
  const sizeClass = size === 200 ? 'size-[200px]' : '';

  return (
    <div
      className={`relative overflow-hidden ${sizeClass} ${className || ''}`}
      style={sizeClass ? {} : { width: size, height: size }}
    >
      <div className="absolute inset-0 w-full h-full">
        <Face
          shape={avatar.faceShape.option as any}
          skinColor={avatar.skinColor}
        />
      </div>

      {avatar.hair.option !== 'bald' && avatar.hair.option === 'long' && (
        <div className="absolute inset-0 w-full h-full">
          <Hair
            type={avatar.hair.option as any}
            color={avatar.hairColor}
          />
        </div>
      )}

      <div className="absolute inset-0 w-full h-full">
        <Eyebrows
          type={avatar.eyebrows.option as any}
          color={avatar.hairColor}
        />
      </div>

      <div className="absolute inset-0 w-full h-full">
        <Eyes
          type={avatar.eyes.option as any}
        />
      </div>

      <div className="absolute inset-0 w-full h-full">
        <Nose
          type={avatar.nose.option as any}
        />
      </div>

      <div className="absolute inset-0 w-full h-full">
        <Mouth
          type={avatar.mouth.option as any}
        />
      </div>

      {avatar.hair.option !== 'bald' && avatar.hair.option !== 'long' && (
        <div className="absolute inset-0 w-full h-full">
          <Hair
            type={avatar.hair.option as any}
            color={avatar.hairColor}
          />
        </div>
      )}

      {avatar.facialHair.option !== 'none' && (
        <div className="absolute inset-0 w-full h-full">
          <FacialHair
            type={avatar.facialHair.option as any}
            color={avatar.hairColor}
          />
        </div>
      )}

      {avatar.accessories.length > 0 && avatar.accessories[0].option !== 'none' && (
        <div className="absolute inset-0 w-full h-full">
          <Accessories
            type={avatar.accessories[0].option as any}
          />
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full h-2/5">
        <Clothing
          type={avatar.clothing.option as any}
        />
      </div>
    </div>
  )
}
