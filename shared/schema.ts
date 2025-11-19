import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, date, timestamp, boolean, index, jsonb } from "drizzle-orm/pg-core";
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
  notes: text("notes"),
  createdAt: text("created_at").notNull(), // ISO string
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
});

export const insertActiveExperimentSchema = createInsertSchema(activeExperiments).omit({ 
  id: true,
  userId: true // Will be set from authenticated user
});

export type InsertActiveExperiment = z.infer<typeof insertActiveExperimentSchema>;
export type ActiveExperiment = typeof activeExperiments.$inferSelect;

// Experiment Template Type (not stored in DB, just TypeScript)
export type ExperimentTemplate = {
  id: string;
  title: string;
  duration: number; // days
  category: 'Energy' | 'Sleep' | 'Digestion' | 'Recovery';
  why: string;
  how: string[];
  when: string;
  whatToExpect: { day: string; description: string }[];
  dailyChecklist: string[];
};
