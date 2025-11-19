# Lighter - Pro-Metabolic Health Tracking App

## Overview

Lighter is a React-based health tracking application designed to help women heal their metabolism through daily vital tracking, personalized experiments, and progress visualization. The app focuses on tracking energy, temperature, and pulse as primary metabolic indicators, while running structured experiments (like the 7-Day Carrot Salad or Daily Orange Juice Protocol) to identify what makes each user feel "lighter" - emotionally, energetically, and physically.

The application emphasizes a warm, encouraging design approach inspired by wellness apps like Calm and Headspace, combined with clear data visualization. It is explicitly NOT a diet app - weight loss is positioned as a side effect of metabolic healing.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (November 19, 2025)

**Latest Updates: Learn Page & Track Page Fixes**
- Added new Learn/Library page with comprehensive metabolic health education
- Fixed track page error (undefined loading variable)
- Added unique constraint to dailyLogs table for proper upsert functionality
- Updated bottom navigation to include Learn tab (now 5 tabs total)

**Major Update: Multi-User Database Migration**
- Migrated from localStorage to PostgreSQL database with Replit Auth
- Implemented user authentication system (login/logout)
- Added user accounts with cross-device data sync
- Created comprehensive API routes for CRUD operations
- Database tables now include userId foreign keys for data isolation

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter (lightweight alternative to React Router).

**Authentication**: Replit Auth (OpenID Connect) with auto-login redirects.

**State Management**: 
- PostgreSQL database for persistent data storage
- React hooks for component-level state
- TanStack Query for server state management and API integration

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
- Full authentication middleware with session management
- Protected API routes with user isolation
- RESTful API endpoints with Zod validation
- Middleware for JSON parsing and request logging
- Development server with Vite integration for HMR

**Authentication System**:
- Replit Auth via OpenID Connect (passport.js)
- PostgreSQL session storage (connect-pg-simple)
- Token refresh handling for long-lived sessions
- Automatic user upsert on login

**Data Storage**:
- PostgreSQL database (Neon) with DatabaseStorage class
- Drizzle ORM for type-safe database operations
- Database schema defined in shared/schema.ts with full TypeScript types

**Database Schema** (PostgreSQL via Drizzle):
- `sessions` table: Express session storage (required for auth)
- `users` table: User profiles with Replit Auth fields (email, name, profile image) + app-specific fields (onboarding status, metabolic symptoms)
- `dailyLogs` table: Daily tracking data with userId foreign key (temperature, pulse, energy, sleep, digestion, notes) + unique index on (user_id, date) for upsert
- `activeExperiments` table: User's running experiments with userId foreign key (progress tracking, completion status, daily checklists)

**API Endpoints** (all protected with `isAuthenticated` middleware):
- `GET /api/auth/user` - Get current user profile
- `POST /api/user/onboarding` - Complete onboarding (set name and symptoms)
- `GET /api/logs` - Get all daily logs for user
- `GET /api/logs/:date` - Get specific daily log
- `POST /api/logs` - Create new daily log
- `GET /api/experiments` - Get all active experiments for user
- `POST /api/experiments` - Create new active experiment
- `PATCH /api/experiments/:id` - Update active experiment
- `DELETE /api/experiments/:id` - Delete active experiment

### Data Visualization

**Charting Library**: Recharts
- Line charts for 30-day temperature/pulse/energy trends
- Gradient fills and coral stroke colors matching design system
- Responsive containers for mobile-first display

**Progress Tracking**:
- Trend indicators (up/down/same arrows)
- Average calculations for key metrics
- Visual progress bars for active experiments

### Data Persistence Strategy

The application uses PostgreSQL database for all persistent data:
- User accounts with authentication via Replit Auth
- Daily logs stored per-user with date indexing
- Active experiments tracked per-user with progress state
- All data accessible across devices after login
- Data isolation ensures users only see their own data

### Page Structure

- `/` (unauthenticated) - Landing page with feature highlights and login button
- `/` (authenticated, onboarding incomplete) - Onboarding flow (3 steps: welcome, name entry, symptom assessment)
- `/` (authenticated, onboarding complete) - Home dashboard with today's vitals, active experiments, and smart recommendations
- `/learn` - Educational library page explaining metabolic health concepts (temperature, pulse, energy, nutrition, stress, experiments)
- `/track` - Daily logging form for temperature, pulse, energy, sleep, and digestion
- `/experiments` - Library of experiment templates and active experiment management
- `/progress` - Charts and trends visualization with 30-day history
- `/api/login` - Initiates Replit Auth login flow
- `/api/logout` - Logs out and redirects to landing page

### Mobile-First Navigation

Bottom tab bar navigation with 5 primary sections (Home, Learn, Track, Experiments, Progress), fixed to viewport bottom with backdrop blur effect. The Learn tab was added to provide users with educational context about metabolic health before they begin tracking.

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