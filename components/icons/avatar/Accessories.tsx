// This file is intentionally empty to satisfy imports
// All avatar components have been moved to the Notion-style components

import React from 'react'

export interface AccessoriesProps {
  type: string
  color?: string
  className?: string
}

export function Accessories({ type, color, className }: AccessoriesProps) {
  console.warn('Accessories component is deprecated. Please use NotionAccessories instead.')
  return null
}
