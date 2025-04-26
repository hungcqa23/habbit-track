import React from 'react'

export interface NoseProps {
  type: 'default' | 'round' | 'pointed' | 'small' | 'wide'
  color?: string
  className?: string
}

export function Nose({ type, color = '#D1A080', className }: NoseProps) {
  // Different nose styles based on type
  const renderNose = () => {
    switch (type) {
      case 'round':
        return (
          <ellipse cx="50" cy="60" rx="6" ry="5" fill={color} />
        )
      case 'pointed':
        return (
          <path
            d="M50,50 L45,60 L55,60 Z"
            fill={color}
          />
        )
      case 'small':
        return (
          <ellipse cx="50" cy="58" rx="4" ry="3" fill={color} />
        )
      case 'wide':
        return (
          <ellipse cx="50" cy="60" rx="10" ry="5" fill={color} />
        )
      case 'default':
      default:
        return (
          <path
            d="M50,50 Q50,60 45,60 L55,60 Q50,60 50,50"
            fill={color}
          />
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
      {renderNose()}
    </svg>
  )
}
