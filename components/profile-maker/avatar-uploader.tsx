"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Camera, Upload, User, Trash2, ImageIcon, MoreVertical, RefreshCw } from "lucide-react"

interface AvatarUploaderProps {
  currentAvatar: string
  onAvatarChange: (avatarUrl: string) => void
}

// Sample avatar options
const defaultAvatars = [
  "/placeholder.svg?height=200&width=200",
  "/placeholder.svg?height=200&width=200&text=A",
  "/placeholder.svg?height=200&width=200&text=B",
  "/placeholder.svg?height=200&width=200&text=C",
  "/placeholder.svg?height=200&width=200&text=D",
  "/placeholder.svg?height=200&width=200&text=E",
]

export function AvatarUploader({ currentAvatar, onAvatarChange }: AvatarUploaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    // Simulate file upload
    // In a real app, you would upload to a server or cloud storage
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        onAvatarChange(event.target.result.toString())
        setIsUploading(false)
        setIsDialogOpen(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const selectDefaultAvatar = (avatarUrl: string) => {
    onAvatarChange(avatarUrl)
    setIsDialogOpen(false)
  }

  const removeAvatar = () => {
    onAvatarChange("/placeholder.svg?height=200&width=200")
  }

  return (
    <>
      <div className="relative group">
        <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
          <AvatarImage src={currentAvatar || "/placeholder.svg"} alt="Profile avatar" />
          <AvatarFallback className="text-4xl bg-primary/20">
            {currentAvatar ? currentAvatar.charAt(0).toUpperCase() : <User className="h-12 w-12" />}
          </AvatarFallback>
        </Avatar>

        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-background text-primary hover:text-primary hover:bg-background/90"
            onClick={() => setIsDialogOpen(true)}
          >
            <Camera className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-8 w-8 rounded-full bg-background text-primary hover:text-primary hover:bg-background/90"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                <span>Change Avatar</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={removeAvatar}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Remove Avatar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
            <DialogDescription>Upload a new avatar or choose from our default options</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24 border-2 border-muted">
                <AvatarImage src={currentAvatar || "/placeholder.svg"} alt="Current avatar" />
                <AvatarFallback className="text-3xl bg-primary/20">
                  {currentAvatar ? currentAvatar.charAt(0).toUpperCase() : <User className="h-10 w-10" />}
                </AvatarFallback>
              </Avatar>

              <div className="flex gap-2">
                <Button variant="outline" onClick={triggerFileUpload} disabled={isUploading} className="gap-2">
                  <Upload className="h-4 w-4" />
                  {isUploading ? "Uploading..." : "Upload Image"}
                </Button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-primary" />
                Default Avatars
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {defaultAvatars.map((avatar, index) => (
                  <Avatar
                    key={index}
                    className={`h-12 w-12 cursor-pointer transition-all hover:scale-110 ${
                      currentAvatar === avatar ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => selectDefaultAvatar(avatar)}
                  >
                    <AvatarImage src={avatar || "/placeholder.svg"} alt={`Default avatar ${index + 1}`} />
                    <AvatarFallback className="text-lg bg-primary/20">{index + 1}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
