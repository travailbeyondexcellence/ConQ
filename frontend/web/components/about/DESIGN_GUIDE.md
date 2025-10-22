# About Page Design Guide

## Visual Hierarchy

The About page follows a strategic content flow designed to engage visitors and guide them through ConQ's story:

```
┌─────────────────────────────────────────┐
│         1. HERO SECTION                 │
│   Large title, badge, description       │
│   Gradient background with blur effects │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         2. STATS SECTION                │
│   4 key metrics in highlighted cards    │
│   Gradient text for numbers             │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│    3. PROBLEM / SOLUTION SECTION        │
│   Side-by-side comparison               │
│   Red (problems) vs Green (solutions)   │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         4. MISSION SECTION              │
│   3-column grid of mission items        │
│   Icons with hover effects              │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         5. VALUES SECTION               │
│   2-column grid of core values          │
│   Large cards with gradients            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         6. STORY SECTION                │
│   Company history paragraphs            │
│   Timeline with milestones              │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         7. VISION SECTION               │
│   Future roadmap items                  │
│   Gradient background                   │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         8. CTA SECTION                  │
│   Call-to-action with buttons           │
│   Trust indicators                      │
└─────────────────────────────────────────┘
```

## Color Palette Strategy

### Primary Theme Colors
All components adapt to the active theme using CSS variables:

```
Background Layers:
├── Primary background (--background)
├── Card backgrounds (--card)
└── Muted backgrounds (--muted)

Text Hierarchy:
├── Primary text (--foreground)
├── Card text (--card-foreground)
└── Muted text (--muted-foreground)

Accent Colors:
├── Primary (--primary) - Main actions
├── Secondary (--secondary) - Supporting
├── Accent (--accent) - Highlights
├── Success (--success) - Positive indicators
└── Destructive (--destructive) - Negative indicators
```

### Visual Patterns

**Gradients**:
- Background overlays: `from-primary/5 via-transparent to-accent/5`
- Text highlights: `from-primary via-accent to-secondary`
- Card hovers: `from-primary/20 to-accent/20`

**Opacity Levels**:
- Backgrounds: `/5` to `/20` (very subtle)
- Hover states: `/30` to `/50` (noticeable)
- Borders: `/20` to `/40` (visible but soft)

## Responsive Breakpoints

### Mobile (< 640px)
```
- Single column layouts
- Smaller text sizes
- Reduced padding (py-16 vs py-20)
- Stacked cards
- Full-width buttons
```

### Tablet (640px - 1024px)
```
- 2-column grids where applicable
- Medium text sizes
- Standard padding
- Side-by-side cards
- Flexible button layouts
```

### Desktop (≥ 1024px)
```
- 3-column grids (Mission, Team)
- 4-column stats
- Large text sizes
- Maximum padding (py-28)
- Horizontal layouts
```

## Component Interaction Patterns

### Hover Effects
```css
Cards:
- Border: muted → primary/50
- Shadow: none → lg with primary tint
- Transform: none → -translate-y-1
- Duration: 300ms

Buttons:
- Scale: 1 → 1.05
- Shadow: none → lg
- Background: primary → primary/90
- Duration: 300ms

Icons:
- Scale: 1 → 1.1
- Rotation: 0 → varies
- Duration: 300ms
```

### Animation Sequence (Future)
```
1. Hero fades in first
2. Stats appear with stagger (100ms each)
3. Sections slide up as user scrolls
4. Cards scale in with delays
5. Timeline items slide from left
```

## Spacing System

### Vertical Rhythm
```
Section Padding:
- Mobile: py-16 (64px)
- Desktop: py-20 to py-28 (80-112px)

Section Margins:
- Between sections: handled by padding
- Component margins: mb-6, mb-8, mb-16

Content Spacing:
- Title to description: mb-6
- Description to content: mb-10 to mb-16
- Between cards: gap-6 to gap-8
```

### Horizontal Spacing
```
Container:
- Max width: 6xl (1152px) or 4xl (896px)
- Padding: px-4 (16px mobile)

Cards:
- Internal: p-6 to p-8 (24-32px)
- Gaps: gap-6 to gap-8 (24-32px)

Grid Gaps:
- Mobile: gap-6 (24px)
- Desktop: gap-8 to gap-12 (32-48px)
```

## Typography Scale

### Headings
```
Hero (H1):
- Mobile: text-4xl (36px)
- Tablet: text-5xl (48px)
- Desktop: text-6xl to text-7xl (60-72px)
- Weight: font-bold (700)

Section (H2):
- Mobile: text-3xl (30px)
- Tablet: text-4xl (36px)
- Desktop: text-5xl (48px)
- Weight: font-bold (700)

Card (H3):
- Mobile: text-xl (20px)
- Desktop: text-2xl (24px)
- Weight: font-semibold to font-bold (600-700)
```

### Body Text
```
Large:
- text-lg to text-xl (18-20px)
- Use for descriptions, introductions

Regular:
- text-base to text-lg (16-18px)
- Use for card content, paragraphs

Small:
- text-sm (14px)
- Use for captions, badges, labels
```

## Border & Radius Guidelines

### Border Radius
```
Extra Large:
- rounded-3xl (24px) - CTA sections, hero cards

Large:
- rounded-2xl (16px) - Standard cards, sections

Medium:
- rounded-xl (12px) - Buttons, icons, badges

Small:
- rounded-lg (8px) - Small elements

Circle:
- rounded-full - Dots, avatars, pills
```

### Border Widths
```
Standard:
- border (1px) - Default cards

Emphasized:
- border-2 (2px) - Interactive elements, CTA

None:
- border-0 - Backgrounds, containers
```

## Shadow System

### Elevation Levels
```
None:
- Default cards at rest

Small:
- shadow-sm - Subtle depth

Medium:
- shadow-lg - Hover states, focused cards

Large:
- shadow-xl - Emphasized sections, modals

Colored:
- shadow-primary/10 - Brand-colored shadows
- shadow-primary/30 - Interactive elements
```

## Decorative Elements

### Background Blurs
```html
<!-- Subtle decoration -->
<div class="absolute w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

<!-- Prominent decoration -->
<div class="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
```

### Gradient Overlays
```html
<!-- Section background -->
<div class="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />

<!-- Card hover effect -->
<div class="bg-gradient-to-br from-primary/0 to-accent/0
            group-hover:from-primary/5 group-hover:to-accent/5" />
```

### Visual Separators
```html
<!-- Vertical line -->
<div class="w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />

<!-- Horizontal line -->
<div class="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
```

## Icon Usage

### Emoji Icons
Used throughout for visual interest and quick recognition:
- Mission: 🎯 📈 🤝 🔒 💡 🌍
- Values: 🚀 ✨ 🔄 🌱
- Vision: 🤖 🎨 📊 🔗
- Status: ✅ ❌ ✓ !

### Guidelines
1. Use emojis that are universally recognized
2. Ensure they're relevant to the content
3. Add `role="img"` and `aria-label` for accessibility
4. Maintain consistent sizing (text-2xl to text-4xl)

## Content Guidelines

### Writing Style
- Clear, concise, action-oriented
- Focus on benefits, not features
- Use active voice
- Maintain consistent tone

### Length Recommendations
```
Hero description: 1-2 sentences (20-40 words)
Section descriptions: 2-3 sentences (30-60 words)
Card descriptions: 2-4 sentences (20-50 words)
Timeline items: 1-2 sentences (15-30 words)
```

### CTA Text
- Primary: Action-oriented ("Get Started", "Try Now")
- Secondary: Supportive ("Learn More", "Contact Us")
- Keep under 3 words when possible

## Accessibility Checklist

- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Alt text for images (when added)
- [ ] Color contrast meets WCAA AA
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Semantic HTML elements
- [ ] ARIA labels for icons
- [ ] Responsive text sizing

## Performance Optimization

### Images (Future)
```tsx
// Use next/image for avatars, team photos
import Image from 'next/image';

<Image
  src="/team/member.jpg"
  alt="Team member name"
  width={400}
  height={400}
  className="rounded-xl"
/>
```

### Lazy Loading
- All sections are static (pre-rendered)
- No client-side data fetching
- Images can be lazy loaded with next/image

### Bundle Size
- Pure CSS (Tailwind utilities)
- No additional dependencies
- Tree-shakeable components
- Minimal JavaScript

## Testing Checklist

### Visual Testing
- [ ] Test with all 12 themes
- [ ] Check mobile layout (< 640px)
- [ ] Check tablet layout (640-1024px)
- [ ] Check desktop layout (≥ 1024px)
- [ ] Verify hover states
- [ ] Check focus states

### Content Testing
- [ ] All links point to correct routes
- [ ] All images load (when added)
- [ ] Text is readable on all themes
- [ ] No content overflow
- [ ] Proper line breaks

### Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari
- [ ] Chrome Android

## Maintenance

### Updating Content
1. Edit props in `/app/about/page.tsx`
2. No need to touch component files
3. Build and test

### Adding Components
1. Create new component in this directory
2. Follow existing patterns
3. Add to `index.ts`
4. Update README.md

### Theme Changes
- Components automatically adapt
- No changes needed in component files
- Test new themes with existing content

## Future Enhancements

### Phase 1 (Current)
- ✅ Static components with Tailwind
- ✅ Responsive layouts
- ✅ Theme-aware styling
- ✅ Animation-ready structure

### Phase 2 (Next)
- [ ] Framer Motion animations
- [ ] Intersection Observer for scroll triggers
- [ ] Staggered entrance animations
- [ ] Parallax effects

### Phase 3 (Future)
- [ ] Team member images
- [ ] Video backgrounds
- [ ] Interactive charts
- [ ] Dynamic content loading

## Support

For questions or issues with these components:
1. Check component TypeScript interfaces
2. Review this design guide
3. Test with different themes
4. Verify responsive breakpoints
5. Check browser console for errors
