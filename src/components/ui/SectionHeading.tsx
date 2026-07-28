import * as React from "react"
import { cn } from "../../lib/utils"

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  subheading?: string
  centered?: boolean
  gradient?: boolean
  light?: boolean
}

export function SectionHeading({
  children,
  subheading,
  centered = false,
  gradient = false,
  light = false,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", centered && "items-center text-center", className)}>
      {subheading && (
        <span className={cn("text-sm md:text-base font-semibold tracking-widest uppercase", light ? "text-brand-teal/80" : "text-brand-teal")}>
          {subheading}
        </span>
      )}
      <h2
        className={cn(
          "text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-balance leading-[1.1]",
          gradient ? "bg-clip-text text-transparent bg-gradient-to-r from-brand-ink to-brand-teal" : light ? "text-white" : "text-brand-ink"
        )}
        {...props}
      >
        {children}
      </h2>
    </div>
  )
}
