"use client"

import React from 'react'
import { NotionFaceButton } from './NotionFaceButton'

interface NotionFaceSelectorProps {
  selectedStyle: string
  onSelect: (style: string) => void
  className?: string
}

export function NotionFaceSelector({ selectedStyle, onSelect, className = '' }: NotionFaceSelectorProps) {
  // Available Notion face styles
  const faceStyles = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '07',
    '08'
  ]

  return (
    <div className={`grid grid-cols-3 gap-3 ${className}`}>
      {faceStyles.map((style) => (
        <NotionFaceButton
          key={style}
          style={style}
          isSelected={selectedStyle === style}
          onClick={onSelect}
        />
      ))}
    </div>
  )
}
