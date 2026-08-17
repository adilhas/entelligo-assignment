import Link from "next/link"
import { Users, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xs p-8 sm:p-12 space-y-6 shadow-xl">
        <div className="size-20 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
          <Users className="size-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
            User Record Not Found
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            The profile or directory page you are attempting to access does not
            exist or may have been relocated.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button asChild variant="default" size="default" className="gap-2">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Return to Directory
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
