import HeroSection from '@/components/about/HeroSection';
import StatsSection from '@/components/about/StatsSection';
import ProblemSolutionSection from '@/components/about/ProblemSolutionSection';
import MissionSection from '@/components/about/MissionSection';
import ValuesSection from '@/components/about/ValuesSection';
import VisionSection from '@/components/about/VisionSection';
import StorySection from '@/components/about/StorySection';
import CTASection from '@/components/about/CTASection';

export default function About() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Empowering Content Creators"
        subtitle="About ConQ"
        description="We're on a mission to revolutionize how content creators, businesses, and social media managers schedule and publish their content across multiple platforms."
      />

      {/* Stats Section */}
      <StatsSection
        stats={[
          { value: "10", suffix: "K+", label: "Active Users" },
          { value: "100", suffix: "K+", label: "Posts Scheduled" },
          { value: "15", suffix: "+", label: "Platforms Supported" },
          { value: "99.9", suffix: "%", label: "Uptime" }
        ]}
      />

      {/* Problem & Solution */}
      <ProblemSolutionSection
        problem={{
          title: "The Challenge",
          description: "Content creators and businesses face constant pressure to maintain an active presence across multiple social media platforms, leading to significant challenges:",
          points: [
            "Manually posting content across different platforms is time-consuming and inefficient",
            "Inconsistent posting schedules lead to decreased engagement and follower growth",
            "Managing multiple accounts and remembering optimal posting times is overwhelming",
            "Lack of analytics makes it difficult to understand what content performs best",
            "Team collaboration on content becomes complicated without proper tools"
          ]
        }}
        solution={{
          title: "Our Solution",
          description: "ConQ simplifies content scheduling with an intelligent, user-friendly platform that puts you back in control:",
          points: [
            "Schedule posts across all your platforms from one unified dashboard",
            "Smart scheduling algorithms suggest optimal posting times for maximum engagement",
            "Intuitive calendar view lets you visualize and plan your content strategy",
            "Comprehensive analytics help you understand what resonates with your audience",
            "Team collaboration features streamline your workflow with approval processes"
          ]
        }}
      />

      {/* Mission Section */}
      <MissionSection
        title="Our Mission"
        description="We believe content creation should be about creativity and connection, not administrative burden. ConQ exists to free creators from the constraints of manual scheduling."
        items={[
          {
            icon: "🎯",
            title: "Simplify Scheduling",
            description: "Transform complex multi-platform posting into a streamlined, effortless process that saves hours every week."
          },
          {
            icon: "📈",
            title: "Maximize Reach",
            description: "Help creators reach their audience at the perfect moment with intelligent scheduling and analytics."
          },
          {
            icon: "🤝",
            title: "Enable Collaboration",
            description: "Build tools that make team collaboration seamless, from content creation to approval and publishing."
          },
          {
            icon: "🔒",
            title: "Ensure Security",
            description: "Protect your accounts and content with enterprise-grade security and reliable platform connections."
          },
          {
            icon: "💡",
            title: "Drive Innovation",
            description: "Continuously evolve our platform with cutting-edge features that anticipate creator needs."
          },
          {
            icon: "🌍",
            title: "Scale Globally",
            description: "Support creators worldwide with localized features and support for international audiences."
          }
        ]}
      />

      {/* Values Section */}
      <ValuesSection
        title="Our Core Values"
        subtitle="The principles that guide everything we do and every decision we make"
        values={[
          {
            icon: "🚀",
            title: "Creator First",
            description: "Every feature we build starts with understanding creator needs. We listen, iterate, and deliver solutions that genuinely solve real problems."
          },
          {
            icon: "✨",
            title: "Simplicity",
            description: "Powerful doesn't have to mean complicated. We believe in creating intuitive experiences that feel natural and effortless to use."
          },
          {
            icon: "🔄",
            title: "Reliability",
            description: "Your content schedule is critical to your success. We maintain 99.9% uptime and ensure your posts go live exactly when planned."
          },
          {
            icon: "🌱",
            title: "Continuous Growth",
            description: "We're committed to constant improvement, listening to feedback, and evolving our platform to meet changing creator needs."
          }
        ]}
      />

      {/* Story Section */}
      <StorySection
        title="Our Story"
        content={[
          "ConQ was born from a simple observation: content creators were spending more time managing posts than creating content. What started as a side project to help a small team of influencers quickly evolved into a full-fledged platform.",
          "Our founders, themselves content creators, understood the pain of juggling multiple social media accounts, remembering optimal posting times, and maintaining consistency. They envisioned a world where scheduling content would be as simple as writing it.",
          "Today, ConQ serves thousands of creators, from solo entrepreneurs to large marketing teams. We've helped schedule over 100,000 posts, saved countless hours, and enabled creators to focus on what they do best: creating amazing content."
        ]}
        milestones={[
          {
            year: "2024 Q1",
            title: "The Beginning",
            description: "ConQ was founded with a vision to simplify content scheduling for creators everywhere."
          },
          {
            year: "2024 Q2",
            title: "Beta Launch",
            description: "Released our beta version to 100 early adopters who helped shape the platform with invaluable feedback."
          },
          {
            year: "2024 Q3",
            title: "Public Launch",
            description: "Officially launched ConQ to the public with support for major social media platforms."
          },
          {
            year: "2024 Q4",
            title: "Rapid Growth",
            description: "Reached 10,000 active users and expanded our team to accelerate development."
          }
        ]}
      />

      {/* Vision Section */}
      <VisionSection
        title="Where We're Heading"
        description="We're just getting started. Our vision extends far beyond basic scheduling. Here's what we're building next:"
        visionPoints={[
          {
            icon: "🤖",
            title: "AI-Powered Insights",
            description: "Leverage artificial intelligence to provide personalized recommendations for content optimization, posting times, and audience engagement strategies."
          },
          {
            icon: "🎨",
            title: "Advanced Content Studio",
            description: "Built-in tools for creating and editing visual content, videos, and graphics without leaving the platform."
          },
          {
            icon: "📊",
            title: "Deep Analytics",
            description: "Comprehensive analytics dashboard with predictive insights, competitor analysis, and ROI tracking across all platforms."
          },
          {
            icon: "🔗",
            title: "Expanded Integrations",
            description: "Connect with more platforms, tools, and services to create a truly unified content management ecosystem."
          }
        ]}
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Content Strategy?"
        description="Join thousands of creators who have already simplified their content scheduling with ConQ. Start your free trial today and experience the difference."
        primaryButton={{
          text: "Get Started Free",
          href: "/signup"
        }}
        secondaryButton={{
          text: "Contact Sales",
          href: "/contact"
        }}
      />
    </main>
  );
}
