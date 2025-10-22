'use client';

import { motion } from 'framer-motion';
import { VIEWPORT } from '@/lib/animations';

export default function ProductHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background with Unsplash image and theme-aware overlay */}
      <div className="absolute inset-0 -z-10">
        {/* Layer 1: Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1920&q=80&fm=webp&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        {/* Layer 2: Theme-aware overlay */}
        <div className="absolute inset-0 bg-background/90" aria-hidden="true" />

        {/* Layer 3: Gradient accent blobs */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute left-0 bottom-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Badge */}
              <motion.div
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                <span className="text-sm font-medium text-primary">Product Overview</span>
              </motion.div>

              {/* Title */}
              <h1 className="mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
                Transform Your Content Creation
              </h1>

              {/* Description */}
              <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                ConQ is the all-in-one platform for content creators, combining powerful AI tools,
                analytics, and collaboration features to help you create, manage, and grow your content empire.
              </p>

              {/* Key points */}
              <div className="mb-8 space-y-4">
                {[
                  'AI-powered content generation',
                  'Real-time collaboration',
                  'Advanced analytics & insights',
                  'Multi-platform publishing',
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
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
                    <span className="text-foreground">{point}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  Start Free Trial
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
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-semibold transition-all hover:scale-105 hover:shadow-lg"
                >
                  Watch Demo
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8L5 4V12L12 8Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.div>
            </motion.div>

            {/* Right visual */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Main product mockup */}
              <div className="relative rounded-2xl border border-border bg-card p-4 shadow-2xl">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 p-8">
                  <div className="h-full w-full rounded-lg bg-background/80 p-4">
                    <div className="mb-4 flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-destructive/50"></div>
                      <div className="h-3 w-3 rounded-full bg-warning/50"></div>
                      <div className="h-3 w-3 rounded-full bg-success/50"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 w-3/4 rounded bg-muted animate-pulse"></div>
                      <div className="h-4 w-full rounded bg-muted animate-pulse"></div>
                      <div className="h-4 w-5/6 rounded bg-muted animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats */}
              <motion.div
                className="absolute -left-4 top-1/4 rounded-xl border border-border bg-card p-4 shadow-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-xs text-muted-foreground">User Satisfaction</div>
              </motion.div>

              <motion.div
                className="absolute -right-4 bottom-1/4 rounded-xl border border-border bg-card p-4 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="text-2xl font-bold text-accent">10M+</div>
                <div className="text-xs text-muted-foreground">Content Created</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
