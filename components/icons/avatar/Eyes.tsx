import React from 'react'

export interface EyesProps {
  type: 'default' | 'round' | 'smiling' | 'side' | 'wink'
  color?: string
  className?: string
}

export function Eyes({ type, color = '#2D3748', className }: EyesProps) {
  // Different eye styles based on type
  const renderEyes = () => {
    switch (type) {
      case 'round':
        return (
          <>
            <circle cx="35" cy="45" r="5" fill={color} />
            <circle cx="65" cy="45" r="5" fill={color} />
          </>
        )
      case 'smiling':
        return (
          <>
            <path
              d="M30,45 Q35,40 40,45"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M60,45 Q65,40 70,45"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
          </>
        )
      case 'side':
        return (
          <>
            <ellipse cx="33" cy="45" rx="4" ry="5" fill={color} />
            <ellipse cx="67" cy="45" rx="4" ry="5" fill={color} />
          </>
        )
      case 'wink':
        return (
          <>
            <circle cx="35" cy="45" r="5" fill={color} />
            <path
              d="M60,45 Q65,40 70,45"
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
            <ellipse cx="35" cy="45" rx="5" ry="3" fill={color} />
            <ellipse cx="65" cy="45" rx="5" ry="3" fill={color} />
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
      {renderEyes()}
    </svg>
  )
}
