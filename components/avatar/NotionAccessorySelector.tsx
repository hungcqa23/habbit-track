"use client"

import React from 'react'
import { NotionAccessoryButton } from './NotionAccessoryButton'

interface NotionAccessorySelectorProps {
  selectedStyle: string
  onSelect: (style: string) => void
  className?: string
}

export function NotionAccessorySelector({ selectedStyle, onSelect, className = '' }: NotionAccessorySelectorProps) {
  // Available Notion accessory styles
  const accessoryStyles = [
    'none',
    'glasses',
    'roundedGlasses',
    'futuristicGlasses',
    'stylishGlasses',
    'mask',
    'maskGoogle',
    'cap',
    'earphone',
    'beard1',
    'beard2',
    'beard3',
    'beard4',
    'mousthace1',
    'mousthace2',
    'mousthace3',
    'mousthace4',
    'blush'
  ]

  return (
    <div className={`grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto ${className}`}>
      {accessoryStyles.map((style) => (
        <NotionAccessoryButton
          key={style}
          style={style}
          isSelected={selectedStyle === style}
          onClick={onSelect}
        />
      ))}
    </div>
  )
}
