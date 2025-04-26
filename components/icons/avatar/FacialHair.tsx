import React from 'react'

export interface FacialHairProps {
  type: 'none' | 'beard' | 'mustache' | 'goatee' | 'stubble'
  color?: string
  className?: string
}

export function FacialHair({ type, color = '#5A3825', className }: FacialHairProps) {
  // Different facial hair styles based on type
  const renderFacialHair = () => {
    switch (type) {
      case 'beard':
        return (
          <path
            d="M30,65 C30,80 40,90 50,90 C60,90 70,80 70,65 L70,75 C70,85 60,95 50,95 C40,95 30,85 30,75 Z"
            fill={color}
          />
        )
      case 'mustache':
        return (
          <path
            d="M35,65 C40,60 45,65 50,65 C55,65 60,60 65,65 C60,70 55,75 50,75 C45,75 40,70 35,65 Z"
            fill={color}
          />
        )
      case 'goatee':
        return (
          <path
            d="M45,70 C45,80 48,85 50,85 C52,85 55,80 55,70 L55,75 C55,82 52,87 50,87 C48,87 45,82 45,75 Z"
            fill={color}
          />
        )
      case 'stubble':
        return (
          <path
            d="M30,65 C30,80 40,90 50,90 C60,90 70,80 70,65 L70,75 C70,85 60,95 50,95 C40,95 30,85 30,75 Z"
            fill={color}
            opacity="0.3"
          />
        )
      case 'none':
      default:
        return null
    }
  }

  if (type === 'none') {
    return null
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      width="100%"
      height="100%"
    >
      {renderFacialHair()}
    </svg>
  )
}
