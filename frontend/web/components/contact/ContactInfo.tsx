'use client';

import { motion } from 'framer-motion';
import { VIEWPORT, staggerContainer, staggerItem } from '@/lib/animations';

interface ContactMethod {
  icon: string;
  title: string;
  description: string;
  action: string;
  link: string;
}

const contactMethods: ContactMethod[] = [
  {
    icon: '📧',
    title: 'Email Us',
    description: 'Our team typically responds within 24 hours',
    action: 'support@conq.com',
    link: 'mailto:support@conq.com',
  },
  {
    icon: '💬',
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    action: 'Start Chat',
    link: '#',
  },
  {
    icon: '📞',
    title: 'Call Us',
    description: 'Mon-Fri from 9am to 6pm EST',
    action: '+1 (555) 123-4567',
    link: 'tel:+15551234567',
  },
  {
    icon: '📍',
    title: 'Visit Us',
    description: 'Come say hello at our office',
    action: '123 Business St, San Francisco, CA 94107',
    link: 'https://maps.google.com',
  },
];

export default function ContactInfo() {
  return (
    <section className="relative py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl"></div>
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
            <motion.div variants={staggerItem} className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Get in Touch</h2>
              <p className="text-lg text-muted-foreground">
                Choose your preferred way to connect with us
              </p>
            </motion.div>

            {/* Contact methods grid */}
            <motion.div
              variants={staggerContainer}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  variants={staggerItem}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:scale-105 hover:shadow-xl"
                >
                  {/* Decorative corner */}
                  <div className="absolute right-0 top-0 h-20 w-20 translate-x-10 -translate-y-10 rounded-full bg-primary/10 transition-transform group-hover:scale-150"></div>

                  {/* Icon */}
                  <div className="relative mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-3xl">
                    {method.icon}
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-lg font-semibold">{method.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{method.description}</p>
                  <p className="text-sm font-medium text-primary group-hover:text-accent transition-colors">
                    {method.action}
                  </p>
                </motion.a>
              ))}
            </motion.div>

            {/* Social media */}
            <motion.div variants={staggerItem} className="mt-12 text-center">
              <p className="mb-4 text-sm font-medium text-muted-foreground">Follow us on social media</p>
              <div className="flex items-center justify-center gap-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-all hover:scale-105 hover:border-primary hover:text-primary hover:shadow-lg"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
