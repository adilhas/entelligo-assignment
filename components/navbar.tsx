"use client"

import Link from "next/link"
import { Users, Bookmark, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useFavorites } from "@/hooks/use-favorites"

export function Navbar() {
  const { count, isLoaded } = useFavorites()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Title */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform active:scale-95"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary via-primary/90 to-primary/70 text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/30">
            <Users className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-foreground flex items-center gap-1.5 text-base sm:text-lg">
              NexusUsers
              <span className="inline-flex items-center rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                PRO
              </span>
            </span>
            <span className="text-[11px] text-muted-foreground hidden sm:inline">
              Modern Team & Directory Intelligence
            </span>
          </div>
        </Link>

        {/* Right Action Items */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted/50 hidden md:inline-flex items-center gap-1.5"
          >
            <Sparkles className="size-3.5 text-amber-500" />
            Directory
          </Link>

          {/* Bookmarks Counter Indicator */}
          {isLoaded && count > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-medium animate-in fade-in zoom-in-95">
              <Bookmark className="size-3.5 fill-amber-500 text-amber-500" />
              <span>{count}</span>
              <span className="hidden sm:inline">saved</span>
            </div>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
