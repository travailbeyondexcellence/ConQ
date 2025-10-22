# About Page Components

Modern, modular components for the ConQ About page. Built with Next.js 16, React 19, and Tailwind CSS v4.

## Design Philosophy

### 1. **Modular Architecture**
Each component is self-contained with its own props interface, making them:
- Reusable across different pages
- Easy to test independently
- Simple to maintain and update
- Flexible for different content needs

### 2. **Theme-Aware Styling**
All components use CSS variables from the theme system:
- `--primary`, `--secondary`, `--accent` for brand colors
- `--card`, `--card-foreground` for card elements
- `--foreground`, `--background` for text and backgrounds
- `--muted`, `--muted-foreground` for secondary text
- `--border` for borders and dividers
- All colors work seamlessly with all 12 themes

### 3. **Responsive Design**
Mobile-first approach with breakpoints:
- Base: Mobile (< 640px)
- `sm:` Small tablets (≥ 640px)
- `md:` Tablets (≥ 768px)
- `lg:` Desktops (≥ 1024px)
- `xl:` Large screens (≥ 1280px)

### 4. **Animation-Ready**
Components include `data-animate` attributes for Framer Motion:
- `data-animate="fade-in"` - Fade in animation
- `data-animate="slide-up"` - Slide up from below
- `data-animate="slide-down"` - Slide down from above
- `data-animate="slide-left"` - Slide from left
- `data-animate="slide-right"` - Slide from right
- `data-animate="scale-in"` - Scale in animation
- `data-animate-delay={value}` - Stagger animations

### 5. **Performance Optimized**
- Pure CSS with Tailwind (no runtime CSS-in-JS)
- No external dependencies beyond React
- Optimized for tree-shaking
- Minimal bundle size impact

## Components

### HeroSection
**Purpose**: Eye-catching page introduction with title, subtitle, and description.

**Features**:
- Large, bold typography for impact
- Gradient background overlay
- Decorative blur elements
- Badge with animated pulse indicator

**Usage**:
```tsx
<HeroSection
  title="Empowering Content Creators"
  subtitle="About ConQ"
  description="Your mission statement here..."
/>
```

### StatsSection
**Purpose**: Showcase key metrics and achievements.

**Features**:
- Grid layout (2 cols mobile, 4 cols desktop)
- Gradient text for numbers
- Hover animations
- Decorative blur backgrounds

**Usage**:
```tsx
<StatsSection
  title="By the Numbers" // Optional
  stats={[
    { value: "10", suffix: "K+", label: "Active Users" },
    { value: "99.9", suffix: "%", label: "Uptime" }
  ]}
/>
```

### ProblemSolutionSection
**Purpose**: Side-by-side comparison of problem and solution.

**Features**:
- Two-column layout (stacks on mobile)
- Color-coded (red for problems, green for solutions)
- Visual indicators (❌ and ✅)
- Point-by-point breakdown

**Usage**:
```tsx
<ProblemSolutionSection
  problem={{
    title: "The Challenge",
    description: "Overview of the problem...",
    points: ["Point 1", "Point 2"]
  }}
  solution={{
    title: "Our Solution",
    description: "How you solve it...",
    points: ["Solution 1", "Solution 2"]
  }}
/>
```

### MissionSection
**Purpose**: Display company mission with supporting items.

**Features**:
- 3-column grid (responsive)
- Icon-based cards
- Hover effects with shadows
- Gradient hover overlays

**Usage**:
```tsx
<MissionSection
  title="Our Mission"
  description="Mission statement..."
  items={[
    {
      icon: "🎯",
      title: "Item Title",
      description: "Item description..."
    }
  ]}
/>
```

### ValuesSection
**Purpose**: Showcase core company values.

**Features**:
- 2-column grid layout
- Large cards with icons
- Gradient backgrounds
- Decorative corner accents

**Usage**:
```tsx
<ValuesSection
  title="Our Core Values"
  subtitle="What drives us..."
  values={[
    {
      icon: "🚀",
      title: "Value Title",
      description: "Value description..."
    }
  ]}
/>
```

### VisionSection
**Purpose**: Present future vision and roadmap.

**Features**:
- 2-column grid for vision points
- Badge with rocket icon
- Trust indicators at bottom
- Gradient background

**Usage**:
```tsx
<VisionSection
  title="Where We're Heading"
  description="Vision overview..."
  visionPoints={[
    {
      icon: "🤖",
      title: "Future Item",
      description: "What's coming..."
    }
  ]}
/>
```

### StorySection
**Purpose**: Tell company story with timeline.

**Features**:
- Content paragraphs
- Optional timeline with milestones
- Vertical line with dots
- Year badges for milestones

**Usage**:
```tsx
<StorySection
  title="Our Story"
  content={[
    "Paragraph 1...",
    "Paragraph 2..."
  ]}
  milestones={[ // Optional
    {
      year: "2024 Q1",
      title: "Milestone Title",
      description: "What happened..."
    }
  ]}
/>
```

### TeamSection
**Purpose**: Introduce team members.

**Features**:
- 3-column grid (responsive)
- Avatar placeholders (or images)
- Hover effects on cards
- Auto-generates initials if no avatar

**Usage**:
```tsx
<TeamSection
  title="Meet the Team"
  description="Team introduction..."
  members={[
    {
      name: "John Doe",
      role: "CEO & Founder",
      bio: "Short bio...",
      avatar: "/images/john.jpg" // Optional
    }
  ]}
/>
```

### CTASection
**Purpose**: Call-to-action to convert visitors.

**Features**:
- Gradient border effect
- Primary and secondary buttons
- Trust indicators
- Hover animations on buttons

**Usage**:
```tsx
<CTASection
  title="Ready to Get Started?"
  description="CTA description..."
  primaryButton={{
    text: "Get Started Free",
    href: "/signup"
  }}
  secondaryButton={{ // Optional
    text: "Contact Sales",
    href: "/contact"
  }}
/>
```

## Styling Guidelines

### Color Usage
- **Primary**: Main brand color (buttons, accents)
- **Secondary**: Supporting brand color
- **Accent**: Highlights and hover states
- **Muted**: Backgrounds and subtle elements
- **Card**: Card backgrounds
- **Foreground**: Main text color
- **Success/Destructive**: Status indicators

### Spacing
- Section padding: `py-20 md:py-28` (80-112px vertical)
- Card padding: `p-6` to `p-8` (24-32px)
- Grid gaps: `gap-6` to `gap-8` (24-32px)
- Text margins: `mb-6` for headings, `mb-4` for subheadings

### Typography
- Hero titles: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- Section titles: `text-3xl sm:text-4xl md:text-5xl`
- Card titles: `text-xl md:text-2xl`
- Body text: `text-base md:text-lg`
- Muted text: Use `text-muted-foreground`

### Hover Effects
- Cards: `hover:border-primary/50 hover:shadow-lg hover:-translate-y-1`
- Buttons: `hover:scale-105 hover:shadow-lg`
- Icons: `group-hover:scale-110`

### Border Radius
- Cards: `rounded-2xl` (16px)
- Buttons: `rounded-xl` (12px)
- Icons: `rounded-xl` (12px)
- Full circles: `rounded-full`

## CSS Scope Management

### No Leakage Strategy
1. All styles use Tailwind utility classes
2. No custom CSS files per component
3. No global style modifications
4. Scoped to component tree via className

### Avoiding Conflicts
- Use specific Tailwind classes, not generic ones
- Prefer composition over inheritance
- Use `group` and `group-hover:` for parent-child interactions
- Avoid `!important` - use proper specificity

## Accessibility

### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- `<section>` for major sections
- `role="img"` for decorative emojis
- `aria-label` for icon meanings

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus states inherited from Tailwind defaults
- Logical tab order maintained

### Color Contrast
- All text meets WCAA AA standards
- Muted text uses appropriate foreground colors
- Links have visible hover states

## Animation Integration (Future)

When Framer Motion is integrated, components are ready with:

```tsx
// Example animation setup
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 }
};

// Apply to elements with data-animate="fade-in"
<motion.div {...fadeIn} data-animate="fade-in">
  Content here
</motion.div>
```

## Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Android

## Performance Notes
- Components are pure (no side effects)
- All static content (SSG-friendly)
- No client-side data fetching
- Optimized for Core Web Vitals

## Customization

### Changing Content
Simply update the props in `/app/about/page.tsx`

### Reordering Sections
Reorder component usage in the page file

### Adding New Sections
1. Create new component in `/components/about/`
2. Follow existing patterns
3. Add to index.ts for exports
4. Use in page.tsx

### Modifying Styles
- Edit Tailwind classes directly in components
- Changes respect theme system automatically
- No CSS files to maintain

## File Structure
```
components/about/
├── HeroSection.tsx
├── StatsSection.tsx
├── ProblemSolutionSection.tsx
├── MissionSection.tsx
├── ValuesSection.tsx
├── VisionSection.tsx
├── StorySection.tsx
├── TeamSection.tsx
├── CTASection.tsx
├── index.ts
└── README.md (this file)
```

## Best Practices

1. **Content Length**: Keep descriptions concise and scannable
2. **Icons**: Use emojis for visual interest, but ensure they're meaningful
3. **Images**: Optimize images before adding (use next/image when ready)
4. **Links**: Update href values to match actual routes
5. **Copy**: Customize all placeholder content for your brand
6. **Testing**: Test with different themes to ensure readability
7. **Mobile**: Always check mobile layout before deploying

## Need Help?

Each component is self-documenting with TypeScript interfaces. Check the component files for detailed prop types and available options.
