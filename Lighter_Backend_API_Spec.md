# Lighter Backend API Spec (for Vibecode / React Native)

*Generated: January 2026*

---

## 1. Backend Framework Identification

| Property | Value |
|----------|-------|
| **Framework** | Express.js with TypeScript |
| **Server Location** | `server/` directory |
| **Main Entry** | `server/index.ts` |
| **Routes Definition** | `server/routes.ts` |
| **Auth Implementation** | `server/jwtAuth.ts` |
| **Storage Layer** | `server/storage.ts` |
| **Database Connection** | `server/db.ts` |

---

## 2. Database Layer

### Confirmation
- **Database**: Replit's built-in Neon PostgreSQL
- **ORM**: Drizzle ORM (`drizzle-orm/neon-serverless`)
- **Schema Location**: `shared/schema.ts`

### Database Connection Code (`server/db.ts`)
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

### Required Environment Variables
| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `JWT_SECRET` / `SESSION_SECRET` | JWT signing secret |
| `OPENAI_API_KEY` | AI Coach functionality |
| `RESEND_API_KEY` | Email notifications (Resend) |
| `FROM_EMAIL` | Sender email address |
| `ADMIN_EMAILS` | Comma-separated admin email addresses |
| `STRIPE_SECRET_KEY` | Stripe payments (optional) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe frontend key (optional) |

---

## 3. API Base URLs

| Environment | Base URL |
|-------------|----------|
| **Production** | `https://getlighterapp.com/api` |
| **Replit Dev** | `https://<repl-name>.replit.app/api` |
| **Local Dev** | `http://localhost:5000/api` |

> The API is served from the same domain as the web app. All endpoints are prefixed with `/api`.

---

## 4. API Endpoints

### Authentication Endpoints

#### `POST /api/auth/register`
**Purpose**: Create new user account  
**Auth Required**: No

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "firstName": "Jane",      // optional
  "lastName": "Doe"         // optional
}
```

**Response** (200):
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
  "createdAt": "2026-01-27T00:00:00.000Z"
}
```

**Errors**:
- `400`: Missing email/password, invalid email format, password < 6 chars, email already exists
- `500`: Database/server error

**Note**: Sets `auth_token` httpOnly cookie (30-day expiry)

---

#### `POST /api/auth/login`
**Purpose**: Authenticate existing user  
**Auth Required**: No

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response** (200): Same as register response

**Errors**:
- `400`: Missing email/password
- `401`: Invalid credentials
- `500`: Server error

---

#### `GET /api/logout`
**Purpose**: Clear authentication session  
**Auth Required**: No (clears cookie if present)

**Response** (200):
```json
{ "success": true }
```

---

#### `POST /api/auth/request-password-reset`
**Purpose**: Request password reset email  
**Auth Required**: No

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response** (200):
```json
{ "message": "If an account exists for this email, we've sent a reset link." }
```

---

#### `POST /api/auth/reset-password`
**Purpose**: Reset password with token  
**Auth Required**: No

**Request Body**:
```json
{
  "token": "abc123def456...",
  "newPassword": "newsecurepassword"
}
```

**Response** (200):
```json
{ "message": "Password has been reset successfully. You are now logged in." }
```

**Errors**:
- `400`: Missing token/password, password < 6 chars, invalid/expired token
- `500`: Server error

---

#### `GET /api/auth/user`
**Purpose**: Get current authenticated user  
**Auth Required**: Yes (cookie or Bearer token)

**Response** (200): Full user object (same as login response)

**Errors**:
- `401`: Unauthorized
- `404`: User not found
- `500`: Server error

---

#### `GET /api/auth/is-admin`
**Purpose**: Check if current user is admin  
**Auth Required**: Yes

**Response** (200):
```json
{ "isAdmin": true }
```

---

### User Management

#### `POST /api/user/onboarding`
**Purpose**: Complete user onboarding  
**Auth Required**: Yes

**Request Body**:
```json
{
  "name": "Jane",
  "symptoms": ["fatigue", "cold_hands", "brain_fog"]
}
```

**Response** (200): Updated user object

**Errors**:
- `400`: Missing/invalid name
- `404`: User not found
- `500`: Server error

---

#### `DELETE /api/account`
**Purpose**: Delete user account and all associated data  
**Auth Required**: Yes

**Response** (200):
```json
{ "success": true }
```

**Errors**:
- `404`: Account not found
- `500`: Server error

---

### Daily Logs

#### `GET /api/logs`
**Purpose**: Get all daily logs for user  
**Auth Required**: Yes (+ beta access check)

**Response** (200):
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
    "howYouFeelNotes": "Energized after breakfast",
    "digestionNotes": null,
    "notes": null,
    "checklistCompleted": [0, 2, 4],
    "createdAt": "2026-01-27T10:30:00.000Z"
  }
]
```

---

#### `GET /api/logs/:date`
**Purpose**: Get log for specific date  
**Auth Required**: Yes

**Params**: `date` (YYYY-MM-DD format)

**Response** (200): Single log object

**Errors**:
- `404`: Log not found

---

#### `POST /api/logs`
**Purpose**: Create or update daily log (upsert by date)  
**Auth Required**: Yes

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

**Validation**:
- `temperature`: number, 94-102
- `pulse`: number, 40-150
- `energy`: number, 1-10
- `sleep`: number, 1-10
- `digestion`: enum ["good", "okay", "poor"]
- `stress`: number 1-10 (optional)
- `mood`: enum ["good", "okay", "bad"] (optional)

**Response** (200): Created/updated log object

---

#### `PATCH /api/logs/:date/checklist`
**Purpose**: Update checklist items for a date  
**Auth Required**: Yes

**Request Body**:
```json
{
  "checklistCompleted": [0, 1, 3, 5]
}
```

**Response** (200): Updated log object

---

### Experiments

#### `GET /api/experiments`
**Purpose**: Get all experiments for user  
**Auth Required**: Yes

**Response** (200):
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
    "logs": "[{\"date\":\"2026-01-20T...\",\"temp\":98.1,\"pulse\":70,\"notes\":\"Day 1\"}]"
  }
]
```

---

#### `POST /api/experiments`
**Purpose**: Start a new experiment  
**Auth Required**: Yes

**Request Body**:
```json
{
  "experimentId": "raw-carrot-salad",
  "startDate": "2026-01-27"
}
```

**Response** (200): Created experiment object

**Note**: Server overrides `currentDay=1`, `completed=false`, `logs='[]'`

---

#### `GET /api/experiments/by-template/:experimentId`
**Purpose**: Get active experiment by template ID  
**Auth Required**: Yes

**Params**: `experimentId` (e.g., "raw-carrot-salad")

**Response** (200): Experiment object

**Errors**:
- `404`: No active experiment found

---

#### `POST /api/experiments/:experimentId/log`
**Purpose**: Add log entry to experiment  
**Auth Required**: Yes

**Request Body**:
```json
{
  "date": "2026-01-27T10:30:00.000Z",
  "temp": 98.4,
  "pulse": 74,
  "notes": "Feeling better after salad"
}
```

**Response** (200): Updated experiment object (may auto-complete if duration reached)

---

#### `POST /api/experiments/:experimentId/complete`
**Purpose**: Manually complete an experiment  
**Auth Required**: Yes

**Response** (200): Updated experiment object with `completed=true`

---

#### `PATCH /api/experiments/:id`
**Purpose**: Update experiment by database ID  
**Auth Required**: Yes

**Request Body**: Partial experiment updates

---

#### `DELETE /api/experiments/:id`
**Purpose**: Delete experiment  
**Auth Required**: Yes

**Response** (200):
```json
{ "success": true }
```

---

### Food Logs

#### `POST /api/food-logs`
**Purpose**: Create food log entry  
**Auth Required**: Yes

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
- `meal`: enum ["breakfast", "lunch", "dinner", "snack"]
- `foodItem`: string, min 1 char
- `energyIntake`: integer >= 0 (optional)

---

#### `GET /api/food-logs/:date`
**Purpose**: Get food logs for specific date  
**Auth Required**: Yes

---

#### `GET /api/food-logs`
**Purpose**: Get all food logs (optional date query param)  
**Auth Required**: Yes

**Query Params**: `?date=2026-01-27` (optional)

---

#### `DELETE /api/food-logs/:id`
**Purpose**: Delete food log entry  
**Auth Required**: Yes

---

### Messages (Support System)

#### `POST /api/messages`
**Purpose**: Send message to coach/admin  
**Auth Required**: Yes

**Request Body**:
```json
{
  "subject": "Question about temperature",
  "message": "My temperature is consistently low..."
}
```

**Response** (200):
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
**Purpose**: Get user's messages  
**Auth Required**: Yes

---

#### `GET /api/admin/messages`
**Purpose**: Get all messages (admin only)  
**Auth Required**: Yes + Admin

---

#### `PATCH /api/admin/messages/:id`
**Purpose**: Respond to message  
**Auth Required**: Yes + Admin

**Request Body**:
```json
{
  "response": "Great question! Low temperature can indicate..."
}
```

---

### AI Coach

#### `POST /api/ask`
**Purpose**: Ask AI Coach a question  
**Auth Required**: Yes

**Request Body**:
```json
{
  "question": "What foods support thyroid function?"
}
```

**Response** (200):
```json
{
  "response": "Great question! Foods that support thyroid function include...",
  "remaining": 4
}
```

**Errors**:
- `403`: Daily limit (5 questions) exceeded

---

#### `GET /api/ai/limit`
**Purpose**: Get AI usage status  
**Auth Required**: Yes

**Response** (200):
```json
{
  "count": 1,
  "remaining": 4,
  "limit": 5
}
```

---

### Admin - Beta Management

#### `GET /api/admin/beta-users`
**Purpose**: Get all beta users  
**Auth Required**: Yes + Admin

---

#### `POST /api/admin/extend-beta`
**Purpose**: Extend user's beta period  
**Auth Required**: Yes + Admin

**Request Body**:
```json
{
  "userId": "user_123",
  "days": 30
}
```

---

## 5. Authentication Details

| Property | Value |
|----------|-------|
| **Method** | JWT (JSON Web Tokens) |
| **Token Storage** | httpOnly cookie (`auth_token`) |
| **Token Expiry** | 30 days (sliding session) |
| **Alternative** | `Authorization: Bearer <token>` header |

### JWT Payload Structure
```typescript
interface JWTPayload {
  sub: string;        // User ID
  email: string;      // User email
  firstName?: string; // Optional
  lastName?: string;  // Optional
  iat: number;        // Issued at
  exp: number;        // Expiry
}
```

### Auth Implementation Files
- `server/jwtAuth.ts` - JWT generation, verification, middleware
- `server/storage.ts` - Password hashing (bcrypt), user lookup

### For React Native
Use `Authorization: Bearer <token>` header since cookies don't work in mobile apps:
```typescript
const response = await fetch('https://getlighterapp.com/api/auth/user', {
  headers: {
    'Authorization': `Bearer ${storedToken}`,
    'Content-Type': 'application/json'
  }
});
```

Store the token in secure storage (e.g., `expo-secure-store`).

---

## 6. Database Schema (PostgreSQL)

### Table: `users`
| Column | Type | Notes |
|--------|------|-------|
| `id` | varchar | PK, UUID |
| `email` | varchar | Unique |
| `password_hash` | varchar | bcrypt hash |
| `first_name` | varchar | |
| `last_name` | varchar | |
| `profile_image_url` | varchar | |
| `name` | text | Display name (from onboarding) |
| `onboarding_completed` | boolean | Default: false |
| `metabolic_symptoms` | text[] | Array of symptom strings |
| `is_beta_user` | boolean | Default: true |
| `beta_start_date` | timestamp | |
| `beta_expires_at` | timestamp | 30 days from signup |
| `stripe_customer_id` | varchar | |
| `stripe_subscription_id` | varchar | |
| `subscription_status` | varchar | active, trialing, canceled, past_due |
| `trial_ends_at` | timestamp | |
| `daily_ai_count` | integer | Default: 0 |
| `last_ai_reset` | text | YYYY-MM-DD |
| `password_reset_token` | varchar | SHA256 hash |
| `password_reset_expires` | timestamp | |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

---

### Table: `daily_logs`
| Column | Type | Notes |
|--------|------|-------|
| `id` | varchar | PK, UUID |
| `user_id` | varchar | FK → users.id (CASCADE) |
| `date` | text | YYYY-MM-DD |
| `temperature` | real | °F, 94-102 |
| `pulse` | integer | bpm, 40-150 |
| `energy` | integer | 1-10 |
| `sleep` | integer | 1-10 |
| `digestion` | text | good, okay, poor |
| `stress` | integer | 1-10 |
| `mood` | text | good, okay, bad |
| `mood_notes` | text | |
| `how_you_feel_notes` | text | |
| `digestion_notes` | text | |
| `notes` | text | |
| `checklist_completed` | integer[] | Array of indices |
| `created_at` | text | ISO timestamp |

**Indexes**: `(user_id, date)` unique

---

### Table: `active_experiments`
| Column | Type | Notes |
|--------|------|-------|
| `id` | varchar | PK, UUID |
| `user_id` | varchar | FK → users.id (CASCADE) |
| `experiment_id` | text | Template ID (e.g., "raw-carrot-salad") |
| `start_date` | text | YYYY-MM-DD |
| `current_day` | integer | Default: 1 |
| `completed` | boolean | Default: false |
| `completed_at` | text | ISO timestamp |
| `notes` | text[] | |
| `checklist` | text[] | |
| `measurements` | text | JSON object |
| `logs` | text | JSON array of log entries |

---

### Table: `food_logs`
| Column | Type | Notes |
|--------|------|-------|
| `id` | varchar | PK, UUID |
| `user_id` | varchar | FK → users.id (CASCADE) |
| `date` | text | YYYY-MM-DD |
| `meal` | text | breakfast, lunch, dinner, snack |
| `food_item` | text | Description |
| `energy_intake` | integer | Calories (optional) |
| `notes` | text | |
| `created_at` | timestamp | |

---

### Table: `messages`
| Column | Type | Notes |
|--------|------|-------|
| `id` | varchar | PK, UUID |
| `user_id` | varchar | FK → users.id (CASCADE) |
| `subject` | text | |
| `message` | text | |
| `response` | text | Admin response |
| `status` | text | pending, answered |
| `created_at` | timestamp | |
| `responded_at` | timestamp | |

---

### Table: `sessions`
| Column | Type | Notes |
|--------|------|-------|
| `sid` | varchar | PK |
| `sess` | jsonb | Session data |
| `expire` | timestamp | |

---

### Example Data (Fake)

**users**:
```
id: "user_1706123456789_abc123"
email: "jane@example.com"
name: "Jane"
onboarding_completed: true
metabolic_symptoms: ["fatigue", "cold_hands"]
is_beta_user: true
beta_expires_at: "2026-02-26T00:00:00.000Z"
```

**daily_logs**:
```
id: "log_uuid_1"
user_id: "user_1706123456789_abc123"
date: "2026-01-27"
temperature: 98.2
pulse: 72
energy: 7
sleep: 8
digestion: "good"
mood: "good"
```

**active_experiments**:
```
id: "exp_uuid_1"
user_id: "user_1706123456789_abc123"
experiment_id: "raw-carrot-salad"
start_date: "2026-01-20"
current_day: 8
completed: false
logs: '[{"date":"2026-01-20","temp":98.1,"pulse":70,"notes":"Started!"}]'
```

---

## 7. Experiment Template IDs

Available experiments with their durations:

| Template ID | Duration (days) |
|-------------|-----------------|
| `temp-before-after-meals` | 30 |
| `raw-carrot-salad` | 30 |
| `low-pufa-week` | 30 |
| `morning-vs-afternoon-temp` | 30 |
| `oj-before-coffee` | 30 |
| `carbs-protein-pairing` | 30 |
| `warm-vs-cold-foods` | 3 |
| `dairy-support-test` | 3 |
| `liver-weekly` | 21 |
| `shellfish-weekly` | 21 |
| `gelatin-before-bed` | 30 |
| `warm-bath-before-bed` | 30 |
| `afternoon-sunlight` | 30 |
| `honey-salt-nighttime` | 30 |
| `nasal-walking` | 30 |
| `no-workout-reset` | 3 |
| `calcium-boost-pms` | 30 |
| `magnesium-night` | 30 |
| `coffee-with-sugar` | 30 |
| `no-raw-greens` | 3 |
| `red-light-therapy` | 30 |
| `meal-timing-test` | 30 |

---

## Summary for React Native Implementation

1. **Use Bearer token auth** (not cookies) - store securely with `expo-secure-store`
2. **Base URL**: `https://getlighterapp.com/api`
3. **All endpoints return JSON** - use `Content-Type: application/json`
4. **Beta access**: Some endpoints check beta expiry, handle `403 BETA_EXPIRED` error
5. **Cascade deletion**: User deletion removes all related data automatically
6. **Date formats**: Use `YYYY-MM-DD` for dates, ISO strings for timestamps
