"use client"

import React from 'react'
import { HairButton } from './HairButton'

interface HairSelectorProps {
  selectedStyle: string
  selectedColor: string
  onSelect: (style: string) => void
  className?: string
}

export function HairSelector({ selectedStyle, selectedColor, onSelect, className = '' }: HairSelectorProps) {
  // All available Notion hair styles
  const hairStyles = [
    'style01', 'style02', 'style04', 'style05', 'style06', 'style07', 'style08', 
    'style09', 'style10', 'style11', 'style12', 'style14', 'style15', 'style16', 
    'style17', 'style18', 'style19', 'style20', 'style21', 'style22', 'style23', 
    'style24', 'style25', 'style26', 'style27', 'style29'
  ]

  return (
    <div className={`grid grid-cols-4 gap-3 max-h-[300px] overflow-y-auto ${className}`}>
      {hairStyles.map((style) => (
        <HairButton
          key={style}
          style={style}
          color={selectedColor}
          isSelected={selectedStyle === style}
          onClick={onSelect}
        />
      ))}
    </div>
  )
}
