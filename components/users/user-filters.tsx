"use client"

import * as React from "react"
import {
  Search,
  X,
  LayoutGrid,
  List,
  SlidersHorizontal,
  RotateCcw,
  Star,
  ArrowUpDown,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SortField, SortOrder, ViewMode } from "@/types/user"

interface UserFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedDepartment: string
  onDepartmentChange: (value: string) => void
  departments: string[]
  selectedGender: string
  onGenderChange: (value: string) => void
  selectedRole: string
  onRoleChange: (value: string) => void
  roles: string[]
  sortField: SortField
  sortOrder: SortOrder
  onSortChange: (field: SortField, order: SortOrder) => void
  showFavoritesOnly: boolean
  onToggleFavoritesOnly: () => void
  favoritesCount: number
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  onResetFilters: () => void
  isFiltered: boolean
  totalResults: number
}

export function UserFilters({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  departments,
  selectedGender,
  onGenderChange,
  selectedRole,
  onRoleChange,
  roles,
  sortField,
  sortOrder,
  onSortChange,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  favoritesCount,
  viewMode,
  onViewModeChange,
  onResetFilters,
  isFiltered,
  totalResults,
}: UserFiltersProps) {
  const [showAdvanced, setShowAdvanced] = React.useState(false)

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Input
            icon={<Search className="size-4" />}
            type="text"
            placeholder="Search by name, email, role, or company..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-card/80 pr-9 h-11 text-sm border-border/80 focus-visible:ring-2 focus-visible:ring-primary/20 rounded-xl"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors rounded-full"
              title="Clear search"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <Button
            variant={showAdvanced || isFiltered ? "secondary" : "outline"}
            size="default"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="h-11 rounded-xl gap-2 font-medium"
          >
            <SlidersHorizontal className="size-4" />
            <span>Filters</span>
            {isFiltered && (
              <span className="size-2 rounded-full bg-primary animate-pulse" />
            )}
          </Button>

          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            size="default"
            onClick={onToggleFavoritesOnly}
            className={`h-11 rounded-xl gap-1.5 font-medium transition-all ${showFavoritesOnly
              ? "bg-amber-500 hover:bg-amber-600 text-white"
              : "hover:text-amber-500"
              }`}
            title="Show only bookmarked users"
          >
            <Star
              className={`size-4 ${showFavoritesOnly
                ? "fill-white text-white"
                : "text-amber-500"
                }`}
            />
            <span className="hidden xs:inline">Saved</span>
            {favoritesCount > 0 && (
              <span
                className={`ml-0.5 rounded-full px-1.5 py-0.2 text-xs font-semibold ${showFavoritesOnly
                  ? "bg-white/20 text-white"
                  : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                  }`}
              >
                {favoritesCount}
              </span>
            )}
          </Button>

          {/* View Mode Switcher: Grid vs Table */}
          <div className="flex items-center rounded-xl border border-border/80 bg-muted/40 p-1">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`flex items-center justify-center size-9 rounded-lg transition-all ${viewMode === "grid"
                ? "bg-background text-foreground shadow-xs font-medium"
                : "text-muted-foreground hover:text-foreground"
                }`}
              title="Grid Cards View"
              aria-label="Grid Cards View"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => onViewModeChange("table")}
              className={`flex items-center justify-center size-9 rounded-lg transition-all ${viewMode === "table"
                ? "bg-background text-foreground shadow-xs font-medium"
                : "text-muted-foreground hover:text-foreground"
                }`}
              title="Table View"
              aria-label="Table View"
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {showAdvanced && (
        <div className="p-4 rounded-xl border border-border/70 bg-card/40 backdrop-blur-xs space-y-4 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Department Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => onDepartmentChange(e.target.value)}
                className="w-full h-9 rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Gender
              </label>
              <select
                value={selectedGender}
                onChange={(e) => onGenderChange(e.target.value)}
                className="w-full h-9 rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Role Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => onRoleChange(e.target.value)}
                className="w-full h-9 rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="all">All Roles</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <ArrowUpDown className="size-3" />
                Sort By
              </label>
              <select
                value={`${sortField}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-") as [
                    SortField,
                    SortOrder
                  ]
                  onSortChange(field, order)
                }}
                className="w-full h-9 rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="age-asc">Age: Youngest first</option>
                <option value="age-desc">Age: Oldest first</option>
                <option value="department-asc">Department: A to Z</option>
                <option value="company-asc">Company: A to Z</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips & Reset */}
          {isFiltered && (
            <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-muted-foreground">Active Filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchQuery}
                    <X
                      className="size-3 cursor-pointer"
                      onClick={() => onSearchChange("")}
                    />
                  </Badge>
                )}
                {selectedDepartment !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Dept: {selectedDepartment}
                    <X
                      className="size-3 cursor-pointer"
                      onClick={() => onDepartmentChange("all")}
                    />
                  </Badge>
                )}
                {selectedGender !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Gender: {selectedGender}
                    <X
                      className="size-3 cursor-pointer"
                      onClick={() => onGenderChange("all")}
                    />
                  </Badge>
                )}
                {selectedRole !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Role: {selectedRole}
                    <X
                      className="size-3 cursor-pointer"
                      onClick={() => onRoleChange("all")}
                    />
                  </Badge>
                )}
                {showFavoritesOnly && (
                  <Badge variant="secondary" className="gap-1">
                    Saved only
                    <X
                      className="size-3 cursor-pointer"
                      onClick={onToggleFavoritesOnly}
                    />
                  </Badge>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={onResetFilters}
                className="text-xs h-7 text-destructive hover:text-destructive hover:bg-destructive/10 gap-1"
              >
                <RotateCcw className="size-3" />
                Reset all
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Results Header Count Summary */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          Showing <strong className="text-foreground font-semibold">{totalResults}</strong>{" "}
          {totalResults === 1 ? "user" : "users"}
        </span>
        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="text-primary hover:underline font-medium"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
