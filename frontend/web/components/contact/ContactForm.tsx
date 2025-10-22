'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { VIEWPORT, staggerContainer, staggerItem } from '@/lib/animations';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setStatus('idle'), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {/* Section header */}
            <motion.div variants={staggerItem} className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Send us a Message</h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              variants={staggerItem}
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card p-8 shadow-lg"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Subject */}
                <div className="md:col-span-2">
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit button */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                  </button>

                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-center text-sm text-success"
                    >
                      Thank you! We'll get back to you soon.
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
