"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const publicRoutes = ["/login", "/signup"]
  const isPublicRoute = publicRoutes.includes(pathname)

  useEffect(() => {
    if (!loading) {
      if (!user && !isPublicRoute) {
        // Redirect to login if not authenticated and trying to access protected route
        router.push("/login")
      } else if (user && isPublicRoute) {
        // Redirect to dashboard if authenticated and trying to access auth pages
        router.push("/")
      }
    }
  }, [user, loading, isPublicRoute, router])

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium">Memuat...</p>
        </div>
      </div>
    )
  }

  // Don't render protected content if user is not authenticated
  if (!user && !isPublicRoute) {
    return null
  }

  // Don't render auth pages if user is already authenticated
  if (user && isPublicRoute) {
    return null
  }

  return <>{children}</>
}
