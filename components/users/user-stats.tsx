import { Users, Briefcase, Calendar, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "@/types/user"

interface UserStatsProps {
  users: User[]
  favoriteCount: number
}

export function UserStats({ users, favoriteCount }: UserStatsProps) {
  const totalUsers = users.length
  const departments = new Set(users.map((u) => u.company?.department).filter(Boolean))
  const avgAge = totalUsers
    ? Math.round(users.reduce((acc, u) => acc + (u.age || 0), 0) / totalUsers)
    : 0

  const stats = [
    {
      label: "Total Members",
      value: totalUsers,
      subtext: "Across global teams",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      label: "Departments",
      value: departments.size,
      subtext: "Functional divisions",
      icon: Briefcase,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      label: "Average Age",
      value: avgAge ? `${avgAge} yrs` : "—",
      subtext: "Talent distribution",
      icon: Calendar,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      label: "Bookmarked",
      value: favoriteCount,
      subtext: "Pinned contacts",
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className="border bg-card/60 backdrop-blur-xs hover:shadow-md hover:border-border transition-all duration-200"
          >
            <CardContent className="p-4 sm:p-5 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="text-[11px] text-muted-foreground/80 hidden sm:block">
                  {stat.subtext}
                </p>
              </div>
              <div
                className={`flex size-10 sm:size-12 items-center justify-center rounded-xl ${stat.bgColor} ${stat.color} ${stat.borderColor} border`}
              >
                <Icon className="size-5 sm:size-6" />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
