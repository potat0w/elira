"use client"

import { useEffect, useRef, useState } from "react"

interface UseParallaxOptions {
  speed?: number
  direction?: "up" | "down"
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {}
) {
  const { speed = 0.3, direction = "up" } = options
  const ref = useRef<T>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const distanceFromCenter = elementCenter - windowHeight / 2
      
      const newOffset = distanceFromCenter * speed * (direction === "up" ? -1 : 1)
      setOffset(newOffset)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed, direction])

  return { ref, offset }
}
