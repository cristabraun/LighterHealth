// Lighter API Types - Matches verified backend contract exactly
// Generated from Lighter_Mobile_API_Contract_Verified.md

// ============ USER TYPES ============

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  profileImageUrl: string | null;
  onboardingCompleted: boolean;
  metabolicSymptoms: string[] | null;
  isBetaUser: boolean;
  betaStartDate: string | null;
  betaExpiresAt: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  subscriptionStatus: string | null;
  trialEndsAt: string | null;
  dailyAiCount: number;
  lastAiReset: string | null;
  createdAt: string;
  updatedAt: string;
}

// ============ AUTH TYPES ============

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface TokenRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  token: string;
  user: User;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

export interface OnboardingRequest {
  name: string;
  symptoms: string[];
}

export interface IsAdminResponse {
  isAdmin: boolean;
}

// ============ DAILY LOG TYPES ============

export type Digestion = 'good' | 'okay' | 'poor';
export type Mood = 'good' | 'okay' | 'bad';

export interface DailyLog {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  temperature: number; // 94-102
  pulse: number; // 40-150
  energy: number; // 1-10
  sleep: number; // 1-10
  digestion: Digestion;
  stress: number | null; // 1-10
  mood: Mood | null;
  moodNotes: string | null;
  howYouFeelNotes: string | null;
  digestionNotes: string | null;
  notes: string | null;
  checklistCompleted: number[];
  createdAt: string;
}

export interface CreateLogRequest {
  date: string;
  temperature: number;
  pulse: number;
  energy: number;
  sleep: number;
  digestion: Digestion;
  stress?: number;
  mood?: Mood;
  moodNotes?: string;
  howYouFeelNotes?: string;
  digestionNotes?: string;
  checklistCompleted?: number[];
}

export interface UpdateChecklistRequest {
  checklistCompleted: number[];
}

// ============ EXPERIMENT TYPES ============

export type ExperimentTemplateId =
  | 'temp-before-after-meals'
  | 'raw-carrot-salad'
  | 'low-pufa-week'
  | 'morning-vs-afternoon-temp'
  | 'oj-before-coffee'
  | 'carbs-protein-pairing'
  | 'warm-vs-cold-foods'
  | 'dairy-support-test'
  | 'liver-weekly'
  | 'shellfish-weekly'
  | 'gelatin-before-bed'
  | 'warm-bath-before-bed'
  | 'afternoon-sunlight'
  | 'honey-salt-nighttime'
  | 'nasal-walking'
  | 'no-workout-reset'
  | 'calcium-boost-pms'
  | 'magnesium-night'
  | 'coffee-with-sugar'
  | 'no-raw-greens'
  | 'red-light-therapy'
  | 'meal-timing-test';

export interface ExperimentLogEntry {
  date: string;
  temp: number;
  pulse: number;
  notes?: string;
}

export interface ActiveExperiment {
  id: string;
  userId: string;
  experimentId: ExperimentTemplateId;
  startDate: string;
  currentDay: number;
  completed: boolean;
  completedAt: string | null;
  notes: string[] | null;
  checklist: string[] | null;
  measurements: string; // JSON string
  logs: string; // JSON string of ExperimentLogEntry[]
}

export interface CreateExperimentRequest {
  experimentId: ExperimentTemplateId;
  startDate: string;
}

export interface ExperimentLogRequest {
  date: string;
  temp: number;
  pulse: number;
  notes?: string;
}

// ============ FOOD LOG TYPES ============

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodLog {
  id: string;
  userId: string;
  date: string;
  meal: MealType;
  foodItem: string;
  energyIntake: number | null;
  notes: string | null;
  createdAt: string;
}

export interface CreateFoodLogRequest {
  date: string;
  meal: MealType;
  foodItem: string;
  energyIntake?: number;
  notes?: string;
}

// ============ MESSAGE TYPES ============

export type MessageStatus = 'pending' | 'responded';

export interface Message {
  id: string;
  userId: string;
  subject: string;
  message: string;
  response: string | null;
  status: MessageStatus;
  createdAt: string;
  respondedAt: string | null;
}

export interface CreateMessageRequest {
  subject: string;
  message: string;
}

// ============ AI COACH TYPES ============

export interface AiLimitResponse {
  count: number;
  remaining: number;
  limit: number;
}

export interface AskQuestionRequest {
  question: string;
}

export interface AskQuestionResponse {
  reply: string;
  remaining: number;
}

export interface AiInsightRequest {
  experimentId: ExperimentTemplateId;
  experimentTitle: string;
  logs: ExperimentLogEntry[];
  date: string;
}

export interface AiInsightResponse {
  insight: string;
}

// ============ STRIPE / PAYMENTS TYPES ============

export interface PublishableKeyResponse {
  publishableKey: string;
}

export interface StripePrice {
  id: string;
  unit_amount: number;
  currency: string;
  recurring: {
    interval: 'month' | 'year';
  } | null;
}

export interface StripeProduct {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  prices: StripePrice[];
}

export interface ProductsResponse {
  data: StripeProduct[];
}

export interface SubscriptionResponse {
  subscription: Record<string, unknown> | null;
  status: string;
}

export interface CheckoutRequest {
  priceId: string;
}

export interface CheckoutResponse {
  url: string;
}

export interface CustomerPortalResponse {
  url: string;
}

// ============ ERROR TYPES ============

export interface ApiError {
  message: string;
}

export interface ApiSuccessResponse {
  success: boolean;
}
