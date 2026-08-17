import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in-50 duration-300">
      <div className="space-y-3 max-w-2xl">
        <Skeleton className="h-9 w-64 rounded-lg" />
        <Skeleton className="h-5 w-96 rounded-lg" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-xl border border-border/50 bg-card/40 flex items-center justify-between"
          >
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-3 w-28" />
            </div>
            <Skeleton className="size-12 rounded-xl" />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Skeleton className="h-11 flex-1 rounded-xl" />
        <Skeleton className="h-11 w-28 rounded-xl" />
        <Skeleton className="h-11 w-24 rounded-xl" />
        <Skeleton className="h-11 w-20 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-xl border border-border/50 bg-card/40 space-y-4"
          >
            <div className="flex items-start justify-between">
              <Skeleton className="size-14 rounded-full" />
              <Skeleton className="size-8 rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4 rounded-md" />
              <Skeleton className="h-3 w-1/2 rounded-md" />
            </div>
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-2/3 rounded-md" />
            </div>
            <Skeleton className="h-8 w-full rounded-lg mt-4" />
          </div>
        ))}
      </div>
    </div>
  )
}
