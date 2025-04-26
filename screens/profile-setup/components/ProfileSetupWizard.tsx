"use client"

import { useProfileSetup } from "../hooks"
import {
  WelcomeStep,
  AvatarStep,
  ProfileStep,
  PreferencesStep,
  CompleteStep
} from "./steps"
import { StepIndicator } from "./StepIndicator"

export function ProfileSetupWizard() {
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

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 0:
        return <WelcomeStep onNext={nextStep} />
      case 1:
        return (
          <AvatarStep
            avatar={profileData.avatar}
            onUpdateFeature={updateAvatarFeature}
            onGenerateRandom={generateRandomAvatar}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 2:
        return (
          <ProfileStep
            name={profileData.name}
            bio={profileData.bio}
            onUpdate={updateProfileData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 3:
        return (
          <PreferencesStep
            initialFocus={profileData.initialFocus}
            preferredCategories={profileData.preferredCategories}
            onUpdate={updateProfileData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 4:
        return (
          <CompleteStep
            profileData={profileData}
            isSubmitting={isSubmitting}
            onSubmit={submitProfile}
            onBack={prevStep}
          />
        )
      default:
        return <WelcomeStep onNext={nextStep} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-background rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <StepIndicator currentStep={step} steps={steps} />
          <div className="mt-8">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  )
}
