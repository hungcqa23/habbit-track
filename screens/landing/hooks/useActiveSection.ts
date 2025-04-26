import { useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Function to check which section is in view
    const handleScroll = () => {
      const sections = ['features', 'how-it-works', 'testimonials', 'pricing']
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if the section is in the viewport
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Check if there's a hash in the URL and scroll to that section
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const element = document.getElementById(hash)
      if (element) {
        // Wait a bit for the page to render fully
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
          setActiveSection(hash)
        }, 100)
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname, searchParams])

  return activeSection
}
