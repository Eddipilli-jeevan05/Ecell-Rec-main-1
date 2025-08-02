# Admin Registrations Panel

## Overview
The Admin Registrations Panel is a comprehensive dashboard for managing user registrations in the E-Cell REC system. It provides powerful filtering, search, and export capabilities while maintaining the same UI design language as the existing admin calendar.

## Features

### 🔐 Authentication
- Secure admin login with credentials
- Demo credentials: `admin` / `ecell2024`
- Session management

### 📊 Dashboard Overview
- **Total Registrations**: Complete count of all registered users
- **Active Users**: Users with active status
- **Submissions**: Users who have submitted their startup ideas
- **This Month**: New registrations in the current month

### 🔍 Advanced Filtering
- **Search**: Search by name, email, or roll number
- **Branch Filter**: Filter by engineering branch
- **Year Filter**: Filter by academic year (1st-4th)
- **Status Filter**: Filter by user status (active/pending/inactive)
- **Date Filters**:
  - Today's registrations
  - This week's registrations
  - This month's registrations
  - This year's registrations
  - Custom date range picker

### 📋 Data Table
- **Sortable Columns**: Click column headers to sort by name or registration date
- **Responsive Design**: Optimized for desktop and mobile
- **Rich Information Display**:
  - User avatar with initials
  - Contact information (email, phone)
  - Academic details (branch, year)
  - Registration timestamp
  - Status badges
  - Submission status indicators

### 📤 Export Functionality
- **CSV Export**: Download filtered data as CSV file
- **Automatic Filename**: Includes current date in filename
- **Filtered Data**: Only exports currently filtered/searched results

### 📄 Pagination
- **Configurable Page Size**: 5, 10, 25, or 50 items per page
- **Smart Navigation**: Previous/Next buttons with page numbers
- **Results Summary**: Shows current page and total count

## Access Instructions

### 1. Direct URL Access
Navigate to: `http://localhost:3000/admin/registrations`

### 2. From Admin Calendar
1. Go to the admin calendar: `http://localhost:3000/admin/calendar`
2. Login with admin credentials
3. Click the "Registrations" button in the admin controls

### 3. Login Credentials
- **Username**: `admin`
- **Password**: `ecell2024`

## Usage Guide

### Basic Operations
1. **Login**: Enter admin credentials on the login screen
2. **View Data**: Browse registrations in the main table
3. **Search**: Use the search bar to find specific users
4. **Filter**: Apply filters using the dropdown menus
5. **Sort**: Click column headers to sort data
6. **Export**: Click "Export CSV" to download data
7. **Paginate**: Use pagination controls to navigate through pages

### Advanced Filtering
1. **Multiple Filters**: Combine search, branch, year, status, and date filters
2. **Custom Date Range**: Select "Custom Range" in date filter and pick start/end dates
3. **Real-time Updates**: Filters apply immediately as you change them
4. **Reset Filters**: Refresh the page or clear individual filter selections

### Data Export
1. **Apply Filters**: Set up your desired filters first
2. **Export**: Click "Export CSV" button
3. **Download**: File downloads automatically with format: `registrations_YYYY-MM-DD.csv`
4. **Content**: Exported file includes all filtered results with columns:
   - Name, Email, Roll Number, Branch, Year, Phone, Registration Date, Status

## Technical Details

### Data Structure
```typescript
interface Registration {
  id: string;
  fullName: string;
  email: string;
  rollNumber: string;
  branch: string;
  year: string;
  graduationYear: string;
  phoneNumber: string;
  registeredAt: Date;
  status: 'active' | 'pending' | 'inactive';
  lastLogin?: Date;
  submissionStatus?: 'submitted' | 'draft' | 'none';
}
```

### Mock Data
- Currently uses 50 sample registrations for demonstration
- Includes realistic data across all engineering branches
- Random registration dates within the past year
- Mixed status types and submission statuses

### Future Integration
- Ready for Firebase integration (structure already in place)
- Can be connected to real user registration data
- Supports real-time updates when connected to live database

## UI Design
- **Consistent Styling**: Matches existing admin calendar design
- **Amber/Orange Theme**: Maintains E-Cell brand colors
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Accessibility**: Proper labels, keyboard navigation, screen reader support
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error messages and fallbacks

## File Structure
```
app/admin/registrations/
└── page.tsx                 # Main admin registrations component

app/admin/calendar/
└── page.tsx                 # Updated with navigation to registrations
```

## Dependencies
- React 18+
- Next.js 13+
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- shadcn/ui components
- Firebase (for future integration)

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance
- **Pagination**: Handles large datasets efficiently
- **Client-side Filtering**: Fast real-time filtering
- **Optimized Rendering**: Minimal re-renders with proper state management
- **Lazy Loading**: Components load as needed

## Security
- **Admin Authentication**: Required for access
- **Session Management**: Secure login state
- **Data Validation**: Input sanitization and validation
- **CSRF Protection**: Built-in Next.js protections
