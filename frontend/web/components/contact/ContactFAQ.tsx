'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { VIEWPORT, staggerContainer, staggerItem } from '@/lib/animations';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'How quickly do you respond to inquiries?',
    answer: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please use our live chat feature for immediate assistance.',
  },
  {
    question: 'What information should I include in my message?',
    answer: 'Please provide as much detail as possible about your inquiry, including any relevant account information, error messages, or specific questions. This helps us provide you with the most accurate and helpful response.',
  },
  {
    question: 'Do you offer phone support?',
    answer: 'Yes! Phone support is available Monday through Friday from 9am to 6pm EST. You can reach us at +1 (555) 123-4567. For 24/7 support, use our live chat or email.',
  },
  {
    question: 'Can I schedule a demo or consultation?',
    answer: 'Absolutely! We offer personalized demos and consultations for all plans. Simply mention this in your message or contact our sales team directly to schedule a session that works for you.',
  },
  {
    question: 'What if I need technical support?',
    answer: 'For technical issues, please select "Technical Support" as your subject and include details about your issue, browser/device, and any error messages. Our support team will prioritize technical inquiries.',
  },
  {
    question: 'How can I provide feedback or feature requests?',
    answer: 'We love hearing from our users! Select "Feedback" as your subject, or join our community Discord where we actively discuss new features and improvements with our users.',
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Find quick answers to common questions
              </p>
            </motion.div>

            {/* FAQ list */}
            <motion.div variants={staggerContainer} className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-muted/5"
                  >
                    <span className="pr-8 text-lg font-semibold">{faq.question}</span>
                    <motion.span
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="border-t border-border px-6 pb-6 pt-4">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            {/* Still have questions CTA */}
            <motion.div
              variants={staggerItem}
              className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center"
            >
              <h3 className="mb-2 text-2xl font-bold">Still have questions?</h3>
              <p className="mb-6 text-muted-foreground">
                Can't find the answer you're looking for? Our team is here to help.
              </p>
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Contact Support
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
