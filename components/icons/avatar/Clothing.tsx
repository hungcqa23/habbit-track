import React from 'react'

export interface ClothingProps {
  type: 'tshirt' | 'formal' | 'hoodie' | 'sweater' | 'tank'
  color?: string
  className?: string
}

export function Clothing({ type, color, className }: ClothingProps) {
  // Default colors for each clothing type
  const defaultColor = {
    tshirt: '#3B82F6', // blue
    formal: '#1F2937', // dark gray
    hoodie: '#10B981', // green
    sweater: '#F59E0B', // amber
    tank: '#EC4899'    // pink
  }

  const clothingColor = color || defaultColor[type]

  // Different clothing styles based on type
  const renderClothing = () => {
    switch (type) {
      case 'formal':
        return (
          <>
            <path
              d="M25,90 L25,100 L75,100 L75,90 C65,95 60,95 50,95 C40,95 35,95 25,90 Z"
              fill={clothingColor}
            />
            <rect x="45" y="85" width="10" height="15" fill="white" />
            <path
              d="M45,85 L45,100 L40,100 L40,90 C40,87 42,85 45,85 Z"
              fill="#E53E3E"
            />
          </>
        )
      case 'hoodie':
        return (
          <>
            <path
              d="M25,90 L25,100 L75,100 L75,90 C65,95 60,95 50,95 C40,95 35,95 25,90 Z"
              fill={clothingColor}
            />
            <path
              d="M30,85 C30,75 40,75 50,75 C60,75 70,75 70,85"
              stroke={clothingColor}
              strokeWidth="10"
              fill="none"
            />
            <circle cx="30" cy="85" r="5" fill={clothingColor} />
            <circle cx="70" cy="85" r="5" fill={clothingColor} />
          </>
        )
      case 'sweater':
        return (
          <>
            <path
              d="M25,90 L25,100 L75,100 L75,90 C65,95 60,95 50,95 C40,95 35,95 25,90 Z"
              fill={clothingColor}
            />
            <path
              d="M30,85 L35,90 L40,85 L45,90 L50,85 L55,90 L60,85 L65,90 L70,85"
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="none"
            />
          </>
        )
      case 'tank':
        return (
          <>
            <path
              d="M30,90 L30,100 L70,100 L70,90 C60,95 55,95 50,95 C45,95 40,95 30,90 Z"
              fill={clothingColor}
            />
            <path
              d="M30,90 C30,80 35,75 40,75 L60,75 C65,75 70,80 70,90"
              fill={clothingColor}
            />
          </>
        )
      case 'tshirt':
      default:
        return (
          <path
            d="M25,90 L25,100 L75,100 L75,90 C65,95 60,95 50,95 C40,95 35,95 25,90 Z"
            fill={clothingColor}
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
      {renderClothing()}
    </svg>
  )
}
