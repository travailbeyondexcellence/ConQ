"use client";

import { motion } from "framer-motion";
import { scale, fadeIn, VIEWPORT } from "@/lib/animations";

interface Stat {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
}

interface StatsSectionProps {
  title?: string;
  stats: Stat[];
}

export default function StatsSection({ title, stats }: StatsSectionProps) {
  return (
    <motion.section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Optional title */}
          {title && (
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                {title}
              </h2>
            </motion.div>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              >
                {/* Stat card */}
                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  {/* Value */}
                  <div className="mb-2">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent">
                      {stat.prefix}
                      {stat.value}
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <p className="text-sm md:text-base font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                </div>

                {/* Decorative line */}
                <div className="mt-4 h-1 w-0 group-hover:w-full mx-auto bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
    </motion.section>
  );
}
