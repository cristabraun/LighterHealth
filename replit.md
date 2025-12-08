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