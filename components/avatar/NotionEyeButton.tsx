"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { NotionEye } from '@/components/icons/notion'
import { cn } from '@/lib/utils'

interface NotionEyeButtonProps {
  style: string
  isSelected?: boolean
  onClick: (style: string) => void
  className?: string
}

export function NotionEyeButton({ style, isSelected, onClick, className }: NotionEyeButtonProps) {
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
        <NotionEye style={style} />
      </div>
      <div className="absolute bottom-1 right-1 text-[8px] text-gray-400">
        {style}
      </div>
    </Button>
  )
}
