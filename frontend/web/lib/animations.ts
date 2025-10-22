import type { Variants } from "framer-motion";

// Default animation durations and easings
export const DURATIONS = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.7,
  slower: 0.8,
} as const;

export const EASINGS = {
  easeOut: [0.16, 1, 0.3, 1],
  easeInOut: [0.65, 0, 0.35, 1],
  spring: { type: "spring", stiffness: 100, damping: 15 },
} as const;

// Viewport detection config - triggers animation when element enters viewport
export const VIEWPORT = {
  once: true, // Animate only once when entering viewport
  margin: "-100px", // Start animation when element is 100px from viewport
  amount: 0.3, // Trigger when 30% of element is visible
} as const;

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
};

// Fade in with delay
export const fadeInDelay = (delay: number = 0.2): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
      delay,
    },
  },
});

// Slide up animation
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
};

// Slide up with custom distance
export const slideUpCustom = (distance: number = 30, delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
      delay,
    },
  },
});

// Slide down animation
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
};

// Slide left animation
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
};

// Slide right animation
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
};

// Scale animation (zoom in)
export const scale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
};

// Scale with custom values
export const scaleCustom = (from: number = 0.95, delay: number = 0): Variants => ({
  hidden: { opacity: 0, scale: from },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
      delay,
    },
  },
});

// Stagger children animation container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger container with custom delays
export const staggerContainerCustom = (
  staggerDelay: number = 0.1,
  delayChildren: number = 0.1
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

// Stagger item animation
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
};

// Stagger item with scale
export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
};

// Fade and scale combination
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.easeOut,
    },
  },
};

// Floating animation (for decorative elements)
export const float: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.slower,
      ease: EASINGS.easeOut,
    },
  },
};

// Animation for dashboard preview or large elements
export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.slower,
      ease: EASINGS.easeOut,
      delay: 0.3,
    },
  },
};

// Helper function to create delayed animation
export const withDelay = (variants: Variants, delay: number): Variants => {
  return {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        ...(variants.visible as any).transition,
        delay,
      },
    },
  };
};

// Viewport configuration with custom margins
export const customViewport = (margin: string = "-100px") => ({
  once: true,
  margin,
  amount: 0.3,
});

// Common animation props for easy reuse
export const fadeInProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: VIEWPORT,
  variants: fadeIn,
};

export const slideUpProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: VIEWPORT,
  variants: slideUp,
};

export const scaleProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: VIEWPORT,
  variants: scale,
};

export const staggerProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: VIEWPORT,
  variants: staggerContainer,
};
