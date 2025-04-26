import React from 'react'

export interface FaceProps {
  shape: 'round' | 'oval' | 'square' | 'heart' | 'diamond'
  skinColor: string
  className?: string
}

export function Face({ shape, skinColor, className }: FaceProps) {
  // Different path definitions based on face shape
  const shapePath = () => {
    switch (shape) {
      case 'oval':
        return (
          <ellipse cx="50" cy="50" rx="40" ry="45" fill={skinColor} />
        )
      case 'square':
        return (
          <rect x="10" y="10" width="80" height="80" rx="15" fill={skinColor} />
        )
      case 'heart':
        return (
          <path
            d="M50,90 C80,70 95,40 95,20 C95,10 85,5 75,5 C65,5 55,15 50,25 C45,15 35,5 25,5 C15,5 5,10 5,20 C5,40 20,70 50,90 Z"
            fill={skinColor}
            transform="scale(0.8) translate(12, 0)"
          />
        )
      case 'diamond':
        return (
          <rect
            x="50"
            y="50"
            width="60"
            height="60"
            fill={skinColor}
            transform="translate(-30, -30) rotate(45, 50, 50)"
          />
        )
      case 'round':
      default:
        return (
          <circle cx="50" cy="50" r="45" fill={skinColor} />
        )
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      width="100%"
      height="100%"
    >
      {shapePath()}
    </svg>
  )
}
