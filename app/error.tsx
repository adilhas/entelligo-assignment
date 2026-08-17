"use client"

import { useEffect } from "react"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Directory Error:", error)
  }, [error])

  return (
    <div className="container mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 sm:p-12 space-y-6">
        <div className="size-16 rounded-2xl bg-destructive/15 text-destructive mx-auto flex items-center justify-center">
          <AlertCircle className="size-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Something went wrong!
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {error.message ||
              "Unable to load the directory data from the server. Please check your connection and try again."}
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
              <Home className="size-4" />
              Directory Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
