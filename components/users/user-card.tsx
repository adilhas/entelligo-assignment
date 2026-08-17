"use client"

import * as React from "react"
import Link from "next/link"
import {
  Mail,
  MapPin,
  Briefcase,
  Building,
  Star,
  ArrowRight,
  Eye,
  Check,
  Copy,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User } from "@/types/user"

interface UserCardProps {
  user: User
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
  onQuickView: (user: User) => void
}

export function UserCard({
  user,
  isFavorite,
  onToggleFavorite,
  onQuickView,
}: UserCardProps) {
  const [copiedEmail, setCopiedEmail] = React.useState(false)

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
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

  const deptColors: Record<string, string> = {
    Engineering: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    Marketing: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
    Sales: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    Finance: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    Support: "bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20",
    "Human Resources": "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
    Legal: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
    "Product Management": "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
    "Research and Development": "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20",
  }

  const deptClass =
    deptColors[user.company?.department] ||
    "bg-muted text-muted-foreground border-border"

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border border-border/70 bg-card/70 backdrop-blur-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/40">
      {/* Top Banner Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary/40 via-purple-500/40 to-blue-500/40 opacity-50 group-hover:opacity-100 transition-opacity" />

      {/* Card Body */}
      <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Header Row: Avatar + Badges + Favorite Toggle */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <Link
              href={`/users/${user.id}`}
              className="flex items-center gap-3 group/avatar"
            >
              <div className="relative">
                <Avatar
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                  fallback={`${user.firstName[0]}${user.lastName[0]}`}
                  size="lg"
                  className="transition-transform duration-300 group-hover/avatar:scale-105"
                />
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-background" />
              </div>
            </Link>

            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onToggleFavorite(user.id)
                }}
                className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
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

              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onQuickView(user)
                }}
                className="size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors opacity-80 sm:opacity-0 group-hover:opacity-100"
                title="Quick View"
              >
                <Eye className="size-4" />
              </button>
            </div>
          </div>

          {/* User Name & Titles */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/users/${user.id}`}
                className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1 hover:underline"
              >
                {user.firstName} {user.lastName}
              </Link>
              <Badge variant={roleVariant} className="text-[10px] px-1.5 py-0 h-4 capitalize">
                {user.role}
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
              <span>@{user.username}</span>
              <span>•</span>
              <span className="capitalize">{user.gender}</span>
              <span>•</span>
              <span>{user.age} yrs</span>
            </p>
          </div>

          {/* Job Title & Company */}
          <div className="mt-3.5 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <Briefcase className="size-3.5 text-primary/70 shrink-0" />
              <span className="truncate">{user.company?.title || "Staff Member"}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building className="size-3.5 shrink-0" />
              <span className="truncate">{user.company?.name || "Independent"}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">
                {user.address?.city}, {user.address?.stateCode || user.address?.state}
              </span>
            </div>
          </div>

          {/* Department Tag */}
          {user.company?.department && (
            <div className="mt-3">
              <span
                className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-md border ${deptClass}`}
              >
                {user.company.department}
              </span>
            </div>
          )}
        </div>

        {/* Contact Snippets & Action Button */}
        <div className="space-y-3 pt-3 border-t border-border/50">
          {/* Email quick copy */}
          <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/30 hover:bg-muted/60 p-1.5 rounded-lg transition-colors">
            <div className="flex items-center gap-1.5 truncate pr-1">
              <Mail className="size-3 text-primary/70 shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="text-muted-foreground hover:text-foreground p-0.5 rounded transition-colors shrink-0"
              title="Copy email"
            >
              {copiedEmail ? (
                <Check className="size-3.5 text-emerald-500" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>

          {/* View Profile Action Link */}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full justify-between group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
          >
            <Link href={`/users/${user.id}`}>
              <span className="font-medium text-xs">View Profile</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
