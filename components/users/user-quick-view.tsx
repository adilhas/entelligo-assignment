"use client"

import Link from "next/link"
import {
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  ExternalLink,
  Star,
  Copy,
  Check,
} from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { User } from "@/types/user"

interface UserQuickViewProps {
  user: User | null
  isOpen: boolean
  onClose: () => void
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export function UserQuickView({
  user,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}: UserQuickViewProps) {
  const [copiedEmail, setCopiedEmail] = useState(false)

  if (!user) return null

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(user.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const roleVariant =
    user.role === "admin"
      ? "destructive"
      : user.role === "moderator"
      ? "purple"
      : "secondary"

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md sm:max-w-lg p-0 overflow-hidden border-border/80">
        {/* Banner Top Gradient Header */}
        <div className="relative h-28 bg-gradient-to-r from-primary/30 via-primary/20 to-purple-500/20 p-4">
          <button
            onClick={() => onToggleFavorite(user.id)}
            className="absolute left-4 top-4 rounded-full bg-background/80 backdrop-blur-md p-2 text-muted-foreground hover:text-amber-500 transition-colors shadow-xs"
            title={isFavorite ? "Remove bookmark" : "Add bookmark"}
          >
            <Star
              className={`size-4 ${
                isFavorite
                  ? "fill-amber-500 text-amber-500"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        </div>

        {/* User Profile Avatar & Identity */}
        <div className="px-6 pb-6 pt-0 relative -mt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-4">
            <Avatar
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              fallback={`${user.firstName[0]}${user.lastName[0]}`}
              size="xl"
              className="border-4 border-background shadow-lg"
            />
            <div className="flex items-center gap-2">
              <Badge variant={roleVariant} className="capitalize">
                {user.role}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {user.gender} • {user.age} yrs
              </Badge>
            </div>
          </div>

          <DialogHeader className="text-left space-y-1 mb-4">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <span>
                {user.firstName} {user.lastName}
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                @{user.username}
              </span>
            </DialogTitle>
            <p className="text-sm font-medium text-primary flex items-center gap-1.5">
              <Briefcase className="size-3.5" />
              {user.company?.title || "Professional"}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Building className="size-3.5" />
              {user.company?.name} • {user.company?.department}
            </p>
          </DialogHeader>

          <Separator className="my-4" />

          {/* Quick Contact & Details */}
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors">
              <div className="flex items-center gap-2.5 text-muted-foreground truncate">
                <Mail className="size-4 shrink-0 text-primary/70" />
                <span className="truncate text-foreground text-xs sm:text-sm">
                  {user.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="xs"
                onClick={handleCopyEmail}
                className="gap-1 text-xs shrink-0"
              >
                {copiedEmail ? (
                  <>
                    <Check className="size-3 text-emerald-500" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-muted/40 text-xs sm:text-sm">
              <Phone className="size-4 shrink-0 text-primary/70" />
              <span className="text-foreground">{user.phone}</span>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-muted/40 text-xs sm:text-sm">
              <MapPin className="size-4 shrink-0 text-primary/70" />
              <span className="text-foreground truncate">
                {user.address?.city}, {user.address?.state}, {user.address?.country}
              </span>
            </div>
          </div>

          {/* Action Footer Link to Full Profile */}
          <div className="mt-6 flex items-center justify-between gap-3 pt-2">
            <Button
              variant="outline"
              size="default"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              asChild
              variant="default"
              size="default"
              className="flex-1 gap-2"
            >
              <Link href={`/users/${user.id}`} onClick={onClose}>
                <span>Full Profile</span>
                <ExternalLink className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
