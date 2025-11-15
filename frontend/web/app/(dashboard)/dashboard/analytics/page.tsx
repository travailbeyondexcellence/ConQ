'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from '../_components/DashboardSidebar';
import DashboardTopbar from '../_components/DashboardTopbar';
import MetricCard from './_components/MetricCard';

export default function AnalyticsPage() {
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

  const metrics = [
    {
      title: 'Total Reach',
      value: '125.4K',
      change: '+18.2%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
        </svg>
      ),
      gradient: 'from-primary to-accent',
    },
    {
      title: 'Impressions',
      value: '342.8K',
      change: '+24.5%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      ),
      gradient: 'from-accent to-secondary',
    },
    {
      title: 'Engagement Rate',
      value: '6.8%',
      change: '+2.1%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      gradient: 'from-secondary to-primary',
    },
    {
      title: 'New Followers',
      value: '+2,345',
      change: '+12.3%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
      gradient: 'from-primary via-accent to-secondary',
    },
  ];

  const topPosts = [
    { id: 1, title: 'Product Launch Video', platform: 'Instagram', engagement: '12.5K', reach: '45.2K' },
    { id: 2, title: 'Weekly Tips Thread', platform: 'Twitter', engagement: '8.3K', reach: '32.1K' },
    { id: 3, title: 'Company Update', platform: 'LinkedIn', engagement: '6.7K', reach: '28.4K' },
    { id: 4, title: 'Behind the Scenes', platform: 'Instagram', engagement: '5.9K', reach: '22.3K' },
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
        <DashboardTopbar onToggleSidebar={toggleSidebar} title="Analytics" />

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
                  Analytics Dashboard 📊
                </h2>
                <p className="text-muted-foreground">
                  Track your social media performance and insights
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {metrics.map((metric, index) => (
                  <MetricCard key={metric.title} {...metric} delay={index * 0.1} />
                ))}
              </div>

              {/* Charts and Data */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Performance Chart */}
                <motion.div
                  className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-foreground">Performance Overview</h3>
                    <select className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                    </select>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="h-64 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center border border-border">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-muted-foreground mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                      <p className="text-sm text-muted-foreground">Performance chart will be displayed here</p>
                    </div>
                  </div>
                </motion.div>

                {/* Top Posts */}
                <motion.div
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <h3 className="text-xl font-bold text-foreground mb-4">Top Performing Posts</h3>
                  <div className="space-y-3">
                    {topPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        className="p-3 rounded-lg border border-border hover:bg-accent/10 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                      >
                        <h4 className="text-sm font-semibold text-foreground mb-2 line-clamp-1">
                          {post.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span className="font-medium">{post.platform}</span>
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">
                            #{index + 1}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Engagement:</span>
                            <p className="font-semibold text-foreground">{post.engagement}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Reach:</span>
                            <p className="font-semibold text-foreground">{post.reach}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Platform Breakdown */}
              <motion.div
                className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <h3 className="text-xl font-bold text-foreground mb-6">Platform Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { platform: 'Instagram', followers: '45.2K', engagement: '7.2%', color: 'from-pink-500 to-purple-500' },
                    { platform: 'Twitter', followers: '32.1K', engagement: '5.8%', color: 'from-blue-400 to-blue-600' },
                    { platform: 'Facebook', followers: '28.4K', engagement: '4.3%', color: 'from-blue-500 to-blue-700' },
                    { platform: 'LinkedIn', followers: '12.5K', engagement: '6.1%', color: 'from-blue-600 to-blue-800' },
                  ].map((platform, index) => (
                    <motion.div
                      key={platform.platform}
                      className="p-4 rounded-xl border border-border"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} mb-3 flex items-center justify-center text-white text-xl font-bold`}>
                        {platform.platform[0]}
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">{platform.platform}</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Followers:</span>
                          <span className="font-medium text-foreground">{platform.followers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Engagement:</span>
                          <span className="font-medium text-success">{platform.engagement}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
