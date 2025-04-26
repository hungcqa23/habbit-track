import React from 'react'

export interface HairProps {
  type: 'short' | 'long' | 'curly' | 'bun' | 'bald'
  color?: string
  className?: string
}

export function Hair({ type, color = '#5A3825', className }: HairProps) {
  // Different hair styles based on type
  const renderHair = () => {
    switch (type) {
      case 'short':
        return (
          <path
            d="M15,50 C15,30 30,10 50,10 C70,10 85,30 85,50 L85,55 C85,35 70,15 50,15 C30,15 15,35 15,55 Z"
            fill={color}
          />
        )
      case 'long':
        return (
          <path
            d="M15,50 C15,30 30,10 50,10 C70,10 85,30 85,50 L85,80 C85,60 70,40 50,40 C30,40 15,60 15,80 Z"
            fill={color}
          />
        )
      case 'curly':
        return (
          <path
            d="M15,50 C15,30 30,10 50,10 C70,10 85,30 85,50 
               C85,55 80,60 85,65 C90,70 85,75 80,75 
               C75,75 70,70 65,75 C60,80 55,75 50,75 
               C45,75 40,80 35,75 C30,70 25,75 20,75 
               C15,75 10,70 15,65 C20,60 15,55 15,50 Z"
            fill={color}
          />
        )
      case 'bun':
        return (
          <>
            <path
              d="M15,50 C15,30 30,10 50,10 C70,10 85,30 85,50 L85,55 C85,35 70,15 50,15 C30,15 15,35 15,55 Z"
              fill={color}
            />
            <ellipse cx="50" cy="15" rx="12" ry="10" fill={color} />
          </>
        )
      case 'bald':
      default:
        return null
    }
  }

  if (type === 'bald') {
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
      {renderHair()}
    </svg>
  )
}
