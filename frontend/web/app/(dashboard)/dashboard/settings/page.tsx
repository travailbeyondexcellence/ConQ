'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from '../_components/DashboardSidebar';
import DashboardTopbar from '../_components/DashboardTopbar';
import SettingsSection from './_components/SettingsSection';
import ThemeSelector from '@/components/ThemeSelector';

export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoPublish, setAutoPublish] = useState(false);

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
        <DashboardTopbar onToggleSidebar={toggleSidebar} title="Settings" />

        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Settings ⚙️
                </h2>
                <p className="text-muted-foreground">
                  Manage your account settings and preferences
                </p>
              </div>

              {/* Settings Sections */}
              <div className="space-y-6">
                {/* Profile Settings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <SettingsSection
                    title="Profile Information"
                    description="Update your personal information and profile details"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
                          JD
                        </div>
                        <button className="px-4 py-2 rounded-lg border border-border hover:bg-accent/10 transition-colors text-sm font-medium">
                          Change Avatar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            defaultValue="John Doe"
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            defaultValue="john@example.com"
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Bio
                        </label>
                        <textarea
                          rows={3}
                          defaultValue="Social media manager and content creator"
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        />
                      </div>

                      <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </SettingsSection>
                </motion.div>

                {/* Notifications */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <SettingsSection
                    title="Notifications"
                    description="Manage how you receive notifications"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                        <div>
                          <p className="font-medium text-foreground">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive email updates about your posts</p>
                        </div>
                        <button
                          onClick={() => setEmailNotifications(!emailNotifications)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            emailNotifications ? 'bg-primary' : 'bg-muted'
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              emailNotifications ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                        <div>
                          <p className="font-medium text-foreground">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Get notified about post performance</p>
                        </div>
                        <button
                          onClick={() => setPushNotifications(!pushNotifications)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            pushNotifications ? 'bg-primary' : 'bg-muted'
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              pushNotifications ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </SettingsSection>
                </motion.div>

                {/* Appearance */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <SettingsSection
                    title="Appearance"
                    description="Customize the look and feel of your dashboard"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Theme
                        </label>
                        <div className="flex items-center gap-4">
                          <ThemeSelector />
                          <span className="text-sm text-muted-foreground">
                            Choose from 12 beautiful themes
                          </span>
                        </div>
                      </div>
                    </div>
                  </SettingsSection>
                </motion.div>

                {/* Connected Accounts */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <SettingsSection
                    title="Connected Accounts"
                    description="Manage your social media account connections"
                  >
                    <div className="space-y-3">
                      {[
                        { name: 'Instagram', connected: true, icon: '📷' },
                        { name: 'Twitter', connected: true, icon: '🐦' },
                        { name: 'Facebook', connected: false, icon: '👥' },
                        { name: 'LinkedIn', connected: true, icon: '💼' },
                      ].map((account) => (
                        <div
                          key={account.name}
                          className="flex items-center justify-between p-4 rounded-lg border border-border"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{account.icon}</span>
                            <div>
                              <p className="font-medium text-foreground">{account.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {account.connected ? 'Connected' : 'Not connected'}
                              </p>
                            </div>
                          </div>
                          <button
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              account.connected
                                ? 'border border-border hover:bg-destructive/10 hover:text-destructive'
                                : 'bg-primary text-primary-foreground hover:bg-primary/90'
                            }`}
                          >
                            {account.connected ? 'Disconnect' : 'Connect'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </SettingsSection>
                </motion.div>

                {/* Publishing Preferences */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <SettingsSection
                    title="Publishing Preferences"
                    description="Configure default publishing settings"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                        <div>
                          <p className="font-medium text-foreground">Auto-publish</p>
                          <p className="text-sm text-muted-foreground">Automatically publish scheduled posts</p>
                        </div>
                        <button
                          onClick={() => setAutoPublish(!autoPublish)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            autoPublish ? 'bg-primary' : 'bg-muted'
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              autoPublish ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Default Timezone
                        </label>
                        <select className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                          <option>UTC (GMT+0:00)</option>
                          <option>EST (GMT-5:00)</option>
                          <option>PST (GMT-8:00)</option>
                          <option>IST (GMT+5:30)</option>
                        </select>
                      </div>
                    </div>
                  </SettingsSection>
                </motion.div>

                {/* Danger Zone */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <div className="rounded-2xl border-2 border-destructive/20 bg-destructive/5 p-6">
                    <h3 className="text-lg font-bold text-destructive mb-1">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Irreversible actions that will affect your account
                    </p>
                    <div className="space-y-3">
                      <button className="w-full md:w-auto px-6 py-2 rounded-lg border-2 border-destructive text-destructive font-medium hover:bg-destructive hover:text-destructive-foreground transition-colors">
                        Delete All Posts
                      </button>
                      <button className="w-full md:w-auto px-6 py-2 rounded-lg bg-destructive text-destructive-foreground font-medium hover:bg-destructive/90 transition-colors md:ml-3">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
