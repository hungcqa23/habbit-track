"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { NotionOutfit } from '@/components/icons/notion'
import { cn } from '@/lib/utils'

interface OutfitButtonProps {
  style: string
  isSelected?: boolean
  onClick: (style: string) => void
  className?: string
}

export function OutfitButton({ style, isSelected, onClick, className }: OutfitButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        'aspect-square w-full p-0 overflow-hidden',
        isSelected && 'border-primary border-2',
        className
      )}
      onClick={() => onClick(style)}
    >
      <div className="absolute inset-0 flex items-end">
        <NotionOutfit style={style} />
      </div>
    </Button>
  )
}
