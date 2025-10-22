'use client';

import { motion } from 'framer-motion';
import { VIEWPORT } from '@/lib/animations';

interface ContactHeroProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function ContactHero({ title, subtitle, description }: ContactHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background with Unsplash image - faded at 9% opacity */}
      <div className="absolute inset-0 -z-10">
        {/* Layer 1: Background Image - 9% opacity (very faded) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&q=80&fm=webp&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.09,
          }}
          aria-hidden="true"
        />

        {/* Layer 2: Gradient accent blobs */}
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Subtitle badge */}
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
            <span className="text-sm font-medium text-primary">{subtitle}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
