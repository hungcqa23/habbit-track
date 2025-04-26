"use client"

import React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number
  steps: { id: string; title: string }[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="relative flex items-center justify-between max-w-3xl mx-auto px-4">
      {/* Connecting lines - positioned absolutely */}
      <div className="absolute top-3.5 left-0 right-0 flex justify-center z-0">
        <div className="w-full max-w-[85%] flex items-center justify-between">
          {steps.map((_, index) => (
            index < steps.length - 1 && (
              <div
                key={`line-${index}`}
                className={cn(
                  "h-1 flex-grow rounded-full",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )
          ))}
        </div>
      </div>

      {/* Step circles - positioned on top of lines */}
      <div className="flex items-center justify-between w-full z-10">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium shadow-sm transition-all duration-200 bg-background",
                index < currentStep
                  ? "bg-primary text-primary-foreground"
                  : index === currentStep
                    ? "bg-primary text-primary-foreground ring-1 ring-offset-1 ring-primary"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {index < currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                "mt-1 text-[10px] font-medium hidden md:block transition-all duration-200",
                index < currentStep
                  ? "text-primary"
                  : index === currentStep
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
