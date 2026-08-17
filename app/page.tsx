import { Suspense } from "react"
import { Sparkles, Users } from "lucide-react"
import { fetchUsers } from "@/lib/api"
import { UserDirectoryClient } from "@/components/users/user-directory-client"
import Loading from "./loading"

export const revalidate = 3600

export default async function HomePage() {
  const data = await fetchUsers({ limit: 0 })
  const users = data.users || []

  return (
    <div className="relative min-h-[calc(100vh-4rem)] pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-primary/10 via-purple-500/10 to-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            <span>Real-time Team Directory</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                User Directory
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 max-w-2xl">
                Explore members, departments, contact info, and detailed profiles
                across your entire organization.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/40 border border-border/60 px-3 py-1.5 rounded-lg w-fit">
              <Users className="size-3.5 text-primary" />
              <span>{users.length} verified records synced</span>
            </div>
          </div>
        </div>

        <Suspense fallback={<Loading />}>
          <UserDirectoryClient initialUsers={users} />
        </Suspense>
      </div>
    </div>
  )
}
