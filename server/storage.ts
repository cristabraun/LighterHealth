import {
  users,
  dailyLogs,
  activeExperiments,
  type User,
  type UpsertUser,
  type InsertDailyLog,
  type DailyLog,
  type InsertActiveExperiment,
  type ActiveExperiment,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserOnboarding(userId: string, name: string, symptoms: string[]): Promise<User>;
  
  // Daily log operations
  createDailyLog(userId: string, log: InsertDailyLog): Promise<DailyLog>;
  getDailyLogs(userId: string): Promise<DailyLog[]>;
  getDailyLog(userId: string, date: string): Promise<DailyLog | undefined>;
  
  // Active experiment operations
  createActiveExperiment(userId: string, experiment: InsertActiveExperiment): Promise<ActiveExperiment>;
  getActiveExperiments(userId: string): Promise<ActiveExperiment[]>;
  getActiveExperiment(userId: string, experimentId: string): Promise<ActiveExperiment | undefined>;
  updateActiveExperiment(userId: string, experimentId: string, updates: Partial<InsertActiveExperiment>): Promise<ActiveExperiment>;
  deleteActiveExperiment(userId: string, experimentId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserOnboarding(userId: string, name: string, symptoms: string[]): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        name,
        metabolicSymptoms: symptoms,
        onboardingCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Daily log operations
  async createDailyLog(userId: string, log: InsertDailyLog): Promise<DailyLog> {
    const [created] = await db
      .insert(dailyLogs)
      .values({
        ...log,
        userId,
        createdAt: new Date().toISOString(),
      })
      .returning();
    return created;
  }

  async getDailyLogs(userId: string): Promise<DailyLog[]> {
    return await db
      .select()
      .from(dailyLogs)
      .where(eq(dailyLogs.userId, userId))
      .orderBy(desc(dailyLogs.date));
  }

  async getDailyLog(userId: string, date: string): Promise<DailyLog | undefined> {
    const [log] = await db
      .select()
      .from(dailyLogs)
      .where(and(eq(dailyLogs.userId, userId), eq(dailyLogs.date, date)));
    return log;
  }

  // Active experiment operations
  async createActiveExperiment(userId: string, experiment: InsertActiveExperiment): Promise<ActiveExperiment> {
    const [created] = await db
      .insert(activeExperiments)
      .values({
        ...experiment,
        userId,
      })
      .returning();
    return created;
  }

  async getActiveExperiments(userId: string): Promise<ActiveExperiment[]> {
    return await db
      .select()
      .from(activeExperiments)
      .where(eq(activeExperiments.userId, userId))
      .orderBy(desc(activeExperiments.startDate));
  }

  async getActiveExperiment(userId: string, experimentId: string): Promise<ActiveExperiment | undefined> {
    const [experiment] = await db
      .select()
      .from(activeExperiments)
      .where(
        and(
          eq(activeExperiments.userId, userId),
          eq(activeExperiments.experimentId, experimentId)
        )
      );
    return experiment;
  }

  async updateActiveExperiment(
    userId: string,
    experimentId: string,
    updates: Partial<InsertActiveExperiment>
  ): Promise<ActiveExperiment> {
    const [updated] = await db
      .update(activeExperiments)
      .set(updates)
      .where(
        and(
          eq(activeExperiments.userId, userId),
          eq(activeExperiments.id, experimentId)
        )
      )
      .returning();
    return updated;
  }

  async deleteActiveExperiment(userId: string, experimentId: string): Promise<void> {
    await db
      .delete(activeExperiments)
      .where(
        and(
          eq(activeExperiments.userId, userId),
          eq(activeExperiments.id, experimentId)
        )
      );
  }
}

export const storage = new DatabaseStorage();
