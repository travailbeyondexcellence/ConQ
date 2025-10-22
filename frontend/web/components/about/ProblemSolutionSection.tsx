"use client";

import { motion } from "framer-motion";
import { slideUp, slideLeft, slideRight, VIEWPORT } from "@/lib/animations";

interface ProblemSolutionSectionProps {
  problem: {
    title: string;
    description: string;
    points: string[];
  };
  solution: {
    title: string;
    description: string;
    points: string[];
  };
}

export default function ProblemSolutionSection({ problem, solution }: ProblemSolutionSectionProps) {
  return (
    <motion.section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Problem side */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <span className="text-2xl">❌</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {problem.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                {problem.description}
              </p>

              {/* Points */}
              <div className="space-y-4 mt-8">
                {problem.points.map((point, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/20"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-destructive">!</span>
                    </div>
                    <p className="text-muted-foreground">{point}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Solution side */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  {solution.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                {solution.description}
              </p>

              {/* Points */}
              <div className="space-y-4 mt-8">
                {solution.points.map((point, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-4 p-4 rounded-xl bg-success/5 border border-success/20 hover:border-success/40 transition-colors duration-300"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-success">✓</span>
                    </div>
                    <p className="text-muted-foreground">{point}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Center divider */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-2/3 bg-gradient-to-b from-transparent via-border to-transparent" />
        </div>
      </div>
    </motion.section>
  );
}
