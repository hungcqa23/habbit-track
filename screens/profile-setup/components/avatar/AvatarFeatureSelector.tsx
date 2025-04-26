"use client"

import { cn } from "@/lib/utils"

interface AvatarFeatureSelectorProps {
  options: { id: string; label: string }[]
  selected: string
  onChange: (option: string) => void
}

export function AvatarFeatureSelector({ options, selected, onChange }: AvatarFeatureSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            selected === option.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          )}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
