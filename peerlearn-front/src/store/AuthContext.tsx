import {
  createContext,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { authService } from '../services/auth.service'
import { clearToken, setToken } from '../services/http'
import type { AuthUser } from '../types'

const USER_KEY = 'peerlearn_user'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

function loadUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? (JSON.parse(raw) as AuthUser) : null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser)

  const authenticate = useCallback(async (email: string, password: string) => {
    const { token } = await authService.login({ email, password })
    setToken(token)
    const profile = await authService.me()
    const loggedUser: AuthUser = {
      userId: profile.id,
      email: profile.email,
      role: profile.role,
      displayName: profile.displayName,
    }
    localStorage.setItem(USER_KEY, JSON.stringify(loggedUser))
    setUser(loggedUser)
  }, [])

  const register = useCallback(
    async (email: string, password: string, displayName: string) => {
      await authService.register({ email, password, displayName })
      await authenticate(email, password)
    },
    [authenticate],
  )

  const logout = useCallback(() => {
    clearToken()
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      login: authenticate,
      register,
      logout,
    }),
    [user, authenticate, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
