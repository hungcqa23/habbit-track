"use client"

import React from 'react'
import { OutfitButton } from './OutfitButton'

interface OutfitSelectorProps {
  selectedStyle: string
  onSelect: (style: string) => void
  className?: string
}

export function OutfitSelector({ selectedStyle, onSelect, className = '' }: OutfitSelectorProps) {
  // All available Notion outfit styles
  const outfitStyles = [
    '01', '02', '03', '04', '05', '06', '07', '08',
    '10', '11', '12', '14', '16', '18', '20',
    '21', '22', '23', '24', '25'
  ]

  return (
    <div className={`grid grid-cols-4 gap-3 max-h-[300px] overflow-y-auto ${className}`}>
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
