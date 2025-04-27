"use client"

import React from 'react'
import Image from 'next/image'
import * as AccessoryStyles from './accessories'

export interface NotionAccessoriesProps {
  style: string
  className?: string
}

export function NotionAccessories({ style, className = '' }: NotionAccessoriesProps) {
  const accessorySrc = getAccessorySrc(style)

  if (!accessorySrc) {
    if (style === 'none') {
      return null
    }

    console.warn(`Accessory style ${style} not found. Available styles:`,
      Object.keys(AccessoryStyles).join(', '))
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="text-xs text-gray-500">Style {style} not found</div>
      </div>
    )
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Image
        src={accessorySrc}
        alt={`Accessory style ${style}`}
        width={306}
        height={306}
        className="w-full h-full object-contain"
        style={{ transform: 'scale(0.95)' }}
        priority
      />
    </div>
  )
}

function getAccessorySrc(style: string): string {
  // Handle 'none' case
  if (style === 'none') {
    return ''
  }

  // Map the style to the corresponding import
  const styleMap: Record<string, any> = {
    'glasses': AccessoryStyles.Glasses.src,
    'roundedglasses': AccessoryStyles.RoundedGlasses.src,
    'futuristicglasses': AccessoryStyles.FuturisticGlasses.src,
    'stylishglasses': AccessoryStyles.StylishGlasses.src,
    'mask': AccessoryStyles.Mask.src,
    'maskgoogle': AccessoryStyles.MaskGoogle.src,
    'cap': AccessoryStyles.Cap.src,
    'earphone': AccessoryStyles.Earphone.src,
    'beard1': AccessoryStyles.Beard1.src,
    'beard2': AccessoryStyles.Beard2.src,
    'beard3': AccessoryStyles.Beard3.src,
    'beard4': AccessoryStyles.Beard4.src,
    'mousthace1': AccessoryStyles.Mousthace1.src,
    'mousthace2': AccessoryStyles.Mousthace2.src,
    'mousthace3': AccessoryStyles.Mousthace3.src,
    'mousthace4': AccessoryStyles.Mousthace4.src,
    'blush': AccessoryStyles.Blush.src,
    'waitresstie': AccessoryStyles.WaitressTie.src
  }

  // Normalize the style input (remove spaces, lowercase)
  const normalizedStyle = style.toLowerCase().replace(/\s+/g, '')

  return styleMap[normalizedStyle] || ''
}
