# ConQ Home Page Components

This directory contains all the modular components that make up the ConQ landing page. Each component is designed to be reusable, theme-aware, and ready for Framer Motion animations.

## Components Overview

### 1. Hero.tsx
**Purpose**: Main landing section with headline, CTA buttons, and visual preview

**Features**:
- Gradient background effects
- Animated badge with pulse effect
- Primary and secondary CTA buttons
- Dashboard mockup preview
- Floating notification cards
- Trust indicators (ratings, user count, posts scheduled)

**Animation Hooks**:
- `data-animation="fade-scale"` - Background gradients
- `data-animation="slide-down"` - Badge
- `data-animation="slide-up"` - Headings and CTAs
- `data-animation="fade-in"` - Trust indicators
- `data-animation="zoom-in"` - Dashboard preview
- `data-animation="float"` - Floating cards

### 2. Features.tsx
**Purpose**: Showcase key platform features in a grid layout

**Features**:
- 6 feature cards with icons and descriptions
- Gradient backgrounds on hover
- Icon badges with gradient styling
- "Learn more" links with arrow animations

**Key Features Highlighted**:
- Smart Scheduling
- Multi-Platform Support
- Analytics & Insights
- Media Library
- Content Calendar
- Team Collaboration

**Animation Hooks**:
- `data-animation="slide-up"` - Section header
- `data-animation="stagger-up"` - Feature cards with delay
- `data-animation="fade-in"` - Bottom CTA

### 3. HowItWorks.tsx
**Purpose**: Step-by-step guide showing the user journey

**Features**:
- 4-step process flow
- Large numbered circles with connection lines
- Feature checkmarks for each step
- Visual representations of each step
- Bottom CTA card

**Steps**:
1. Connect Your Accounts
2. Create Your Content
3. Schedule & Automate
4. Track & Optimize

**Animation Hooks**:
- `data-animation="slide-up"` - Section header
- `data-animation="stagger-slide"` - Step cards with delay
- `data-animation="fade-in"` - Bottom CTA

### 4. Pricing.tsx
**Purpose**: Display pricing tiers and plans

**Features**:
- 3 pricing tiers (Starter, Professional, Business)
- Highlighted "Most Popular" plan
- Feature comparison lists
- Trust badges at bottom
- Enterprise contact section

**Plans**:
- **Starter**: Free forever with basic features
- **Professional**: $29/month with advanced features (highlighted)
- **Business**: $99/month with unlimited everything

**Animation Hooks**:
- `data-animation="slide-up"` - Section header
- `data-animation="stagger-zoom"` - Pricing cards with delay
- `data-animation="fade-in"` - Newsletter and trust badges

### 5. Testimonials.tsx
**Purpose**: Social proof with user reviews and stats

**Features**:
- 6 testimonial cards in grid layout
- User avatars with gradient backgrounds
- 5-star ratings
- Stats section (users, posts, rating, satisfaction)
- Company logo placeholders

**Animation Hooks**:
- `data-animation="slide-up"` - Section header
- `data-animation="stagger-fade"` - Testimonial cards with delay
- `data-animation="fade-in"` - Stats and logos

### 6. CTA.tsx
**Purpose**: Final call-to-action before footer

**Features**:
- Large prominent card with dramatic gradients
- Dual CTA buttons (trial + demo)
- Feature checkmarks
- Trust indicator text
- 3 info cards at bottom (Quick Setup, Secure, 24/7 Support)

**Animation Hooks**:
- `data-animation="zoom-in"` - Main CTA card
- `data-animation="slide-down"` - Limited time badge
- `data-animation="slide-up"` - Heading and buttons
- `data-animation="fade-in"` - Trust text
- `data-animation="stagger-fade"` - Bottom info cards

### 7. Footer.tsx
**Purpose**: Site footer with links, newsletter, and social

**Features**:
- Brand section with logo and description
- 4 link columns (Product, Company, Resources, Legal)
- Social media icons
- Newsletter subscription form
- Bottom bar with copyright and legal links

**No animation hooks** - Footer is static for stability

## Design Principles

### 1. Theme Awareness
All components use CSS variables for colors:
- `text-foreground` - Primary text
- `text-card-foreground` - Card text
- `text-muted-foreground` - Secondary text
- `bg-background` - Page background
- `bg-card` - Card backgrounds
- `bg-primary` - Primary actions
- `border-border` - Borders

### 2. Responsive Design
- Mobile-first approach
- Grid layouts adapt: `grid md:grid-cols-2 lg:grid-cols-3`
- Text scales: `text-4xl md:text-5xl lg:text-7xl`
- Flexible containers with max-widths

### 3. No CSS Scope Leakage
- All styling uses Tailwind utility classes
- No custom CSS beyond globals.css
- Component styles are self-contained
- Theme transitions handled via global class

### 4. Animation Readiness
Components use `data-animation` attributes for Framer Motion:
- `data-animation="slide-up"` - Slide from bottom
- `data-animation="slide-down"` - Slide from top
- `data-animation="fade-in"` - Fade in
- `data-animation="zoom-in"` - Scale up
- `data-animation="stagger-*"` - Sequential animations
- `data-animation-delay={index * 100}` - Stagger timing

### 5. Gradient System
Consistent gradient patterns:
- `from-primary to-accent` - Brand gradient
- `from-accent to-secondary` - Alternative gradient
- `from-primary via-accent to-secondary` - Full spectrum

### 6. Hover Effects
Interactive elements have smooth transitions:
- `hover:scale-105` - Subtle scale
- `hover:shadow-xl` - Depth on hover
- `active:scale-95` - Click feedback
- `transition-all` - Smooth animations

## Usage

### Import Individual Components
```tsx
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
```

### Import All Components
```tsx
import { Hero, Features, HowItWorks } from '@/components/home';
```

### Use in Page
```tsx
export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
```

## Customization

### Modify Content
Each component has content arrays/objects at the top of the file. Simply edit these to change text, add features, etc.

### Adjust Styling
All styling uses Tailwind classes. Modify classes directly in JSX for quick changes.

### Add Animations
When Framer Motion is added, target elements with `data-animation` attributes:
```tsx
const element = document.querySelector('[data-animation="slide-up"]');
// Add Framer Motion variants
```

## Performance Considerations

- All components are Server Components (default in Next.js 16)
- No client-side JavaScript unless needed
- Images should be added via Next.js Image component for optimization
- Gradients use CSS, not images, for better performance

## Accessibility

- Semantic HTML structure
- ARIA labels on icon-only buttons
- Sufficient color contrast with theme variables
- Keyboard navigation support
- Screen reader friendly

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- CSS Variables
- CSS Gradients
- Backdrop blur effects

## Next Steps

1. **Add Images**: Replace placeholder visuals with real product screenshots
2. **Add Framer Motion**: Implement animations using data-animation attributes
3. **Connect Forms**: Wire up newsletter and contact forms to backend
4. **Add Analytics**: Track user interactions
5. **Implement Dark Mode**: Already theme-aware, just add dark theme variants
6. **A/B Testing**: Test different CTA copy and layouts

## File Structure
```
components/home/
├── Hero.tsx           (9KB)  - Main banner
├── Features.tsx       (8KB)  - Feature grid
├── HowItWorks.tsx     (13KB) - Process flow
├── Pricing.tsx        (11KB) - Pricing tiers
├── Testimonials.tsx   (10KB) - Social proof
├── CTA.tsx            (10KB) - Final CTA
├── Footer.tsx         (11KB) - Site footer
├── index.ts           (1KB)  - Barrel exports
└── README.md          (this file)
```

## Technologies Used

- **Next.js 16** - React framework
- **React 19** - UI library
- **Tailwind CSS v4** - Styling
- **TypeScript** - Type safety
- **CSS Variables** - Theme system

## Contributing

When adding new components:
1. Follow the existing pattern of data-driven content
2. Use CSS variables for all colors
3. Add `data-animation` attributes for future animations
4. Ensure responsive design (mobile-first)
5. Keep components pure and reusable
6. Update this README with new components
