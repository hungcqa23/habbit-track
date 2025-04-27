"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { NotionAccessories } from '@/components/icons/notion'
import { cn } from '@/lib/utils'

interface NotionAccessoryButtonProps {
  style: string
  isSelected?: boolean
  onClick: (style: string) => void
  className?: string
}

export function NotionAccessoryButton({ style, isSelected, onClick, className }: NotionAccessoryButtonProps) {
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
        {style !== 'none' ? (
          <NotionAccessories style={style} />
        ) : (
          <div className="text-xs text-gray-400">None</div>
        )}
      </div>
      <div className="absolute bottom-1 right-1 text-[8px] text-gray-400">
        {style.replace(/([A-Z])/g, ' $1').trim()}
      </div>
    </Button>
  )
}
