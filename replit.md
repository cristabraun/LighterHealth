# Lighter - Pro-Metabolic Health Tracking App

## Overview

Lighter is a React-based health tracking application designed to help women heal their metabolism through daily vital tracking, personalized experiments, and progress visualization. The app focuses on tracking energy, temperature, and pulse as primary metabolic indicators, while running structured experiments (like the 7-Day Carrot Salad or Daily Orange Juice Protocol) to identify what makes each user feel "lighter" - emotionally, energetically, and physically.

The application emphasizes a warm, encouraging design approach inspired by wellness apps like Calm and Headspace, combined with clear data visualization. It is explicitly NOT a diet app - weight loss is positioned as a side effect of metabolic healing.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (December 7, 2025)

**Major Update: Authentication System Refactor for Vercel Deployment**
- Replaced Replit Auth with custom JWT-based authentication for Vercel compatibility
- Added email/password registration and login flows
- Implemented JWT token storage in httpOnly cookies for security
- Created new auth page (client/src/pages/auth.tsx) with login/register forms
- Added passwordHash field to users table for secure password storage
- Created centralized `toSafeUser()` helper to strip sensitive fields from API responses
- Security: All user-returning API endpoints now properly sanitize data
- Added Vercel configuration (vercel.json) with proper rewrites and build settings
- Updated Stripe client to work with both Replit connectors and direct environment variables

## Recent Changes (November 23, 2025)

**Latest Updates: "My Metabolism" Dashboard Redesign**
- Renamed Progress page to "My Metabolism" with warm, feminine branding
- Built comprehensive dashboard with 8 sections:
  1. Header with sparkles icon and gentle subtitle
  2. Today's Overview - 3 cards showing current temp, pulse, sleep with trend indicators
  3. Active Experiments - shows running experiments with progress bars
  4. Food Log Summary - today's meals grouped by type
  5. 7-Day Trends - charts for temp, pulse, energy, sleep with warm gradients
  6. Weekly Highlights - summary stats and averages
  7. Encouragement Card - gentle reminder with supportive messaging
  8. Empty state - welcomes new users with CTA to start tracking
- Fixed data handling bugs: logs sorted by date, NaN prevention, conditional rendering
- All sections render conditionally based on available data
- Maintains warm coral/orange color scheme throughout

**Previous Updates: Food Logging & Temperature Tracking**
- Added complete food logging system with database schema (foodLogs table)
- Integrated food logging UI into Track page (breakfast/lunch/dinner/snack selection)
- Added numerical input fields for temperature tracking experiments
- Temperature experiments now capture actual temp/pulse readings (e.g., 97.2°F, 65 bpm)
- Measurements stored in JSONB format in activeExperiments table
- Implemented add/delete functionality with optimistic UI updates
- Fixed data-fetching strategy using consistent query keys for efficient caching

**Premium Pricing & Direct Messaging**
- Updated landing page to $19/month premium positioning
- Added value comparison section (streaming services vs health coaching)
- Implemented direct messaging feature for user questions
- Built admin dashboard for responding to messages
- Added admin authorization with ADMIN_EMAILS environment variable

**Learn Page & Track Page Fixes**
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
- JWT-based authentication with httpOnly cookies (for Vercel compatibility)
- Email/password registration and login
- Centralized `toSafeUser()` helper strips passwordHash from all API responses
- Automatic user creation on registration
- Fallback to Replit Auth in development environment

**Data Storage**:
- PostgreSQL database (Neon) with DatabaseStorage class
- Drizzle ORM for type-safe database operations
- Database schema defined in shared/schema.ts with full TypeScript types

**Database Schema** (PostgreSQL via Drizzle):
- `sessions` table: Express session storage (required for auth)
- `users` table: User profiles with Replit Auth fields (email, name, profile image) + app-specific fields (onboarding status, metabolic symptoms)
- `dailyLogs` table: Daily tracking data with userId foreign key (temperature, pulse, energy, sleep, digestion, notes) + unique index on (user_id, date) for upsert
- `activeExperiments` table: User's running experiments with userId foreign key (progress tracking, completion status, daily checklists)
- `messages` table: User questions/messages with userId foreign key (subject, message, response, status, timestamps)
- `foodLogs` table: Food tracking data with userId foreign key (date, meal type, food item, notes, timestamps) + index on (user_id, date)

**API Endpoints** (all protected with `isAuthenticated` middleware):
- `GET /api/auth/user` - Get current user profile
- `GET /api/auth/is-admin` - Check if current user has admin access
- `POST /api/user/onboarding` - Complete onboarding (set name and symptoms)
- `GET /api/logs` - Get all daily logs for user
- `GET /api/logs/:date` - Get specific daily log
- `POST /api/logs` - Create new daily log
- `GET /api/experiments` - Get all active experiments for user
- `POST /api/experiments` - Create new active experiment
- `PATCH /api/experiments/:id` - Update active experiment
- `DELETE /api/experiments/:id` - Delete active experiment
- `POST /api/messages` - User sends a question
- `GET /api/messages` - Get user's messages
- `GET /api/admin/messages` - Get all messages (admin only)
- `PATCH /api/admin/messages/:id` - Respond to message (admin only)
- `GET /api/food-logs?date=YYYY-MM-DD` - Get food logs for specific date (optional filter)
- `POST /api/food-logs` - Create new food log entry
- `DELETE /api/food-logs/:id` - Delete food log entry

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

- `/` (unauthenticated) - Landing page with $19/month pricing, value comparisons, and feature highlights
- `/` (authenticated, onboarding incomplete) - Onboarding flow (3 steps: welcome, name entry, symptom assessment)
- `/` (authenticated, onboarding complete) - Home dashboard with today's vitals, active experiments, recommendations, "Today's Food" preview, and "Ask a Question" card
- `/learn` - Educational library page explaining metabolic health concepts (temperature, pulse, energy, nutrition, stress, experiments)
- `/track` - Daily logging form for temperature, pulse, energy, sleep, digestion, and food intake
- `/experiments` - Library of experiment templates and active experiment management with numerical tracking
- `/progress` - **"My Metabolism" Dashboard** - Comprehensive overview with today's vitals, active experiments, food summary, 7-day trends charts, weekly highlights, and encouragement
- `/messages` - User messaging interface to ask questions and view responses
- `/admin/messages` - Admin dashboard to view and respond to user messages (requires ADMIN_EMAILS)
- `/api/login` - Initiates Replit Auth login flow
- `/api/logout` - Logs out and redirects to landing page

### Mobile-First Navigation

Bottom tab bar navigation with 5 primary sections (Home, Learn, Track, Experiments, **My Metabolism**), fixed to viewport bottom with backdrop blur effect. The "My Metabolism" tab (formerly "Progress") provides a warm, feminine dashboard experience with comprehensive metabolic insights. The Learn tab provides educational context about metabolic health. Messaging is accessible via "Ask a Question" card on Home page.

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