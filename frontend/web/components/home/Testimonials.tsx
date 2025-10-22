"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer, staggerItem, scale, fadeIn, VIEWPORT } from "@/lib/animations";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      company: "@sarahcreates",
      avatar: "SJ",
      content: "ConQ has completely transformed my content workflow. I've saved 10+ hours per week and my engagement has doubled!",
      rating: 5,
      gradient: "from-primary to-accent",
    },
    {
      name: "Marcus Chen",
      role: "Digital Marketing Manager",
      company: "TechFlow Inc",
      avatar: "MC",
      content: "The analytics dashboard is incredible. We can finally see what's working across all platforms in one place. Game-changer for our team.",
      rating: 5,
      gradient: "from-accent to-secondary",
    },
    {
      name: "Emily Rodriguez",
      role: "Social Media Strategist",
      company: "Creative Agency",
      avatar: "ER",
      content: "Managing multiple client accounts used to be a nightmare. ConQ made it simple and efficient. Our clients love the results!",
      rating: 5,
      gradient: "from-secondary to-primary",
    },
    {
      name: "David Kim",
      role: "Entrepreneur",
      company: "Startup Founder",
      avatar: "DK",
      content: "As a solo founder, I needed something that just works. ConQ's AI scheduling finds the perfect times to post. It's like having a social media manager.",
      rating: 5,
      gradient: "from-primary via-accent to-secondary",
    },
    {
      name: "Lisa Anderson",
      role: "Influencer",
      company: "@lifewithLisa",
      avatar: "LA",
      content: "The content calendar view helps me plan my entire month in minutes. Plus the multi-platform posting is flawless every time.",
      rating: 5,
      gradient: "from-accent to-primary",
    },
    {
      name: "James Wilson",
      role: "Agency Owner",
      company: "Social Growth Co",
      avatar: "JW",
      content: "We manage 50+ accounts for our clients. ConQ scales effortlessly and the team collaboration features are exactly what we needed.",
      rating: 5,
      gradient: "from-secondary to-accent",
    },
  ];

  return (
    <motion.section className="relative overflow-hidden py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-card-foreground shadow-sm">
              <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
              Testimonials
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Loved by
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Thousands</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              See what our users have to say about their experience with ConQ.
            </p>
          </motion.div>

          {/* Testimonials grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:scale-105 hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 transition-opacity group-hover:opacity-5`}></div>

                <div className="relative">
                  {/* Quote icon */}
                  <div className="mb-4 flex items-start justify-between">
                    <svg
                      className="h-8 w-8 text-primary/20"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-warning"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <p className="mb-6 text-sm leading-relaxed text-card-foreground">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} text-sm font-bold text-white shadow-lg`}>
                      {testimonial.avatar}
                    </div>
                    {/* Info */}
                    <div>
                      <div className="font-semibold text-card-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-primary">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative corner gradient */}
                <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${testimonial.gradient} opacity-0 blur-2xl transition-opacity group-hover:opacity-20`}></div>
              </motion.div>
            ))}
          </div>

          {/* Stats section */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="grid gap-8 rounded-2xl border border-border bg-card p-8 shadow-lg sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  10K+
                </div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                  1M+
                </div>
                <div className="text-sm text-muted-foreground">Posts Scheduled</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  4.9/5
                </div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  98%
                </div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <p className="mb-6 text-sm font-medium text-muted-foreground">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
              {/* Company logos placeholder */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-12 w-24 items-center justify-center rounded-lg bg-muted/50"
                >
                  <span className="text-xs font-bold text-muted-foreground">
                    BRAND
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
