"use client";

import { motion } from "framer-motion";
import { scale, fadeIn, slideUp, VIEWPORT } from "@/lib/animations";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
}

export default function CTASection({ title, description, primaryButton, secondaryButton }: CTASectionProps) {
  return (
    <motion.section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* CTA Card */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary p-1"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Inner content */}
            <div className="relative bg-card rounded-3xl p-8 md:p-12 lg:p-16">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-accent/50" />
              </div>

              <div className="relative z-10 text-center">
                {/* Title */}
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  {title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  {description}
                </motion.p>

                {/* Buttons */}
                <motion.div
                  className="flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                  {/* Primary button */}
                  <a
                    href={primaryButton.href}
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                  >
                    <span>{primaryButton.text}</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>

                  {/* Secondary button */}
                  {secondaryButton && (
                    <a
                      href={secondaryButton.href}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-card border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                    >
                      <span>{secondaryButton.text}</span>
                    </a>
                  )}
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-success text-lg">✓</span>
                    <span>Free to start</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success text-lg">✓</span>
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success text-lg">✓</span>
                    <span>Cancel anytime</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <div className="relative">
            <motion.div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
