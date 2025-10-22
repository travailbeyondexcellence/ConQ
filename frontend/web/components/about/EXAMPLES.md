# Component Usage Examples

Real-world examples showing how to use the About page components in different scenarios.

## Quick Start

### Minimal About Page
For a simple About page with just the essentials:

```tsx
import { HeroSection, MissionSection, CTASection } from '@/components/about';

export default function About() {
  return (
    <main className="min-h-screen">
      <HeroSection
        title="About Our Company"
        subtitle="Who We Are"
        description="A brief overview of your company mission."
      />

      <MissionSection
        title="What We Do"
        description="Our core focus areas"
        items={[
          {
            icon: "🎯",
            title: "Focus 1",
            description: "What you do..."
          }
        ]}
      />

      <CTASection
        title="Get In Touch"
        description="Ready to learn more?"
        primaryButton={{ text: "Contact Us", href: "/contact" }}
      />
    </main>
  );
}
```

### Full About Page
Complete example with all sections (current implementation):

```tsx
// See /app/about/page.tsx for the full implementation
```

## Component Variations

### HeroSection Variations

#### Short & Punchy
```tsx
<HeroSection
  title="We Build Better Tools"
  subtitle="About Us"
  description="Helping creators succeed with powerful, simple scheduling tools."
/>
```

#### Detailed & Descriptive
```tsx
<HeroSection
  title="Revolutionizing Content Management"
  subtitle="Our Mission"
  description="We're building the world's most intuitive content scheduling platform, designed specifically for modern creators who want to focus on creating, not managing."
/>
```

### StatsSection Variations

#### Simple Numbers
```tsx
<StatsSection
  stats={[
    { value: "500", suffix: "+", label: "Customers" },
    { value: "50", suffix: "K+", label: "Posts" }
  ]}
/>
```

#### With Title & Percentages
```tsx
<StatsSection
  title="Our Impact"
  stats={[
    { value: "99.9", suffix: "%", label: "Uptime" },
    { value: "4.9", suffix: "/5", label: "User Rating" },
    { value: "50", prefix: "<", label: "Min Setup" },
    { value: "24", suffix: "/7", label: "Support" }
  ]}
/>
```

#### Currency Values
```tsx
<StatsSection
  stats={[
    { prefix: "$", value: "2M", suffix: "+", label: "Saved in Time" },
    { prefix: "$", value: "99", label: "Starting Price" }
  ]}
/>
```

### MissionSection Variations

#### Tech Company
```tsx
<MissionSection
  title="Our Mission"
  description="Building the future of work"
  items={[
    {
      icon: "💻",
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technology"
    },
    {
      icon: "🚀",
      title: "Scale",
      description: "Growing businesses from startup to enterprise"
    },
    {
      icon: "🔐",
      title: "Security",
      description: "Enterprise-grade protection for your data"
    }
  ]}
/>
```

#### Service Company
```tsx
<MissionSection
  title="How We Help"
  description="Comprehensive solutions for your business"
  items={[
    {
      icon: "🎯",
      title: "Strategy",
      description: "Custom strategies tailored to your goals"
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Data-driven insights for better decisions"
    },
    {
      icon: "🤝",
      title: "Support",
      description: "24/7 dedicated customer success team"
    }
  ]}
/>
```

### ValuesSection Variations

#### Startup Values
```tsx
<ValuesSection
  title="What We Believe"
  subtitle="Our core principles"
  values={[
    {
      icon: "⚡",
      title: "Move Fast",
      description: "Ship quickly, iterate constantly, and learn from every release."
    },
    {
      icon: "🌟",
      title: "User Obsessed",
      description: "Every decision starts with the user and ends with their success."
    }
  ]}
/>
```

#### Corporate Values
```tsx
<ValuesSection
  title="Our Values"
  subtitle="The foundation of everything we do"
  values={[
    {
      icon: "🏆",
      title: "Excellence",
      description: "We hold ourselves to the highest standards in everything we deliver."
    },
    {
      icon: "🤝",
      title: "Integrity",
      description: "Transparency and honesty guide all our business relationships."
    },
    {
      icon: "🌍",
      title: "Sustainability",
      description: "Building for the long term with environmental responsibility."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Embracing new ideas and technologies to stay ahead."
    }
  ]}
/>
```

### StorySection Variations

#### Short History
```tsx
<StorySection
  title="Our Journey"
  content={[
    "Founded in 2024, we set out to solve a problem we experienced firsthand.",
    "What started as a weekend project has grown into a platform serving thousands."
  ]}
/>
```

#### Detailed with Timeline
```tsx
<StorySection
  title="How We Got Here"
  content={[
    "Our story begins with a simple observation...",
    "After months of development...",
    "Today, we're proud to serve..."
  ]}
  milestones={[
    {
      year: "2022",
      title: "The Idea",
      description: "Concept developed during a hackathon"
    },
    {
      year: "2023",
      title: "First Product",
      description: "MVP launched with 10 beta users"
    },
    {
      year: "2024",
      title: "Growth Phase",
      description: "Scaled to 10,000+ active users"
    },
    {
      year: "2025",
      title: "Series A",
      description: "Raised funding to accelerate expansion"
    }
  ]}
/>
```

### TeamSection Variations

#### Small Team
```tsx
<TeamSection
  title="Meet the Team"
  description="The people behind the product"
  members={[
    {
      name: "Jane Doe",
      role: "Founder & CEO",
      bio: "Former engineer with 10 years in SaaS"
    },
    {
      name: "John Smith",
      role: "CTO",
      bio: "Built scalable systems at major tech companies"
    }
  ]}
/>
```

#### Large Team with Avatars
```tsx
<TeamSection
  title="Our Leadership"
  description="Meet the team driving our vision"
  members={[
    {
      name: "Sarah Johnson",
      role: "CEO",
      bio: "20+ years leading tech companies",
      avatar: "/team/sarah.jpg"
    },
    {
      name: "Mike Chen",
      role: "CTO",
      bio: "Former Google engineer, ML expert",
      avatar: "/team/mike.jpg"
    },
    {
      name: "Emily Davis",
      role: "Head of Design",
      bio: "Award-winning UX designer",
      avatar: "/team/emily.jpg"
    }
  ]}
/>
```

### VisionSection Variations

#### Near-Term Roadmap
```tsx
<VisionSection
  title="What's Next"
  description="Features coming in 2025"
  visionPoints={[
    {
      icon: "📱",
      title: "Mobile Apps",
      description: "Native iOS and Android apps for on-the-go scheduling"
    },
    {
      icon: "🔗",
      title: "More Integrations",
      description: "Connect with 20+ new platforms and tools"
    }
  ]}
/>
```

#### Long-Term Vision
```tsx
<VisionSection
  title="Our Vision for the Future"
  description="Building the next generation of content tools"
  visionPoints={[
    {
      icon: "🤖",
      title: "AI Assistant",
      description: "Your personal AI content strategist that learns your style"
    },
    {
      icon: "🌐",
      title: "Global Platform",
      description: "Supporting creators in 100+ countries with local features"
    },
    {
      icon: "🎬",
      title: "Video Studio",
      description: "Professional video editing and scheduling in one place"
    },
    {
      icon: "📈",
      title: "Predictive Analytics",
      description: "AI-powered forecasting for content performance"
    }
  ]}
/>
```

### CTASection Variations

#### Single Button
```tsx
<CTASection
  title="Ready to Start?"
  description="Join thousands of happy users today"
  primaryButton={{
    text: "Sign Up Free",
    href: "/signup"
  }}
/>
```

#### Two Buttons
```tsx
<CTASection
  title="Let's Talk"
  description="See how we can help your business grow"
  primaryButton={{
    text: "Schedule Demo",
    href: "/demo"
  }}
  secondaryButton={{
    text: "View Pricing",
    href: "/pricing"
  }}
/>
```

#### Sales-Focused
```tsx
<CTASection
  title="Ready to Transform Your Workflow?"
  description="Join over 10,000 companies already using our platform to save time and increase productivity."
  primaryButton={{
    text: "Start Free Trial",
    href: "/trial"
  }}
  secondaryButton={{
    text: "Talk to Sales",
    href: "/contact-sales"
  }}
/>
```

### ProblemSolutionSection Variations

#### B2B SaaS
```tsx
<ProblemSolutionSection
  problem={{
    title: "Business Challenges",
    description: "Modern businesses face complex operational issues",
    points: [
      "Manual processes waste valuable time",
      "Data scattered across multiple tools",
      "Difficult to track team performance"
    ]
  }}
  solution={{
    title: "Our Platform",
    description: "A unified solution for modern teams",
    points: [
      "Automate repetitive tasks",
      "Centralize all your data",
      "Real-time performance dashboards"
    ]
  }}
/>
```

#### Consumer App
```tsx
<ProblemSolutionSection
  problem={{
    title: "Common Frustrations",
    description: "Users struggle with existing solutions",
    points: [
      "Too complicated to learn",
      "Expensive subscription costs",
      "Poor mobile experience"
    ]
  }}
  solution={{
    title: "Why Choose Us",
    description: "We built something better",
    points: [
      "Simple and intuitive design",
      "Affordable for everyone",
      "Beautiful mobile app"
    ]
  }}
/>
```

## Layout Combinations

### Minimal Page (3 sections)
```
Hero → Mission → CTA
```

### Standard Page (5 sections)
```
Hero → Stats → Mission → Values → CTA
```

### Comprehensive Page (8 sections - Current)
```
Hero → Stats → Problem/Solution → Mission → Values → Story → Vision → CTA
```

### Sales-Focused Page
```
Hero → Stats → Problem/Solution → Values → CTA
```

### Brand-Focused Page
```
Hero → Story → Values → Team → Vision → CTA
```

## Content Strategies

### Startup (< 1 year)
Focus on vision and mission:
- HeroSection: Big vision
- MissionSection: What you're building
- VisionSection: Where you're going
- CTASection: Join early

### Growing Company (1-3 years)
Add social proof and team:
- HeroSection: Impact statement
- StatsSection: Early metrics
- MissionSection: What you do
- TeamSection: Meet the team
- CTASection: Try the product

### Established Company (3+ years)
Full story with history:
- HeroSection: Market position
- StatsSection: Impressive numbers
- StorySection: Complete history
- ValuesSection: Core beliefs
- TeamSection: Leadership
- VisionSection: Future plans
- CTASection: Multiple CTAs

## Industry Examples

### SaaS Product
```tsx
<HeroSection title="Cloud-Based Solutions" />
<StatsSection stats={[...customers, uptime, integrations]} />
<ProblemSolutionSection {...inefficiency vs automation} />
<MissionSection items={[...features]} />
<CTASection primaryButton="Start Free Trial" />
```

### Agency/Services
```tsx
<HeroSection title="Expert Services" />
<StatsSection stats={[...projects, clients, years]} />
<ValuesSection values={[...approach, quality]} />
<TeamSection members={[...experts]} />
<CTASection primaryButton="Schedule Consultation" />
```

### Nonprofit
```tsx
<HeroSection title="Our Cause" />
<StatsSection stats={[...impact, beneficiaries]} />
<StorySection content={[...founding story]} />
<MissionSection items={[...programs]} />
<CTASection primaryButton="Donate Now" secondaryButton="Volunteer" />
```

### E-commerce
```tsx
<HeroSection title="Our Brand Story" />
<StorySection content={[...how it started]} />
<ValuesSection values={[...quality, sustainability]} />
<CTASection primaryButton="Shop Now" />
```

## Responsive Behavior

### Mobile Optimization
```tsx
// These automatically adjust on mobile:
// - Single column layouts
// - Larger touch targets
// - Stacked buttons
// - Reduced padding
// - Smaller text
```

### Tablet Optimization
```tsx
// Balanced between mobile and desktop:
// - 2-column grids
// - Medium text sizes
// - Flexible layouts
```

### Desktop Optimization
```tsx
// Maximum visual impact:
// - 3-4 column grids
// - Large text
// - Generous spacing
// - Horizontal layouts
```

## Accessibility Examples

### Proper Heading Structure
```tsx
// Page has proper h1 → h2 → h3 hierarchy
<h1>About ConQ</h1>              {/* HeroSection */}
  <h2>By the Numbers</h2>         {/* StatsSection */}
  <h2>Our Mission</h2>            {/* MissionSection */}
    <h3>Mission Item</h3>         {/* Individual items */}
```

### Semantic HTML
```tsx
// Each section uses <section> tag
// Each component has proper structure
// Interactive elements are keyboard accessible
```

## Performance Tips

### Lazy Loading Images
```tsx
// When adding team photos:
import Image from 'next/image';

<TeamSection
  members={[
    {
      name: "John Doe",
      avatar: "/team/john.jpg", // Auto-optimized
      // ... other props
    }
  ]}
/>
```

### Code Splitting
```tsx
// Components are already optimized
// Import only what you need:
import { HeroSection, CTASection } from '@/components/about';
// Tree-shaking removes unused components
```

## Testing Scenarios

### Theme Testing
```tsx
// Test with different themes to ensure readability
// Switch between light and dark themes
// Verify color contrast
```

### Content Length Testing
```tsx
// Test with:
// - Very short text
// - Very long text
// - Different numbers of items
// - Missing optional props
```

### Browser Testing
```tsx
// Check in:
// - Chrome (desktop)
// - Safari (desktop + mobile)
// - Firefox
// - Edge
// - Chrome Android
```

## Common Mistakes to Avoid

1. **Too Much Content**: Keep sections focused and concise
2. **Missing CTAs**: Always guide users to next action
3. **Poor Contrast**: Ensure text is readable on all themes
4. **Broken Links**: Update href values before deploying
5. **No Mobile Testing**: Always check responsive layouts
6. **Inconsistent Tone**: Maintain consistent voice throughout
7. **Generic Content**: Customize all placeholder text
8. **Missing Alt Text**: Add descriptions for images (when using)
9. **Skipping Headings**: Maintain proper heading hierarchy
10. **Ignoring Performance**: Optimize images before adding

## Next Steps

1. Customize content in `/app/about/page.tsx`
2. Test with all 12 themes
3. Verify responsive layouts
4. Update all href links
5. Replace placeholder content
6. Add team photos (optional)
7. Test accessibility
8. Deploy and monitor performance

## Need More Help?

- Check README.md for component documentation
- Review DESIGN_GUIDE.md for visual guidelines
- See component TypeScript interfaces for prop types
- Test with different content variations
