import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

import { logout as logoutRequest, me } from '../services/authService'
import type { AuthSuccessResponse, AuthUser } from '../types/auth'

type AuthContextValue = {
  user: AuthUser | null
  isLoading: boolean
  setUser: (user: AuthUser | null) => void
  refreshUser: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function refreshUser() {
    try {
      const response: AuthSuccessResponse = await me()
      setUser(response.data.user)
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  async function signOut() {
    try {
      await logoutRequest()
    } finally {
      setUser(null)
    }
  }

  useEffect(() => {
    void refreshUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, refreshUser, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
