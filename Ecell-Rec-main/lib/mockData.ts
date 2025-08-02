import { User, Registration, Submission, Event } from './supabase'

// Mock data for development and testing
export class MockDataService {
  private static users: User[] = []
  private static registrations: Registration[] = []
  private static submissions: Submission[] = []
  private static events: Event[] = []

  // Initialize mock data
  static initializeMockData() {
    this.generateMockUsers()
    this.generateMockRegistrations()
    this.generateMockSubmissions()
    this.generateMockEvents()
  }

  private static generateMockUsers() {
    const branches = [
      'Computer Science Engineering',
      'Electronics & Communication',
      'Mechanical Engineering',
      'Civil Engineering',
      'Electrical Engineering'
    ]
    const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']
    const statuses: ('active' | 'pending' | 'inactive')[] = ['active', 'pending', 'inactive']

    this.users = Array.from({ length: 50 }, (_, i) => ({
      id: `user_${i + 1}`,
      email: `student${i + 1}@raghuenggcollege.in`,
      full_name: `Student ${i + 1}`,
      roll_number: `23981A${String(i + 1).padStart(3, '0')}`,
      branch: branches[i % branches.length],
      year: years[i % years.length],
      graduation_year: String(2024 + (i % 4)),
      phone_number: `98765${String(i + 1).padStart(5, '0')}`,
      created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
      last_login: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
      status: statuses[i % statuses.length]
    }))
  }

  private static generateMockRegistrations() {
    this.registrations = this.users.map((user, i) => ({
      id: `reg_${i + 1}`,
      user_id: user.id,
      registration_date: user.created_at,
      status: user.status,
      submission_status: i % 3 === 0 ? 'submitted' : i % 3 === 1 ? 'draft' : 'none',
      created_at: user.created_at,
      updated_at: user.updated_at
    }))
  }

  private static generateMockSubmissions() {
    const startupStages = ['Idea Stage', 'Prototype', 'MVP', 'Early Revenue', 'Growth Stage']
    const submissionStatuses: ('submitted' | 'under_review' | 'approved' | 'rejected')[] = 
      ['submitted', 'under_review', 'approved', 'rejected']

    // Create submissions for users who have submitted
    this.submissions = this.registrations
      .filter(reg => reg.submission_status === 'submitted')
      .map((reg, i) => ({
        id: `sub_${i + 1}`,
        user_id: reg.user_id,
        registration_id: reg.id,
        idea_title: `Innovative Startup Idea ${i + 1}`,
        team_name: `Team Innovation ${i + 1}`,
        team_members: [
          {
            fullName: `Team Member ${i + 1}`,
            rollNumber: `23981A${String(i + 100).padStart(3, '0')}`,
            branch: 'Computer Science Engineering',
            year: '3rd Year',
            phoneNumber: `98765${String(i + 100).padStart(5, '0')}`
          }
        ],
        problem_statement: `This is a detailed problem statement for startup idea ${i + 1}. It addresses a real-world problem that affects many people.`,
        proposed_solution: `Our innovative solution leverages cutting-edge technology to solve the problem mentioned above. We use AI, ML, and modern web technologies.`,
        one_liner_pitch: `Revolutionary solution for problem ${i + 1} using advanced technology.`,
        detailed_explanation: `This is a comprehensive explanation of our startup idea ${i + 1}. We have conducted thorough market research and identified a significant opportunity.`,
        startup_stage: startupStages[i % startupStages.length],
        phone_number: `98765${String(i + 200).padStart(5, '0')}`,
        pitch_deck_url: Math.random() > 0.5 ? `https://drive.google.com/pitch-deck-${i + 1}` : undefined,
        github_link: Math.random() > 0.5 ? `https://github.com/startup-${i + 1}` : undefined,
        drive_link: Math.random() > 0.5 ? `https://drive.google.com/folder-${i + 1}` : undefined,
        figma_link: Math.random() > 0.5 ? `https://figma.com/design-${i + 1}` : undefined,
        consent: true,
        submitted_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: submissionStatuses[i % submissionStatuses.length],
        created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      }))
  }

  private static generateMockEvents() {
    const eventTypes = [
      { title: 'Startup Workshop', color: '#3b82f6' },
      { title: 'Pitch Competition', color: '#ef4444' },
      { title: 'Networking Event', color: '#10b981' },
      { title: 'Mentorship Session', color: '#f59e0b' },
      { title: 'Demo Day', color: '#8b5cf6' }
    ]

    this.events = Array.from({ length: 20 }, (_, i) => {
      const eventType = eventTypes[i % eventTypes.length]
      const eventDate = new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000)
      
      return {
        id: `event_${i + 1}`,
        title: `${eventType.title} ${i + 1}`,
        description: `This is a detailed description for ${eventType.title} ${i + 1}. Join us for an exciting session!`,
        date: eventDate.toISOString().split('T')[0],
        time: `${String(9 + (i % 8)).padStart(2, '0')}:00`,
        location: `Venue ${i + 1}, E-Cell REC`,
        attendees: Array.from({ length: Math.floor(Math.random() * 50) + 10 }, (_, j) => `student${j + 1}@raghuenggcollege.in`),
        is_holiday: false,
        is_public_holiday: false,
        color: eventType.color,
        created_by: 'admin',
        created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      }
    })

    // Add some holidays
    const holidays = [
      { title: 'Independence Day', date: '2024-08-15', color: '#ff6b6b' },
      { title: 'Gandhi Jayanti', date: '2024-10-02', color: '#ff6b6b' },
      { title: 'Diwali', date: '2024-11-01', color: '#ff6b6b' }
    ]

    holidays.forEach((holiday, i) => {
      this.events.push({
        id: `holiday_${i + 1}`,
        title: holiday.title,
        description: `${holiday.title} - National Holiday`,
        date: holiday.date,
        time: '00:00',
        location: 'National Holiday',
        attendees: [],
        is_holiday: true,
        is_public_holiday: true,
        color: holiday.color,
        created_by: 'system',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    })
  }

  // Mock API methods that simulate Supabase calls
  static async getAllUsers() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: this.users, error: null }
  }

  static async getUserByEmail(email: string) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const user = this.users.find(u => u.email === email)
    return { data: user || null, error: user ? null : new Error('User not found') }
  }

  static async getUserByRollNumber(rollNumber: string) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const user = this.users.find(u => u.roll_number === rollNumber)
    return { data: user || null, error: user ? null : new Error('User not found') }
  }

  static async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const newUser: User = {
      ...userData,
      id: `user_${this.users.length + 1}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    this.users.push(newUser)
    return { data: newUser, error: null }
  }

  static async updateUser(userId: string, userData: Partial<Omit<User, 'id' | 'created_at'>>) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const userIndex = this.users.findIndex(u => u.id === userId)
    if (userIndex === -1) {
      return { data: null, error: new Error('User not found') }
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData,
      updated_at: new Date().toISOString()
    }
    return { data: this.users[userIndex], error: null }
  }

  static async getAllRegistrations() {
    await new Promise(resolve => setTimeout(resolve, 500))
    // Join with user data
    const registrationsWithUsers = this.registrations.map(reg => ({
      ...reg,
      users: this.users.find(u => u.id === reg.user_id)
    }))
    return { data: registrationsWithUsers, error: null }
  }

  static async createRegistration(registrationData: Omit<Registration, 'id' | 'created_at' | 'updated_at'>) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const newRegistration: Registration = {
      ...registrationData,
      id: `reg_${this.registrations.length + 1}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    this.registrations.push(newRegistration)
    return { data: newRegistration, error: null }
  }

  static async createSubmission(submissionData: Omit<Submission, 'id' | 'created_at' | 'updated_at'>) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const newSubmission: Submission = {
      ...submissionData,
      id: `sub_${this.submissions.length + 1}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    this.submissions.push(newSubmission)
    return { data: newSubmission, error: null }
  }

  static async getSubmissionByUserId(userId: string) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const submission = this.submissions.find(s => s.user_id === userId)
    return { data: submission || null, error: submission ? null : new Error('Submission not found') }
  }

  static async getAllEvents() {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: this.events, error: null }
  }

  static async createEvent(eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const newEvent: Event = {
      ...eventData,
      id: `event_${this.events.length + 1}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    this.events.push(newEvent)
    return { data: newEvent, error: null }
  }

  static async updateEvent(id: string, updates: Partial<Event>) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const eventIndex = this.events.findIndex(e => e.id === id)
    if (eventIndex === -1) {
      return { data: null, error: new Error('Event not found') }
    }
    
    this.events[eventIndex] = {
      ...this.events[eventIndex],
      ...updates,
      updated_at: new Date().toISOString()
    }
    return { data: this.events[eventIndex], error: null }
  }

  static async deleteEvent(id: string) {
    await new Promise(resolve => setTimeout(resolve, 500))
    const eventIndex = this.events.findIndex(e => e.id === id)
    if (eventIndex === -1) {
      return { error: new Error('Event not found') }
    }
    
    this.events.splice(eventIndex, 1)
    return { error: null }
  }

  static async authenticateAdmin(username: string, password: string) {
    await new Promise(resolve => setTimeout(resolve, 300))
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
  }

  // Get current data for export/display
  static getCurrentUsers() {
    return this.users
  }

  static getCurrentRegistrations() {
    return this.registrations
  }

  static getCurrentSubmissions() {
    return this.submissions
  }

  static getCurrentEvents() {
    return this.events
  }
}

// Initialize mock data when the module is imported
MockDataService.initializeMockData()

export default MockDataService
