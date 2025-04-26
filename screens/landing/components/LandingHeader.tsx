import Link from "next/link"
import { CalendarCheck2 } from "lucide-react"
import { Button } from "@/components/ui"
import { cn } from "@/lib/utils"

interface LandingHeaderProps {
  activeSection: string | null
}

export function LandingHeader({ activeSection }: LandingHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarCheck2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">HabitTrack</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#features"
            className={cn(
              "text-sm font-medium transition-colors",
              activeSection === "features" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className={cn(
              "text-sm font-medium transition-colors",
              activeSection === "how-it-works" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className={cn(
              "text-sm font-medium transition-colors",
              activeSection === "testimonials" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            Testimonials
          </Link>
          <Link
            href="#pricing"
            className={cn(
              "text-sm font-medium transition-colors",
              activeSection === "pricing" 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Log in
          </Link>
          <Button asChild>
            <Link href="/">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
