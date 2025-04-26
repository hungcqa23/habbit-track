"use client"

import { useProfileSetup } from "./hooks"
import { StepIndicator } from "./components/StepIndicator"
import { motion, AnimatePresence } from "@/providers/motion-provider"
import { getStepComponent } from "./helpers"

export default function ProfileSetupPage() {
  const {
    step,
    steps,
    profileData,
    isSubmitting,
    nextStep,
    prevStep,
    updateProfileData,
    updateAvatarFeature,
    generateRandomAvatar,
    submitProfile
  } = useProfileSetup()

  const stepHandlers = {
    nextStep,
    prevStep,
    updateProfileData,
    updateAvatarFeature,
    generateRandomAvatar,
    submitProfile,
    isSubmitting
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col items-center">
      <div className="w-full sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-2 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <StepIndicator currentStep={step} steps={steps} />
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 py-8 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}
            className="w-full"
          >
            {getStepComponent(step, profileData, stepHandlers)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
