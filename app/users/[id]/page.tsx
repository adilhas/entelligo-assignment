import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  User as UserIcon,
  Building2,
  Phone,
  Shield,
  Activity,
} from "lucide-react"
import { fetchUserById, fetchUserPosts, fetchUserTodos } from "@/lib/api"
import { UserHeader } from "@/components/user-details/user-header"
import { UserOverviewTab } from "@/components/user-details/user-overview-tab"
import { UserCompanyTab } from "@/components/user-details/user-company-tab"
import { UserContactTab } from "@/components/user-details/user-contact-tab"
import { UserSecurityTab } from "@/components/user-details/user-security-tab"
import { UserActivityTab } from "@/components/user-details/user-activity-tab"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const user = await fetchUserById(id)
    return {
      title: `${user.firstName} ${user.lastName} (@${user.username}) - NexusUsers Directory`,
      description: `${user.company?.title || "Professional"} at ${user.company?.name || "Independent"}. View contact details, department, bio, and organizational background.`,
      openGraph: {
        images: [{ url: user.image }],
      },
    }
  } catch {
    return {
      title: "User Profile - NexusUsers Directory",
      description: "Detailed member profile in NexusUsers Directory.",
    }
  }
}

export default async function UserDetailsPage({ params }: PageProps) {
  const { id } = await params

  let user
  let posts = []
  let todos = []

  try {
    const [fetchedUser, fetchedPosts, fetchedTodos] = await Promise.all([
      fetchUserById(id),
      fetchUserPosts(id),
      fetchUserTodos(id),
    ])
    user = fetchedUser
    posts = fetchedPosts
    todos = fetchedTodos
  } catch (error) {
    console.error(`Failed to load user ${id}:`, error)
    notFound()
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] pb-16">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-br from-primary/10 via-purple-500/10 to-transparent blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8">
        <UserHeader user={user} />

        {/* Tabbed Navigation View */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full h-auto p-1.5 gap-1.5 rounded-xl bg-card/60 border border-border/80 backdrop-blur-xs">
            <TabsTrigger
              value="overview"
              className="flex items-center justify-center gap-2 py-2 text-xs sm:text-sm"
            >
              <UserIcon className="size-4" />
              <span>Overview</span>
            </TabsTrigger>

            <TabsTrigger
              value="company"
              className="flex items-center justify-center gap-2 py-2 text-xs sm:text-sm"
            >
              <Building2 className="size-4" />
              <span>Company</span>
            </TabsTrigger>

            <TabsTrigger
              value="contact"
              className="flex items-center justify-center gap-2 py-2 text-xs sm:text-sm"
            >
              <Phone className="size-4" />
              <span>Contact</span>
            </TabsTrigger>

            <TabsTrigger
              value="security"
              className="flex items-center justify-center gap-2 py-2 text-xs sm:text-sm"
            >
              <Shield className="size-4" />
              <span>Financial & Web3</span>
            </TabsTrigger>

            <TabsTrigger
              value="activity"
              className="flex items-center justify-center gap-2 py-2 text-xs sm:text-sm col-span-2 sm:col-span-1"
            >
              <Activity className="size-4 text-emerald-500" />
              <span>Activity</span>
              {(posts.length > 0 || todos.length > 0) && (
                <span className="ml-1 size-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </TabsTrigger>
          </TabsList>

          {/* Tab Panes */}
          <TabsContent value="overview">
            <UserOverviewTab user={user} />
          </TabsContent>

          <TabsContent value="company">
            <UserCompanyTab user={user} />
          </TabsContent>

          <TabsContent value="contact">
            <UserContactTab user={user} />
          </TabsContent>

          <TabsContent value="security">
            <UserSecurityTab user={user} />
          </TabsContent>

          <TabsContent value="activity">
            <UserActivityTab posts={posts} todos={todos} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
