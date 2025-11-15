'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from '../_components/DashboardSidebar';
import DashboardTopbar from '../_components/DashboardTopbar';
import CalendarView from './_components/CalendarView';

export default function SchedulePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const upcomingPosts = [
    {
      id: 1,
      title: 'Product Launch Announcement',
      platform: 'Instagram',
      date: 'Dec 5, 2025',
      time: '3:00 PM',
      status: 'scheduled',
    },
    {
      id: 2,
      title: 'Weekly Tips Thread',
      platform: 'Twitter',
      date: 'Dec 12, 2025',
      time: '9:00 AM',
      status: 'scheduled',
    },
    {
      id: 3,
      title: 'Company Update',
      platform: 'LinkedIn',
      date: 'Dec 12, 2025',
      time: '2:00 PM',
      status: 'scheduled',
    },
    {
      id: 4,
      title: 'Holiday Promotion',
      platform: 'Facebook',
      date: 'Dec 18, 2025',
      time: '11:00 AM',
      status: 'scheduled',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div
        className="transition-all duration-300"
        style={{
          marginLeft: isSidebarOpen && isDesktop ? '280px' : '0',
        }}
      >
        <DashboardTopbar onToggleSidebar={toggleSidebar} title="Schedule" />

        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Content Calendar 📅
                </h2>
                <p className="text-muted-foreground">
                  View and manage your scheduled posts
                </p>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2">
                  <CalendarView />
                </div>

                {/* Upcoming Posts */}
                <div className="space-y-4">
                  <motion.div
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <h3 className="text-lg font-bold text-foreground mb-4">Upcoming Posts</h3>
                    <div className="space-y-3">
                      {upcomingPosts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          className="p-3 rounded-lg border border-border hover:bg-accent/10 transition-colors cursor-pointer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm font-semibold text-foreground line-clamp-1">
                              {post.title}
                            </h4>
                            <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success font-medium">
                              {post.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium">{post.platform}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.time}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Schedule New Post
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/10 transition-colors text-foreground font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export Calendar
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
