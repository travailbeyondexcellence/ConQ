'use client';

import { motion } from 'framer-motion';
import { VIEWPORT, staggerContainer, staggerItem } from '@/lib/animations';

interface Benefit {
  icon: string;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}

const benefits: Benefit[] = [
  {
    icon: '⚡',
    title: 'Save Time',
    description: 'Create content 10x faster with AI assistance and powerful automation tools.',
    stat: '10x',
    statLabel: 'Faster',
  },
  {
    icon: '📈',
    title: 'Increase Engagement',
    description: 'Data-driven insights help you create content that resonates with your audience.',
    stat: '3x',
    statLabel: 'More Engagement',
  },
  {
    icon: '💰',
    title: 'Reduce Costs',
    description: 'Replace multiple tools with one comprehensive platform and save money.',
    stat: '$5K+',
    statLabel: 'Saved Annually',
  },
  {
    icon: '🎨',
    title: 'Improve Quality',
    description: 'Professional-grade tools and templates ensure consistently high-quality output.',
    stat: '95%',
    statLabel: 'Quality Score',
  },
];

export default function ProductBenefits() {
  return (
    <section className="relative py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {/* Section header */}
            <motion.div variants={staggerItem} className="mb-16 text-center">
              <div className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                <span className="text-sm font-medium text-primary">Benefits</span>
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                Why Choose ConQ?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Join thousands of content creators who have transformed their workflow with ConQ
              </p>
            </motion.div>

            {/* Benefits grid */}
            <motion.div
              variants={staggerContainer}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:scale-105 hover:shadow-xl"
                >
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 opacity-0 transition-opacity group-hover:from-primary/5 group-hover:to-accent/5 group-hover:opacity-100"></div>

                  {/* Content */}
                  <div className="relative">
                    {/* Icon */}
                    <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-4xl">
                      {benefit.icon}
                    </div>

                    {/* Stat */}
                    <div className="mb-2">
                      <div className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-bold text-transparent">
                        {benefit.stat}
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {benefit.statLabel}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional benefits list */}
            <motion.div
              variants={staggerItem}
              className="mt-16 rounded-2xl border border-border bg-card p-8 md:p-12"
            >
              <h3 className="mb-8 text-center text-2xl font-bold md:text-3xl">
                And That's Not All...
              </h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: '🔄', text: 'Automated workflows' },
                  { icon: '🌐', text: 'Global CDN delivery' },
                  { icon: '📱', text: 'Mobile-first design' },
                  { icon: '🎯', text: 'SEO optimization' },
                  { icon: '🔔', text: 'Smart notifications' },
                  { icon: '💬', text: '24/7 support' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xl">
                      {item.icon}
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
