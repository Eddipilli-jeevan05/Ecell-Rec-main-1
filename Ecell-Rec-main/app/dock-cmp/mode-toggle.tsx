import React, { useState, useEffect } from 'react';

export function ModeToggle({ className }: { className?: string }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    // This ensures that the correct mode is set on the initial render if dark mode is already active.
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button onClick={toggleMode} className={`p-2 ${className}`}>
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
}
