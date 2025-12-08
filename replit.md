# Lighter™ - Pro-Metabolic Health Tracking App

### Overview
Lighter™ is a React-based health tracking application aimed at helping women improve their metabolism. It focuses on tracking key metabolic indicators (energy, temperature, pulse), running personalized experiments (e.g., 7-Day Carrot Salad Protocol), and visualizing progress. The app is designed to help users identify what makes them feel "lighter" emotionally, energetically, and physically, emphasizing metabolic healing over weight loss. It features a warm, encouraging design inspired by wellness apps like Calm and Headspace. The current iteration operates as a FREE 30-DAY BETA.

### User Preferences
Preferred communication style: Simple, everyday language.

### System Architecture

#### Frontend Architecture
- **Framework**: React with TypeScript, Vite.
- **Routing**: Wouter.
- **State Management**: PostgreSQL (persistent data), React hooks (component state), TanStack Query (server state).
- **UI Component Library**: Shadcn/ui built on Radix UI primitives, styled with Tailwind CSS.
- **Design System**: Mobile-first responsive design, custom coral/orange color scheme, Inter/DM Sans fonts, consistent spacing, rounded corners, gradient accents.

#### Backend Architecture
- **Server Framework**: Express.js with TypeScript.
- **Authentication**: JWT-based authentication with httpOnly cookies, email/password registration/login, `toSafeUser()` helper for data sanitization. Fallback to Replit Auth in development.
- **Data Storage**: PostgreSQL (Neon) with Drizzle ORM for type-safe operations.
- **Database Schema**: Includes `users`, `dailyLogs`, `activeExperiments`, `messages`, and `foodLogs` tables with `userId` foreign keys for data isolation.
- **API Endpoints**: RESTful API endpoints for user management, daily logs, experiments, messaging, and food logs, all protected by `isAuthenticated` middleware.
- **Data Visualization**: Recharts for line charts and progress tracking, canvas-confetti for completion animations.

#### Page Structure
- **Core Pages**: Landing page, Onboarding flow, Home dashboard, Learn (educational content), Track (daily logging), Experiments, My Metabolism (comprehensive dashboard), Messages, Admin/Messages.
- **Navigation**: Mobile-first bottom tab bar with 5 primary sections: Home, Learn, Track, Experiments, My Metabolism.

### External Dependencies

#### UI Framework & Components
- **React 18**
- **Vite**
- **Wouter**
- **Tailwind CSS**
- **Shadcn/ui**
- **Radix UI**
- **Lucide React**

#### Data & State Management
- **TanStack Query (React Query)**
- **Drizzle ORM**
- **Drizzle Zod**
- **Zod**

#### Database
- **@neondatabase/serverless**
- **PostgreSQL**
- **connect-pg-simple**

#### Backend
- **Express.js**
- **tsx**

#### Visualization & UX
- **Recharts**
- **canvas-confetti**
- **date-fns**

#### Form Handling
- **React Hook Form**
- **@hookform/resolvers**

#### Development Tools
- **TypeScript**
- **ESBuild**
- **PostCSS**

### Data Flow Wiring (Verified December 2025)

#### Track → Database → Dashboard Flow
- **Track Page** (`client/src/pages/track.tsx`): Submits daily logs via POST `/api/logs` including: temperature, pulse, energy, sleep, digestion, stress, mood, moodNotes, howYouFeelNotes, digestionNotes, checklistCompleted
- **Storage** (`server/storage.ts`): `createDailyLog()` uses upsert pattern with `onConflictDoUpdate` on `[userId, date]` - includes all fields
- **Dashboard** (`client/src/pages/dashboard.tsx`): Fetches via `useQuery` to `/api/logs` and `/api/experiments`

#### Authentication Flow
- **Auth**: JWT-based with 30-day sliding session in httpOnly cookies
- **Login/Register**: POST `/api/auth/login`, POST `/api/auth/register`
- **Password Reset**: POST `/api/auth/request-password-reset`, POST `/api/auth/reset-password`
- **Session Refresh**: Automatic token refresh on each authenticated request

#### Messaging Flow
- **User Messages**: POST `/api/messages` creates message, GET `/api/messages` fetches user's messages
- **Admin Messages**: GET `/api/admin/messages`, PATCH `/api/admin/messages/:id` (requires ADMIN_EMAILS env var)
- **Admin Check**: GET `/api/auth/is-admin` verifies user email against ADMIN_EMAILS

### Required Environment Variables for Deployment

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | Neon PostgreSQL connection string | Yes |
| SESSION_SECRET / JWT_SECRET | JWT signing secret | Yes |
| OPENAI_API_KEY | For AI coach features | Yes |
| STRIPE_SECRET_KEY | Stripe API secret key | Yes (if using Stripe) |
| VITE_STRIPE_PUBLISHABLE_KEY | Stripe publishable key (frontend) | Yes (if using Stripe) |
| ADMIN_EMAILS | Comma-separated admin email addresses | Yes (for admin access) |
| REPLIT_DOMAINS | Auto-set on Replit for password reset URLs | Auto |

### Recent Bug Fixes (December 2025)
- Fixed Dashboard loading experiments from localStorage instead of API
- Fixed storage upsert missing stress/mood/moodNotes/checklistCompleted fields on update