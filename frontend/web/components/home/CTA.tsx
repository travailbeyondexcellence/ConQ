"use client";

import { motion } from "framer-motion";
import { slideUp, slideDown, scale, fadeIn, VIEWPORT } from "@/lib/animations";

export default function CTA() {
  return (
    <motion.section className="relative overflow-hidden py-20 md:py-32">
      {/* Background with dramatic gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10"></div>
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Main CTA Card */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border-2 border-border bg-card shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-accent to-secondary opacity-0 transition-opacity hover:opacity-10"></div>

            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="flex flex-col items-center text-center">
                {/* Badge */}
                <motion.div
                  className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
                  </span>
                  Limited Time Offer
                </motion.div>

                {/* Heading */}
                <motion.h2
                  className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  Ready to Transform Your
                  <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"> Social Media Strategy?</span>
                </motion.h2>

                {/* Subheading */}
                <motion.p
                  className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                  Join thousands of content creators, marketers, and businesses who are saving time and growing their audience with ConQ.
                </motion.p>

                {/* Features highlight */}
                <motion.div
                  className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm md:gap-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-card-foreground">14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-card-foreground">No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-card-foreground">Cancel anytime</span>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col items-center gap-4 sm:flex-row"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                >
                  <button className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary via-accent to-secondary px-8 py-4 text-lg font-bold text-primary-foreground shadow-2xl transition-all hover:scale-105 hover:shadow-primary/50 active:scale-95">
                    <span className="relative z-10">Start Free Trial</span>
                    <svg
                      className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    {/* Animated shine effect */}
                    <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></span>
                  </button>

                  <button className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-background px-8 py-4 text-lg font-bold text-foreground shadow-lg transition-all hover:scale-105 hover:border-primary hover:bg-card hover:shadow-xl active:scale-95">
                    Schedule a Demo
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </motion.div>

                {/* Trust indicator */}
                <motion.p
                  className="mt-6 text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                >
                  Join 10,000+ satisfied users • No setup fees • 24/7 support
                </motion.p>
              </div>

              {/* Decorative elements */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-3xl"></div>
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-accent to-secondary opacity-20 blur-3xl"></div>
            </div>
          </motion.div>

          {/* Additional info cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <motion.div
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:scale-105 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <div className="mb-3 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 font-semibold text-card-foreground">
                Quick Setup
              </h3>
              <p className="text-sm text-muted-foreground">
                Get started in under 5 minutes with our intuitive onboarding
              </p>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:scale-105 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <div className="mb-3 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 font-semibold text-card-foreground">
                Secure & Private
              </h3>
              <p className="text-sm text-muted-foreground">
                Bank-level encryption keeps your data and accounts safe
              </p>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:scale-105 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              <div className="mb-3 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                  <svg className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-2 font-semibold text-card-foreground">
                24/7 Support
              </h3>
              <p className="text-sm text-muted-foreground">
                Expert help whenever you need it via chat, email, or phone
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
