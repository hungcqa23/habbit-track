"use client"

import React from 'react'
import Image from 'next/image'
import * as EyeStyles from './eye'

export interface NotionEyeProps {
  style: string
  className?: string
}

export function NotionEye({ style, className = '' }: NotionEyeProps) {
  const eyeSrc = getEyeSrc(style)

  if (!eyeSrc) {
    if (style === 'none') {
      return null
    }

    console.warn(`Eye style ${style} not found. Available styles:`,
      Object.keys(EyeStyles).join(', '))
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="text-xs text-gray-500">Style {style} not found</div>
      </div>
    )
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Image
        src={eyeSrc}
        alt={`Eye style ${style}`}
        width={306}
        height={306}
        className="w-full h-full object-contain"
        style={{ transform: 'scale(0.95)' }}
        priority
      />
    </div>
  )
}

function getEyeSrc(style: string): string {
  // Handle 'none' case
  if (style === 'none') {
    return ''
  }

  // Normalize the style input (capitalize first letter)
  const normalizedStyle = style.charAt(0).toUpperCase() + style.slice(1).toLowerCase()

  // Map the normalized style to the corresponding import
  const styleMap: Record<string, any> = {
    'Normal': EyeStyles.Normal.src,
    'Closed': EyeStyles.Closed.src,
    'Thin': EyeStyles.Thin.src,
    'Angry': EyeStyles.Angry.src,
    'Cynic': EyeStyles.Cynic.src,
    'Sad': EyeStyles.Sad.src
  }

  return styleMap[normalizedStyle] || ''
}
