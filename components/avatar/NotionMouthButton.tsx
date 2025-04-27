"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { NotionMouth } from '@/components/icons/notion'
import { cn } from '@/lib/utils'

interface NotionMouthButtonProps {
  style: string
  isSelected?: boolean
  onClick: (style: string) => void
  className?: string
}

export function NotionMouthButton({ style, isSelected, onClick, className }: NotionMouthButtonProps) {
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
        <NotionMouth style={style} />
      </div>
      <div className="absolute bottom-1 right-1 text-[8px] text-gray-400">
        {style}
      </div>
    </Button>
  )
}
