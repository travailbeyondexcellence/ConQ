"use client";

import { motion } from "framer-motion";
import { fadeIn, slideDown, slideUp, zoomIn, float, VIEWPORT } from "@/lib/animations";

export default function Hero() {
  return (
    <motion.section
      className="relative overflow-hidden"
      initial="hidden"
      animate="visible"
    >
      {/* Background with Unsplash image and theme-aware overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Layer 1: Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=80&fm=webp&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />

        {/* Layer 2: Theme-aware overlay */}
        <div className="absolute inset-0 bg-background/90" aria-hidden="true" />

        {/* Layer 3: Gradient accent blobs */}
        <motion.div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-5xl">
          {/* Main hero content */}
          <div className="text-center space-y-8">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-sm"
              variants={slideDown}
              initial="hidden"
              animate="visible"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Welcome to the Future of Content Scheduling
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Schedule Content Across
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"> All Platforms</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl lg:text-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              ConQ streamlines your social media workflow. Create once, schedule everywhere.
              Save time, boost engagement, and grow your audience effortlessly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <button className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95">
                <span className="relative z-10">Get Started Free</span>
                <svg
                  className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity group-hover:opacity-100"></span>
              </button>

              <button className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-border bg-card px-8 py-4 text-base font-semibold text-card-foreground shadow-sm transition-all hover:scale-105 hover:border-primary hover:shadow-md active:scale-95">
                Watch Demo
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-col items-center justify-center gap-4 pt-8 text-sm text-muted-foreground sm:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-1">
                <svg className="h-5 w-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">4.9/5 Rating</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span className="font-medium">10,000+ Active Users</span>
              <span className="hidden sm:inline">•</span>
              <span className="font-medium">1M+ Posts Scheduled</span>
            </motion.div>
          </div>

          {/* Visual preview/dashboard mockup */}
          <motion.div
            className="relative mx-auto mt-16 max-w-5xl"
            variants={zoomIn}
            initial="hidden"
            animate="visible"
          >
            <div className="relative overflow-hidden rounded-2xl border-2 border-border bg-card shadow-2xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive"></div>
                  <div className="h-3 w-3 rounded-full bg-warning"></div>
                  <div className="h-3 w-3 rounded-full bg-success"></div>
                </div>
                <div className="ml-4 flex-1 rounded bg-background px-3 py-1 text-xs text-muted-foreground">
                  app.conq.io/dashboard
                </div>
              </div>

              {/* Dashboard preview placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-8">
                <div className="grid h-full grid-cols-3 gap-4">
                  {/* Sidebar */}
                  <div className="space-y-3">
                    <div className="h-8 rounded bg-muted/50"></div>
                    <div className="h-6 rounded bg-muted/30"></div>
                    <div className="h-6 rounded bg-muted/30"></div>
                    <div className="h-6 rounded bg-muted/30"></div>
                    <div className="h-6 rounded bg-muted/30"></div>
                  </div>

                  {/* Main content */}
                  <div className="col-span-2 space-y-4">
                    <div className="h-12 rounded bg-muted/50"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 rounded bg-primary/20"></div>
                      <div className="h-24 rounded bg-accent/20"></div>
                    </div>
                    <div className="h-32 rounded bg-muted/30"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements for visual interest */}
            <motion.div
              className="absolute -right-8 top-1/4 hidden rounded-xl border border-border bg-card p-4 shadow-xl lg:block"
              variants={float}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/20">
                  <svg className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-card-foreground">Post Scheduled</div>
                  <div className="text-xs text-muted-foreground">Instagram, Twitter, LinkedIn</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -left-8 bottom-1/4 hidden rounded-xl border border-border bg-card p-4 shadow-xl lg:block"
              variants={float}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-card-foreground">Engagement Up</div>
                  <div className="text-xs text-muted-foreground">+45% this week</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
