'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from './_components/DashboardSidebar';
import DashboardTopbar from './_components/DashboardTopbar';

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Open sidebar by default on desktop
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

    // Set initial state
    handleResize();

    // Listen to window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Stats data
  const stats = [
    {
      label: 'Total Posts',
      value: '1,234',
      change: '+12.5%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      ),
      gradient: 'from-primary to-accent',
    },
    {
      label: 'Scheduled',
      value: '456',
      change: '+8.2%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5zm7 4h5v5h-5z"/>
        </svg>
      ),
      gradient: 'from-accent to-secondary',
    },
    {
      label: 'Engagement',
      value: '89.2%',
      change: '+4.1%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ),
      gradient: 'from-secondary to-primary',
    },
    {
      label: 'Followers',
      value: '12.5K',
      change: '+15.3%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      gradient: 'from-primary via-accent to-secondary',
    },
  ];

  // Recent activity data
  const recentActivity = [
    {
      title: 'New post published',
      description: 'Instagram post about product launch',
      time: '2 hours ago',
      type: 'success',
    },
    {
      title: 'Post scheduled',
      description: 'Twitter thread scheduled for tomorrow',
      time: '5 hours ago',
      type: 'info',
    },
    {
      title: 'Campaign completed',
      description: 'LinkedIn campaign reached 10K impressions',
      time: '1 day ago',
      type: 'success',
    },
    {
      title: 'Analytics report ready',
      description: 'Weekly performance report is available',
      time: '2 days ago',
      type: 'info',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div
        className="transition-all duration-300"
        style={{
          marginLeft: isSidebarOpen && isDesktop ? '280px' : '0',
        }}
      >
        {/* Top Bar */}
        <DashboardTopbar onToggleSidebar={toggleSidebar} title="Dashboard" />

        {/* Page Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome back! 👋
            </h2>
            <p className="text-muted-foreground">
              Here's what's happening with your social media today.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                />

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4 shadow-lg relative overflow-hidden`}
                  >
                    {/* Dark overlay for contrast */}
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative text-white">
                      {stat.icon}
                    </div>
                  </div>

                  {/* Label */}
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.label}
                  </p>

                  {/* Value */}
                  <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </h3>

                    {/* Change indicator */}
                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${
                        stat.isPositive ? 'text-success' : 'text-destructive'
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 ${stat.isPositive ? '' : 'rotate-180'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                      <span>{stat.change}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <motion.div
              className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">Recent Activity</h3>
                <button className="text-sm font-medium text-primary hover:text-link-hover transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'success'
                          ? 'bg-success/20 text-success'
                          : 'bg-primary/20 text-primary'
                      }`}
                    >
                      {activity.type === 'success' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground mb-1">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-foreground mb-6">Quick Actions</h3>

              <div className="space-y-3">
                <motion.button
                  className="w-full flex items-center gap-3 p-4 rounded-lg bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create New Post</span>
                </motion.button>

                <motion.button
                  className="w-full flex items-center gap-3 p-4 rounded-lg border-2 border-border hover:bg-accent/10 transition-colors text-foreground font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Schedule Post</span>
                </motion.button>

                <motion.button
                  className="w-full flex items-center gap-3 p-4 rounded-lg border-2 border-border hover:bg-accent/10 transition-colors text-foreground font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>View Analytics</span>
                </motion.button>
              </div>

              {/* Upcoming Schedule */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-semibold text-foreground mb-4">
                  Upcoming Posts
                </h4>
                <div className="space-y-3">
                  {[
                    { platform: 'Instagram', time: 'Today at 3:00 PM' },
                    { platform: 'Twitter', time: 'Tomorrow at 9:00 AM' },
                    { platform: 'LinkedIn', time: 'Tomorrow at 2:00 PM' },
                  ].map((post, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {post.platform}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {post.time}
                        </p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
