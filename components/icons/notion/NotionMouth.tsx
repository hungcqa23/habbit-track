"use client"

import React from 'react'
import Image from 'next/image'
import * as MouthStyles from './mouth'

export interface NotionMouthProps {
  style: string
  className?: string
}

export function NotionMouth({ style, className = '' }: NotionMouthProps) {
  const mouthSrc = getMouthSrc(style)

  if (!mouthSrc) {
    if (style === 'none') {
      return null
    }

    console.warn(`Mouth style ${style} not found. Available styles:`,
      Object.keys(MouthStyles).join(', '))
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="text-xs text-gray-500">Style {style} not found</div>
      </div>
    )
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Image
        src={mouthSrc}
        alt={`Mouth style ${style}`}
        width={306}
        height={306}
        className="w-full h-full object-contain"
        style={{ transform: 'scale(0.95)' }}
        priority
      />
    </div>
  )
}

function getMouthSrc(style: string): string {
  // Handle 'none' case
  if (style === 'none') {
    return ''
  }

  // Map the style to the corresponding import
  const styleMap: Record<string, any> = {
    'normalSmile1': MouthStyles.NormalSmile1.src,
    'normalSmile2': MouthStyles.NormalSmile2.src,
    'openMouth': MouthStyles.OpenMouth.src,
    'openTooth': MouthStyles.OpenTooth.src,
    'eat': MouthStyles.Eat.src,
    'whistle': MouthStyles.Whistle.src,
    'angry': MouthStyles.Angry.src,
    'sad': MouthStyles.Sad.src,
    'hate': MouthStyles.Hate.src,
    'nervous': MouthStyles.Nervous.src,
    'mouth11': MouthStyles.Mouth11.src
  }

  return styleMap[style] || ''
}
