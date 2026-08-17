import { Skeleton } from "@/components/ui/skeleton"

export default function UserDetailsLoading() {
  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in-50 duration-300">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-48 rounded" />
        <Skeleton className="h-8 w-32 rounded-lg" />
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/40 overflow-hidden space-y-4">
        <Skeleton className="h-40 w-full" />
        <div className="px-6 pb-6 -mt-16 flex flex-col sm:flex-row items-start sm:items-end gap-6">
          <Skeleton className="size-28 rounded-full border-4 border-background" />
          <div className="space-y-2 flex-1 pt-2">
            <Skeleton className="h-7 w-64 rounded" />
            <Skeleton className="h-4 w-48 rounded" />
            <Skeleton className="h-4 w-72 rounded" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28 rounded-xl" />
            <Skeleton className="h-9 w-28 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Skeleton className="h-11 w-96 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
