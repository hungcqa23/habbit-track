"use client"

import React from 'react'
import { NotionHair, NotionOutfit, NotionFace, NotionAccessories, NotionBackground, NotionEye, NotionMouth } from '@/components/icons/notion'
import type { AvatarFeature } from '@/lib/types'

interface AvatarBuilderProps {
  avatar: {
    faceShape: AvatarFeature
    hair: AvatarFeature
    hairColor: string
    accessories: AvatarFeature[]
    clothing: AvatarFeature
    eyes?: AvatarFeature
    mouth?: AvatarFeature
  }
  size?: number
  className?: string
}

export function AvatarBuilder({ avatar, size = 200, className }: AvatarBuilderProps) {
  const sizeClass = size === 200 ? 'size-[200px]' : '';

  return (
    <div
      className={`relative overflow-hidden rounded-full ${sizeClass} ${className || ''}`}
      style={sizeClass ? {} : { width: size, height: size }}
    >
      <NotionBackground>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 w-full h-full">
            <NotionOutfit
              style={avatar.clothing.option}
            />
          </div>

          <div className="absolute inset-0 w-full h-full">
            <NotionFace
              style={avatar.faceShape.option}
            />
          </div>

          {avatar.eyes && (
            <div className="absolute inset-0 w-full h-full">
              <NotionEye
                style={avatar.eyes.option}
              />
            </div>
          )}

          {avatar.mouth && (
            <div className="absolute inset-0 w-full h-full">
              <NotionMouth
                style={avatar.mouth.option}
              />
            </div>
          )}

          {avatar.hair.option !== 'bald' && (
            <div className="absolute inset-0 w-full h-full">
              <NotionHair
                style={avatar.hair.option}
                color={avatar.hairColor}
              />
            </div>
          )}

          {avatar.accessories.length > 0 && avatar.accessories[0].option !== 'none' && (
            <div className="absolute inset-0 w-full h-full">
              <NotionAccessories
                style={avatar.accessories[0].option}
              />
            </div>
          )}
        </div>
      </NotionBackground>
    </div>
  )
}