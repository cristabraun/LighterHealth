import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, date, timestamp, boolean, index, uniqueIndex, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User Profile (updated for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  // Replit Auth fields
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  // Lighter app fields
  name: text("name"), // User's preferred name from onboarding
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  metabolicSymptoms: text("metabolic_symptoms").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Upsert user type for Replit Auth
export type UpsertUser = {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
};

// Daily Logs
export const dailyLogs = pgTable("daily_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: text("date").notNull(), // YYYY-MM-DD format
  temperature: real("temperature").notNull(), // in °F
  pulse: integer("pulse").notNull(), // in bpm
  energy: integer("energy").notNull(), // 1-10
  sleep: integer("sleep").notNull(), // 1-10
  digestion: text("digestion").notNull(), // 'good' | 'okay' | 'poor'
  howYouFeelNotes: text("how_you_feel_notes"),
  digestionNotes: text("digestion_notes"),
  notes: text("notes"),
  checklistCompleted: integer("checklist_completed").array().default(sql`'{}'`), // Array of completed checklist item indices (0-7)
  createdAt: text("created_at").notNull(), // ISO string
}, (table) => {
  return {
    userDateIdx: index("daily_logs_user_date_idx").on(table.userId, table.date),
    userDateUnique: uniqueIndex("daily_logs_user_date_unique").on(table.userId, table.date),
  };
});

export const insertDailyLogSchema = createInsertSchema(dailyLogs).omit({ 
  id: true, 
  createdAt: true,
  userId: true // Will be set from authenticated user
}).extend({
  temperature: z.number().min(94).max(102),
  pulse: z.number().min(40).max(150),
  energy: z.number().min(1).max(10),
  sleep: z.number().min(1).max(10),
  digestion: z.enum(['good', 'okay', 'poor']),
});

export type InsertDailyLog = z.infer<typeof insertDailyLogSchema>;
export type DailyLog = typeof dailyLogs.$inferSelect;

// Active Experiments
export const activeExperiments = pgTable("active_experiments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  experimentId: text("experiment_id").notNull(),
  startDate: text("start_date").notNull(), // YYYY-MM-DD
  currentDay: integer("current_day").notNull().default(1),
  completed: boolean("completed").notNull().default(false),
  notes: text("notes").array(),
  checklist: text("checklist").array(), // daily checklist items completed
  measurements: text("measurements").notNull().default('{}'), // JSONB stored as text: { "1": { "morningTemp": { "value": 97.2, "unit": "°F", "timestamp": "..." }, ... }, "2": { ... } }
});

export const insertActiveExperimentSchema = createInsertSchema(activeExperiments).omit({ 
  id: true,
  userId: true // Will be set from authenticated user
});

export type InsertActiveExperiment = z.infer<typeof insertActiveExperimentSchema>;
export type ActiveExperiment = typeof activeExperiments.$inferSelect;

// User Messages (for direct Q&A with coach)
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  response: text("response"),
  status: text("status").notNull().default('pending'), // 'pending' | 'answered'
  createdAt: timestamp("created_at").defaultNow(),
  respondedAt: timestamp("responded_at"),
}, (table) => {
  return {
    userIdx: index("messages_user_idx").on(table.userId),
    statusIdx: index("messages_status_idx").on(table.status),
  };
});

export const insertMessageSchema = createInsertSchema(messages).omit({ 
  id: true, 
  createdAt: true,
  userId: true,
  response: true,
  respondedAt: true,
  status: true
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// Food Logs
export const foodLogs = pgTable("food_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: text("date").notNull(), // YYYY-MM-DD format
  meal: text("meal").notNull(), // 'breakfast' | 'lunch' | 'dinner' | 'snack'
  foodItem: text("food_item").notNull(), // What they ate
  notes: text("notes"), // Optional additional details
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => {
  return {
    userDateIdx: index("food_logs_user_date_idx").on(table.userId, table.date),
  };
});

export const insertFoodLogSchema = createInsertSchema(foodLogs).omit({ 
  id: true, 
  createdAt: true,
  userId: true // Will be set from authenticated user
}).extend({
  meal: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  foodItem: z.string().min(1, "Food item is required"),
});

export type InsertFoodLog = z.infer<typeof insertFoodLogSchema>;
export type FoodLog = typeof foodLogs.$inferSelect;

// Measurement Types for Experiments
export type MeasurementInput = {
  id: string; // e.g., "morningTemp", "afternoonTemp", "beforeMealTemp"
  label: string; // e.g., "Morning Temperature"
  unit: string; // e.g., "°F", "bpm"
  type: 'number'; // input type
  min?: number;
  max?: number;
  step?: number;
};

export type MeasurementValue = {
  value: number;
  unit: string;
  timestamp: string; // ISO string
};

export type DailyMeasurements = {
  [day: string]: { // e.g., "1", "2", "3"
    [inputId: string]: MeasurementValue; // e.g., "morningTemp": { value: 97.2, unit: "°F", timestamp: "..." }
  };
};

// Experiment Template Type (not stored in DB, just TypeScript)
export type ExperimentTemplate = {
  id: string;
  title: string;
  duration: number; // days
  category: 'Temperature & Pulse' | 'Nutrition' | 'Stress & Nervous System' | 'Movement' | 'Hormones & Cycle' | 'Digestion' | 'Advanced';
  why: string;
  how: string[];
  when: string;
  whatToExpect: { day: string; description: string }[];
  dailyChecklist: string[];
  alternatives?: string[]; // Optional alternatives if the primary method doesn't work
  inputs?: MeasurementInput[]; // Optional numerical inputs for measurements
};
