# Lighter™ - Native Mobile App

A fully native iOS/Android app for metabolic health tracking. Built with Expo SDK 53 and React Native.

## Overview

Lighter™ is a native mobile app (NOT a WebView wrapper) that helps users track metabolic health metrics, run guided experiments, and get AI coaching for nutrition and lifestyle optimization.

## Features

- **Daily Logging:** Track temperature, pulse, energy, sleep, digestion, stress, and mood
- **Experiments:** Run guided metabolic experiments (carrot salad, OJ before coffee, etc.)
- **AI Coach:** Ask questions about metabolic health (5 questions/day)
- **Food Logs:** Track meals and calories
- **Messages:** Send messages to support team

## App Structure

### Authentication Flow
- Login / Register screens
- Password reset
- Onboarding (name + symptoms selection)
- JWT Bearer token stored in expo-secure-store

### Main Tabs (5 tabs)

1. **Dashboard** - Overview with:
   - Today's metrics summary
   - Quick "Log Today" action
   - Active experiments
   - Recent logs
   - Quick links to Food Logs & Messages

2. **Logs** - Daily logs list grouped by month:
   - View all historical logs
   - Tap to edit
   - Create new logs

3. **Experiments** - Metabolic experiments:
   - View active experiments with progress
   - Browse available experiments
   - Start new experiments
   - View completed experiments

4. **AI Coach** - Chat interface:
   - Ask metabolic health questions
   - 5 questions per day limit
   - Suggested questions

5. **Settings**:
   - Account info
   - Contact support
   - Privacy Policy / Terms
   - Sign out
   - Delete account

### Stack Screens

- `/login` - Login screen
- `/register` - Registration screen
- `/forgot-password` - Password reset
- `/onboarding` - New user onboarding
- `/log-entry` - Create/edit daily log (modal)
- `/food-logs` - Food logs screen
- `/messages` - Messages screen
- `/experiment/[id]` - Experiment detail

## API Integration

### Base URL
- Production: `https://getlighterapp.com`

### Authentication
- `POST /api/auth/token` - Get JWT token (mobile-specific)
- `POST /api/auth/register` - Register new user
- `GET /api/auth/user` - Get current user
- `GET /api/logout` - Logout

### Endpoints Used
- `/api/logs` - Daily logs CRUD
- `/api/experiments` - Experiments CRUD
- `/api/food-logs` - Food logs CRUD
- `/api/messages` - Messages CRUD
- `/api/ask` - AI coach questions
- `/api/ai/limit` - AI usage limits

## Technical Stack

- **Framework:** Expo SDK 53, React Native 0.76.7
- **Routing:** Expo Router (file-based)
- **Styling:** NativeWind (TailwindCSS)
- **State:** React Query (server state) + Zustand (auth state)
- **Auth:** JWT tokens via expo-secure-store
- **Animations:** react-native-reanimated

## File Structure

```
src/
├── api/           # API client and typed endpoints
│   ├── types.ts   # TypeScript types for all API responses
│   ├── client.ts  # API client with Bearer auth
│   ├── auth.ts    # Auth API functions
│   ├── logs.ts    # Daily logs API
│   ├── experiments.ts
│   ├── foodLogs.ts
│   ├── messages.ts
│   └── ai.ts
├── stores/        # Zustand stores
│   └── authStore.ts
├── app/           # Expo Router screens
│   ├── _layout.tsx      # Root layout with auth gating
│   ├── login.tsx
│   ├── register.tsx
│   ├── forgot-password.tsx
│   ├── onboarding.tsx
│   ├── log-entry.tsx
│   └── (tabs)/
│       ├── _layout.tsx  # Tab navigator
│       ├── index.tsx    # Dashboard
│       ├── logs.tsx
│       ├── experiments.tsx
│       ├── coach.tsx
│       └── settings.tsx
├── components/    # Reusable components
└── lib/           # Utilities
```

## Branding

- **App Name:** Lighter™
- **Primary Color:** Orange (#f97316)
- **Support Email:** support@getlighterapp.com

## URLs

- **Privacy Policy:** https://getlighterapp.com/privacy
- **Terms of Service:** https://getlighterapp.com/terms

## Publishing

To submit to the App Store:
1. Click "Share" in the Vibecode app
2. Select "Submit to App Store"
3. Follow the guided submission flow
