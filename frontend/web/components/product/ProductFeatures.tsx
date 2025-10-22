'use client';

import { motion } from 'framer-motion';
import { VIEWPORT, staggerContainer, staggerItem } from '@/lib/animations';

interface Feature {
  icon: string;
  title: string;
  description: string;
  items: string[];
}

const features: Feature[] = [
  {
    icon: '🤖',
    title: 'AI-Powered Content Generation',
    description: 'Create high-quality content in seconds with our advanced AI',
    items: [
      'Multiple AI models to choose from',
      'Custom tone and style settings',
      'SEO-optimized content',
      'Multi-language support',
    ],
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Track performance and gain insights into your content',
    items: [
      'Real-time performance metrics',
      'Audience engagement tracking',
      'Competitor analysis',
      'Custom reports & dashboards',
    ],
  },
  {
    icon: '🎯',
    title: 'Content Strategy Tools',
    description: 'Plan, organize, and execute your content strategy effectively',
    items: [
      'Editorial calendar',
      'Content planning templates',
      'Keyword research tools',
      'Trend analysis',
    ],
  },
  {
    icon: '👥',
    title: 'Team Collaboration',
    description: 'Work together seamlessly with your team members',
    items: [
      'Real-time co-editing',
      'Comment & feedback system',
      'Role-based permissions',
      'Approval workflows',
    ],
  },
  {
    icon: '🚀',
    title: 'Multi-Platform Publishing',
    description: 'Publish to all your platforms from one central hub',
    items: [
      'Social media integration',
      'Blog & website publishing',
      'Scheduled posting',
      'Cross-platform optimization',
    ],
  },
  {
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'Keep your content and data safe with enterprise-grade security',
    items: [
      'End-to-end encryption',
      'SSO & 2FA support',
      'GDPR compliant',
      'Regular security audits',
    ],
  },
];

export default function ProductFeatures() {
  return (
    <section className="relative py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"></div>
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
                <span className="text-sm font-medium text-primary">Features</span>
              </div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                Everything You Need to Succeed
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Powerful features designed to streamline your content creation workflow and maximize your productivity
              </p>
            </motion.div>

            {/* Features grid */}
            <motion.div
              variants={staggerContainer}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:scale-105 hover:shadow-xl"
                >
                  {/* Decorative corner */}
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 transition-transform group-hover:scale-150"></div>

                  {/* Icon */}
                  <div className="relative mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-4xl">
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{feature.description}</p>

                  {/* Feature items */}
                  <ul className="space-y-2">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-0.5 flex-shrink-0 text-primary"
                        >
                          <path
                            d="M13.3333 4L6 11.3333L2.66667 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
