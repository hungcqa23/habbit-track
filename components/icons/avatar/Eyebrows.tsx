import React from 'react'

export interface EyebrowsProps {
  type: 'default' | 'raised' | 'lowered' | 'angry' | 'surprised'
  color?: string
  className?: string
}

export function Eyebrows({ type, color = '#5A3825', className }: EyebrowsProps) {
  // Different eyebrow styles based on type
  const renderEyebrows = () => {
    switch (type) {
      case 'raised':
        return (
          <>
            <path
              d="M25,35 Q35,30 45,35"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M55,35 Q65,30 75,35"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
          </>
        )
      case 'lowered':
        return (
          <>
            <path
              d="M25,38 Q35,40 45,38"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M55,38 Q65,40 75,38"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
          </>
        )
      case 'angry':
        return (
          <>
            <path
              d="M25,38 Q35,32 45,38"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M55,38 Q65,32 75,38"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
          </>
        )
      case 'surprised':
        return (
          <>
            <path
              d="M25,32 Q35,28 45,32"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M55,32 Q65,28 75,32"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
          </>
        )
      case 'default':
      default:
        return (
          <>
            <path
              d="M25,35 Q35,35 45,35"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M55,35 Q65,35 75,35"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
          </>
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
      {renderEyebrows()}
    </svg>
  )
}
