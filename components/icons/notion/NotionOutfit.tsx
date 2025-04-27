"use client"

import React from 'react'
import Image from 'next/image'
import * as OutfitStyles from './outfit'

export interface NotionOutfitProps {
  style: string
  className?: string
  color?: string
}

export function NotionOutfit({ style, className = '', color }: NotionOutfitProps) {
  console.log(`Rendering NotionOutfit with style: ${style}`)
  const outfitSrc = getOutfitSrc(style)

  if (!outfitSrc) {
    console.warn(`Outfit style ${style} not found. Available styles:`,
      Object.keys(OutfitStyles).join(', '))
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="text-xs text-gray-500">Style {style} not found</div>
      </div>
    )
  }

  // Apply color filter if color is provided
  const filterStyle = color ? { filter: getColorFilter(color) } : {}

  return (
    <div className={`w-full h-full ${className}`}>
      <Image
        src={outfitSrc}
        alt={`Outfit style ${style}`}
        width={306}
        height={306}
        className="w-full h-full object-contain object-center"
        style={{
          ...filterStyle,
          transform: 'scale(0.95) translateY(5%)'
        }}
        priority
      />
    </div>
  )
}

function getOutfitSrc(style: string): string {
  // Normalize the style input - handle both "01" and "style01" formats
  const normalizedStyle = style.toLowerCase().startsWith('style')
    ? style.toLowerCase()
    : `style${style.toLowerCase()}`

  const styleMap: Record<string, any> = {
    'style01': OutfitStyles.Style01.src,
    'style02': OutfitStyles.Style02.src,
    'style03': OutfitStyles.Style03.src,
    'style04': OutfitStyles.Style04.src,
    'style05': OutfitStyles.Style05.src,
    'style06': OutfitStyles.Style06.src,
    'style07': OutfitStyles.Style07.src,
    'style08': OutfitStyles.Style08.src,
    'style10': OutfitStyles.Style10.src,
    'style11': OutfitStyles.Style11.src,
    'style12': OutfitStyles.Style12.src,
    'style14': OutfitStyles.Style14.src,
    'style16': OutfitStyles.Style16.src,
    'style18': OutfitStyles.Style18.src,
    'style20': OutfitStyles.Style20.src,
    'style21': OutfitStyles.Style21.src,
    'style22': OutfitStyles.Style22.src,
    'style23': OutfitStyles.Style23.src,
    'style24': OutfitStyles.Style24.src,
    'style25': OutfitStyles.Style25.src,
  }

  return styleMap[normalizedStyle] || ''
}

function getColorFilter(color: string): string {
  // For common outfit colors, use predefined filters
  const colorFilters: Record<string, string> = {
    '#000000': 'brightness(0.5) contrast(1.5)', // Black
    '#FFFFFF': 'brightness(1.5) contrast(0.8) saturate(0)', // White
    '#FF0000': 'sepia(100%) saturate(5) hue-rotate(0deg)', // Red
    '#663399': 'sepia(100%) saturate(5) hue-rotate(260deg)', // Purple
    '#4169E1': 'sepia(100%) saturate(5) hue-rotate(220deg)', // Blue
  }

  if (colorFilters[color]) {
    return colorFilters[color]
  }

  // For other colors, create a generic filter based on the hex color
  const hsl = hexToHSL(color)
  return `grayscale(100%) brightness(1.2) sepia(100%) hue-rotate(${hsl.h}deg) saturate(${hsl.s / 100 * 5})`
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