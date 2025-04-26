"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

interface AvatarFeatureSelectorProps {
  options: { id: string; label: string }[]
  selected: string
  onChange: (option: string) => void
}

export function AvatarFeatureSelector({ options, selected, onChange }: AvatarFeatureSelectorProps) {
  // Find the selected option label
  const selectedOption = options.find(option => option.id === selected)

  return (
    <div className="w-full">
      <Select defaultValue={selected} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={selectedOption?.label || "Select option"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
