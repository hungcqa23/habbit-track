"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  colors: string[]
  selected: string
  onChange: (color: string) => void
}

export function ColorPicker({ colors, selected, onChange }: ColorPickerProps) {
  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <button
          key={color}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-all",
            selected === color ? "ring-2 ring-primary ring-offset-2" : ""
          )}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        >
          {selected === color && (
            <Check className={cn(
              "h-4 w-4", 
              isLightColor(color) ? "text-gray-800" : "text-white"
            )} />
          )}
        </button>
      ))}
    </div>
  )
}

// Helper function to determine if a color is light or dark
function isLightColor(color: string): boolean {
  // Convert hex to RGB
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  // Return true if light, false if dark
  return luminance > 0.5
}
