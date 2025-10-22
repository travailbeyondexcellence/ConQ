"use client";

import { motion } from "framer-motion";
import { fadeIn, slideUp, slideLeft, VIEWPORT } from "@/lib/animations";

interface StoryMilestone {
  year: string;
  title: string;
  description: string;
}

interface StorySectionProps {
  title: string;
  content: string[];
  milestones?: StoryMilestone[];
}

export default function StorySection({ title, content, milestones }: StorySectionProps) {
  return (
    <motion.section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Story content */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8">
              {title}
            </h2>
            <div className="space-y-6">
              {content.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-lg text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Timeline milestones */}
          {milestones && milestones.length > 0 && (
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-semibold text-foreground mb-8">
                Our Journey
              </h3>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

                {/* Milestones */}
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      className="relative pl-20"
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                    >
                      {/* Timeline dot */}
                      <motion.div
                        className="absolute left-6 top-1 w-5 h-5 rounded-full bg-primary border-4 border-background"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={VIEWPORT}
                        transition={{ duration: 0.4, delay: index * 0.15 + 0.2, ease: "easeOut" }}
                      />

                      {/* Content */}
                      <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm font-bold text-primary px-3 py-1 rounded-full bg-primary/10">
                            {milestone.year}
                          </span>
                          <h4 className="text-xl font-semibold text-card-foreground">
                            {milestone.title}
                          </h4>
                        </div>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
