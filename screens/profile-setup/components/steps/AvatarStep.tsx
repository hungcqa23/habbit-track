"use client"

import { Shuffle, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui"
import { AvatarPreview, ColorPicker } from "../avatar"
import { OutfitSelector, HairSelector, NotionFaceSelector, NotionAccessorySelector, NotionEyeSelector, NotionMouthSelector } from "@/components/avatar"
import { NotionFace, NotionHair, NotionOutfit, NotionAccessories, NotionEye, NotionMouth } from "@/components/icons/notion"
import type { AvatarFeature } from "@/lib/types"
import { hairColorOptions } from "../../constants"

interface AvatarStepProps {
  avatar: {
    faceShape: AvatarFeature
    hair: AvatarFeature
    hairColor: string
    accessories: AvatarFeature[]
    clothing: AvatarFeature
    eyes?: AvatarFeature
    mouth?: AvatarFeature
  }
  onUpdateFeature: (feature: string, value: any) => void
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
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex-shrink-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="p-2 border border-slate-300 aspect-square">
                      <div className="size-6 overflow-hidden">
                        <NotionFace style="01" />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-4">

                      <div>
                        <h3 className="text-sm font-medium mb-2">Notion Face Styles</h3>
                        <div className="mt-2">
                          <NotionFaceSelector
                            selectedStyle={avatar.faceShape.option}
                            onSelect={(option: string) => onUpdateFeature("faceShape", { type: "faceShape", option })}
                          />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex-shrink-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="p-2 border border-slate-300 aspect-square">
                      <div className="size-6 overflow-hidden">
                        <NotionHair style="style01" color={avatar.hairColor} />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Hair Color</h3>
                        <ColorPicker
                          colors={hairColorOptions}
                          selected={avatar.hairColor}
                          onChange={(color) => onUpdateFeature("hairColor", color)}
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Notion Hair Styles</h3>
                        <div className="mt-2">
                          <HairSelector
                            selectedStyle={avatar.hair.option}
                            selectedColor={avatar.hairColor}
                            onSelect={(option) => onUpdateFeature("hair", { type: "hair", option })}
                          />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex-shrink-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="p-2 border border-slate-300 aspect-square">
                      <div className="size-6 overflow-hidden">
                        <NotionOutfit style="01" />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Notion Outfits</h3>
                        <div className="mt-2">
                          <OutfitSelector
                            selectedStyle={avatar.clothing.option}
                            onSelect={(option) => onUpdateFeature("clothing", { type: "clothing", option })}
                          />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex-shrink-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="p-2 border border-slate-300 aspect-square">
                      <div className="size-6 overflow-hidden">
                        <NotionAccessories style="glasses" />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Notion Accessories</h3>
                        <div className="mt-2">
                          <NotionAccessorySelector
                            selectedStyle={avatar.accessories[0]?.option || "none"}
                            onSelect={(option: string) => {
                              if (option === "none") {
                                onUpdateFeature("accessories", [])
                              } else {
                                onUpdateFeature("accessories", [{ type: "accessories", option }])
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex-shrink-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="p-2 border border-slate-300 aspect-square">
                      <div className="size-6 overflow-hidden">
                        <NotionEye style="normal" />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Notion Eye Styles</h3>
                        <div className="mt-2">
                          <NotionEyeSelector
                            selectedStyle={avatar.eyes?.option || "normal"}
                            onSelect={(option: string) => onUpdateFeature("eyes", { type: "eyes", option })}
                          />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="p-2 border border-slate-300 aspect-square">
                      <div className="size-6 overflow-hidden">
                        <NotionMouth style="normalSmile1" />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Notion Mouth Styles</h3>
                        <div className="mt-2">
                          <NotionMouthSelector
                            selectedStyle={avatar.mouth?.option || "normalSmile1"}
                            onSelect={(option: string) => onUpdateFeature("mouth", { type: "mouth", option })}
                          />
                        </div>
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
