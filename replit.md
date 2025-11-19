# Lighter - Pro-Metabolic Health Tracking App

## Overview

Lighter is a React-based health tracking application designed to help women heal their metabolism through daily vital tracking, personalized experiments, and progress visualization. The app focuses on tracking energy, temperature, and pulse as primary metabolic indicators, while running structured experiments (like the 7-Day Carrot Salad or Daily Orange Juice Protocol) to identify what makes each user feel "lighter" - emotionally, energetically, and physically.

The application emphasizes a warm, encouraging design approach inspired by wellness apps like Calm and Headspace, combined with clear data visualization. It is explicitly NOT a diet app - weight loss is positioned as a side effect of metabolic healing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter (lightweight alternative to React Router).

**State Management**: 
- Local storage for data persistence (user profile, daily logs, active experiments)
- React hooks for component-level state
- TanStack Query for future API integration (queryClient configured but not actively used)

**UI Component Library**: Shadcn/ui with Radix UI primitives
- Customized with "new-york" style variant
- Tailwind CSS for styling with custom design tokens
- Component aliases configured for clean imports (@/components, @/lib, etc.)

**Design System**:
- Mobile-first responsive design
- Custom color scheme with coral/orange primary colors (--primary: 14 88% 55%)
- Typography using Inter/DM Sans from Google Fonts
- Consistent spacing primitives (2, 4, 6, 8, 12, 16)
- Rounded corners (rounded-xl, rounded-2xl) for soft, approachable feel
- Gradient accents for CTAs and active states

### Backend Architecture

**Server Framework**: Express.js with TypeScript
- Minimal server setup currently in place
- Routes registered but not yet implemented
- Middleware for JSON parsing and request logging
- Development server with Vite integration for HMR

**Data Storage**:
- Currently using in-memory storage (MemStorage class)
- Interface-based storage design (IStorage) allowing easy swap to database
- Drizzle ORM configured for PostgreSQL (ready but not actively used)
- Database schema defined in shared/schema.ts

**Database Schema** (PostgreSQL via Drizzle):
- `users` table: User profiles with onboarding completion status and metabolic symptoms
- `dailyLogs` table: Daily tracking data (temperature, pulse, energy, sleep, digestion, notes)
- `activeExperiments` table: User's running experiments with progress tracking
- `experimentNotes` table: Daily observations for each active experiment

**API Design**: RESTful endpoints (planned, routes defined but not implemented)
- All routes prefixed with /api
- CRUD operations abstracted through storage interface

### Data Visualization

**Charting Library**: Recharts
- Line charts for 30-day temperature/pulse/energy trends
- Gradient fills and coral stroke colors matching design system
- Responsive containers for mobile-first display

**Progress Tracking**:
- Trend indicators (up/down/same arrows)
- Average calculations for key metrics
- Visual progress bars for active experiments

### Local Storage Strategy

The application currently relies entirely on browser localStorage for data persistence:
- `lighter_onboarding_completed`: Boolean flag for onboarding state
- `lighter_user`: User profile object (name, symptoms)
- `lighter_daily_logs`: Array of all daily log entries
- `lighter_active_experiments`: Array of currently running experiments

This approach allows for rapid prototyping and offline functionality, with the architecture ready to migrate to API-based persistence when needed.

### Page Structure

- `/` - Home dashboard with today's vitals, active experiments, and smart recommendations
- `/track` - Daily logging form for temperature, pulse, energy, sleep, and digestion
- `/experiments` - Library of experiment templates and active experiment management
- `/progress` - Charts and trends visualization with 30-day history

### Mobile-First Navigation

Bottom tab bar navigation with 4 primary sections (Home, Track, Experiments, Progress), fixed to viewport bottom with backdrop blur effect.

## External Dependencies

### UI Framework & Components
- **React 18** - Core UI library
- **Vite** - Build tool and dev server
- **Wouter** - Lightweight client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Component library built on Radix UI primitives
- **Radix UI** - Unstyled accessible component primitives (dialogs, popovers, tabs, etc.)
- **Lucide React** - Icon library

### Data & State Management
- **TanStack Query (React Query)** - Server state management (configured for future API use)
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
- **Drizzle Zod** - Zod schema generation from Drizzle schemas
- **Zod** - TypeScript-first schema validation

### Database
- **@neondatabase/serverless** - PostgreSQL client for serverless environments
- **PostgreSQL** - Relational database (configured via Drizzle, not yet actively used)
- **connect-pg-simple** - PostgreSQL session store for Express (dependency present)

### Backend
- **Express.js** - Web server framework
- **tsx** - TypeScript execution for Node.js

### Visualization & UX
- **Recharts** - React charting library for data visualization
- **canvas-confetti** - Celebration animations for completed experiments
- **date-fns** - Date manipulation and formatting

### Form Handling
- **React Hook Form** - Form state management (dependency present)
- **@hookform/resolvers** - Validation resolver for React Hook Form

### Development Tools
- **TypeScript** - Type safety
- **ESBuild** - JavaScript bundler for production builds
- **PostCSS** - CSS processing with Autoprefixer

### Design Tokens
Custom CSS variables defined in index.css for colors, spacing, shadows, and typography to maintain design consistency across the application.