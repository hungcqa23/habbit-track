"use client"

import React from 'react'
import Image from 'next/image'
import * as FaceStyles from './faces'

export interface NotionFaceProps {
  style: string
  className?: string
}

export function NotionFace({ style, className = '' }: NotionFaceProps) {
  const faceSrc = getFaceSrc(style)

  if (!faceSrc) {
    console.warn(`Face style ${style} not found. Available styles:`,
      Object.keys(FaceStyles).join(', '))
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="text-xs text-gray-500">Style {style} not found</div>
      </div>
    )
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Image
        src={faceSrc}
        alt={`Face style ${style}`}
        width={306}
        height={306}
        className="w-full h-full object-contain"
        style={{ transform: 'scale(0.95)' }}
        priority
      />
    </div>
  )
}

function getFaceSrc(style: string): string {
  // Normalize the style input - handle both "01" and "head01" formats
  const normalizedStyle = style.toLowerCase().startsWith('head')
    ? style.toLowerCase()
    : `head${style.toLowerCase()}`

  // Map the normalized style to the corresponding import
  const styleMap: Record<string, any> = {
    'head01': FaceStyles.Head01.src,
    'head02': FaceStyles.Head02.src,
    'head03': FaceStyles.Head03.src,
    'head04': FaceStyles.Head04.src,
    'head05': FaceStyles.Head05.src,
    'head07': FaceStyles.Head07.src,
    'head08': FaceStyles.Head08.src,
  }

  return styleMap[normalizedStyle] || ''
}
