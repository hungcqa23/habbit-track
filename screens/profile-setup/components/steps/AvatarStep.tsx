"use client"

import { useState } from "react"
import { Shuffle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { AvatarPreview, AvatarFeatureSelector, ColorPicker } from "../avatar"
import type { AvatarFeature } from "@/lib/types"
import {
  faceShapeOptions,
  eyesOptions,
  eyebrowsOptions,
  noseOptions,
  mouthOptions,
  hairOptions,
  facialHairOptions,
  clothingOptions,
  accessoriesOptions,
  skinColorOptions,
  hairColorOptions
} from "../../constants"

interface AvatarStepProps {
  avatar: {
    faceShape: AvatarFeature
    eyes: AvatarFeature
    eyebrows: AvatarFeature
    nose: AvatarFeature
    mouth: AvatarFeature
    hair: AvatarFeature
    facialHair: AvatarFeature
    skinColor: string
    hairColor: string
    accessories: AvatarFeature[]
    clothing: AvatarFeature
  }
  onUpdateFeature: (feature: string, value: AvatarFeature | string) => void
  onGenerateRandom: () => void
  onNext: () => void
  onBack: () => void
}

export function AvatarStep({
  avatar,
  onUpdateFeature,
  onGenerateRandom,
  onNext,
  onBack
}: AvatarStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <div className="sticky top-20 w-full max-w-md mx-auto">
          <div className="flex justify-center">
            <AvatarPreview avatar={avatar} />
          </div>

          <Button
            variant="outline"
            className="mt-4 gap-2 w-full"
            onClick={onGenerateRandom}
          >
            <Shuffle className="h-4 w-4" />
            Random Avatar
          </Button>

          <div className="mt-6">
            <div className="flex justify-center gap-2 mb-4">
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="size-12 border-2 border-slate-800">
                      Face
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4 max-h-[50vh] overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Face Shape</h3>
                        <AvatarFeatureSelector
                          options={faceShapeOptions}
                          selected={avatar.faceShape.option}
                          onChange={(option) => onUpdateFeature("faceShape", { type: "faceShape", option })}
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Eyes</h3>
                        <AvatarFeatureSelector
                          options={eyesOptions}
                          selected={avatar.eyes.option}
                          onChange={(option) => onUpdateFeature("eyes", { type: "eyes", option })}
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Eyebrows</h3>
                        <AvatarFeatureSelector
                          options={eyebrowsOptions}
                          selected={avatar.eyebrows.option}
                          onChange={(option) => onUpdateFeature("eyebrows", { type: "eyebrows", option })}
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Nose</h3>
                        <AvatarFeatureSelector
                          options={noseOptions}
                          selected={avatar.nose.option}
                          onChange={(option) => onUpdateFeature("nose", { type: "nose", option })}
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Mouth</h3>
                        <AvatarFeatureSelector
                          options={mouthOptions}
                          selected={avatar.mouth.option}
                          onChange={(option) => onUpdateFeature("mouth", { type: "mouth", option })}
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Skin Color</h3>
                        <ColorPicker
                          colors={skinColorOptions}
                          selected={avatar.skinColor}
                          onChange={(color) => onUpdateFeature("skinColor", color)}
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="size-12 border-2 border-slate-800">
                      Hair
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4 max-h-[50vh] overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Hair Style</h3>
                        <AvatarFeatureSelector
                          options={hairOptions}
                          selected={avatar.hair.option}
                          onChange={(option) => onUpdateFeature("hair", { type: "hair", option })}
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Hair Color</h3>
                        <ColorPicker
                          colors={hairColorOptions}
                          selected={avatar.hairColor}
                          onChange={(color) => onUpdateFeature("hairColor", color)}
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Facial Hair</h3>
                        <AvatarFeatureSelector
                          options={facialHairOptions}
                          selected={avatar.facialHair.option}
                          onChange={(option) => onUpdateFeature("facialHair", { type: "facialHair", option })}
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="size-12 border-2 border-slate-800">
                      Style
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4 max-h-[50vh] overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Clothing</h3>
                        <AvatarFeatureSelector
                          options={clothingOptions}
                          selected={avatar.clothing.option}
                          onChange={(option) => onUpdateFeature("clothing", { type: "clothing", option })}
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Accessories</h3>
                        <AvatarFeatureSelector
                          options={accessoriesOptions}
                          selected={avatar.accessories[0]?.option || "none"}
                          onChange={(option) => {
                            if (option === "none") {
                              onUpdateFeature("accessories", { type: "accessories", option: "none" })
                            } else {
                              onUpdateFeature("accessories", { type: "accessories", option })
                            }
                          }}
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="size-12 border-2 border-slate-800">
                      Outfit
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4 max-h-[50vh] overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Clothing</h3>
                        <AvatarFeatureSelector
                          options={clothingOptions}
                          selected={avatar.clothing.option}
                          onChange={(option) => onUpdateFeature("clothing", { type: "clothing", option })}
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Accessories</h3>
                        <AvatarFeatureSelector
                          options={accessoriesOptions}
                          selected={avatar.accessories[0]?.option || "none"}
                          onChange={(option) => {
                            if (option === "none") {
                              onUpdateFeature("accessories", { type: "accessories", option: "none" })
                            } else {
                              onUpdateFeature("accessories", { type: "accessories", option })
                            }
                          }}
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} className="gap-2">
          Continue
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
