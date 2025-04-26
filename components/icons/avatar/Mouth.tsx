import React from 'react'

export interface MouthProps {
  type: 'default' | 'smile' | 'serious' | 'laugh' | 'surprised'
  color?: string
  className?: string
}

export function Mouth({ type, color = '#C53030', className }: MouthProps) {
  // Different mouth styles based on type
  const renderMouth = () => {
    switch (type) {
      case 'smile':
        return (
          <path
            d="M35,65 Q50,75 65,65"
            stroke="#5A3825"
            strokeWidth="2"
            fill="none"
          />
        )
      case 'serious':
        return (
          <line
            x1="35"
            y1="70"
            x2="65"
            y2="70"
            stroke="#5A3825"
            strokeWidth="2"
          />
        )
      case 'laugh':
        return (
          <path
            d="M35,65 Q50,80 65,65"
            stroke="#5A3825"
            strokeWidth="2"
            fill={color}
          />
        )
      case 'surprised':
        return (
          <circle
            cx="50"
            cy="70"
            r="5"
            fill={color}
          />
        )
      case 'default':
      default:
        return (
          <path
            d="M35,70 Q50,75 65,70"
            stroke="#5A3825"
            strokeWidth="2"
            fill="none"
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
      {renderMouth()}
    </svg>
  )
}
