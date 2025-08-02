"use client";
import { useEffect } from "react";

const AdminCalendarRedirect = () => {
  useEffect(() => {
    // Immediately redirect to the combined admin panel with calendar tab
    window.location.href = '/admin/registrations?tab=calendar';
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-muted-foreground">Redirecting to Admin Panel...</p>
      </div>
    </div>
  );
};

export default AdminCalendarRedirect;
