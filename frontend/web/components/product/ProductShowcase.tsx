'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { VIEWPORT } from '@/lib/animations';

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  features: string[];
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: 'dashboard',
    title: 'Unified Dashboard',
    description: 'Get a bird\'s eye view of all your content, performance metrics, and team activity in one place.',
    features: ['Real-time analytics', 'Quick actions', 'Activity feed', 'Performance insights'],
  },
  {
    id: 'editor',
    title: 'Powerful Editor',
    description: 'Create stunning content with our feature-rich editor that supports markdown, rich text, and AI assistance.',
    features: ['AI writing assistant', 'Real-time collaboration', 'Version history', 'Rich media support'],
  },
  {
    id: 'analytics',
    title: 'Deep Analytics',
    description: 'Understand your audience and content performance with comprehensive analytics and insights.',
    features: ['Engagement metrics', 'Audience insights', 'Custom reports', 'Goal tracking'],
  },
];

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <span className="text-sm font-medium text-primary">Product Showcase</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              See ConQ in Action
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Explore the key features that make ConQ the ultimate content creation platform
            </p>
          </motion.div>

          {/* Tab navigation */}
          <motion.div
            className="mb-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {showcaseItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={`rounded-lg border px-6 py-3 font-semibold transition-all ${
                  activeTab === index
                    ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {item.title}
              </button>
            ))}
          </motion.div>

          {/* Content display */}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Description */}
            <motion.div
              key={`content-${activeTab}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="mb-4 text-3xl font-bold">{showcaseItems[activeTab]?.title}</h3>
              <p className="mb-6 text-lg text-muted-foreground">
                {showcaseItems[activeTab]?.description}
              </p>

              {/* Features list */}
              <div className="space-y-3">
                {showcaseItems[activeTab]?.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3333 4L6 11.3333L2.66667 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        />
                      </svg>
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  Try it Now
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Visual mockup */}
            <motion.div
              key={`visual-${activeTab}`}
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-2xl">
                {/* Browser chrome */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive/50"></div>
                  <div className="h-3 w-3 rounded-full bg-warning/50"></div>
                  <div className="h-3 w-3 rounded-full bg-success/50"></div>
                  <div className="ml-2 h-3 flex-1 rounded bg-muted/50"></div>
                </div>

                {/* Content area */}
                <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-6">
                  <div className="h-full w-full rounded-lg bg-background/80 p-4">
                    {/* Animated content based on active tab */}
                    {activeTab === 0 && (
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="h-20 w-20 rounded-lg bg-primary/20 animate-pulse"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 rounded bg-muted animate-pulse"></div>
                            <div className="h-4 w-1/2 rounded bg-muted animate-pulse"></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-16 rounded bg-accent/20 animate-pulse"></div>
                          <div className="h-16 rounded bg-primary/20 animate-pulse"></div>
                          <div className="h-16 rounded bg-success/20 animate-pulse"></div>
                        </div>
                      </div>
                    )}

                    {activeTab === 1 && (
                      <div className="space-y-3">
                        <div className="h-3 w-1/4 rounded bg-muted animate-pulse"></div>
                        <div className="h-3 w-full rounded bg-muted animate-pulse"></div>
                        <div className="h-3 w-full rounded bg-muted animate-pulse"></div>
                        <div className="h-3 w-3/4 rounded bg-muted animate-pulse"></div>
                        <div className="mt-4 h-20 rounded-lg bg-primary/10 animate-pulse"></div>
                      </div>
                    )}

                    {activeTab === 2 && (
                      <div className="space-y-3">
                        <div className="h-3 w-1/3 rounded bg-muted animate-pulse"></div>
                        <div className="h-32 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse"></div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-12 rounded bg-success/20 animate-pulse"></div>
                          <div className="h-12 rounded bg-warning/20 animate-pulse"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-primary/10 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-accent/10 blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
