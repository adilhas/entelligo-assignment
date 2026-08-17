"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  Phone,
  Share2,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Building,
  MapPin,
} from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { User } from "@/types/user"
import { useFavorites } from "@/hooks/use-favorites"

interface UserHeaderProps {
  user: User
  totalUsersCount?: number
}

export function UserHeader({ user, totalUsersCount = 208 }: UserHeaderProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [copiedLink, setCopiedLink] = React.useState(false)

  const favorite = isFavorite(user.id)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const roleVariant =
    user.role === "admin"
      ? "destructive"
      : user.role === "moderator"
      ? "purple"
      : "secondary"

  const prevId = user.id > 1 ? user.id - 1 : totalUsersCount
  const nextId = user.id < totalUsersCount ? user.id + 1 : 1

  return (
    <div className="space-y-6">
      {/* Top Navigation Bar: Breadcrumbs + Quick Prev/Next Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Directory</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Members</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {user.firstName} {user.lastName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button asChild variant="outline" size="xs" className="h-8 gap-1 rounded-lg">
            <Link href="/">
              <ArrowLeft className="size-3.5" />
              <span>Back to Directory</span>
            </Link>
          </Button>

          <div className="flex items-center gap-1 border border-border/70 rounded-lg p-0.5 bg-muted/30">
            <Button
              asChild
              variant="ghost"
              size="icon-xs"
              className="size-7"
              title="Previous User Profile"
            >
              <Link href={`/users/${prevId}`}>
                <ChevronLeft className="size-3.5" />
              </Link>
            </Button>
            <span className="text-[11px] font-mono px-1 text-muted-foreground">
              #{user.id}
            </span>
            <Button
              asChild
              variant="ghost"
              size="icon-xs"
              className="size-7"
              title="Next User Profile"
            >
              <Link href={`/users/${nextId}`}>
                <ChevronRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Profile Banner Card */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xs shadow-md">
        {/* Cover Gradient Background */}
        <div className="h-36 sm:h-44 w-full bg-gradient-to-r from-primary/30 via-purple-600/20 to-blue-600/30 relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => toggleFavorite(user.id)}
              className="h-8 rounded-lg gap-1.5 shadow-xs bg-background/80 backdrop-blur-md hover:bg-background"
            >
              <Bookmark
                className={`size-3.5 ${
                  favorite
                    ? "fill-amber-500 text-amber-500"
                    : "text-muted-foreground"
                }`}
              />
              <span className="text-xs">
                {favorite ? "Bookmarked" : "Bookmark"}
              </span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyLink}
              className="h-8 rounded-lg gap-1.5 shadow-xs bg-background/80 backdrop-blur-md hover:bg-background"
            >
              {copiedLink ? (
                <>
                  <Check className="size-3.5 text-emerald-500" />
                  <span className="text-xs text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="size-3.5" />
                  <span className="text-xs">Share</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Profile Identity Details */}
        <div className="px-6 pb-6 pt-0 relative -mt-16 sm:-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Avatar & Core Identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
              <div className="relative">
                <Avatar
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                  fallback={`${user.firstName[0]}${user.lastName[0]}`}
                  size="2xl"
                  className="border-4 border-background shadow-xl ring-4 ring-primary/20"
                />
                <span className="absolute bottom-1 right-1 size-5 rounded-full bg-emerald-500 ring-4 ring-background" />
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {user.firstName} {user.lastName}
                  </h1>
                  {user.maidenName && (
                    <span className="text-sm text-muted-foreground">
                      (née {user.maidenName})
                    </span>
                  )}
                  <Badge variant={roleVariant} className="capitalize text-xs font-semibold">
                    {user.role}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap font-medium">
                  <span className="text-primary font-semibold">@{user.username}</span>
                  <span>•</span>
                  <span className="capitalize">{user.gender}</span>
                  <span>•</span>
                  <span>{user.age} years old</span>
                  <span>•</span>
                  <span>Blood Group {user.bloodGroup}</span>
                </p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap pt-1">
                  <span className="flex items-center gap-1 text-foreground font-medium">
                    <Briefcase className="size-3.5 text-primary/70" />
                    {user.company?.title || "Professional"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Building className="size-3.5" />
                    {user.company?.name} ({user.company?.department})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {user.address?.city}, {user.address?.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <Button asChild variant="default" size="sm" className="h-9 gap-1.5 rounded-xl shadow-xs">
                <a href={`mailto:${user.email}`}>
                  <Mail className="size-3.5" />
                  <span>Send Email</span>
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="h-9 gap-1.5 rounded-xl">
                <a href={`tel:${user.phone}`}>
                  <Phone className="size-3.5" />
                  <span>Call {user.phone}</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
