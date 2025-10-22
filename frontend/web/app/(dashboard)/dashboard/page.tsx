'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Set initial time and greeting
    const updateTimeAndGreeting = () => {
      const now = new Date();
      const hours = now.getHours();

      // Format time
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }));

      // Set greeting based on time
      if (hours < 12) {
        setGreeting('Good morning');
      } else if (hours < 18) {
        setGreeting('Good afternoon');
      } else {
        setGreeting('Good evening');
      }
    };

    updateTimeAndGreeting();
    const interval = setInterval(updateTimeAndGreeting, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    {
      title: 'Create Project',
      description: 'Start a new content project',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      href: '/dashboard/projects/new',
      color: 'primary',
    },
    {
      title: 'Add Content',
      description: 'Create new content piece',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      href: '/dashboard/content/new',
      color: 'secondary',
    },
    {
      title: 'View Analytics',
      description: 'Check your performance',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      href: '/dashboard/analytics',
      color: 'accent',
    },
    {
      title: 'Schedule Posts',
      description: 'Plan your content calendar',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      href: '/dashboard/calendar',
      color: 'muted',
    },
  ];

  const stats = [
    { label: 'Active Projects', value: '0', change: null },
    { label: 'Total Posts', value: '0', change: null },
    { label: 'Scheduled', value: '0', change: null },
    { label: 'Published', value: '0', change: null },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {greeting}, John
        </h1>
        <p className="text-muted-foreground flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {currentTime} • Welcome back to your content dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border p-6 transition-all hover:shadow-md hover:border-primary/20"
            style={{ backgroundColor: 'rgb(var(--card))' }}
          >
            <p className="text-sm text-muted-foreground font-medium mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <a
              key={action.title}
              href={action.href}
              className="group rounded-lg border p-6 transition-all hover:shadow-lg hover:border-primary hover:scale-105"
              style={{ backgroundColor: 'rgb(var(--card))' }}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className="p-3 rounded-full transition-colors group-hover:scale-110"
                  style={{
                    backgroundColor: `rgb(var(--${action.color}) / 0.1)`,
                    color: `rgb(var(--${action.color}))`
                  }}
                >
                  {action.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Getting Started Section */}
      <div
        className="rounded-lg border p-8"
        style={{ backgroundColor: 'rgb(var(--card))' }}
      >
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Getting Started with ConQ
          </h2>
          <p className="text-muted-foreground mb-6">
            Welcome to your content management dashboard. Here's what you can do:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div
                className="p-2 rounded-md shrink-0"
                style={{ backgroundColor: 'rgb(var(--primary) / 0.1)' }}
              >
                <svg className="w-5 h-5" style={{ color: 'rgb(var(--primary))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Create Your First Project</h3>
                <p className="text-sm text-muted-foreground">
                  Organize your content by creating projects for different campaigns or platforms.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div
                className="p-2 rounded-md shrink-0"
                style={{ backgroundColor: 'rgb(var(--secondary) / 0.1)' }}
              >
                <svg className="w-5 h-5" style={{ color: 'rgb(var(--secondary))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Add Content</h3>
                <p className="text-sm text-muted-foreground">
                  Start creating and managing your content pieces with our intuitive editor.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div
                className="p-2 rounded-md shrink-0"
                style={{ backgroundColor: 'rgb(var(--accent) / 0.1)' }}
              >
                <svg className="w-5 h-5" style={{ color: 'rgb(var(--accent))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Schedule & Publish</h3>
                <p className="text-sm text-muted-foreground">
                  Plan your content calendar and automate publishing across multiple platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
