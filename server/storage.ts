import {
  users,
  dailyLogs,
  activeExperiments,
  messages,
  foodLogs,
  type User,
  type UpsertUser,
  type InsertDailyLog,
  type DailyLog,
  type InsertActiveExperiment,
  type ActiveExperiment,
  type InsertMessage,
  type Message,
  type InsertFoodLog,
  type FoodLog,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";

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
  updateChecklistCompleted(userId: string, date: string, checklistCompleted: number[]): Promise<DailyLog | undefined>;
  
  // Active experiment operations
  createActiveExperiment(userId: string, experiment: InsertActiveExperiment): Promise<ActiveExperiment>;
  getActiveExperiments(userId: string): Promise<ActiveExperiment[]>;
  getActiveExperiment(userId: string, experimentId: string): Promise<ActiveExperiment | undefined>;
  updateActiveExperiment(userId: string, experimentId: string, updates: Partial<InsertActiveExperiment>): Promise<ActiveExperiment>;
  deleteActiveExperiment(userId: string, experimentId: string): Promise<void>;
  
  // Message operations
  createMessage(userId: string, message: InsertMessage): Promise<Message>;
  getUserMessages(userId: string): Promise<Message[]>;
  getAllMessages(): Promise<Message[]>;
  updateMessage(messageId: string, response: string): Promise<Message>;
  
  // Food log operations
  createFoodLog(userId: string, foodLog: InsertFoodLog): Promise<FoodLog>;
  getFoodLogs(userId: string, date?: string): Promise<FoodLog[]>;
  deleteFoodLog(userId: string, foodLogId: string): Promise<void>;
  
  // Stripe operations
  updateUserStripeInfo(userId: string, stripeInfo: {
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    subscriptionStatus?: string;
    trialEndsAt?: Date;
  }): Promise<User>;
  getProduct(productId: string): Promise<any>;
  listProducts(active?: boolean, limit?: number, offset?: number): Promise<any[]>;
  listProductsWithPrices(active?: boolean, limit?: number, offset?: number): Promise<any[]>;
  getPrice(priceId: string): Promise<any>;
  listPrices(active?: boolean, limit?: number, offset?: number): Promise<any[]>;
  getPricesForProduct(productId: string): Promise<any[]>;
  getSubscription(subscriptionId: string): Promise<any>;
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

  // Daily log operations (upsert to handle duplicate dates)
  async createDailyLog(userId: string, log: InsertDailyLog): Promise<DailyLog> {
    const [created] = await db
      .insert(dailyLogs)
      .values({
        ...log,
        userId,
        createdAt: new Date().toISOString(),
        checklistCompleted: [],
      })
      .onConflictDoUpdate({
        target: [dailyLogs.userId, dailyLogs.date],
        set: {
          temperature: log.temperature,
          pulse: log.pulse,
          energy: log.energy,
          sleep: log.sleep,
          digestion: log.digestion,
          howYouFeelNotes: log.howYouFeelNotes,
          digestionNotes: log.digestionNotes,
          notes: log.notes,
        },
      })
      .returning();
    return created;
  }

  async updateChecklistCompleted(userId: string, date: string, checklistCompleted: number[]): Promise<DailyLog | undefined> {
    const [updated] = await db
      .update(dailyLogs)
      .set({ checklistCompleted })
      .where(and(eq(dailyLogs.userId, userId), eq(dailyLogs.date, date)))
      .returning();
    return updated;
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

  // Message operations
  async createMessage(userId: string, message: InsertMessage): Promise<Message> {
    const [created] = await db
      .insert(messages)
      .values({
        ...message,
        userId,
      })
      .returning();
    return created;
  }

  async getUserMessages(userId: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.userId, userId))
      .orderBy(desc(messages.createdAt));
  }

  async getAllMessages(): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .orderBy(desc(messages.createdAt));
  }

  async updateMessage(messageId: string, response: string): Promise<Message> {
    const [updated] = await db
      .update(messages)
      .set({
        response,
        status: 'answered',
        respondedAt: new Date(),
      })
      .where(eq(messages.id, messageId))
      .returning();
    return updated;
  }

  // Food log operations
  async createFoodLog(userId: string, foodLog: InsertFoodLog): Promise<FoodLog> {
    const [created] = await db
      .insert(foodLogs)
      .values({
        ...foodLog,
        userId,
      })
      .returning();
    return created;
  }

  async getFoodLogs(userId: string, date?: string): Promise<FoodLog[]> {
    if (date) {
      return await db
        .select()
        .from(foodLogs)
        .where(and(eq(foodLogs.userId, userId), eq(foodLogs.date, date)))
        .orderBy(desc(foodLogs.createdAt));
    }
    return await db
      .select()
      .from(foodLogs)
      .where(eq(foodLogs.userId, userId))
      .orderBy(desc(foodLogs.date), desc(foodLogs.createdAt));
  }

  async deleteFoodLog(userId: string, foodLogId: string): Promise<void> {
    await db
      .delete(foodLogs)
      .where(
        and(
          eq(foodLogs.userId, userId),
          eq(foodLogs.id, foodLogId)
        )
      );
  }

  // Stripe operations
  async updateUserStripeInfo(userId: string, stripeInfo: {
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    subscriptionStatus?: string;
    trialEndsAt?: Date;
  }): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        ...stripeInfo,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async getProduct(productId: string): Promise<any> {
    const result = await db.execute(
      sql`SELECT * FROM stripe.products WHERE id = ${productId}`
    );
    return result.rows[0] || null;
  }

  async listProducts(active = true, limit = 20, offset = 0): Promise<any[]> {
    const result = await db.execute(
      sql`SELECT * FROM stripe.products WHERE active = ${active} LIMIT ${limit} OFFSET ${offset}`
    );
    return result.rows;
  }

  async listProductsWithPrices(active = true, limit = 20, offset = 0): Promise<any[]> {
    const result = await db.execute(
      sql`
        WITH paginated_products AS (
          SELECT id, name, description, metadata, active
          FROM stripe.products
          WHERE active = ${active}
          ORDER BY id
          LIMIT ${limit} OFFSET ${offset}
        )
        SELECT 
          p.id as product_id,
          p.name as product_name,
          p.description as product_description,
          p.active as product_active,
          p.metadata as product_metadata,
          pr.id as price_id,
          pr.unit_amount,
          pr.currency,
          pr.recurring,
          pr.active as price_active,
          pr.metadata as price_metadata
        FROM paginated_products p
        LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
        ORDER BY p.id, pr.unit_amount
      `
    );
    return result.rows;
  }

  async getPrice(priceId: string): Promise<any> {
    const result = await db.execute(
      sql`SELECT * FROM stripe.prices WHERE id = ${priceId}`
    );
    return result.rows[0] || null;
  }

  async listPrices(active = true, limit = 20, offset = 0): Promise<any[]> {
    const result = await db.execute(
      sql`SELECT * FROM stripe.prices WHERE active = ${active} LIMIT ${limit} OFFSET ${offset}`
    );
    return result.rows;
  }

  async getPricesForProduct(productId: string): Promise<any[]> {
    const result = await db.execute(
      sql`SELECT * FROM stripe.prices WHERE product = ${productId} AND active = true`
    );
    return result.rows;
  }

  async getSubscription(subscriptionId: string): Promise<any> {
    const result = await db.execute(
      sql`SELECT * FROM stripe.subscriptions WHERE id = ${subscriptionId}`
    );
    return result.rows[0] || null;
  }
}

export const storage = new DatabaseStorage();
