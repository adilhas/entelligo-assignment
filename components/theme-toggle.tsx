"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

function useIsMounted() {
  return React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useIsMounted()

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={className}
        aria-label="Toggle theme"
      >
        <span className="size-4" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={className}
      title={
        isDark
          ? "Switch to light mode (Hotkey: d)"
          : "Switch to dark mode (Hotkey: d)"
      }
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="size-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="size-4 text-slate-700 dark:text-slate-200 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </Button>
  )
}
