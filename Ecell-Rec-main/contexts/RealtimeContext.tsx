'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { RealtimeService } from '@/lib/supabase'
import MockData from '@/lib/mockData'

interface RealtimeContextType {
  users: any[]
  registrations: any[]
  events: any[]
  submissions: any[]
  isConnected: boolean
  refreshData: () => Promise<void>
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined)

export const useRealtime = () => {
  const context = useContext(RealtimeContext)
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider')
  }
  return context
}

interface RealtimeProviderProps {
  children: ReactNode
}

export const RealtimeProvider: React.FC<RealtimeProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<any[]>([])
  const [registrations, setRegistrations] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [submissions, setSubmissions] = useState<any[]>([])
  const [isConnected, setIsConnected] = useState(false)

  // Simulate real-time updates with periodic data refresh
  useEffect(() => {
    let interval: NodeJS.Timeout

    const startRealtimeUpdates = () => {
      setIsConnected(true)
      
      // Initial data load
      refreshData()
      
      // Simulate real-time updates every 30 seconds
      interval = setInterval(() => {
        refreshData()
      }, 30000)
    }

    const stopRealtimeUpdates = () => {
      setIsConnected(false)
      if (interval) {
        clearInterval(interval)
      }
    }

    startRealtimeUpdates()

    return () => {
      stopRealtimeUpdates()
    }
  }, [])

  const refreshData = async () => {
    try {
      // Fetch all data in parallel
      const [usersResult, registrationsResult, eventsResult, submissionsResult] = await Promise.all([
        MockData.getAllUsers(),
        MockData.getAllRegistrations(),
        MockData.getAllEvents(),
        Promise.resolve({ data: MockData.getCurrentSubmissions(), error: null })
      ])

      if (usersResult.data) {
        setUsers(usersResult.data)
      }

      if (registrationsResult.data) {
        setRegistrations(registrationsResult.data)
      }

      if (eventsResult.data) {
        setEvents(eventsResult.data)
      }

      if (submissionsResult.data) {
        setSubmissions(submissionsResult.data)
      }
    } catch (error) {
      console.error('Error refreshing real-time data:', error)
    }
  }

  const value: RealtimeContextType = {
    users,
    registrations,
    events,
    submissions,
    isConnected,
    refreshData
  }

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  )
}

// Hook for real-time user data
export const useRealtimeUsers = () => {
  const { users, refreshData } = useRealtime()
  return { users, refreshUsers: refreshData }
}

// Hook for real-time registration data
export const useRealtimeRegistrations = () => {
  const { registrations, refreshData } = useRealtime()
  return { registrations, refreshRegistrations: refreshData }
}

// Hook for real-time event data
export const useRealtimeEvents = () => {
  const { events, refreshData } = useRealtime()
  return { events, refreshEvents: refreshData }
}

// Hook for real-time submission data
export const useRealtimeSubmissions = () => {
  const { submissions, refreshData } = useRealtime()
  return { submissions, refreshSubmissions: refreshData }
}

// Connection status hook
export const useRealtimeConnection = () => {
  const { isConnected } = useRealtime()
  return isConnected
}

// Real-time notification system
export const useRealtimeNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([])
  const { registrations, events, submissions } = useRealtime()

  useEffect(() => {
    // Simulate notifications for new registrations
    const newRegistrations = registrations.filter(reg => {
      const regDate = new Date(reg.registration_date)
      const now = new Date()
      const timeDiff = now.getTime() - regDate.getTime()
      return timeDiff < 60000 // Last minute
    })

    if (newRegistrations.length > 0) {
      const newNotifications = newRegistrations.map(reg => ({
        id: `reg-${reg.id}`,
        type: 'registration',
        title: 'New Registration',
        message: `${reg.users?.full_name || 'Unknown'} has registered`,
        timestamp: new Date(),
        read: false
      }))
      
      setNotifications(prev => [...newNotifications, ...prev].slice(0, 10))
    }
  }, [registrations])

  useEffect(() => {
    // Simulate notifications for new events
    const newEvents = events.filter(event => {
      const eventDate = new Date(event.created_at)
      const now = new Date()
      const timeDiff = now.getTime() - eventDate.getTime()
      return timeDiff < 60000 // Last minute
    })

    if (newEvents.length > 0) {
      const newNotifications = newEvents.map(event => ({
        id: `event-${event.id}`,
        type: 'event',
        title: 'New Event',
        message: `Event "${event.title}" has been created`,
        timestamp: new Date(),
        read: false
      }))
      
      setNotifications(prev => [...newNotifications, ...prev].slice(0, 10))
    }
  }, [events])

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  return {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    markAsRead,
    clearAll
  }
}

export default RealtimeProvider
