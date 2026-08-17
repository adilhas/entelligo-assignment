"use client"

import { useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Compass,
  ExternalLink,
  Copy,
  Check,
  Globe,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User } from "@/types/user"

export function UserContactTab({ user }: { user: User }) {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const addr = user.address
  const lat = addr?.coordinates?.lat
  const lng = addr?.coordinates?.lng

  const googleMapsUrl =
    lat && lng
      ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${addr?.address || ""}, ${addr?.city || ""}, ${addr?.state || ""}`
        )}`

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(user.phone)
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Direct Contact Channels */}
        <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Mail className="size-5 text-primary" />
              <span>Direct Communication</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {/* Email */}
            <div className="p-4 rounded-xl border border-border/50 bg-muted/20 flex items-center justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Mail className="size-3.5 text-primary" />
                  Primary Work Email
                </p>
                <a
                  href={`mailto:${user.email}`}
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors truncate block"
                >
                  {user.email}
                </a>
              </div>
              <Button
                variant="outline"
                size="xs"
                onClick={handleCopyEmail}
                className="gap-1 text-xs shrink-0"
              >
                {copiedEmail ? (
                  <>
                    <Check className="size-3 text-emerald-500" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>

            {/* Phone */}
            <div className="p-4 rounded-xl border border-border/50 bg-muted/20 flex items-center justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Phone className="size-3.5 text-primary" />
                  Direct Phone Line
                </p>
                <a
                  href={`tel:${user.phone}`}
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors truncate block"
                >
                  {user.phone}
                </a>
              </div>
              <Button
                variant="outline"
                size="xs"
                onClick={handleCopyPhone}
                className="gap-1 text-xs shrink-0"
              >
                {copiedPhone ? (
                  <>
                    <Check className="size-3 text-emerald-500" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>

            {/* IP & Online Presence */}
            <div className="p-4 rounded-xl border border-border/50 bg-muted/20 space-y-1">
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Globe className="size-3.5 text-primary" />
                Network IP
              </p>
              <p className="text-sm font-mono font-semibold text-foreground">
                {user.ip || "127.0.0.1"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Physical Address & Map Geo-coordinates */}
        <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-lg font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                <span>Physical Residence</span>
              </div>
              <Button asChild variant="outline" size="xs" className="gap-1 text-xs">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="size-3" />
                </a>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="p-4 rounded-xl border border-border/50 bg-muted/20 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Street Address
              </p>
              <p className="text-base font-bold text-foreground">
                {addr?.address || "Address not provided"}
              </p>
              <p className="text-sm text-muted-foreground">
                {addr?.city}, {addr?.stateCode || addr?.state} {addr?.postalCode}
              </p>
              <p className="text-xs font-semibold text-primary">
                {addr?.country || "United States"}
              </p>
            </div>

            {/* Geo Coordinates Pin */}
            <div className="p-4 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 to-purple-500/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Compass className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    GPS Coordinates
                  </p>
                  <p className="text-xs font-mono font-bold text-foreground">
                    Lat: {lat?.toFixed(4) || "—"}, Lng: {lng?.toFixed(4) || "—"}
                  </p>
                </div>
              </div>
              <Button asChild size="sm" variant="secondary" className="text-xs">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Locate
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
