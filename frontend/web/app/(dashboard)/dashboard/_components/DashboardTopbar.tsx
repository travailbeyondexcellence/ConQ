'use client';

import { motion } from 'framer-motion';
import ThemeSelector from '@/components/ThemeSelector';
import ProfileDropdown from '@/components/ProfileDropdown';

interface DashboardTopbarProps {
  onToggleSidebar: () => void;
  title?: string;
}

export default function DashboardTopbar({ onToggleSidebar, title = 'Dashboard' }: DashboardTopbarProps) {
  return (
    <motion.div
      className="sticky top-0 z-30 w-full border-b backdrop-blur-sm"
      style={{ backgroundColor: 'rgb(var(--card) / 0.95)' }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between px-4 py-4">
        {/* Left Section - Toggle Button + Title */}
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle Button */}
          <motion.button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-accent/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
            style={{ backgroundColor: 'transparent' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-6 h-6 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>

          {/* Page Title */}
          <h1 className="text-2xl font-bold text-foreground">
            {title}
          </h1>
        </div>

        {/* Right Section - Theme Selector + Profile */}
        <div className="flex items-center gap-3">
          {/* Search Button (Optional) */}
          <motion.button
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background/50 hover:bg-accent/10 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm text-muted-foreground">Search...</span>
            <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground font-mono">
              ⌘K
            </kbd>
          </motion.button>

          {/* Notifications Button */}
          <motion.button
            className="relative p-2 rounded-lg hover:bg-accent/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Notifications"
          >
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Notification badge */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
          </motion.button>

          {/* Theme Selector */}
          <ThemeSelector />

          {/* Profile Dropdown */}
          <ProfileDropdown />
        </div>
      </div>
    </motion.div>
  );
}
