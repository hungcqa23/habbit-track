"use client"

import React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "@/providers/motion-provider"

interface StepIndicatorProps {
  currentStep: number
  steps: { id: string; title: string }[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between max-w-3xl mx-auto px-4 py-2">
      <div className="flex items-center justify-between w-full z-10 relative">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative">
            {index < steps.length - 1 && (
              <div className={cn(
                "absolute left-[calc(50%+12px)] h-0.5 top-3 z-0 bg-muted",
                index === 3 ? "w-40" : "w-[170px]" // 160px (w-40) for step 4 to 5, 170px for others
              )}>
                {/* Progress overlay - only show for completed steps */}
                {index < currentStep && (
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-primary origin-left"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
              </div>
            )}

            <motion.div
              className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium transform z-10",
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
                index <= currentStep ? "scale-100" : "scale-90 opacity-80"
              )}
              initial="opacity-70 scale-80"
              animate="opacity-100"
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: index * 0.05
              }}
            >
              {index < currentStep && <Check className="h-3.5 w-3.5" />}
              {index >= currentStep && index + 1}
            </motion.div>

            <motion.span
              className={cn(
                "mt-2 text-[10px] font-medium hidden md:block transform",
                index <= currentStep
                  ? "text-primary"
                  : "text-muted-foreground",
                index === currentStep && "font-semibold scale-105"
              )}
              initial="opacity-50 translate-y-1"
              animate="opacity-100 translate-y-0"
              transition={{
                duration: 0.3
              }}
            >
              {step.title}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  )
}
