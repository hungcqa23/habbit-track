"use client"

import { useState } from "react"
import { Shuffle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AvatarPreview, AvatarFeatureSelector, ColorPicker } from "../avatar"
import type { AvatarFeature } from "@/lib/types"

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
  const [activeTab, setActiveTab] = useState("face")

  // Face shape options
  const faceShapeOptions = [
    { id: "round", label: "Round" },
    { id: "oval", label: "Oval" },
    { id: "square", label: "Square" },
    { id: "heart", label: "Heart" },
    { id: "diamond", label: "Diamond" }
  ]

  // Eyes options
  const eyesOptions = [
    { id: "default", label: "Default" },
    { id: "round", label: "Round" },
    { id: "smiling", label: "Smiling" },
    { id: "side", label: "Side" },
    { id: "wink", label: "Wink" }
  ]

  // Eyebrows options
  const eyebrowsOptions = [
    { id: "default", label: "Default" },
    { id: "raised", label: "Raised" },
    { id: "lowered", label: "Lowered" },
    { id: "angry", label: "Angry" },
    { id: "surprised", label: "Surprised" }
  ]

  // Nose options
  const noseOptions = [
    { id: "default", label: "Default" },
    { id: "round", label: "Round" },
    { id: "pointed", label: "Pointed" },
    { id: "small", label: "Small" },
    { id: "wide", label: "Wide" }
  ]

  // Mouth options
  const mouthOptions = [
    { id: "default", label: "Default" },
    { id: "smile", label: "Smile" },
    { id: "serious", label: "Serious" },
    { id: "laugh", label: "Laugh" },
    { id: "surprised", label: "Surprised" }
  ]

  // Hair options
  const hairOptions = [
    { id: "short", label: "Short" },
    { id: "long", label: "Long" },
    { id: "curly", label: "Curly" },
    { id: "bun", label: "Bun" },
    { id: "bald", label: "Bald" }
  ]

  // Facial hair options
  const facialHairOptions = [
    { id: "none", label: "None" },
    { id: "beard", label: "Beard" },
    { id: "mustache", label: "Mustache" },
    { id: "goatee", label: "Goatee" },
    { id: "stubble", label: "Stubble" }
  ]

  // Clothing options
  const clothingOptions = [
    { id: "tshirt", label: "T-Shirt" },
    { id: "formal", label: "Formal" },
    { id: "hoodie", label: "Hoodie" },
    { id: "sweater", label: "Sweater" },
    { id: "tank", label: "Tank Top" }
  ]

  // Accessories options
  const accessoriesOptions = [
    { id: "none", label: "None" },
    { id: "glasses", label: "Glasses" },
    { id: "sunglasses", label: "Sunglasses" },
    { id: "earrings", label: "Earrings" },
    { id: "hat", label: "Hat" }
  ]

  // Skin color options
  const skinColorOptions = [
    "#F8D5C2", // Light
    "#EDB98A", // Medium light
    "#D08B5B", // Medium
    "#AE5D29", // Medium dark
    "#614335"  // Dark
  ]

  // Hair color options
  const hairColorOptions = [
    "#5E3719", // Brown
    "#D6B97B", // Blonde
    "#CB607E", // Pink
    "#000000", // Black
    "#FFFFFF"  // White
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar Preview */}
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-muted/50 rounded-lg p-6 w-full flex justify-center">
            <AvatarPreview avatar={avatar} />
          </div>
          <Button
            variant="outline"
            className="mt-4 gap-2"
            onClick={onGenerateRandom}
          >
            <Shuffle className="h-4 w-4" />
            Random Avatar
          </Button>
        </div>

        {/* Customization Options */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="face">Face</TabsTrigger>
              <TabsTrigger value="hair">Hair</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
            </TabsList>

            <TabsContent value="face" className="space-y-4">
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
            </TabsContent>

            <TabsContent value="hair" className="space-y-4">
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
            </TabsContent>

            <TabsContent value="style" className="space-y-4">
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
                      onUpdateFeature("accessories", [])
                    } else {
                      onUpdateFeature("accessories", [{ type: "accessories", option }])
                    }
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>
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
