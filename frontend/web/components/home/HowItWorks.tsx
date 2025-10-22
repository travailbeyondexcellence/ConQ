"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer, staggerItem, fadeIn, VIEWPORT } from "@/lib/animations";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect Your Accounts",
      description: "Link all your social media platforms in seconds with our secure authentication process. Support for 10+ major platforms.",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      features: ["One-click OAuth", "Secure & encrypted", "Multi-account support"],
    },
    {
      number: "02",
      title: "Create Your Content",
      description: "Design beautiful posts with our intuitive editor. Add images, videos, hashtags, and customize for each platform.",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      features: ["Rich text editor", "Media library", "Platform previews"],
    },
    {
      number: "03",
      title: "Schedule & Automate",
      description: "Set it and forget it. Choose your posting times or let our AI find the optimal moments for maximum engagement.",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: ["Smart scheduling", "Bulk upload", "Queue management"],
    },
    {
      number: "04",
      title: "Track & Optimize",
      description: "Monitor performance with real-time analytics. See what works and refine your strategy based on data-driven insights.",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: ["Real-time metrics", "Engagement reports", "Competitor analysis"],
    },
  ];

  return (
    <motion.section className="relative overflow-hidden py-20 md:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-card-foreground shadow-sm">
              <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              How It Works
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Start Scheduling in
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> 4 Simple Steps</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              From setup to success in minutes. No technical expertise required.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              >
                {/* Connection line to next step */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-24 h-full w-px bg-gradient-to-b from-border to-transparent md:left-12"></div>
                )}

                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  {/* Step number circle */}
                  <div className="relative flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-card shadow-lg transition-all group-hover:scale-110 group-hover:border-primary group-hover:shadow-xl md:h-24 md:w-24">
                      <span className="text-2xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent md:text-3xl">
                        {step.number}
                      </span>
                    </div>
                    {/* Pulsing ring on hover */}
                    <div className="absolute inset-0 rounded-full border-2 border-primary opacity-0 transition-all group-hover:scale-125 group-hover:opacity-30"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all group-hover:shadow-xl">
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                        {/* Text content */}
                        <div className="flex-1">
                          {/* Icon & Title */}
                          <div className="mb-4 flex items-start gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md">
                              {step.icon}
                            </div>
                            <div>
                              <h3 className="mb-2 text-2xl font-bold text-card-foreground">
                                {step.title}
                              </h3>
                              <p className="text-muted-foreground leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>

                          {/* Features list */}
                          <div className="ml-16 space-y-2">
                            {step.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <svg className="h-5 w-5 flex-shrink-0 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-card-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Visual representation */}
                        <div className="flex-shrink-0 lg:w-48">
                          <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-6">
                            <div className="flex h-full flex-col justify-center space-y-3">
                              {index === 0 && (
                                <>
                                  <div className="h-12 rounded-lg bg-primary/20"></div>
                                  <div className="h-12 rounded-lg bg-accent/20"></div>
                                  <div className="h-12 rounded-lg bg-secondary/20"></div>
                                </>
                              )}
                              {index === 1 && (
                                <>
                                  <div className="h-4 rounded bg-primary/20"></div>
                                  <div className="h-4 rounded bg-accent/20"></div>
                                  <div className="h-16 rounded-lg bg-secondary/20"></div>
                                  <div className="grid grid-cols-3 gap-2">
                                    <div className="aspect-square rounded bg-primary/20"></div>
                                    <div className="aspect-square rounded bg-accent/20"></div>
                                    <div className="aspect-square rounded bg-secondary/20"></div>
                                  </div>
                                </>
                              )}
                              {index === 2 && (
                                <>
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-primary/40"></div>
                                    <div className="h-2 flex-1 rounded bg-primary/20"></div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-accent/40"></div>
                                    <div className="h-2 flex-1 rounded bg-accent/20"></div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-secondary/40"></div>
                                    <div className="h-2 flex-1 rounded bg-secondary/20"></div>
                                  </div>
                                  <div className="mt-4 h-20 rounded-lg bg-gradient-to-t from-primary/20 to-transparent"></div>
                                </>
                              )}
                              {index === 3 && (
                                <>
                                  <div className="flex justify-between">
                                    <div className="h-12 w-12 rounded-lg bg-primary/20"></div>
                                    <div className="h-12 w-12 rounded-lg bg-accent/20"></div>
                                  </div>
                                  <div className="flex h-24 items-end gap-1">
                                    <div className="h-1/2 w-full rounded-t bg-primary/20"></div>
                                    <div className="h-3/4 w-full rounded-t bg-accent/20"></div>
                                    <div className="h-full w-full rounded-t bg-secondary/20"></div>
                                    <div className="h-2/3 w-full rounded-t bg-primary/20"></div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 shadow-lg sm:flex-row sm:justify-between sm:gap-8">
              <div className="text-center sm:text-left">
                <h3 className="mb-2 text-xl font-bold text-card-foreground">
                  Ready to streamline your workflow?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Join thousands of content creators who trust ConQ
                </p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95">
                Get Started Free
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
