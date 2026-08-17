"use client"

import * as React from "react"
import { Users, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"
import { User, SortField, SortOrder, ViewMode } from "@/types/user"
import { UserStats } from "@/components/users/user-stats"
import { UserFilters } from "@/components/users/user-filters"
import { UserCard } from "@/components/users/user-card"
import { UserTable } from "@/components/users/user-table"
import { UserQuickView } from "@/components/users/user-quick-view"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/use-favorites"

interface UserDirectoryClientProps {
  initialUsers: User[]
}

const ITEMS_PER_PAGE = 12

export function UserDirectoryClient({ initialUsers }: UserDirectoryClientProps) {
  const [users] = React.useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedDepartment, setSelectedDepartment] = React.useState("all")
  const [selectedGender, setSelectedGender] = React.useState("all")
  const [selectedRole, setSelectedRole] = React.useState("all")
  const [sortField, setSortField] = React.useState<SortField>("name")
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("asc")
  const [showFavoritesOnly, setShowFavoritesOnly] = React.useState(false)
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [quickViewUser, setQuickViewUser] = React.useState<User | null>(null)

  const { isFavorite, toggleFavorite, count: favoritesCount } = useFavorites()

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleDepartmentChange = (dept: string) => {
    setSelectedDepartment(dept)
    setCurrentPage(1)
  }

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender)
    setCurrentPage(1)
  }

  const handleRoleChange = (role: string) => {
    setSelectedRole(role)
    setCurrentPage(1)
  }

  const handleSortChange = (field: SortField, order: SortOrder) => {
    setSortField(field)
    setSortOrder(order)
    setCurrentPage(1)
  }

  const handleToggleFavoritesOnly = () => {
    setShowFavoritesOnly((prev) => !prev)
    setCurrentPage(1)
  }

  // Extract unique departments and roles for filters
  const departments = React.useMemo(() => {
    const set = new Set<string>()
    users.forEach((u) => {
      if (u.company?.department) set.add(u.company.department)
    })
    return Array.from(set).sort()
  }, [users])

  const roles = React.useMemo(() => {
    const set = new Set<string>()
    users.forEach((u) => {
      if (u.role) set.add(u.role)
    })
    return Array.from(set).sort()
  }, [users])

  // Filter and sort users
  const filteredUsers = React.useMemo(() => {
    return users
      .filter((user) => {
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim()
          const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
          const username = (user.username || "").toLowerCase()
          const email = (user.email || "").toLowerCase()
          const companyName = (user.company?.name || "").toLowerCase()
          const jobTitle = (user.company?.title || "").toLowerCase()
          const department = (user.company?.department || "").toLowerCase()

          const matches =
            fullName.includes(query) ||
            username.includes(query) ||
            email.includes(query) ||
            companyName.includes(query) ||
            jobTitle.includes(query) ||
            department.includes(query)

          if (!matches) return false
        }

        // Department filter
        if (
          selectedDepartment !== "all" &&
          user.company?.department !== selectedDepartment
        ) {
          return false
        }

        // Gender filter
        if (
          selectedGender !== "all" &&
          user.gender.toLowerCase() !== selectedGender.toLowerCase()
        ) {
          return false
        }

        // Role filter
        if (selectedRole !== "all" && user.role !== selectedRole) {
          return false
        }

        // Favorites filter
        if (showFavoritesOnly && !isFavorite(user.id)) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        let comp = 0
        if (sortField === "name") {
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase()
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase()
          comp = nameA.localeCompare(nameB)
        } else if (sortField === "age") {
          comp = (a.age || 0) - (b.age || 0)
        } else if (sortField === "company") {
          const compA = (a.company?.name || "").toLowerCase()
          const compB = (b.company?.name || "").toLowerCase()
          comp = compA.localeCompare(compB)
        } else if (sortField === "department") {
          const deptA = (a.company?.department || "").toLowerCase()
          const deptB = (b.company?.department || "").toLowerCase()
          comp = deptA.localeCompare(deptB)
        }
        return sortOrder === "asc" ? comp : -comp
      })
  }, [
    users,
    searchQuery,
    selectedDepartment,
    selectedGender,
    selectedRole,
    showFavoritesOnly,
    isFavorite,
    sortField,
    sortOrder,
  ])

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1
  const paginatedUsers = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredUsers, currentPage])

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedDepartment !== "all" ||
    selectedGender !== "all" ||
    selectedRole !== "all" ||
    showFavoritesOnly

  const handleResetFilters = () => {
    setSearchQuery("")
    setSelectedDepartment("all")
    setSelectedGender("all")
    setSelectedRole("all")
    setShowFavoritesOnly(false)
    setSortField("name")
    setSortOrder("asc")
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      <UserStats users={users} favoriteCount={favoritesCount} />

      <UserFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={handleDepartmentChange}
        departments={departments}
        selectedGender={selectedGender}
        onGenderChange={handleGenderChange}
        selectedRole={selectedRole}
        onRoleChange={handleRoleChange}
        roles={roles}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={handleToggleFavoritesOnly}
        favoritesCount={favoritesCount}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onResetFilters={handleResetFilters}
        isFiltered={isFiltered}
        totalResults={filteredUsers.length}
      />

      {filteredUsers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/80 bg-card/40 p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="size-16 rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground">
            <Users className="size-8" />
          </div>
          <div className="space-y-1.5 max-w-sm">
            <h3 className="text-lg font-semibold text-foreground">
              No matching users found
            </h3>
            <p className="text-sm text-muted-foreground">
              We couldn&apos;t find any directory members matching your current
              search or filter criteria.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="gap-2"
          >
            <RefreshCw className="size-4" />
            Reset all filters
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        /* Grid Cards View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {paginatedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isFavorite={isFavorite(user.id)}
              onToggleFavorite={toggleFavorite}
              onQuickView={setQuickViewUser}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <UserTable
          users={paginatedUsers}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onQuickView={setQuickViewUser}
        />
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/60">
          <p className="text-xs text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
            {filteredUsers.length} members
          </p>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 gap-1 text-xs"
            >
              <ChevronLeft className="size-3.5" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center gap-1 px-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1
                if (totalPages > 5) {
                  if (currentPage > 3) {
                    pageNum = currentPage - 3 + i
                  }
                  if (pageNum > totalPages) {
                    pageNum = totalPages - 4 + i
                  }
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "ghost"}
                    size="icon-xs"
                    onClick={() => setCurrentPage(pageNum)}
                    className="size-8 text-xs rounded-lg"
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 gap-1 text-xs"
            >
              <span>Next</span>
              <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </div>
      )}

      <UserQuickView
        user={quickViewUser}
        isOpen={Boolean(quickViewUser)}
        onClose={() => setQuickViewUser(null)}
        isFavorite={quickViewUser ? isFavorite(quickViewUser.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  )
}
