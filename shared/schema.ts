import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, date, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Profile
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  metabolicSymptoms: text("metabolic_symptoms").array(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Daily Logs
export const dailyLogs = pgTable("daily_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
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
  createdAt: true 
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
  experimentId: text("experiment_id").notNull(),
  startDate: text("start_date").notNull(), // YYYY-MM-DD
  currentDay: integer("current_day").notNull().default(1),
  completed: boolean("completed").notNull().default(false),
  notes: text("notes").array(),
  checklist: text("checklist").array(), // daily checklist items completed
});

export const insertActiveExperimentSchema = createInsertSchema(activeExperiments).omit({ 
  id: true 
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
