"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Flag,
  Lock,
  Search,
  Filter,
  Grid3X3,
  CalendarDays,
  X
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useRef } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: string[];
  isHoliday: boolean;
  isPublicHoliday: boolean;
  color: string;
  createdBy: string;
  createdAt: Date;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: Event[];
}

// Read-only event display component
const EventDisplay: React.FC<{ event: Event; onClose: () => void }> = ({ event, onClose }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{event.title}</h3>
        <Button onClick={onClose} variant="ghost" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-gray-300">{event.time}</span>
        </div>

        {event.location && (
          <div className="flex items-center space-x-2">
            <Flag className="h-4 w-4 text-gray-400" />
            <span className="text-gray-300">{event.location}</span>
          </div>
        )}

        {event.description && (
          <div>
            <p className="text-gray-300">{event.description}</p>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Lock className="h-4 w-4 text-gray-400" />
          <span className="text-gray-300">Read-only view</span>
        </div>
      </div>
    </div>
  );
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'events' | 'holidays'>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false); // For drawer
  const sidebarRef = useRef<HTMLDivElement>(null);

  // State for public holidays
  const [publicHolidays, setPublicHolidays] = useState<Array<{ date: string; name: string; color: string }>>([]);

  // Fetch events from Firestore
  const fetchEvents = async () => {
    try {
      if (!db) {
        console.error('Firestore not initialized');
        setIsLoading(false);
        return;
      }

      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, orderBy('date'));
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Event[];
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events from Firebase:', error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Note: Users cannot add, update, or delete events - this is read-only view
  // Only admins can modify events through the admin panel

  // Fetch public holidays using Google Calendar API
  const fetchPublicHolidays = React.useCallback(async (year: number) => {
    try {
      // Google Calendar API endpoint for Indian holidays
      const calendarId = 'en.indian#holiday@group.v.calendar.google.com';
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;

      if (!apiKey) {
        console.warn('Google Calendar API key not found, using fallback holidays');
        throw new Error('API key not configured');
      }

      const startDate = `${year}-01-01T00:00:00Z`;
      const endDate = `${year}-12-31T23:59:59Z`;

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?` +
        `timeMin=${startDate}&timeMax=${endDate}&key=${apiKey}&singleEvents=true&orderBy=startTime`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Google Calendar API error: ${response.status}`);
      }

      const data = await response.json();

      const formattedHolidays = data.items?.map((event: { start?: { date?: string; dateTime?: string }; summary?: string }) => {
        const startDate = event.start?.date || event.start?.dateTime;
        const date = new Date(startDate || '').toISOString().split('T')[0];
        return {
          date: date,
          name: event.summary || 'Holiday',
          color: '#ef4444'
        };
      }) || [];

      setPublicHolidays(formattedHolidays);
      console.log(`✅ Fetched ${formattedHolidays.length} holidays from Google Calendar API`);

    } catch (error) {
      console.error('Error fetching holidays from Google Calendar API:', error);

      // Fallback to basic Indian holidays list
      const fallbackHolidays = [
        { date: `${year}-01-26`, name: 'Republic Day', color: '#ef4444' },
        { date: `${year}-08-15`, name: 'Independence Day', color: '#ef4444' },
        { date: `${year}-10-02`, name: 'Gandhi Jayanti', color: '#ef4444' },
        { date: `${year}-12-25`, name: 'Christmas', color: '#ef4444' },
        { date: `${year}-03-25`, name: 'Holi', color: '#ef4444' },
        { date: `${year}-11-12`, name: 'Diwali', color: '#ef4444' },
        { date: `${year}-09-10`, name: 'Ganesh Chaturthi', color: '#ef4444' },
        { date: `${year}-08-30`, name: 'Raksha Bandhan', color: '#ef4444' },
      ];
      setPublicHolidays(fallbackHolidays);
      console.log('📅 Using fallback holidays list');
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchEvents();
    const year = currentDate.getFullYear();
    fetchPublicHolidays(year);
  }, [currentDate, fetchPublicHolidays]);

  // Close sidebar when clicking outside
  useEffect(() => {
    if (!sidebarOpen) return;
    function handleClick(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [sidebarOpen]);

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === currentDate.toDateString();
      });

      days.push({
        date: currentDate,
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.toDateString() === today.toDateString(),
        events: dayEvents
      });
    }

    return days;
  };

  const getWeekDays = (date: Date): CalendarDay[] => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);

    const days: CalendarDay[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);

      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === currentDate.toDateString();
      });

      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isToday: currentDate.toDateString() === today.toDateString(),
        events: dayEvents
      });
    }

    return days;
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const isPublicHoliday = (date: Date): { name: string; color: string } | null => {
    const dateStr = formatDate(date);
    const holiday = publicHolidays.find(h => h.date === dateStr);
    return holiday || null;
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' ||
                         (filterType === 'events' && !event.isHoliday && !event.isPublicHoliday) ||
                         (filterType === 'holidays' && (event.isHoliday || event.isPublicHoliday));
    return matchesSearch && matchesFilter;
  });

  const days = viewMode === 'month' ? getDaysInMonth(currentDate) : getWeekDays(currentDate);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Fixed Hamburger menu for all devices */}
      <div className="fixed top-4 left-4 z-50 flex items-center">
        <button
          aria-label="Open sidebar"
          className="text-gray-200 focus:outline-none bg-gray-800 rounded-lg p-2 shadow-lg border border-gray-700"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="ml-3 text-lg font-bold hidden sm:inline">Calendar</span>
      </div>

      {/* Sidebar: Drawer on all devices */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-40" onClick={() => setSidebarOpen(false)}></div>
      )}
      <div
        ref={sidebarRef}
        className={`fixed z-50 top-0 left-0 h-full w-72 bg-gray-800 border-r border-gray-700 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ maxWidth: '90vw' }}
      >
        {/* Close button */}
        <div className="flex justify-end p-2">
          <button aria-label="Close sidebar" onClick={() => setSidebarOpen(false)} className="text-gray-300">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 sm:p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4 lg:mb-8">
            <div className="bg-blue-600 p-2 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Calendar</h1>
              <p className="text-gray-400 text-xs sm:text-sm">E-Cell Events</p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4 lg:mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="mb-4 lg:mb-6">
            <div className="flex items-center space-x-2 mb-2 sm:mb-3">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-xs sm:text-sm font-medium text-gray-300">Filter</span>
            </div>
            <div className="space-y-2">
              {[
                { key: 'all', label: 'All Events', icon: CalendarDays },
                { key: 'events', label: 'Events Only', icon: Grid3X3 },
                { key: 'holidays', label: 'Holidays Only', icon: Flag }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setFilterType(filter.key as 'all' | 'events' | 'holidays')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors ${
                    filterType === filter.key
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <filter.icon className="h-4 w-4" />
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mb-4 lg:mb-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-2 sm:mb-3">Upcoming Events</h3>
            {isLoading ? (
              <div className="text-center py-2 sm:py-4">
                <div className="text-gray-400 text-xs sm:text-sm">Loading events...</div>
              </div>
            ) : (
              <div className="space-y-2 max-h-40 sm:max-h-64 overflow-y-auto">
                {filteredEvents
                  .filter(event => new Date(event.date) >= new Date())
                  .slice(0, 5)
                  .map(event => (
                    <div
                      key={event.id}
                      className="p-2 sm:p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEventModal(true);
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs sm:text-sm font-medium truncate">{event.title}</span>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: event.color }}></div>
                      </div>
                      <div className="flex items-center space-x-2 text-[10px] sm:text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Read-only Notice */}
          <div className="border-t border-gray-700 pt-4 lg:pt-6">
            <div className="flex items-center space-x-2 text-gray-400 text-xs sm:text-sm">
              <Lock className="h-4 w-4" />
              <span>Read-only calendar view</span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
              Events are managed by administrators
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - always full width, centered calendar */}
      <div className="flex flex-col items-center justify-center min-h-screen transition-all duration-300 px-2 sm:px-4 md:px-8">
        {/* Top Bar (add margin for hamburger) */}
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-8 gap-2 sm:gap-0 mt-20 sm:mt-8">
          <div>
            <h2 className="text-xl sm:text-3xl font-bold">
              {currentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </h2>
            <p className="text-gray-400 text-xs sm:text-base">
              {viewMode === 'month' ? 'Month View' : 'Week View'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {/* View Toggle */}
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('month')}
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  viewMode === 'month'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  viewMode === 'week'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Week
              </button>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  if (viewMode === 'month') {
                    newDate.setMonth(newDate.getMonth() - 1);
                  } else {
                    newDate.setDate(newDate.getDate() - 7);
                  }
                  setCurrentDate(newDate);
                }}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Today
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  if (viewMode === 'month') {
                    newDate.setMonth(newDate.getMonth() + 1);
                  } else {
                    newDate.setDate(newDate.getDate() + 7);
                  }
                  setCurrentDate(newDate);
                }}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Read-only Indicator */}
            <div className="flex items-center space-x-2 px-2 sm:px-3 py-1 sm:py-2 bg-gray-700 rounded-lg">
              <Lock className="h-4 w-4 text-gray-400" />
              <span className="text-xs sm:text-sm text-gray-300">Read-only</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid - centered, large on desktop, compact on mobile */}
        <div className="w-full max-w-6xl mx-auto bg-gray-800 rounded-lg p-1 sm:p-6 overflow-x-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-[2px] mb-1 sm:mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-1 sm:p-3 text-center">
                <span className="text-[12px] sm:text-base font-medium text-gray-400">
                  {day}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar Days - large on desktop, compact on mobile */}
          <div className="grid grid-cols-7 gap-[2px]">
            {days.map((day, index) => {
              const holiday = isPublicHoliday(day.date);
              return (
                <div
                  key={index}
                  className={`min-h-[60px] sm:min-h-[120px] p-1 sm:p-3 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors ${
                    !day.isCurrentMonth ? 'opacity-30' : ''
                  } ${day.isToday ? 'ring-2 ring-blue-500' : ''}`}
                >
                  {/* Date */}
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <span className={`text-xs sm:text-lg font-medium ${
                      day.isToday ? 'text-blue-400' : 'text-gray-300'
                    }`}>
                      {day.date.getDate()}
                    </span>
                    {holiday && (
                      <Flag className="h-3 w-3 sm:h-5 sm:w-5 text-red-400" />
                    )}
                  </div>
                  {/* Events */}
                  <div className="space-y-1">
                    {day.events.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className="text-[11px] sm:text-base p-1 rounded cursor-pointer hover:bg-gray-600 transition-colors"
                        style={{
                          backgroundColor: `${event.color}20`,
                          borderLeft: `3px solid ${event.color}`
                        }}
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventModal(true);
                        }}
                      >
                        <div className="truncate font-medium">{event.title}</div>
                        <div className="text-gray-400">{event.time}</div>
                      </div>
                    ))}
                    {day.events.length > 2 && (
                      <div className="text-[11px] sm:text-base text-gray-400 text-center py-1">
                        +{day.events.length - 2} more
                      </div>
                    )}
                  </div>
                  {/* Holiday Name */}
                  {holiday && (
                    <div className="mt-1 sm:mt-2">
                      <div className="text-[11px] sm:text-base text-red-400 font-medium truncate">
                        {holiday.name}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Event Modal - Read Only */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 sm:px-0">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-md mx-2 sm:mx-4">
            <EventDisplay
              event={selectedEvent}
              onClose={() => {
                setShowEventModal(false);
                setSelectedEvent(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar; 
