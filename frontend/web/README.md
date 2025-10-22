# Conq Web Application

This is the web frontend for Conq, built with Next.js 16, React 19, and Bun.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Apollo Client** - GraphQL client
- **Bun** - Package manager and runtime

## Getting Started

### Prerequisites

- Bun installed (https://bun.sh)
- Backend API Gateway running on port 8080

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
bun run build
```

### Production

```bash
bun run start
```

## Project Structure

```
frontend/web/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   ├── content/           # Content management pages
│   ├── calendar/          # Calendar view
│   ├── analytics/         # Analytics pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utilities and configs
│   └── apollo-client.ts  # Apollo GraphQL client
├── public/               # Static assets
└── next.config.ts        # Next.js configuration
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```bash
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8080/graphql
```

## Features

- Server-side rendering (SSR)
- GraphQL integration with Apollo Client
- Responsive design with Tailwind CSS
- TypeScript for type safety
- ESLint for code quality

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
