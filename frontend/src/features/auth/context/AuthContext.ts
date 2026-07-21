import { createContext } from 'react'
import type { AuthUser } from '../types'

export type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: AuthUser | null) => void
  setIsLoading: (isLoading: boolean) => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
