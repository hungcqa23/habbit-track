"use client"

import React from 'react'
import { OutfitButton } from './OutfitButton'

interface OutfitSelectorProps {
  selectedStyle: string
  onSelect: (style: string) => void
  className?: string
}

export function OutfitSelector({ selectedStyle, onSelect, className = '' }: OutfitSelectorProps) {
  // Add all your available outfit styles here
  const outfitStyles = ['01', '02', '04', '05', '22', '24']

  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      {outfitStyles.map((style) => (
        <OutfitButton
          key={style}
          style={style}
          isSelected={selectedStyle === style}
          onClick={onSelect}
        />
      ))}
    </div>
  )
}
