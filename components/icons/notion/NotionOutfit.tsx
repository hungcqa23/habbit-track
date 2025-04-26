"use client"

import React from 'react'
import Image from 'next/image'

export interface NotionOutfitProps {
  style: string
  className?: string
}

export function NotionOutfit({ style, className = '' }: NotionOutfitProps) {
  const getOutfitSrc = (style: string) => {
    return `/notion/outfit/Style${style}.svg`
  }

  const outfitSrc = getOutfitSrc(style)

  return (
    <div className={`w-full h-full ${className}`}>
      <Image
        src={outfitSrc}
        alt={`Outfit style ${style}`}
        width={306}
        height={306}
        className="w-full h-full object-contain"
      />
    </div>
  )
}