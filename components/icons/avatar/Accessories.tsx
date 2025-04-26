import React from 'react'

export interface AccessoriesProps {
  type: 'none' | 'glasses' | 'sunglasses' | 'earrings' | 'hat'
  color?: string
  className?: string
}

export function Accessories({ type, color = '#2D3748', className }: AccessoriesProps) {
  // Different accessories based on type
  const renderAccessories = () => {
    switch (type) {
      case 'glasses':
        return (
          <>
            <circle cx="35" cy="45" r="8" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="65" cy="45" r="8" stroke={color} strokeWidth="2" fill="none" />
            <line x1="43" y1="45" x2="57" y2="45" stroke={color} strokeWidth="2" />
            <line x1="27" y1="45" x2="20" y2="40" stroke={color} strokeWidth="2" />
            <line x1="73" y1="45" x2="80" y2="40" stroke={color} strokeWidth="2" />
          </>
        )
      case 'sunglasses':
        return (
          <>
            <rect x="27" y="40" width="16" height="10" rx="2" fill={color} />
            <rect x="57" y="40" width="16" height="10" rx="2" fill={color} />
            <line x1="43" y1="45" x2="57" y2="45" stroke={color} strokeWidth="2" />
            <line x1="27" y1="45" x2="20" y2="40" stroke={color} strokeWidth="2" />
            <line x1="73" y1="45" x2="80" y2="40" stroke={color} strokeWidth="2" />
          </>
        )
      case 'earrings':
        return (
          <>
            <circle cx="20" cy="55" r="3" fill="#FFD700" />
            <circle cx="80" cy="55" r="3" fill="#FFD700" />
          </>
        )
      case 'hat':
        return (
          <>
            <ellipse cx="50" cy="15" rx="35" ry="10" fill={color} />
            <rect x="30" y="5" width="40" height="10" rx="5" fill={color} />
          </>
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
      {renderAccessories()}
    </svg>
  )
}
