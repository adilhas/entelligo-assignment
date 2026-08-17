import {
  Building2,
  Briefcase,
  Layers,
  MapPin,
  ShieldCheck,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from "@/types/user"

export function UserCompanyTab({ user }: { user: User }) {
  const company = user.company

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Company Card */}
        <Card className="md:col-span-2 border-border/80 bg-card/60 backdrop-blur-xs">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="size-5 text-primary" />
                <span>Organizational Placement</span>
              </div>
              <Badge variant="secondary" className="capitalize">
                {user.role}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border/50 bg-muted/20 space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                  <Briefcase className="size-3.5 text-primary" />
                  Official Job Title
                </p>
                <p className="text-base font-bold text-foreground">
                  {company?.title || "Staff Member"}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border/50 bg-muted/20 space-y-1">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                  <Layers className="size-3.5 text-primary" />
                  Department
                </p>
                <p className="text-base font-bold text-foreground">
                  {company?.department || "General Operations"}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border/50 bg-muted/20 space-y-2">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                <Building2 className="size-3.5 text-primary" />
                Company Organization
              </p>
              <p className="text-lg font-extrabold text-foreground">
                {company?.name || "Independent"}
              </p>
              {company?.address && (
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="size-3 text-muted-foreground" />
                  {company.address.address}, {company.address.city},{" "}
                  {company.address.state} {company.address.postalCode},{" "}
                  {company.address.country}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Corporate Identifiers */}
        <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              <span>Corporate Compliance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="p-3 rounded-lg bg-muted/30 border border-border/40 space-y-1">
              <p className="text-xs text-muted-foreground">Employer ID (EIN)</p>
              <p className="text-sm font-mono font-bold text-foreground">
                {user.ein || "XX-XXXXXXX"}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-muted/30 border border-border/40 space-y-1">
              <p className="text-xs text-muted-foreground">SSN (Masked)</p>
              <p className="text-sm font-mono font-bold text-foreground">
                {user.ssn || "***-**-****"}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-muted/30 border border-border/40 space-y-1">
              <p className="text-xs text-muted-foreground">Access Privilege</p>
              <p className="text-sm font-semibold capitalize text-foreground">
                {user.role} Level
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
