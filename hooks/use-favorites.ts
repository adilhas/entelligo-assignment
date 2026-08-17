"use client"

import { useSyncExternalStore, useCallback, useMemo } from "react"

const FAVORITES_STORAGE_KEY = "user_directory_favorites"

function getSnapshot(): string {
  if (typeof window === "undefined") return "[]"
  try {
    return localStorage.getItem(FAVORITES_STORAGE_KEY) || "[]"
  } catch {
    return "[]"
  }
}

function getServerSnapshot(): string {
  return "[]"
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {}
  window.addEventListener("storage", callback)
  window.addEventListener("favorites-updated", callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener("favorites-updated", callback)
  }
}

export function useFavorites() {
  const rawFavorites = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const favorites = useMemo<number[]>(() => {
    try {
      return JSON.parse(rawFavorites)
    } catch {
      return []
    }
  }, [rawFavorites])

  const toggleFavorite = useCallback((userId: number) => {
    try {
      const current = JSON.parse(getSnapshot()) as number[]
      let updated: number[]
      if (current.includes(userId)) {
        updated = current.filter((id) => id !== userId)
      } else {
        updated = [...current, userId]
      }
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated))
      window.dispatchEvent(new Event("favorites-updated"))
    } catch (e) {
      console.warn("Failed to save favorites to localStorage", e)
    }
  }, [])

  const isFavorite = useCallback(
    (userId: number) => favorites.includes(userId),
    [favorites]
  )

  const clearFavorites = useCallback(() => {
    try {
      localStorage.removeItem(FAVORITES_STORAGE_KEY)
      window.dispatchEvent(new Event("favorites-updated"))
    } catch (e) {
      console.warn("Failed to clear favorites", e)
    }
  }, [])

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    isLoaded: true,
    count: favorites.length,
  }
}
