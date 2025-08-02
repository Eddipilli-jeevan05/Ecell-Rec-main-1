"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  Calendar,
  Users,
  FileText,
  ArrowLeft,
  Lock,
  Shield,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  CalendarDays,
  Clock,
  User,
  Mail,
  Phone,
  GraduationCap,
  Building,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Flag,
  Grid3X3
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
// import { DatabaseService } from "@/lib/supabase";
import MockData from "@/lib/mockData";
import { useSearchParams } from "next/navigation";

// Types for registration data (using Supabase types)
interface RegistrationWithUser {
  id: string;
  user_id: string;
  registration_date: string;
  status: 'active' | 'pending' | 'inactive';
  submission_status: 'submitted' | 'draft' | 'none';
  created_at: string;
  updated_at: string;
  users?: {
    id: string;
    email: string;
    full_name: string;
    roll_number: string;
    branch: string;
    year: string;
    graduation_year: string;
    phone_number: string;
    status: 'active' | 'pending' | 'inactive';
    last_login?: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface SubmissionData {
  id: string;
  userId: string;
  ideaTitle: string;
  teamName: string;
  teamMembers: number;
  problemStatement: string;
  startupStage: string;
  submittedAt: Date;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: string[];
  is_holiday: boolean;
  is_public_holiday: boolean;
  color: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface Submission {
  id: string;
  user_id: string;
  registration_id: string;
  idea_title: string;
  team_name: string;
  team_members: any[];
  problem_statement: string;
  proposed_solution: string;
  one_liner_pitch: string;
  detailed_explanation: string;
  startup_stage: string;
  phone_number: string;
  pitch_deck_url?: string;
  github_link?: string;
  drive_link?: string;
  figma_link?: string;
  consent: boolean;
  submitted_at: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

const AdminRegistrations = () => {
  const searchParams = useSearchParams();

  // Set dark theme on component mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    };
  }, []);

  // State management
  const [registrations, setRegistrations] = useState<RegistrationWithUser[]>([]);
  // const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [filteredData, setFilteredData] = useState<RegistrationWithUser[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [customDateRange, setCustomDateRange] = useState({ start: "", end: "" });
  
  // UI states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<string>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams?.get('tab');
    return tab === 'calendar' ? 'calendar' : 'registrations';
  });

  // Calendar states
  const [currentDate, setCurrentDate] = useState(new Date());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [calendarSearchTerm, setCalendarSearchTerm] = useState("");
  const [calendarFilterType, setCalendarFilterType] = useState<'all' | 'events' | 'holidays'>('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    attendees: '',
    is_holiday: false,
    is_public_holiday: false,
    color: '#3b82f6'
  });

  // Registration modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationWithUser | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [editStatus, setEditStatus] = useState<'active' | 'pending' | 'inactive'>('active');
  const [loadingSubmission, setLoadingSubmission] = useState(false);

  // Helper function to convert registration data for display
  /*
  const convertRegistrationForDisplay = (reg: RegistrationWithUser) => ({
    id: reg.id,
    fullName: reg.users?.full_name || 'Unknown',
    email: reg.users?.email || 'Unknown',
    rollNumber: reg.users?.roll_number || 'Unknown',
    branch: reg.users?.branch || 'Unknown',
    year: reg.users?.year || 'Unknown',
    graduationYear: reg.users?.graduation_year || 'Unknown',
    phoneNumber: reg.users?.phone_number || 'Unknown',
    registeredAt: new Date(reg.registration_date),
    status: reg.status,
    lastLogin: reg.users?.last_login ? new Date(reg.users.last_login) : undefined,
    submissionStatus: reg.submission_status
  });
  */

  // Authentication
  const handleLogin = async () => {
    try {
      const result = await MockData.authenticateAdmin(adminCredentials.username, adminCredentials.password);
      if (result.data) {
        setIsAuthenticated(true);
        setShowLogin(false);
        loadData();
      } else {
        alert('Invalid credentials!');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed!');
    }
  };

  // Data loading
  const loadData = async () => {
    setLoading(true);
    try {
      const [registrationsResult, eventsResult] = await Promise.all([
        MockData.getAllRegistrations(),
        MockData.getAllEvents()
      ]);

      if (registrationsResult.data) {
        setRegistrations(registrationsResult.data);
        setFilteredData(registrationsResult.data);
      }

      if (eventsResult.data) {
        setEvents(eventsResult.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtering logic
  useEffect(() => {
    let filtered = [...registrations];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(reg =>
        reg.users?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.users?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.users?.roll_number?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Branch filter
    if (selectedBranch !== 'all') {
      filtered = filtered.filter(reg => reg.users?.branch === selectedBranch);
    }

    // Year filter
    if (selectedYear !== 'all') {
      filtered = filtered.filter(reg => reg.users?.year === selectedYear);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(reg => reg.status === selectedStatus);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      switch (dateFilter) {
        case 'today':
          filtered = filtered.filter(reg => new Date(reg.registration_date) >= startOfDay);
          break;
        case 'week':
          const weekAgo = new Date(startOfDay.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(reg => new Date(reg.registration_date) >= weekAgo);
          break;
        case 'month':
          const monthAgo = new Date(startOfDay.getFullYear(), startOfDay.getMonth() - 1, startOfDay.getDate());
          filtered = filtered.filter(reg => new Date(reg.registration_date) >= monthAgo);
          break;
        case 'year':
          const yearAgo = new Date(startOfDay.getFullYear() - 1, startOfDay.getMonth(), startOfDay.getDate());
          filtered = filtered.filter(reg => new Date(reg.registration_date) >= yearAgo);
          break;
        case 'custom':
          if (customDateRange.start && customDateRange.end) {
            const start = new Date(customDateRange.start);
            const end = new Date(customDateRange.end);
            filtered = filtered.filter(reg => {
              const regDate = new Date(reg.registration_date);
              return regDate >= start && regDate <= end;
            });
          }
          break;
      }
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue: string | Date, bValue: string | Date;

      if (sortField === 'full_name') {
        aValue = a.users?.full_name || '';
        bValue = b.users?.full_name || '';
      } else if (sortField === 'created_at') {
        aValue = new Date(a.created_at);
        bValue = new Date(b.created_at);
      } else {
        aValue = String((a as unknown as Record<string, unknown>)[sortField] || '');
        bValue = String((b as unknown as Record<string, unknown>)[sortField] || '');
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [registrations, searchTerm, selectedBranch, selectedYear, selectedStatus, dateFilter, customDateRange, sortField, sortDirection]);

  // Export functionality
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Roll Number', 'Branch', 'Year', 'Phone', 'Registration Date', 'Status', 'Submission Status'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(reg => [
        reg.users?.full_name || 'Unknown',
        reg.users?.email || 'Unknown',
        reg.users?.roll_number || 'Unknown',
        reg.users?.branch || 'Unknown',
        reg.users?.year || 'Unknown',
        reg.users?.phone_number || 'Unknown',
        new Date(reg.registration_date).toLocaleDateString(),
        reg.status,
        reg.submission_status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Calendar helper functions
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = formatDate(date);
    return events.filter(event => event.date === dateString);
  };

  // Calendar event functions
  const addEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const result = await MockData.createEvent({
        ...eventData,
        created_by: 'admin'
      });
      if (result.data) {
        await loadData();
        return result.data.id;
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const updateEvent = async (eventId: string, eventData: Partial<Event>) => {
    try {
      await MockData.updateEvent(eventId, eventData);
      await loadData();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      await MockData.deleteEvent(eventId);
      await loadData();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Calendar modal functions
  const openAddEventModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      date: formatDate(currentDate),
      time: '',
      location: '',
      attendees: '',
      is_holiday: false,
      is_public_holiday: false,
      color: '#3b82f6'
    });
    setShowEventModal(true);
  };

  const openEditEventModal = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      attendees: event.attendees.join(', '),
      is_holiday: event.is_holiday,
      is_public_holiday: event.is_public_holiday,
      color: event.color
    });
    setShowEventModal(true);
  };

  const handleEventSubmit = async () => {
    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      attendees: formData.attendees.split(',').map(a => a.trim()).filter(a => a),
      is_holiday: formData.is_holiday,
      is_public_holiday: formData.is_public_holiday,
      color: formData.color,
      created_by: 'admin'
    };

    if (editingEvent) {
      await updateEvent(editingEvent.id, eventData);
    } else {
      await addEvent(eventData);
    }

    setShowEventModal(false);
  };

  // Registration modal functions
  const openViewModal = async (registration: RegistrationWithUser) => {
    setSelectedRegistration(registration);
    setLoadingSubmission(true);
    setShowViewModal(true);

    // Fetch submission data if user has submitted
    if (registration.submission_status === 'submitted') {
      try {
        const submissionResult = await MockData.getSubmissionByUserId(registration.user_id);
        if (submissionResult.data) {
          setSelectedSubmission(submissionResult.data);
        }
      } catch (error) {
        console.error('Error fetching submission:', error);
      }
    }
    setLoadingSubmission(false);
  };

  const openEditModal = (registration: RegistrationWithUser) => {
    setSelectedRegistration(registration);
    setEditStatus(registration.status);
    setShowEditModal(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedRegistration) return;

    try {
      // Update registration status
      const updatedRegistrations = registrations.map(reg =>
        reg.id === selectedRegistration.id
          ? { ...reg, status: editStatus }
          : reg
      );
      setRegistrations(updatedRegistrations);
      setFilteredData(updatedRegistrations);

      setShowEditModal(false);
      setSelectedRegistration(null);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const closeModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setSelectedRegistration(null);
    setSelectedSubmission(null);
  };

  // Filter events based on search and filter type
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(calendarSearchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(calendarSearchTerm.toLowerCase());
    const matchesFilter = calendarFilterType === 'all' ||
                         (calendarFilterType === 'events' && !event.is_holiday && !event.is_public_holiday) ||
                         (calendarFilterType === 'holidays' && (event.is_holiday || event.is_public_holiday));
    return matchesSearch && matchesFilter;
  });

  // Login screen
  if (showLogin) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" style={{
        backgroundColor: 'hsl(240 10% 3.9%)',
        color: 'hsl(0 0% 98%)'
      }}>
        {/* Background elements */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-primary opacity-20 blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-gradient-accent opacity-15 blur-xl animate-pulse delay-1000" />

        <div className="w-full max-w-md relative z-10">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Admin Access
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Registrations Management Panel
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username" className="font-medium">Username</Label>
                <Input
                  id="username"
                  value={adminCredentials.username}
                  onChange={(e) => setAdminCredentials({...adminCredentials, username: e.target.value})}
                  className="bg-background/50"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <Label htmlFor="password" className="font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={adminCredentials.password}
                  onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
                  className="bg-background/50"
                  placeholder="Enter password"
                />
              </div>

              <Button
                onClick={handleLogin}
                className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 font-bold py-3"
              >
                <Lock className="h-4 w-4 mr-2" />
                Login
              </Button>

              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="w-full font-bold"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </CardContent>

            <div className="p-4 text-center text-sm text-muted-foreground border-t border-border">
              <p>Demo Credentials:</p>
              <p>Username: admin</p>
              <p>Password: ecell2024</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: 'hsl(240 10% 3.9%)',
      color: 'hsl(0 0% 98%)',
      '--background': '240 10% 3.9%',
      '--foreground': '0 0% 98%',
      '--card': '240 10% 3.9%',
      '--card-foreground': '0 0% 98%',
      '--primary': '263 70% 50%',
      '--primary-foreground': '0 0% 98%',
      '--muted': '240 3.7% 15.9%',
      '--muted-foreground': '240 5% 64.9%',
      '--border': '240 3.7% 15.9%'
    } as React.CSSProperties}>
      {/* Background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-primary opacity-10 blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-gradient-accent opacity-8 blur-xl animate-pulse delay-1000" />

      <div className="container mx-auto p-4 lg:p-6 relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-50 flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 p-4 bg-background/80 backdrop-blur-sm border border-primary/20 shadow-sm rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
              {activeTab === 'registrations' ? (
                <Users className="h-6 w-6 text-primary-foreground" />
              ) : (
                <Calendar className="h-6 w-6 text-primary-foreground" />
              )}
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                {activeTab === 'registrations' ? 'Registrations Management' : 'Calendar Management'}
              </h1>
              <p className="text-muted-foreground text-sm">
                E-Cell REC Admin Panel
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowLogin(true)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-card/50 border border-border">
              <TabsTrigger
                value="registrations"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="h-4 w-4" />
                Registrations
              </TabsTrigger>
              <TabsTrigger
                value="calendar"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Calendar className="h-4 w-4" />
                Calendar
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <TabsContent value="registrations" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-500 font-medium">Total Registrations</p>
                  <p className="text-2xl font-bold text-green-400">{registrations.length}</p>
                </div>
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-500 font-medium">Active Users</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {registrations.filter(r => r.status === 'active').length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-500 font-medium">Submissions</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {registrations.filter(r => r.submission_status === 'submitted').length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-500 font-medium">This Month</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {registrations.filter(r => {
                      const now = new Date();
                      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                      return new Date(r.registration_date) >= monthStart;
                    }).length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 mb-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="font-medium">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name, email, or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/50"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={exportToCSV}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>

                <Button
                  onClick={loadData}
                  variant="outline"
                  className="font-bold"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="font-medium">Branch</Label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="All Branches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="Computer Science Engineering">Computer Science Engineering</SelectItem>
                    <SelectItem value="Electronics & Communication">Electronics & Communication</SelectItem>
                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                    <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                    <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="font-medium">Year</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="font-medium">Status</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="font-medium">Date Range</Label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="All Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Custom Date Range */}
            {dateFilter === 'custom' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg border border-border">
                <div>
                  <Label className="font-medium">Start Date</Label>
                  <Input
                    type="date"
                    value={customDateRange.start}
                    onChange={(e) => setCustomDateRange({...customDateRange, start: e.target.value})}
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <Label className="font-medium">End Date</Label>
                  <Input
                    type="date"
                    value={customDateRange.end}
                    onChange={(e) => setCustomDateRange({...customDateRange, end: e.target.value})}
                    className="bg-background/50"
                  />
                </div>
              </div>
            )}

            {/* Results Summary */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing {paginatedData.length} of {filteredData.length} registrations
              </p>

              <div className="flex items-center gap-2">
                <Label className="text-sm">Items per page:</Label>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                  <SelectTrigger className="w-20 bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Registration Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50 font-bold"
                        onClick={() => {
                          if (sortField === 'full_name') {
                            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortField('full_name');
                            setSortDirection('asc');
                          }
                        }}
                      >
                        <div className="flex items-center gap-1">
                          Name
                          {sortField === 'full_name' && (
                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="font-bold">Contact</TableHead>
                      <TableHead className="font-bold">Academic</TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50 font-bold"
                        onClick={() => {
                          if (sortField === 'created_at') {
                            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortField('created_at');
                            setSortDirection('desc');
                          }
                        }}
                      >
                        <div className="flex items-center gap-1">
                          Registration Date
                          {sortField === 'created_at' && (
                            sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                      <TableHead className="font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((registration) => (
                      <TableRow key={registration.id} className="border-border hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                              {registration.users?.full_name?.charAt(0) || '?'}
                            </div>
                            <div>
                              <p className="font-medium">{registration.users?.full_name || 'Unknown'}</p>
                              <p className="text-sm text-muted-foreground">{registration.users?.roll_number || 'Unknown'}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span className="text-foreground">{registration.users?.email || 'Unknown'}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span className="text-foreground">{registration.users?.phone_number || 'Unknown'}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Building className="h-3 w-3 text-muted-foreground" />
                              <span className="text-foreground text-xs">{registration.users?.branch || 'Unknown'}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <GraduationCap className="h-3 w-3 text-muted-foreground" />
                              <span className="text-foreground">{registration.users?.year || 'Unknown'}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm text-foreground">
                              {new Date(registration.registration_date).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(registration.registration_date).toLocaleTimeString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <Badge
                              variant={registration.status === 'active' ? 'default' : registration.status === 'pending' ? 'secondary' : 'destructive'}
                              className={
                                registration.status === 'active'
                                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                  : registration.status === 'pending'
                                  ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                  : 'bg-red-500/20 text-red-400 border-red-500/30'
                              }
                            >
                              {registration.status}
                            </Badge>
                            {registration.submission_status !== 'none' && (
                              <Badge
                                variant="outline"
                                className={
                                  registration.submission_status === 'submitted'
                                    ? 'border-blue-500/30 text-blue-400'
                                    : registration.submission_status === 'draft'
                                    ? 'border-orange-500/30 text-orange-400'
                                    : 'border-gray-500/30 text-gray-400'
                                }
                              >
                                {registration.submission_status}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                              onClick={() => openViewModal(registration)}
                              title="View Details"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-primary/30 text-primary hover:bg-primary/10"
                              onClick={() => openEditModal(registration)}
                              title="Edit Status"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 mt-6">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages} ({filteredData.length} total registrations)
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="disabled:opacity-50"
                  >
                    Previous
                  </Button>

                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={
                            currentPage === pageNum
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : ""
                          }
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        </TabsContent>

        {/* Calendar Tab Content */}
        <TabsContent value="calendar" className="space-y-6">
          {/* Calendar Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-500 font-medium">Total Events</p>
                    <p className="text-2xl font-bold text-blue-400">{events.length}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-500 font-medium">This Month</p>
                    <p className="text-2xl font-bold text-green-400">
                      {events.filter(e => {
                        const eventDate = new Date(e.date);
                        const now = new Date();
                        return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
                      }).length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CalendarDays className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-500 font-medium">Holidays</p>
                    <p className="text-2xl font-bold text-red-400">
                      {events.filter(e => e.is_holiday || e.is_public_holiday).length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Flag className="h-5 w-5 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-500 font-medium">Upcoming</p>
                    <p className="text-2xl font-bold text-purple-400">
                      {events.filter(e => new Date(e.date) > new Date()).length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar Controls */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Calendar Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="calendar-search" className="font-medium">Search Events</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="calendar-search"
                      placeholder="Search events..."
                      value={calendarSearchTerm}
                      onChange={(e) => setCalendarSearchTerm(e.target.value)}
                      className="pl-10 bg-background/50"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={openAddEventModal}
                    className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 text-primary-foreground font-bold"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>

                  <Select value={calendarFilterType} onValueChange={(value: 'all' | 'events' | 'holidays') => setCalendarFilterType(value)}>
                    <SelectTrigger className="w-32 bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="holidays">Holidays</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Grid */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader className="pb-4">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Grid3X3 className="h-5 w-5" />
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </CardTitle>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date())}
                  >
                    Today
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center font-bold text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentDate).map((date, index) => (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border border-border rounded-lg ${
                      date ? 'bg-background/50 hover:bg-muted/50 cursor-pointer' : ''
                    } ${
                      date && date.toDateString() === new Date().toDateString()
                        ? 'ring-2 ring-primary'
                        : ''
                    }`}
                    onClick={() => date && setCurrentDate(date)}
                  >
                    {date && (
                      <>
                        <div className="font-medium text-sm mb-1">
                          {date.getDate()}
                        </div>
                        <div className="space-y-1">
                          {getEventsForDate(date)
                            .filter(event => {
                              const matchesSearch = event.title.toLowerCase().includes(calendarSearchTerm.toLowerCase());
                              const matchesFilter = calendarFilterType === 'all' ||
                                                   (calendarFilterType === 'events' && !event.is_holiday && !event.is_public_holiday) ||
                                                   (calendarFilterType === 'holidays' && (event.is_holiday || event.is_public_holiday));
                              return matchesSearch && matchesFilter;
                            })
                            .slice(0, 2)
                            .map(event => (
                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded cursor-pointer transition-all duration-300 hover:scale-105 ${
                                  event.is_holiday || event.is_public_holiday
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    : 'bg-primary/20 text-primary border border-primary/30'
                                }`}
                                style={{
                                  background: `${event.color}20`,
                                  borderColor: `${event.color}40`,
                                  color: event.color
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEvent(event);
                                  openEditEventModal(event);
                                }}
                              >
                                {event.title}
                              </div>
                            ))}
                          {getEventsForDate(date).length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{getEventsForDate(date).length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Events List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredEvents.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No events found</p>
                ) : (
                  filteredEvents.map(event => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => openEditEventModal(event)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: event.color }}
                        />
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {(event.is_holiday || event.is_public_holiday) && (
                          <Badge variant="outline" className="border-red-500/30 text-red-400">
                            Holiday
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteEvent(event.id);
                          }}
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="bg-card w-full max-w-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  {editingEvent ? 'Edit Event' : 'Add New Event'}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEventModal(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-medium">Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-background/50"
                    placeholder="Event title"
                  />
                </div>

                <div>
                  <Label className="font-medium">Description</Label>
                  <Input
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-background/50"
                    placeholder="Event description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium">Date</Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <Label className="font-medium">Time</Label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div>
                  <Label className="font-medium">Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="bg-background/50"
                    placeholder="Event location"
                  />
                </div>

                <div>
                  <Label className="font-medium">Attendees (comma-separated emails)</Label>
                  <Input
                    value={formData.attendees}
                    onChange={(e) => setFormData({...formData, attendees: e.target.value})}
                    className="bg-background/50"
                    placeholder="email1@example.com, email2@example.com"
                  />
                </div>

                <div>
                  <Label className="font-medium">Color</Label>
                  <Input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="bg-background/50 h-10"
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.is_holiday}
                      onChange={(e) => setFormData({...formData, is_holiday: e.target.checked})}
                      className="rounded border-border"
                    />
                    <span className="text-sm font-medium">Holiday</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.is_public_holiday}
                      onChange={(e) => setFormData({...formData, is_public_holiday: e.target.checked})}
                      className="rounded border-border"
                    />
                    <span className="text-sm font-medium">Public Holiday</span>
                  </label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleEventSubmit}
                    className="flex-1 bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 text-primary-foreground"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {editingEvent ? 'Update' : 'Create'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowEventModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View Registration Modal */}
        <Dialog open={showViewModal} onOpenChange={closeModals}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Registration Details
              </DialogTitle>
            </DialogHeader>

            {selectedRegistration && (
              <div className="space-y-6">
                {/* User Information */}
                <Card className="bg-card/50 border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      User Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                        <p className="text-foreground font-medium">{selectedRegistration.users?.full_name || 'N/A'}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                        <p className="text-foreground">{selectedRegistration.users?.email || 'N/A'}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Roll Number</Label>
                        <p className="text-foreground font-mono">{selectedRegistration.users?.roll_number || 'N/A'}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Phone Number</Label>
                        <p className="text-foreground">{selectedRegistration.users?.phone_number || 'N/A'}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Branch</Label>
                        <p className="text-foreground">{selectedRegistration.users?.branch || 'N/A'}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Year</Label>
                        <p className="text-foreground">{selectedRegistration.users?.year || 'N/A'}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Graduation Year</Label>
                        <p className="text-foreground">{selectedRegistration.users?.graduation_year || 'N/A'}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Registration Date</Label>
                        <p className="text-foreground">{new Date(selectedRegistration.registration_date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Badge
                        variant={selectedRegistration.status === 'active' ? 'default' : selectedRegistration.status === 'pending' ? 'secondary' : 'destructive'}
                        className={
                          selectedRegistration.status === 'active'
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : selectedRegistration.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }
                      >
                        Status: {selectedRegistration.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          selectedRegistration.submission_status === 'submitted'
                            ? 'border-blue-500/30 text-blue-400'
                            : selectedRegistration.submission_status === 'draft'
                            ? 'border-orange-500/30 text-orange-400'
                            : 'border-gray-500/30 text-gray-400'
                        }
                      >
                        Submission: {selectedRegistration.submission_status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Submission Details */}
                {selectedRegistration.submission_status === 'submitted' && (
                  <Card className="bg-card/50 border-primary/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Submission Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {loadingSubmission ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          <span className="ml-2 text-muted-foreground">Loading submission...</span>
                        </div>
                      ) : selectedSubmission ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Idea Title</Label>
                              <p className="text-foreground font-medium">{selectedSubmission.idea_title}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Team Name</Label>
                              <p className="text-foreground">{selectedSubmission.team_name}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Startup Stage</Label>
                              <p className="text-foreground">{selectedSubmission.startup_stage}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Submitted At</Label>
                              <p className="text-foreground">{new Date(selectedSubmission.submitted_at).toLocaleDateString()}</p>
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">One-Liner Pitch</Label>
                            <p className="text-foreground mt-1">{selectedSubmission.one_liner_pitch}</p>
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Problem Statement</Label>
                            <p className="text-foreground mt-1 text-sm">{selectedSubmission.problem_statement}</p>
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Proposed Solution</Label>
                            <p className="text-foreground mt-1 text-sm">{selectedSubmission.proposed_solution}</p>
                          </div>

                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Detailed Explanation</Label>
                            <p className="text-foreground mt-1 text-sm">{selectedSubmission.detailed_explanation}</p>
                          </div>

                          {/* Team Members */}
                          {selectedSubmission.team_members && selectedSubmission.team_members.length > 0 && (
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Team Members</Label>
                              <div className="mt-2 space-y-2">
                                {selectedSubmission.team_members.map((member: any, index: number) => (
                                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                                    <p className="font-medium">{member.fullName}</p>
                                    <p className="text-sm text-muted-foreground">{member.rollNumber} • {member.branch} • {member.year}</p>
                                    <p className="text-sm text-muted-foreground">{member.phoneNumber}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Links */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedSubmission.github_link && (
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">GitHub Link</Label>
                                <a
                                  href={selectedSubmission.github_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 text-sm break-all"
                                >
                                  {selectedSubmission.github_link}
                                </a>
                              </div>
                            )}
                            {selectedSubmission.drive_link && (
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">Drive Link</Label>
                                <a
                                  href={selectedSubmission.drive_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 text-sm break-all"
                                >
                                  {selectedSubmission.drive_link}
                                </a>
                              </div>
                            )}
                            {selectedSubmission.figma_link && (
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">Figma Link</Label>
                                <a
                                  href={selectedSubmission.figma_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 text-sm break-all"
                                >
                                  {selectedSubmission.figma_link}
                                </a>
                              </div>
                            )}
                            {selectedSubmission.pitch_deck_url && (
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">Pitch Deck</Label>
                                <a
                                  href={selectedSubmission.pitch_deck_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 text-sm break-all"
                                >
                                  {selectedSubmission.pitch_deck_url}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-4">No submission data found</p>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Status Modal */}
        <Dialog open={showEditModal} onOpenChange={closeModals}>
          <DialogContent className="max-w-md bg-card">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Edit Registration Status
              </DialogTitle>
            </DialogHeader>

            {selectedRegistration && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">User</Label>
                  <p className="text-foreground font-medium">{selectedRegistration.users?.full_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedRegistration.users?.email}</p>
                </div>

                <div>
                  <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                  <Select value={editStatus} onValueChange={(value: 'active' | 'pending' | 'inactive') => setEditStatus(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={closeModals}>
                Cancel
              </Button>
              <Button onClick={handleStatusUpdate} className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300">
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const AdminRegistrationsPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading admin panel...</p>
      </div>
    </div>}>
      <AdminRegistrations />
    </Suspense>
  );
};

export default AdminRegistrationsPage;
