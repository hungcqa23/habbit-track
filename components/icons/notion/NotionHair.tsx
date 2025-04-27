"use client"

import React from 'react'
import Image from 'next/image'
import * as HairStyles from './hair'

export interface NotionHairProps {
  style: string
  color?: string
  className?: string
}

export function NotionHair({ style, color = '#000000', className = '' }: NotionHairProps) {
  const hairSrc = getHairSrc(style)

  if (!hairSrc) {
    return null
  }

  // Calculate CSS variables for custom colors
  const cssVars = getCssVarsForColor(color)

  return (
    <div
      className={`w-full h-full ${className}`}
      style={cssVars}
    >
      <Image
        src={hairSrc}
        alt={`Hair style ${style}`}
        width={306}
        height={306}
        className="w-full h-full object-contain"
        style={{
          filter: getColorFilter(color),
          transform: 'scale(0.95)'
        }}
        priority
      />
    </div>
  )
}

function getHairSrc(style: string): string {
  const styleMap: Record<string, any> = {
    'style01': HairStyles.Style01.src,
    'style02': HairStyles.Style02.src,
    'style04': HairStyles.Style04.src,
    'style05': HairStyles.Style05.src,
    'style06': HairStyles.Style06.src,
    'style07': HairStyles.Style07.src,
    'style08': HairStyles.Style08.src,
    'style09': HairStyles.Style09.src,
    'style10': HairStyles.Style10.src,
    'style11': HairStyles.Style11.src,
    'style12': HairStyles.Style12.src,
    'style14': HairStyles.Style14.src,
    'style15': HairStyles.Style15.src,
    'style16': HairStyles.Style16.src,
    'style17': HairStyles.Style17.src,
    'style18': HairStyles.Style18.src,
    'style19': HairStyles.Style19.src,
    'style20': HairStyles.Style20.src,
    'style21': HairStyles.Style21.src,
    'style22': HairStyles.Style22.src,
    'style23': HairStyles.Style23.src,
    'style24': HairStyles.Style24.src,
    'style25': HairStyles.Style25.src,
    'style26': HairStyles.Style26.src,
    'style27': HairStyles.Style27.src,
    'style29': HairStyles.Style29.src,
  }

  return styleMap[style.toLowerCase()] || ''
}

function getCssVarsForColor(color: string): React.CSSProperties {
  if (color === '#000000') {
    return {}
  }

  // Convert hex to HSL for better color manipulation
  const hsl = hexToHSL(color)

  return {
    '--hue-rotate': `${hsl.h}deg`,
    '--saturate': `${hsl.s / 100 * 5}`,
  } as React.CSSProperties
}

function hexToHSL(hex: string): { h: number, s: number, l: number } {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }

    h *= 60
  }

  return { h, s: s * 100, l: l * 100 }
}

function getColorFilter(color: string): string {
  // For common hair colors, use predefined filters
  const colorFilters: Record<string, string> = {
    '#5E3719': 'none', // Brown (default)
    '#D6B97B': 'sepia(50%) saturate(1.5) brightness(1.2) hue-rotate(10deg)', // Blonde
    '#CB607E': 'sepia(50%) saturate(2) hue-rotate(300deg)', // Pink
    '#000000': 'brightness(0.5) contrast(1.5)', // Black
    '#FFFFFF': 'brightness(1.5) contrast(0.8) saturate(0)', // White
    '#FF0000': 'sepia(100%) saturate(5) hue-rotate(0deg)', // Red
    '#663399': 'sepia(100%) saturate(5) hue-rotate(260deg)', // Purple
    '#4169E1': 'sepia(100%) saturate(5) hue-rotate(220deg)', // Blue
  }

  if (colorFilters[color]) {
    return colorFilters[color]
  }

  // For other colors, create a generic filter
  return 'grayscale(100%) brightness(1.2) sepia(100%) hue-rotate(var(--hue-rotate)) saturate(var(--saturate))'
}
