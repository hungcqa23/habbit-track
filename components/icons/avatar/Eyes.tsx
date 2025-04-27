// This file is intentionally empty to satisfy imports
// All avatar components have been moved to the Notion-style components

import React from 'react'

export interface EyesProps {
  type: string
  color?: string
  className?: string
}

export function Eyes({ type, color, className }: EyesProps) {
  console.warn('Eyes component is deprecated. Please use NotionEye instead.')
  return null
}
