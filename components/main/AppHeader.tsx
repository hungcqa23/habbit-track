"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarCheck2, Menu, Award, BarChart3, Calendar, Archive, User, Gift, Swords } from "lucide-react"

import { Button, Sheet, SheetContent, SheetTrigger } from "@/components/ui"
import { cn } from "@/lib/utils"

const routes = [
  {
    name: "Analytics",
    path: "/main/analytics",
    icon: BarChart3,
  },
  {
    name: "Calendar",
    path: "/main/calendar",
    icon: Calendar,
  },
  {
    name: "Achievements",
    path: "/main/achievements",
    icon: Award,
  },
  {
    name: "Rewards",
    path: "/main/rewards",
    icon: Gift,
  },
  {
    name: "Boss Battles",
    path: "/main/boss-battles",
    icon: Swords,
  },
  {
    name: "Profile",
    path: "/main/profile",
    icon: User,
  },
  {
    name: "Archive",
    path: "/main/archive",
    icon: Archive,
  },
]

export function AppHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/main" className="mr-4 flex items-center gap-2 md:mr-6 hover:opacity-80 transition-opacity">
          <CalendarCheck2 className="size-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">HabitTrack</span>
        </Link>
        <div className="hidden md:flex md:flex-1 md:items-center">
          {/* Left spacer */}
          <div className="flex-1"></div>

          {/* Centered navigation */}
          <nav className="flex items-center space-x-1 justify-center">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.path ? "text-primary" : "text-muted-foreground",
                )}
              >
                <route.icon className="mr-2 size-4" />
                {route.name}
              </Link>
            ))}
          </nav>

          {/* Right user greeting */}
          <div className="flex-1 flex items-center justify-end">
            <div className="flex items-center gap-2 text-sm font-medium">
              <User className="size-4 text-primary" />
              <span>Hi, Hung</span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="size-8">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/main" className="flex items-center gap-2 py-4 hover:opacity-80 transition-opacity" onClick={() => setOpen(false)}>
                <CalendarCheck2 className="size-6 text-primary" />
                <span className="font-bold">HabitTrack</span>
              </Link>
              <nav className="flex flex-col space-y-3 py-4">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={cn(
                      "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary",
                      pathname === route.path ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <route.icon className="mr-2 size-4" />
                    {route.name}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center gap-2 pt-4 text-sm font-medium">
                <User className="size-4 text-primary" />
                <span>Hi, Hung</span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
