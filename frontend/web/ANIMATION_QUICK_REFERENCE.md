# Framer Motion Animation Quick Reference

## Component Animation Summary

### HOME PAGE (/components/home/)

| Component | Animation Type | Duration | Stagger Delay | Key Features |
|-----------|---------------|----------|---------------|--------------|
| **Hero.tsx** | Fade + Slide Up | 0.5-0.8s | 0.2s | Hero title, subtitle, CTA buttons |
| **Features.tsx** | Stagger Container | 0.5s | 0.1s | Feature cards fade + slide up |
| **HowItWorks.tsx** | Stagger Items | 0.6s | 0.15s | Step cards with number circles |
| **Pricing.tsx** | Scale | 0.5s | 0.1s | Pricing cards scale up (0.9→1.0) |
| **Testimonials.tsx** | Stagger Items | 0.5s | 0.1s | Testimonial cards slide up |
| **CTA.tsx** | Scale | 0.7s | - | Main CTA card scales (0.9→1.0) |
| **Footer.tsx** | Slide Up | 0.5s | 0.1-0.3s | Footer sections stagger up |

### ABOUT PAGE (/components/about/)

| Component | Animation Type | Duration | Stagger Delay | Key Features |
|-----------|---------------|----------|---------------|--------------|
| **HeroSection.tsx** | Fade + Slide | 0.5-0.6s | 0.1-0.2s | Badge, title, description sequence |
| **StatsSection.tsx** | Scale | 0.5s | 0.1s | Stat cards scale (0.8→1.0) |
| **ProblemSolutionSection.tsx** | Slide Left/Right | 0.6s | 0.1s | Problem (-40px), Solution (+40px) |
| **MissionSection.tsx** | Stagger Slide Up | 0.6s | 0.1s | Mission cards with icons |
| **ValuesSection.tsx** | Scale | 0.5s | 0.1s | Value cards scale (0.95→1.0) |
| **VisionSection.tsx** ⭐ | Stagger Slide Up | 0.6s | 0.15s | Vision points + badge animations |
| **StorySection.tsx** ⭐ | Slide Up + Left | 0.5-0.6s | 0.1-0.15s | Paragraphs + timeline milestones |
| **TeamSection.tsx** ⭐ | Stagger Slide Up | 0.6s | 0.1s | Team member cards (40px up) |
| **CTASection.tsx** ⭐ | Scale + Sequence | 0.6-0.7s | 0.1-0.4s | Card scale + content sequence |

⭐ = Updated in this session

---

## Animation Patterns

### Pattern 1: Simple Fade In
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={VIEWPORT}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  Content
</motion.div>
```

### Pattern 2: Slide Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={VIEWPORT}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Content
</motion.div>
```

### Pattern 3: Scale Animation
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={VIEWPORT}
  transition={{ duration: 0.7, ease: "easeOut" }}
>
  Content
</motion.div>
```

### Pattern 4: Staggered Items
```tsx
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT}
    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
  >
    {item}
  </motion.div>
))}
```

### Pattern 5: Slide from Left
```tsx
<motion.div
  initial={{ opacity: 0, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={VIEWPORT}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Content
</motion.div>
```

### Pattern 6: Slide from Right
```tsx
<motion.div
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={VIEWPORT}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Content
</motion.div>
```

---

## Animation Utilities (from @/lib/animations)

### Pre-built Variants
- `fadeIn` - Simple opacity fade
- `slideUp` - Slide up 30px
- `slideDown` - Slide down 30px
- `slideLeft` - Slide from right 30px
- `slideRight` - Slide from left 30px
- `scale` - Scale from 0.95 to 1.0
- `fadeScale` - Combined fade + scale

### Custom Variants
- `fadeInDelay(delay)` - Fade with custom delay
- `slideUpCustom(distance, delay)` - Custom distance and delay
- `scaleCustom(from, delay)` - Custom scale start value
- `staggerContainerCustom(stagger, delay)` - Custom stagger timing

### Helper Props
```tsx
import { fadeInProps, slideUpProps, scaleProps, staggerProps } from "@/lib/animations"

// Quick usage:
<motion.div {...fadeInProps}>Content</motion.div>
```

### Viewport Config
```tsx
export const VIEWPORT = {
  once: true,
  margin: "-100px",
  amount: 0.3,
}
```

---

## Common Timing Values

### Duration
- **Fast**: 0.3s - Quick interactions
- **Normal**: 0.5s - Standard animations
- **Slow**: 0.7s - Emphasis animations
- **Slower**: 0.8s - Large elements

### Stagger Delays
- **Tight**: 0.05s - Many small items
- **Normal**: 0.1s - Standard grid items
- **Spacious**: 0.15s - Larger cards/sections
- **Sequential**: 0.2s+ - Deliberate sequence

### Easing
- **easeOut**: `[0.16, 1, 0.3, 1]` - Default (natural deceleration)
- **easeInOut**: `[0.65, 0, 0.35, 1]` - Two-way animations
- **spring**: `{ type: "spring", stiffness: 100, damping: 15 }` - Bouncy feel

---

## Best Practices

### ✅ DO
- Use viewport triggering for scroll animations
- Keep durations between 0.5s - 0.8s
- Use stagger for lists/grids (0.1s - 0.15s)
- Set `once: true` for performance
- Use hardware-accelerated properties (opacity, transform)
- Test on slower devices

### ❌ DON'T
- Animate on mount (use whileInView)
- Use durations over 1s (feels sluggish)
- Animate layout properties (width, height)
- Stack too many animations (overwhelming)
- Ignore prefers-reduced-motion
- Animate before viewport trigger

---

## Performance Tips

1. **Use transform properties**: opacity, scale, translateX/Y (GPU accelerated)
2. **Avoid layout properties**: width, height, padding, margin
3. **Viewport triggering**: Only animate when visible
4. **Once-only animations**: Set `once: true` in viewport
5. **Stagger timing**: Keep delays reasonable (0.1-0.15s)
6. **Test on mobile**: Ensure 60fps on devices

---

## Troubleshooting

### Animation not triggering?
- ✓ Check "use client" directive is at top
- ✓ Verify viewport configuration is set
- ✓ Ensure element is actually in viewport
- ✓ Check initial values are different from animate values

### Animation feels too slow?
- Reduce duration (try 0.5s instead of 0.8s)
- Reduce stagger delay (try 0.05s instead of 0.1s)

### Animation feels janky?
- Use transform properties only
- Check for layout shifts
- Reduce number of simultaneous animations
- Test on lower-end devices

### Elements jump on first render?
- Set initial state properly
- Use CSS to hide initially if needed
- Ensure viewport detection is working

---

## File Locations

- **Animation utilities**: `/lib/animations.ts`
- **Home components**: `/components/home/*.tsx`
- **About components**: `/components/about/*.tsx`

---

*Quick reference for Framer Motion animations in ConQ frontend*
*Last updated: 2025-10-22*
