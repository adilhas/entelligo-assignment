"use client"

import * as React from "react"
import Link from "next/link"
import {
  Star,
  Eye,
  Mail,
  ArrowRight,
  MapPin,
  Building,
  Check,
  Copy,
} from "lucide-react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User } from "@/types/user"

interface UserTableProps {
  users: User[]
  isFavorite: (id: number) => boolean
  onToggleFavorite: (id: number) => void
  onQuickView: (user: User) => void
}

export function UserTable({
  users,
  isFavorite,
  onToggleFavorite,
  onQuickView,
}: UserTableProps) {
  const [copiedId, setCopiedId] = React.useState<number | null>(null)

  const handleCopyEmail = (e: React.MouseEvent, user: User) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(user.email)
    setCopiedId(user.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs overflow-hidden shadow-xs">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12 text-center">★</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Role & Dept</TableHead>
            <TableHead className="hidden md:table-cell">Company & Title</TableHead>
            <TableHead className="hidden lg:table-cell">Contact</TableHead>
            <TableHead className="hidden sm:table-cell">Location</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const favorite = isFavorite(user.id)
            const roleVariant =
              user.role === "admin"
                ? "destructive"
                : user.role === "moderator"
                ? "purple"
                : "secondary"

            return (
              <TableRow
                key={user.id}
                className="group cursor-pointer hover:bg-muted/60 transition-colors"
              >
                {/* Favorite Star */}
                <TableCell className="text-center p-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleFavorite(user.id)
                    }}
                    className="size-8 rounded-lg inline-flex items-center justify-center text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                    title={favorite ? "Remove bookmark" : "Add bookmark"}
                  >
                    <Star
                      className={`size-4 ${
                        favorite
                          ? "fill-amber-500 text-amber-500"
                          : "text-muted-foreground/60"
                      }`}
                    />
                  </button>
                </TableCell>

                {/* User Info (Avatar + Name + Username) */}
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      fallback={`${user.firstName[0]}${user.lastName[0]}`}
                      size="md"
                    />
                    <div>
                      <Link
                        href={`/users/${user.id}`}
                        className="font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                      >
                        {user.firstName} {user.lastName}
                      </Link>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <span>@{user.username}</span>
                        <span>•</span>
                        <span>{user.age}y</span>
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Role & Department */}
                <TableCell className="py-3">
                  <div className="flex flex-col gap-1 items-start">
                    <Badge variant={roleVariant} className="text-[10px] px-1.5 py-0 capitalize">
                      {user.role}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {user.company?.department || "General"}
                    </span>
                  </div>
                </TableCell>

                {/* Company & Title */}
                <TableCell className="py-3 hidden md:table-cell">
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium text-foreground truncate max-w-[200px]">
                      {user.company?.title || "Staff"}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 truncate max-w-[200px]">
                      <Building className="size-3 shrink-0" />
                      <span>{user.company?.name || "Independent"}</span>
                    </p>
                  </div>
                </TableCell>

                {/* Contact Email */}
                <TableCell className="py-3 hidden lg:table-cell">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Mail className="size-3 text-primary/70 shrink-0" />
                    <span className="truncate max-w-[160px]">{user.email}</span>
                    <button
                      onClick={(e) => handleCopyEmail(e, user)}
                      className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy email"
                    >
                      {copiedId === user.id ? (
                        <Check className="size-3 text-emerald-500" />
                      ) : (
                        <Copy className="size-3" />
                      )}
                    </button>
                  </div>
                </TableCell>

                {/* Location */}
                <TableCell className="py-3 hidden sm:table-cell text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3 shrink-0" />
                    <span>{user.address?.city}, {user.address?.country}</span>
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="py-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onQuickView(user)}
                      title="Quick Preview"
                    >
                      <Eye className="size-3.5" />
                    </Button>
                    <Button asChild variant="outline" size="sm" className="h-7 px-2 text-xs gap-1">
                      <Link href={`/users/${user.id}`}>
                        <span className="hidden sm:inline">Profile</span>
                        <ArrowRight className="size-3" />
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
