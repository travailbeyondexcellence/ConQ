'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: ReactNode;
  gradient: string;
  delay?: number;
}

export default function MetricCard({
  title,
  value,
  change,
  isPositive,
  icon,
  gradient,
  delay = 0,
}: MetricCardProps) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
      />

      {/* Content */}
      <div className="relative">
        {/* Icon */}
        <div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4 shadow-lg relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative text-white">{icon}</div>
        </div>

        {/* Title */}
        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>

        {/* Value and Change */}
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-foreground">{value}</h3>

          {/* Change indicator */}
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              isPositive ? 'text-success' : 'text-destructive'
            }`}
          >
            <svg
              className={`w-4 h-4 ${isPositive ? '' : 'rotate-180'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            <span>{change}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
