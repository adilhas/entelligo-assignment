"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg" | "xl" | "2xl"
}

export function Avatar({
  src,
  alt = "User avatar",
  fallback = "U",
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)

  const sizeClasses = {
    sm: "size-8 text-xs",
    md: "size-10 text-sm",
    lg: "size-14 text-base",
    xl: "size-20 text-xl",
    "2xl": "size-28 text-2xl font-bold",
  }

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full ring-2 ring-border/50 bg-muted select-none shadow-sm",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={cn(
            "aspect-square h-full w-full object-cover transition-opacity duration-300",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      ) : null}

      {(!src || imageError || !imageLoaded) && (
        <span
          className={cn(
            "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-muted font-semibold text-foreground uppercase",
            src && !imageError && !imageLoaded ? "absolute inset-0" : ""
          )}
        >
          {fallback}
        </span>
      )}
    </div>
  )
}
