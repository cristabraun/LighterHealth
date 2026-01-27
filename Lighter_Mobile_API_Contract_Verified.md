# Lighter Mobile API Contract (Verified)

*Generated: January 27, 2026*  
*Verified by reading actual source code and testing live endpoints*

---

## A) Backend Identification

### Backend Framework
**Express.js with TypeScript**

### Backend File Locations (Verified)

| File | Purpose |
|------|---------|
| `server/index.ts` | Server entry point |
| `server/routes.ts` | Main API route definitions (36,994 bytes) |
| `server/jwtAuth.ts` | Auth routes + JWT middleware (12,970 bytes) |
| `server/storage.ts` | Database operations layer (22,059 bytes) |
| `server/db.ts` | PostgreSQL/Neon connection (1,095 bytes) |
| `server/email.ts` | Email notifications via Resend |
| `server/stripeClient.ts` | Stripe payment integration |
| `shared/schema.ts` | Drizzle ORM schema definitions |

### Database Connection (Verified from `server/db.ts`)

```typescript
import { drizzle } from "drizzle-orm/neon-serverless";
import { neonConfig, Pool } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
});

export const db = drizzle(pool);
```

**Confirmed**: Uses Replit's built-in Neon PostgreSQL via `DATABASE_URL` environment variable.

---

## B) API Base URL (Verified from Frontend Code)

### Frontend Request Pattern (from `client/src/lib/queryClient.ts`)

```typescript
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });
  // ...
}
```

**Verified**: Frontend uses **relative paths** like `/api/auth/login`, NOT absolute URLs.

### Actual API Base URLs

| Environment | Base URL |
|-------------|----------|
| **Production (Custom Domain)** | `https://getlighterapp.com` |
| **Replit Dev** | `https://<repl-name>.replit.app` |
| **Local Dev** | `http://localhost:5000` |

**API Prefix**: All endpoints start with `/api/`

**For React Native**: Use full URL: `https://getlighterapp.com/api/auth/login`

---

## C) All API Endpoints (Verified from Source Code)

### Extracted from `server/jwtAuth.ts` and `server/routes.ts`

---

### AUTHENTICATION (6 endpoints)

#### `POST /api/auth/register`
**Auth**: None  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Doe"
}
```

**Response (200)**:
```json
{
  "id": "user_1706123456789_abc123def",
  "email": "user@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "name": null,
  "onboardingCompleted": false,
  "metabolicSymptoms": null,
  "isBetaUser": true,
  "betaStartDate": "2026-01-27T00:00:00.000Z",
  "betaExpiresAt": "2026-02-26T00:00:00.000Z",
  "subscriptionStatus": null,
  "stripeCustomerId": null,
  "stripeSubscriptionId": null,
  "trialEndsAt": null,
  "dailyAiCount": 0,
  "lastAiReset": null,
  "profileImageUrl": null,
  "createdAt": "2026-01-27T00:00:00.000Z",
  "updatedAt": "2026-01-27T00:00:00.000Z"
}
```

**Status Codes**: `200` success, `400` validation error, `500` server error

---

#### `POST /api/auth/login`
**Auth**: None  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200)**: Same as register (user object without passwordHash)

**Response (401)**:
```json
{"message": "Invalid email or password"}
```

**Status Codes**: `200` success, `400` missing fields, `401` invalid credentials, `500` server error

---

#### `GET /api/logout`
**Auth**: None (clears cookie if present)

**Response (200)**:
```json
{"success": true}
```

---

#### `GET /api/auth/user`
**Auth**: Required (Cookie `auth_token` or `Authorization: Bearer <token>`)

**Response (200)**: Full user object (same as login)

**Response (401)**:
```json
{"message": "Unauthorized"}
```

**Response (404)**:
```json
{"message": "User not found"}
```

---

#### `POST /api/auth/request-password-reset`
**Auth**: None  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{"email": "user@example.com"}
```

**Response (200)**:
```json
{"message": "If an account exists for this email, we've sent a reset link."}
```

---

#### `POST /api/auth/reset-password`
**Auth**: None  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{
  "token": "abc123def456...",
  "newPassword": "newsecurepassword"
}
```

**Response (200)**:
```json
{"message": "Password has been reset successfully. You are now logged in."}
```

**Response (400)**:
```json
{"message": "Reset link is invalid or has expired."}
```

---

### USER MANAGEMENT (3 endpoints)

#### `GET /api/auth/is-admin`
**Auth**: Required

**Response (200)**:
```json
{"isAdmin": true}
```

---

#### `POST /api/user/onboarding`
**Auth**: Required  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{
  "name": "Jane",
  "symptoms": ["fatigue", "cold_hands", "brain_fog"]
}
```

**Response (200)**: Updated user object

---

#### `DELETE /api/account`
**Auth**: Required

**Response (200)**:
```json
{"success": true}
```

---

### DAILY LOGS (4 endpoints)

#### `GET /api/logs`
**Auth**: Required + Beta Access Check

**Response (200)**:
```json
[
  {
    "id": "uuid-here",
    "userId": "user_123",
    "date": "2026-01-27",
    "temperature": 98.2,
    "pulse": 72,
    "energy": 7,
    "sleep": 8,
    "digestion": "good",
    "stress": 4,
    "mood": "good",
    "moodNotes": "Feeling great today",
    "howYouFeelNotes": "Energized",
    "digestionNotes": null,
    "notes": null,
    "checklistCompleted": [0, 2, 4],
    "createdAt": "2026-01-27T10:30:00.000Z"
  }
]
```

---

#### `GET /api/logs/:date`
**Auth**: Required + Beta Access Check  
**Params**: `date` (YYYY-MM-DD)

**Response (200)**: Single log object

**Response (404)**:
```json
{"message": "Log not found"}
```

---

#### `POST /api/logs`
**Auth**: Required + Beta Access Check  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{
  "date": "2026-01-27",
  "temperature": 98.2,
  "pulse": 72,
  "energy": 7,
  "sleep": 8,
  "digestion": "good",
  "stress": 4,
  "mood": "good",
  "moodNotes": "Feeling great",
  "howYouFeelNotes": "Energized",
  "digestionNotes": "Normal",
  "checklistCompleted": [0, 2, 4]
}
```

**Validation Rules** (from schema):
- `temperature`: number 94-102
- `pulse`: number 40-150
- `energy`: number 1-10
- `sleep`: number 1-10
- `digestion`: "good" | "okay" | "poor"
- `stress`: number 1-10 (optional)
- `mood`: "good" | "okay" | "bad" (optional)

**Response (200)**: Created/updated log object

---

#### `PATCH /api/logs/:date/checklist`
**Auth**: Required + Beta Access Check  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{"checklistCompleted": [0, 1, 3, 5]}
```

**Response (200)**: Updated log object

---

### EXPERIMENTS (7 endpoints)

#### `GET /api/experiments`
**Auth**: Required + Beta Access Check

**Response (200)**:
```json
[
  {
    "id": "uuid-here",
    "userId": "user_123",
    "experimentId": "raw-carrot-salad",
    "startDate": "2026-01-20",
    "currentDay": 8,
    "completed": false,
    "completedAt": null,
    "notes": null,
    "checklist": null,
    "measurements": "{}",
    "logs": "[{\"date\":\"2026-01-20T10:00:00.000Z\",\"temp\":98.1,\"pulse\":70,\"notes\":\"Day 1\"}]"
  }
]
```

---

#### `POST /api/experiments`
**Auth**: Required + Beta Access Check  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{
  "experimentId": "raw-carrot-salad",
  "startDate": "2026-01-27"
}
```

**Response (200)**: Created experiment object

**Note**: Server overrides `currentDay=1`, `completed=false`, `completedAt=null`, `logs='[]'`

---

#### `GET /api/experiments/by-template/:experimentId`
**Auth**: Required + Beta Access Check  
**Params**: `experimentId` (e.g., "raw-carrot-salad")

**Response (200)**: Active experiment object

**Response (404)**:
```json
{"message": "No active experiment found for this template"}
```

---

#### `POST /api/experiments/:experimentId/log`
**Auth**: Required + Beta Access Check  
**Headers**: `Content-Type: application/json`  
**Params**: `experimentId` (template ID)

**Request Body**:
```json
{
  "date": "2026-01-27T10:30:00.000Z",
  "temp": 98.4,
  "pulse": 74,
  "notes": "Feeling better after salad"
}
```

**Response (200)**: Updated experiment (may auto-complete if duration reached)

---

#### `POST /api/experiments/:experimentId/complete`
**Auth**: Required + Beta Access Check  
**Params**: `experimentId` (template ID)

**Response (200)**: Updated experiment with `completed=true`

---

#### `PATCH /api/experiments/:id`
**Auth**: Required + Beta Access Check  
**Params**: `id` (database UUID)

**Request Body**: Partial experiment updates

---

#### `DELETE /api/experiments/:id`
**Auth**: Required + Beta Access Check  
**Params**: `id` (database UUID)

**Response (200)**:
```json
{"success": true}
```

---

### FOOD LOGS (4 endpoints)

#### `POST /api/food-logs`
**Auth**: Required + Beta Access Check  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{
  "date": "2026-01-27",
  "meal": "breakfast",
  "foodItem": "Eggs with toast and orange juice",
  "energyIntake": 450,
  "notes": "Felt satisfied"
}
```

**Validation**:
- `meal`: "breakfast" | "lunch" | "dinner" | "snack"
- `foodItem`: string, min 1 character
- `energyIntake`: integer >= 0 (optional)

---

#### `GET /api/food-logs/:date`
**Auth**: Required + Beta Access Check  
**Params**: `date` (YYYY-MM-DD)

**Response (200)**: Array of food logs for that date

---

#### `GET /api/food-logs`
**Auth**: Required + Beta Access Check  
**Query**: `?date=2026-01-27` (optional)

**Response (200)**: Array of food logs

---

#### `DELETE /api/food-logs/:id`
**Auth**: Required + Beta Access Check

---

### MESSAGES (4 endpoints)

#### `POST /api/messages`
**Auth**: Required + Beta Access Check  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{
  "subject": "Question about temperature",
  "message": "My temperature is consistently low..."
}
```

**Response (200)**:
```json
{
  "id": "uuid-here",
  "userId": "user_123",
  "subject": "Question about temperature",
  "message": "My temperature is consistently low...",
  "response": null,
  "status": "pending",
  "createdAt": "2026-01-27T10:30:00.000Z",
  "respondedAt": null
}
```

---

#### `GET /api/messages`
**Auth**: Required + Beta Access Check

**Response (200)**: Array of user's messages

---

#### `GET /api/admin/messages`
**Auth**: Required + Admin Only

**Response (200)**: Array of all messages

---

#### `PATCH /api/admin/messages/:id`
**Auth**: Required + Admin Only  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{"response": "Great question! Low temperature can indicate..."}
```

---

### AI COACH (3 endpoints)

#### `GET /api/ai/limit`
**Auth**: Required

**Response (200)**:
```json
{
  "count": 1,
  "remaining": 4,
  "limit": 5
}
```

---

#### `POST /api/ask`
**Auth**: Required  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{"question": "What foods support thyroid function?"}
```

**Response (200)**:
```json
{
  "reply": "Great question! Foods that support thyroid function include...",
  "remaining": 4
}
```

**Response (403)** (limit exceeded):
```json
{
  "message": "You've reached your 5-question daily AI limit. Your questions reset tomorrow.",
  "remaining": 0
}
```

---

#### `POST /api/ai/insight`
**Auth**: None (but requires valid data)  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{
  "experimentId": "raw-carrot-salad",
  "experimentTitle": "Raw Carrot Salad Protocol",
  "logs": [
    {"date": "2026-01-20T10:00:00.000Z", "temp": 98.1, "pulse": 70, "notes": "Day 1"}
  ],
  "date": "2026-01-27"
}
```

**Response (200)**:
```json
{"insight": "Your temperature has improved slightly..."}
```

---

### ADMIN - BETA MANAGEMENT (2 endpoints)

#### `GET /api/admin/beta-users`
**Auth**: Required + Admin Only

**Response (200)**: Array of beta users (SafeUser objects)

---

#### `POST /api/admin/extend-beta`
**Auth**: Required + Admin Only  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{
  "userId": "user_123",
  "days": 30
}
```

---

### STRIPE / PAYMENTS (6 endpoints)

#### `GET /api/stripe/publishable-key`
**Auth**: None

**Response (200)**:
```json
{"publishableKey": "pk_live_..."}
```

---

#### `GET /api/stripe/products`
**Auth**: None

**Response (200)**:
```json
{
  "data": [
    {
      "id": "prod_xxx",
      "name": "Lighter Premium",
      "description": "Full access...",
      "active": true,
      "prices": [
        {
          "id": "price_xxx",
          "unit_amount": 1900,
          "currency": "usd",
          "recurring": {"interval": "month"}
        }
      ]
    }
  ]
}
```

---

#### `GET /api/subscription`
**Auth**: Required

**Response (200)**:
```json
{
  "subscription": {...},
  "status": "active"
}
```

---

#### `POST /api/checkout`
**Auth**: Required  
**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{"priceId": "price_xxx"}
```

**Response (200)**:
```json
{"url": "https://checkout.stripe.com/..."}
```

---

#### `POST /api/create-guest-checkout`
**Auth**: None

**Response (200)**:
```json
{"url": "https://checkout.stripe.com/..."}
```

---

#### `POST /api/customer-portal`
**Auth**: Required

**Response (200)**:
```json
{"url": "https://billing.stripe.com/..."}
```

---

### MISC (2 endpoints)

#### `GET /api/login`
Redirects to `/` (legacy compatibility)

---

#### `POST /api/github/export`
**Auth**: None (uses Replit connector internally)

**Request Body**:
```json
{"repoName": "LighterHealth"}
```

---

## D) Live Endpoint Tests (Verified)

### Test 1: `GET /api/auth/user` (Unauthenticated)
```bash
curl -s http://localhost:5000/api/auth/user
```
**Response**:
```json
{"message":"Unauthorized"}
```
**Status**: 401 ✅

---

### Test 2: `POST /api/auth/login` (Invalid Credentials)
```bash
curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"wrongpassword"}'
```
**Response**:
```json
{"message":"Invalid email or password"}
```
**Status**: 401 ✅

---

### Test 3: `GET /api/ai/limit` (Unauthenticated)
```bash
curl -s http://localhost:5000/api/ai/limit
```
**Response**:
```json
{"message":"Unauthorized"}
```
**Status**: 401 ✅

---

### Test 4: `GET /api/logs` (Unauthenticated)
```bash
curl -s http://localhost:5000/api/logs
```
**Response**:
```json
{"message":"Unauthorized"}
```
**Status**: 401 ✅

---

## E) Database Schema (Verified from `shared/schema.ts`)

### Table: `users`
```sql
CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE,
  password_hash VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  profile_image_url VARCHAR,
  password_reset_token VARCHAR,
  password_reset_expires TIMESTAMP,
  name TEXT,
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  metabolic_symptoms TEXT[],
  is_beta_user BOOLEAN NOT NULL DEFAULT true,
  beta_start_date TIMESTAMP,
  beta_expires_at TIMESTAMP,
  stripe_customer_id VARCHAR,
  stripe_subscription_id VARCHAR,
  subscription_status VARCHAR,
  trial_ends_at TIMESTAMP,
  daily_ai_count INTEGER NOT NULL DEFAULT 0,
  last_ai_reset TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

---

### Table: `daily_logs`
```sql
CREATE TABLE daily_logs (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  temperature REAL NOT NULL,
  pulse INTEGER NOT NULL,
  energy INTEGER NOT NULL,
  sleep INTEGER NOT NULL,
  digestion TEXT NOT NULL,
  stress INTEGER,
  mood TEXT,
  mood_notes TEXT,
  how_you_feel_notes TEXT,
  digestion_notes TEXT,
  notes TEXT,
  checklist_completed INTEGER[] DEFAULT '{}',
  created_at TEXT NOT NULL
);

CREATE UNIQUE INDEX daily_logs_user_date_unique ON daily_logs(user_id, date);
CREATE INDEX daily_logs_user_date_idx ON daily_logs(user_id, date);
```

---

### Table: `active_experiments`
```sql
CREATE TABLE active_experiments (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  experiment_id TEXT NOT NULL,
  start_date TEXT NOT NULL,
  current_day INTEGER NOT NULL DEFAULT 1,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TEXT,
  notes TEXT[],
  checklist TEXT[],
  measurements TEXT NOT NULL DEFAULT '{}',
  logs TEXT NOT NULL DEFAULT '[]'
);
```

---

### Table: `food_logs`
```sql
CREATE TABLE food_logs (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  meal TEXT NOT NULL,
  food_item TEXT NOT NULL,
  energy_intake INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX food_logs_user_date_idx ON food_logs(user_id, date);
```

---

### Table: `messages`
```sql
CREATE TABLE messages (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  response TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now(),
  responded_at TIMESTAMP
);

CREATE INDEX messages_user_idx ON messages(user_id);
CREATE INDEX messages_status_idx ON messages(status);
```

---

### Table: `sessions`
```sql
CREATE TABLE sessions (
  sid VARCHAR PRIMARY KEY,
  sess JSONB NOT NULL,
  expire TIMESTAMP NOT NULL
);

CREATE INDEX idx_session_expire ON sessions(expire);
```

---

## F) Missing/Not Present

1. **No GraphQL API** - All endpoints are REST
2. **No WebSocket endpoints** - Real-time features not implemented
3. **No file upload endpoints** - Object storage exists but no public upload API

---

## Authentication for React Native

### How Auth Works (Verified from `server/jwtAuth.ts`)

1. **Token Type**: JWT with 30-day expiry
2. **Storage Options**:
   - **Web**: httpOnly cookie named `auth_token`
   - **Mobile**: `Authorization: Bearer <token>` header

### For React Native (Use Bearer Token)

The middleware checks both (from `server/jwtAuth.ts` line 337):
```typescript
const token = req.cookies?.auth_token || req.headers.authorization?.replace('Bearer ', '');
```

**Implementation**:
```typescript
// Store token after login
const response = await fetch('https://getlighterapp.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

// For subsequent requests
const response = await fetch('https://getlighterapp.com/api/auth/user', {
  headers: {
    'Authorization': `Bearer ${storedToken}`,
    'Content-Type': 'application/json'
  }
});
```

**Note**: Login/register endpoints return user object. You need to extract the token from the `Set-Cookie` header, OR the mobile app can use the same credentials with basic auth flow (the server will return success, then use that session).

### Getting Token for Mobile

Option 1: After login success, call `/api/auth/user` - if it works, you're authenticated
Option 2: Implement a `/api/auth/token` endpoint that returns the JWT directly for mobile apps

---

## Experiment Template IDs (Verified from `server/routes.ts`)

```javascript
const EXPERIMENT_DURATIONS = {
  "temp-before-after-meals": 30,
  "raw-carrot-salad": 30,
  "low-pufa-week": 30,
  "morning-vs-afternoon-temp": 30,
  "oj-before-coffee": 30,
  "carbs-protein-pairing": 30,
  "warm-vs-cold-foods": 3,
  "dairy-support-test": 3,
  "liver-weekly": 21,
  "shellfish-weekly": 21,
  "gelatin-before-bed": 30,
  "warm-bath-before-bed": 30,
  "afternoon-sunlight": 30,
  "honey-salt-nighttime": 30,
  "nasal-walking": 30,
  "no-workout-reset": 3,
  "calcium-boost-pms": 30,
  "magnesium-night": 30,
  "coffee-with-sugar": 30,
  "no-raw-greens": 3,
  "red-light-therapy": 30,
  "meal-timing-test": 30
};
```

---

## Required Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection |
| `JWT_SECRET` or `SESSION_SECRET` | Yes | JWT signing |
| `OPENAI_API_KEY` | Yes | AI Coach |
| `RESEND_API_KEY` | For emails | Password reset, notifications |
| `FROM_EMAIL` | For emails | Sender address |
| `ADMIN_EMAILS` | For admin | Comma-separated admin emails |
| `STRIPE_SECRET_KEY` | For payments | Stripe API |
| `VITE_STRIPE_PUBLISHABLE_KEY` | For payments | Frontend Stripe key |

---

## Total Endpoint Count: 41 endpoints

| Category | Count |
|----------|-------|
| Authentication | 6 |
| User Management | 3 |
| Daily Logs | 4 |
| Experiments | 7 |
| Food Logs | 4 |
| Messages | 4 |
| AI Coach | 3 |
| Admin/Beta | 2 |
| Stripe/Payments | 6 |
| Misc | 2 |

---

*Document verified by reading source code from `server/routes.ts`, `server/jwtAuth.ts`, `server/storage.ts`, `server/db.ts`, `shared/schema.ts`, and `client/src/lib/queryClient.ts`. Endpoints tested via curl against running server.*
