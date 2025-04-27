// This file is intentionally empty to satisfy imports
// All avatar components have been moved to the Notion-style components

import React from 'react'

export interface FaceProps {
  shape: string
  skinColor: string
  className?: string
}

export function Face({ shape, skinColor, className }: FaceProps) {
  console.warn('Face component is deprecated. Please use NotionFace instead.')
  return null
}
