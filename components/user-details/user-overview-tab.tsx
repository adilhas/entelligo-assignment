import {
  Calendar,
  Heart,
  GraduationCap,
  Sparkles,
  Ruler,
  Eye,
  User as UserIcon,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { User } from "@/types/user"

export function UserOverviewTab({ user }: { user: User }) {
  const personalDetails = [
    {
      label: "Full Legal Name",
      value: `${user.firstName} ${user.lastName}${user.maidenName ? ` (maiden: ${user.maidenName})` : ""}`,
      icon: UserIcon,
    },
    {
      label: "Date of Birth",
      value: user.birthDate ? new Date(user.birthDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "N/A",
      icon: Calendar,
    },
    {
      label: "Age & Gender",
      value: `${user.age} years old • ${user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}`,
      icon: Sparkles,
    },
    {
      label: "Blood Group",
      value: user.bloodGroup || "O+",
      icon: Heart,
    },
    {
      label: "Height & Weight",
      value: `${user.height ? `${user.height} cm` : "—"} • ${user.weight ? `${user.weight} kg` : "—"}`,
      icon: Ruler,
    },
    {
      label: "Physical Characteristics",
      value: `Eye Color: ${user.eyeColor} • Hair: ${user.hair?.color} (${user.hair?.type})`,
      icon: Eye,
    },
    {
      label: "Higher Education",
      value: user.university || "University Graduate",
      icon: GraduationCap,
    },
    {
      label: "Directory ID",
      value: `#${user.id} (${user.username})`,
      icon: UserIcon,
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
        <CardHeader className="pb-3 border-b border-border/40">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <UserIcon className="size-5 text-primary" />
            <span>Personal & Biometric Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {personalDetails.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-foreground truncate">
                      {item.value}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
