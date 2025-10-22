"use client";

import { motion } from "framer-motion";
import { fadeIn, slideUp, staggerContainer, staggerItem, VIEWPORT } from "@/lib/animations";

interface VisionSectionProps {
  title: string;
  description: string;
  visionPoints: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export default function VisionSection({ title, description, visionPoints }: VisionSectionProps) {
  return (
    <motion.section
      className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="text-2xl">🚀</span>
              <span className="text-sm font-medium text-primary">Future Vision</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Vision points */}
          <div className="grid md:grid-cols-2 gap-8">
            {visionPoints.map((point, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              >
                {/* Card */}
                <div className="h-full p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                  {/* Icon and title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl" role="img" aria-label={point.title}>
                        {point.icon}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-card-foreground pt-2">
                      {point.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed pl-[4.5rem]">
                    {point.description}
                  </p>

                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300 -z-10" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <p className="text-lg text-muted-foreground mb-8">
              Join us in shaping the future of content scheduling
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                className="px-6 py-3 rounded-xl bg-primary/10 border border-primary/20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              >
                <span className="text-sm font-medium text-primary">Innovation First</span>
              </motion.div>
              <motion.div
                className="px-6 py-3 rounded-xl bg-accent/10 border border-accent/20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              >
                <span className="text-sm font-medium text-accent-foreground">User Focused</span>
              </motion.div>
              <motion.div
                className="px-6 py-3 rounded-xl bg-secondary/10 border border-secondary/20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              >
                <span className="text-sm font-medium text-secondary-foreground">Growth Mindset</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.section>
  );
}
