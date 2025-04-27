"use client"

import React from 'react'
import Image from 'next/image'

export interface NotionBackgroundProps {
  className?: string
  children?: React.ReactNode
}

export function NotionBackground({ className = '', children }: NotionBackgroundProps) {
  return (
    <div className={`w-full h-full relative rounded-full ${className}`}>
      <Image
        src="/notion/background.svg"
        alt="Notion Avatar Background"
        width={306}
        height={306}
        className="w-full h-full object-contain rounded-full"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'scale(0.7)' }}>
        {children}
      </div>
    </div>
  )
}
