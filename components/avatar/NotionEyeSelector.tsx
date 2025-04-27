"use client"

import React from 'react'
import { NotionEyeButton } from './NotionEyeButton'

interface NotionEyeSelectorProps {
  selectedStyle: string
  onSelect: (style: string) => void
  className?: string
}

export function NotionEyeSelector({ selectedStyle, onSelect, className = '' }: NotionEyeSelectorProps) {
  // Available Notion eye styles
  const eyeStyles = [
    'normal',
    'closed',
    'thin',
    'angry',
    'cynic',
    'sad'
  ]

  return (
    <div className={`grid grid-cols-3 gap-3 ${className}`}>
      {eyeStyles.map((style) => (
        <NotionEyeButton
          key={style}
          style={style}
          isSelected={selectedStyle === style}
          onClick={onSelect}
        />
      ))}
    </div>
  )
}
