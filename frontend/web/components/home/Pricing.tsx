"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer, staggerItem, scale, fadeIn, VIEWPORT } from "@/lib/animations";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small creators",
      price: "Free",
      period: "Forever",
      features: [
        "3 social accounts",
        "30 scheduled posts/month",
        "Basic analytics",
        "7-day content calendar",
        "Community support",
      ],
      cta: "Start Free",
      highlighted: false,
    },
    {
      name: "Professional",
      description: "For growing creators and small teams",
      price: "$29",
      period: "per month",
      features: [
        "10 social accounts",
        "Unlimited scheduled posts",
        "Advanced analytics",
        "Content calendar",
        "Team collaboration (3 members)",
        "Priority support",
        "Custom branding",
        "AI-powered scheduling",
      ],
      cta: "Start Free Trial",
      highlighted: true,
      badge: "Most Popular",
    },
    {
      name: "Business",
      description: "For agencies and large organizations",
      price: "$99",
      period: "per month",
      features: [
        "Unlimited social accounts",
        "Unlimited scheduled posts",
        "Premium analytics & reports",
        "Advanced content calendar",
        "Team collaboration (unlimited)",
        "24/7 dedicated support",
        "White-label solutions",
        "API access",
        "Custom integrations",
        "Account manager",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <motion.section className="relative overflow-hidden py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 blur-3xl"></div>
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
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              Pricing
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Choose Your
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Perfect Plan</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Start free and scale as you grow. All plans include 14-day free trial with no credit card required.
            </p>
          </motion.div>

          {/* Pricing cards */}
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all hover:scale-105 ${
                  plan.highlighted
                    ? "border-primary bg-card shadow-2xl shadow-primary/20"
                    : "border-border bg-card shadow-sm hover:shadow-xl"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              >
                {/* Badge for highlighted plan */}
                {plan.badge && (
                  <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg">
                    {plan.badge}
                  </div>
                )}

                {/* Gradient overlay on hover */}
                {plan.highlighted && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                )}

                <div className="relative p-8">
                  {/* Plan header */}
                  <div className="mb-6">
                    <h3 className="mb-2 text-2xl font-bold text-card-foreground">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`mb-8 w-full rounded-lg py-3 px-4 font-semibold shadow-lg transition-all hover:scale-105 active:scale-95 ${
                      plan.highlighted
                        ? "bg-primary text-primary-foreground hover:shadow-xl"
                        : "border-2 border-border bg-card text-card-foreground hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    {plan.cta}
                  </button>

                  {/* Features list */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      What's included
                    </p>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <svg
                          className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                            plan.highlighted ? "text-primary" : "text-success"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-card-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative bottom gradient */}
                <div
                  className={`h-1 w-full bg-gradient-to-r ${
                    plan.highlighted
                      ? "from-primary via-accent to-secondary"
                      : "from-muted to-muted"
                  }`}
                ></div>
              </motion.div>
            ))}
          </div>

          {/* FAQ / Additional info */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-lg">
              <h3 className="mb-4 text-xl font-bold text-card-foreground">
                Need a custom solution?
              </h3>
              <p className="mb-6 text-muted-foreground">
                We offer enterprise plans with custom features, dedicated support, and volume discounts for large organizations.
              </p>
              <button className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-primary/10 px-6 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-lg">
                Contact Sales Team
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
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
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
