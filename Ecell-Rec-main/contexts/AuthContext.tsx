'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@/lib/supabase'
import { MockDataService } from '@/lib/mockData'

interface AuthUser {
  id: string
  email: string
  full_name: string
  roll_number: string
  branch: string
  year: string
  phone_number: string
  status: 'active' | 'pending' | 'inactive'
}

interface AdminUser {
  id: string
  username: string
  email: string
  role: 'admin' | 'super_admin'
}

interface AuthContextType {
  // User authentication
  user: AuthUser | null
  isAuthenticated: boolean
  login: (emailOrRoll: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  
  // Admin authentication
  admin: AdminUser | null
  isAdminAuthenticated: boolean
  adminLogin: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  adminLogout: () => void
  
  // Loading states
  isLoading: boolean
  isInitialized: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Check for user session
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setUser({
            id: userData.id || 'user-1',
            email: userData.email,
            full_name: userData.name || userData.full_name,
            roll_number: userData.rollNumber || userData.roll_number,
            branch: userData.branch,
            year: userData.year,
            phone_number: userData.phone || userData.phone_number,
            status: userData.status || 'active'
          })
        }

        // Check for admin session
        const storedAdmin = localStorage.getItem('admin')
        if (storedAdmin) {
          const adminData = JSON.parse(storedAdmin)
          setAdmin(adminData)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        // Clear corrupted data
        localStorage.removeItem('user')
        localStorage.removeItem('admin')
      } finally {
        setIsInitialized(true)
      }
    }

    initializeAuth()
  }, [])

  // User authentication functions
  const login = async (emailOrRoll: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    try {
      // Validate email domain if email is provided
      if (emailOrRoll.includes('@') && !emailOrRoll.endsWith('@raghuenggcollege.in')) {
        return { success: false, error: 'Please use your college email ID (@raghuenggcollege.in)' }
      }

      // Find user by email or roll number
      let userResult
      if (emailOrRoll.includes('@')) {
        userResult = await MockDataService.getUserByEmail(emailOrRoll)
      } else {
        userResult = await MockDataService.getUserByRollNumber(emailOrRoll.toUpperCase())
      }

      if (!userResult.data) {
        return { success: false, error: 'No account found with this email or roll number' }
      }

      const userData = userResult.data

      // In a real app, you would verify the password here
      // For demo purposes, we'll accept any password for existing users

      // Update last login
      await MockDataService.updateUser(userData.id, {
        last_login: new Date().toISOString()
      })

      // Set user state
      const authUser: AuthUser = {
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
        roll_number: userData.roll_number,
        branch: userData.branch,
        year: userData.year,
        phone_number: userData.phone_number,
        status: userData.status
      }

      setUser(authUser)

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify({
        id: userData.id,
        name: userData.full_name,
        rollNumber: userData.roll_number,
        email: userData.email,
        branch: userData.branch,
        year: userData.year,
        phone: userData.phone_number,
        status: userData.status
      }))

      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'An error occurred during login. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    try {
      // Check if user already exists
      const existingUserByEmail = await MockDataService.getUserByEmail(userData.email)
      if (existingUserByEmail.data) {
        return { success: false, error: 'An account with this email already exists' }
      }

      const existingUserByRoll = await MockDataService.getUserByRollNumber(userData.roll_number)
      if (existingUserByRoll.data) {
        return { success: false, error: 'An account with this roll number already exists' }
      }

      // Create new user
      const userResult = await MockDataService.createUser(userData)
      if (userResult.error) {
        return { success: false, error: 'Failed to create account. Please try again.' }
      }

      // Create registration record
      await MockDataService.createRegistration({
        user_id: userResult.data!.id,
        registration_date: new Date().toISOString(),
        status: 'active',
        submission_status: 'none'
      })

      return { success: true }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: 'An error occurred during registration. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  // Admin authentication functions
  const adminLogin = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    try {
      const result = await MockDataService.authenticateAdmin(username, password)
      if (result.data) {
        setAdmin(result.data)
        localStorage.setItem('admin', JSON.stringify(result.data))
        return { success: true }
      } else {
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      console.error('Admin login error:', error)
      return { success: false, error: 'Authentication failed. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  const adminLogout = () => {
    setAdmin(null)
    localStorage.removeItem('admin')
  }

  const value: AuthContextType = {
    // User authentication
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    
    // Admin authentication
    admin,
    isAdminAuthenticated: !!admin,
    adminLogin,
    adminLogout,
    
    // Loading states
    isLoading,
    isInitialized
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Convenience hooks
export const useUserAuth = () => {
  const { user, isAuthenticated, login, register, logout, isLoading } = useAuth()
  return { user, isAuthenticated, login, register, logout, isLoading }
}

export const useAdminAuth = () => {
  const { admin, isAdminAuthenticated, adminLogin, adminLogout, isLoading } = useAuth()
  return { admin, isAdminAuthenticated, adminLogin, adminLogout, isLoading }
}

export default AuthProvider
