# Aether One

Aether One is an immersive product landing page for a premium wireless headphone concept. The experience combines a cinematic hero, scroll-linked storytelling, and an interactive 3D product stage tuned for desktop and mobile layouts.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Three.js with React Three Fiber and Drei

## Features

- Responsive product narrative built with reusable content sections
- Interactive finish selector shared across the page
- Scroll-linked 3D product presentation using a GLB model
- Motion system for reveals, transitions, and ambient background effects

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Project Structure

- `src/app` for app shell, metadata, and global styles
- `src/components/sections` for page sections
- `src/components/product` for the 3D product experience
- `src/components/ui` for shared UI primitives and motion helpers
- `public/models` for product model assets
