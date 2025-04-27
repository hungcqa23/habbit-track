"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { NotionHair } from '@/components/icons/notion'
import { cn } from '@/lib/utils'

interface HairButtonProps {
  style: string
  isSelected?: boolean
  onClick: (style: string) => void
  className?: string
  color?: string
}

export function HairButton({ style, isSelected, onClick, className, color = '#000000' }: HairButtonProps) {
  console.log(`Rendering HairButton with style: ${style}`)
  return (
    <Button
      variant="outline"
      className={cn(
        'aspect-square w-full p-0 overflow-hidden relative',
        isSelected && 'border-primary border-2',
        className
      )}
      onClick={() => onClick(style)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <NotionHair style={style} color={color} />
      </div>
      <div className="absolute bottom-1 right-1 text-[8px] text-gray-400">
        {style.replace('style', '')}
      </div>
    </Button>
  )
}
