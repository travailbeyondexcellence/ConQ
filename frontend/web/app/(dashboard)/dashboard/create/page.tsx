'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from '../_components/DashboardSidebar';
import DashboardTopbar from '../_components/DashboardTopbar';
import PostEditor from './_components/PostEditor';

export default function CreatePostPage() {
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

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div
        className="transition-all duration-300"
        style={{
          marginLeft: isSidebarOpen && isDesktop ? '280px' : '0',
        }}
      >
        <DashboardTopbar onToggleSidebar={toggleSidebar} title="Create Post" />

        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Create New Post ✨
                </h2>
                <p className="text-muted-foreground">
                  Create and publish content across multiple social media platforms
                </p>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Editor Section */}
                <div className="lg:col-span-2">
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <PostEditor />
                  </div>
                </div>

                {/* Preview & Actions */}
                <div className="space-y-6">
                  {/* Preview */}
                  <motion.div
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <h3 className="text-lg font-bold text-foreground mb-4">Preview</h3>
                    <div className="aspect-square rounded-lg bg-muted/50 flex items-center justify-center border border-border">
                      <p className="text-sm text-muted-foreground">Media preview</p>
                    </div>
                  </motion.div>

                  {/* Schedule Options */}
                  <motion.div
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <h3 className="text-lg font-bold text-foreground mb-4">Publish Options</h3>

                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Publish Now
                      </button>

                      <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-border hover:bg-accent/10 transition-colors text-foreground font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Schedule for Later
                      </button>

                      <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-border hover:bg-accent/10 transition-colors text-foreground font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        Save as Draft
                      </button>
                    </div>
                  </motion.div>

                  {/* Tips */}
                  <motion.div
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <h3 className="text-lg font-bold text-foreground mb-3">💡 Tips</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-0.5">✓</span>
                        <span>Use high-quality images (1080x1080px)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-0.5">✓</span>
                        <span>Add relevant hashtags (5-10)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-0.5">✓</span>
                        <span>Post during peak hours</span>
                      </li>
                    </ul>
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
