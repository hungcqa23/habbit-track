"use client"

import React from 'react'
import { NotionMouthButton } from './NotionMouthButton'

interface NotionMouthSelectorProps {
  selectedStyle: string
  onSelect: (style: string) => void
  className?: string
}

export function NotionMouthSelector({ selectedStyle, onSelect, className = '' }: NotionMouthSelectorProps) {
  // Available Notion mouth styles
  const mouthStyles = [
    'normalSmile1',
    'normalSmile2',
    'openMouth',
    'openTooth',
    'eat',
    'whistle',
    'angry',
    'sad',
    'hate',
    'nervous',
    'mouth11'
  ]

  return (
    <div className={`grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto ${className}`}>
      {mouthStyles.map((style) => (
        <NotionMouthButton
          key={style}
          style={style}
          isSelected={selectedStyle === style}
          onClick={onSelect}
        />
      ))}
    </div>
  )
}
