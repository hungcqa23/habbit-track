import React from "react";
import type { ReactNode } from "react";
import {
  WelcomeStep,
  AvatarStep,
  ProfileStep,
  PreferencesStep,
  CompleteStep
} from "../components/steps";
import type { ProfileSetupData } from "../hooks/useProfileSetup";
export function getStepComponent(
  stepIndex: number,
  profileData: ProfileSetupData,
  handlers: {
    nextStep: () => void;
    prevStep: () => void;
    updateProfileData: (data: Partial<ProfileSetupData>) => void;
    updateAvatarFeature: (feature: string, value: any) => void;
    generateRandomAvatar: () => void;
    submitProfile: () => void;
    isSubmitting: boolean;
  }
): ReactNode {
  const {
    nextStep,
    prevStep,
    updateProfileData,
    updateAvatarFeature,
    generateRandomAvatar,
    submitProfile,
    isSubmitting
  } = handlers;

  switch (stepIndex) {
    case 0:
      return <WelcomeStep onNext={nextStep} />;
    case 1:
      return (
        <AvatarStep
          avatar={profileData.avatar}
          onUpdateFeature={updateAvatarFeature}
          onGenerateRandom={generateRandomAvatar}
          onNext={nextStep}
          onBack={prevStep}
        />
      );
    case 2:
      return (
        <ProfileStep
          name={profileData.name}
          bio={profileData.bio}
          onUpdate={updateProfileData}
          onNext={nextStep}
          onBack={prevStep}
        />
      );
    case 3:
      return (
        <PreferencesStep
          initialFocus={profileData.initialFocus}
          preferredCategories={profileData.preferredCategories}
          onUpdate={updateProfileData}
          onNext={nextStep}
          onBack={prevStep}
        />
      );
    case 4:
      return (
        <CompleteStep
          profileData={profileData}
          isSubmitting={isSubmitting}
          onSubmit={submitProfile}
          onBack={prevStep}
        />
      );
    default:
      return <WelcomeStep onNext={nextStep} />;
  }
}
