import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database table names
export const TABLES = {
  USERS: 'users',
  REGISTRATIONS: 'registrations', 
  SUBMISSIONS: 'submissions',
  EVENTS: 'events',
  ADMIN_USERS: 'admin_users'
} as const

// Types for database tables
export interface User {
  id: string
  email: string
  full_name: string
  roll_number: string
  branch: string
  year: string
  graduation_year: string
  phone_number: string
  created_at: string
  updated_at: string
  last_login?: string
  status: 'active' | 'pending' | 'inactive'
}

export interface Registration {
  id: string
  user_id: string
  registration_date: string
  status: 'active' | 'pending' | 'inactive'
  submission_status: 'submitted' | 'draft' | 'none'
  created_at: string
  updated_at: string
}

export interface Submission {
  id: string
  user_id: string
  registration_id: string
  idea_title: string
  team_name: string
  team_members: any[] // JSON array
  problem_statement: string
  proposed_solution: string
  one_liner_pitch: string
  detailed_explanation: string
  startup_stage: string
  phone_number: string
  pitch_deck_url?: string
  github_link?: string
  drive_link?: string
  figma_link?: string
  consent: boolean
  submitted_at: string
  status: 'submitted' | 'under_review' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: string[]
  is_holiday: boolean
  is_public_holiday: boolean
  color: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  username: string
  email: string
  role: 'admin' | 'super_admin'
  created_at: string
  updated_at: string
  last_login?: string
}

// Database service functions
export class DatabaseService {
  // User operations
  static async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .insert([{
          ...userData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating user:', error)
      return { data: null, error }
    }
  }

  static async getUserByEmail(email: string) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .eq('email', email)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching user by email:', error)
      return { data: null, error }
    }
  }

  static async getUserByRollNumber(rollNumber: string) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .eq('roll_number', rollNumber)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching user by roll number:', error)
      return { data: null, error }
    }
  }

  static async getAllUsers() {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching all users:', error)
      return { data: null, error }
    }
  }

  static async updateUser(id: string, updates: Partial<User>) {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating user:', error)
      return { data: null, error }
    }
  }

  // Registration operations
  static async createRegistration(registrationData: Omit<Registration, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from(TABLES.REGISTRATIONS)
        .insert([{
          ...registrationData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating registration:', error)
      return { data: null, error }
    }
  }

  static async getAllRegistrations() {
    try {
      const { data, error } = await supabase
        .from(TABLES.REGISTRATIONS)
        .select(`
          *,
          users (
            id,
            email,
            full_name,
            roll_number,
            branch,
            year,
            graduation_year,
            phone_number,
            status
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching all registrations:', error)
      return { data: null, error }
    }
  }

  // Submission operations
  static async createSubmission(submissionData: Omit<Submission, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from(TABLES.SUBMISSIONS)
        .insert([{
          ...submissionData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating submission:', error)
      return { data: null, error }
    }
  }

  static async getSubmissionByUserId(userId: string) {
    try {
      const { data, error } = await supabase
        .from(TABLES.SUBMISSIONS)
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching submission by user ID:', error)
      return { data: null, error }
    }
  }

  // Event operations
  static async createEvent(eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from(TABLES.EVENTS)
        .insert([{
          ...eventData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating event:', error)
      return { data: null, error }
    }
  }

  static async getAllEvents() {
    try {
      const { data, error } = await supabase
        .from(TABLES.EVENTS)
        .select('*')
        .order('date', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching all events:', error)
      return { data: null, error }
    }
  }

  static async updateEvent(id: string, updates: Partial<Event>) {
    try {
      const { data, error } = await supabase
        .from(TABLES.EVENTS)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating event:', error)
      return { data: null, error }
    }
  }

  static async deleteEvent(id: string) {
    try {
      const { error } = await supabase
        .from(TABLES.EVENTS)
        .delete()
        .eq('id', id)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Error deleting event:', error)
      return { error }
    }
  }

  // Admin operations
  static async authenticateAdmin(username: string, password: string) {
    try {
      // For demo purposes, we'll use hardcoded credentials
      // In production, this should use proper password hashing
      if (username === 'admin' && password === 'ecell2024') {
        return {
          data: {
            id: 'admin-1',
            username: 'admin',
            email: 'admin@ecellrec.com',
            role: 'admin' as const,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          error: null
        }
      } else {
        return { data: null, error: new Error('Invalid credentials') }
      }
    } catch (error) {
      console.error('Error authenticating admin:', error)
      return { data: null, error }
    }
  }
}

// Real-time subscription helpers
export class RealtimeService {
  static subscribeToUsers(callback: (payload: any) => void) {
    return supabase
      .channel('users-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: TABLES.USERS },
        callback
      )
      .subscribe()
  }

  static subscribeToRegistrations(callback: (payload: any) => void) {
    return supabase
      .channel('registrations-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: TABLES.REGISTRATIONS },
        callback
      )
      .subscribe()
  }

  static subscribeToEvents(callback: (payload: any) => void) {
    return supabase
      .channel('events-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: TABLES.EVENTS },
        callback
      )
      .subscribe()
  }

  static unsubscribe(subscription: any) {
    return supabase.removeChannel(subscription)
  }
}

export default supabase
