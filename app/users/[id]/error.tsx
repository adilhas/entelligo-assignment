"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UserDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("User details error:", error)
  }, [error])

  return (
    <div className="container mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 sm:p-12 space-y-6">
        <div className="size-16 rounded-2xl bg-destructive/15 text-destructive mx-auto flex items-center justify-center">
          <AlertCircle className="size-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            User Profile Unavailable
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {error.message ||
              "We couldn't retrieve the requested user record. The user ID might not exist or there was a network glitch."}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            onClick={() => reset()}
            variant="default"
            size="default"
            className="gap-2"
          >
            <RefreshCw className="size-4" />
            Try again
          </Button>

          <Button asChild variant="outline" size="default">
            <Link href="/" className="gap-2">
              <ArrowLeft className="size-4" />
              Back to Directory
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
