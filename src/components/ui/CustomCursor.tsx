"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on devices with a fine pointer (mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    // Quick setters for performance
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" })

    // Hide cursor initially
    gsap.set(cursor, { opacity: 0, xPercent: -50, yPercent: -50 })

    const onMouseMove = (e: MouseEvent) => {
      // Show cursor when mouse moves
      gsap.to(cursor, { opacity: 1, duration: 0.3 })
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 })
    }

    const onMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 })
    }

    const onElementHover = () => {
      gsap.to(cursor, { scale: 3, duration: 0.3, ease: "power2.out" })
    }

    const onElementLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" })
    }

    // Attach global mouse listeners
    window.addEventListener("mousemove", onMouseMove)
    document.documentElement.addEventListener("mouseleave", onMouseLeave)
    document.documentElement.addEventListener("mouseenter", onMouseEnter)

    // Use event delegation for hover states to avoid attaching to every element manually
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .hover-target'
      )
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", onElementHover)
        el.addEventListener("mouseleave", onElementLeave)
      })
    }

    addHoverListeners()

    // Setup mutation observer to handle dynamically added elements (like links on different pages)
    const observer = new MutationObserver((mutations) => {
      let shouldReattach = false
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          shouldReattach = true
          break
        }
      }
      if (shouldReattach) {
        // Debounce or just reattach
        addHoverListeners()
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      document.documentElement.removeEventListener("mouseleave", onMouseLeave)
      document.documentElement.removeEventListener("mouseenter", onMouseEnter)
      observer.disconnect()
      
      const interactiveElements = document.querySelectorAll(
        'a, button, input, select, textarea, [role="button"], .hover-target'
      )
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onElementHover)
        el.removeEventListener("mouseleave", onElementLeave)
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{
        transform: "translate(-50%, -50%)", // Handled by gsap xPercent/yPercent too, but fallback
      }}
    />
  )
}
