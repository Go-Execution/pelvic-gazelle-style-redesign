import * as React from "react"
import { cn } from "../../lib/utils"
import { Link } from "react-router-dom"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link" | "outline"
  size?: "default" | "sm" | "lg"
  href?: string
}

const SiteButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", href, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal disabled:pointer-events-none disabled:opacity-50 hover-target"
    
    const variants = {
      primary: "bg-brand-teal text-white hover:bg-brand-teal-light shadow-[0_8px_30px_rgb(13,148,136,0.3)] hover:shadow-[0_8px_30px_rgb(13,148,136,0.5)]",
      secondary: "border-2 border-brand-teal bg-white/50 backdrop-blur-sm text-brand-teal hover:bg-brand-teal/10",
      outline: "border-2 border-brand-teal bg-white/50 backdrop-blur-sm text-brand-teal hover:bg-brand-teal/10",
      ghost: "hover:bg-brand-teal/10 text-brand-teal",
      link: "text-brand-teal underline-offset-4 hover:underline",
    }
    
    const sizes = {
      default: "h-11 px-6 py-2",
      sm: "h-9 px-4 text-sm",
      lg: "h-14 px-8 text-lg",
    }
    
    const classes = cn(
      baseStyles,
      variants[variant],
      variant !== "link" && sizes[size],
      className
    )

    if (href) {
      return (
        <Link href={href} className={classes} onClick={props.onClick as any}>
          {props.children}
        </Link>
      )
    }

    return (
      <button className={classes} ref={ref} {...props} />
    )
  }
)
SiteButton.displayName = "SiteButton"

export { SiteButton }
