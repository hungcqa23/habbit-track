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
import type { AvatarFeature } from '@/screens/profile-setup/hooks/useProfileSetup'

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
  return (
    <div 
      className={className}
      style={{ 
        position: 'relative', 
        width: size, 
        height: size,
        overflow: 'hidden',
        borderRadius: '50%',
        backgroundColor: '#f0f0f0'
      }}
    >
      {/* Base layers */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Face 
          shape={avatar.faceShape.option as any} 
          skinColor={avatar.skinColor} 
        />
      </div>
      
      {/* Hair (behind face for some styles) */}
      {avatar.hair.option !== 'bald' && avatar.hair.option === 'long' && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <Hair 
            type={avatar.hair.option as any} 
            color={avatar.hairColor} 
          />
        </div>
      )}
      
      {/* Face features */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Eyebrows 
          type={avatar.eyebrows.option as any} 
          color={avatar.hairColor} 
        />
      </div>
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Eyes 
          type={avatar.eyes.option as any} 
        />
      </div>
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Nose 
          type={avatar.nose.option as any} 
        />
      </div>
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Mouth 
          type={avatar.mouth.option as any} 
        />
      </div>
      
      {/* Hair (on top for most styles) */}
      {avatar.hair.option !== 'bald' && avatar.hair.option !== 'long' && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <Hair 
            type={avatar.hair.option as any} 
            color={avatar.hairColor} 
          />
        </div>
      )}
      
      {/* Facial hair */}
      {avatar.facialHair.option !== 'none' && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <FacialHair 
            type={avatar.facialHair.option as any} 
            color={avatar.hairColor} 
          />
        </div>
      )}
      
      {/* Accessories */}
      {avatar.accessories.length > 0 && avatar.accessories[0].option !== 'none' && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <Accessories 
            type={avatar.accessories[0].option as any} 
          />
        </div>
      )}
      
      {/* Clothing */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%' }}>
        <Clothing 
          type={avatar.clothing.option as any} 
        />
      </div>
    </div>
  )
}
