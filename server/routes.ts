import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertDailyLogSchema, insertActiveExperimentSchema, insertMessageSchema, insertFoodLogSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import OpenAI from "openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Onboarding completion
  app.post('/api/user/onboarding', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { name, symptoms } = req.body;
      
      if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: "Name is required" });
      }

      const user = await storage.updateUserOnboarding(
        userId,
        name,
        Array.isArray(symptoms) ? symptoms : []
      );
      res.json(user);
    } catch (error) {
      console.error("Error updating onboarding:", error);
      res.status(500).json({ message: "Failed to complete onboarding" });
    }
  });

  // Daily log routes
  app.get('/api/logs', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const logs = await storage.getDailyLogs(userId);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching logs:", error);
      res.status(500).json({ message: "Failed to fetch logs" });
    }
  });

  app.get('/api/logs/:date', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { date } = req.params;
      const log = await storage.getDailyLog(userId, date);
      if (!log) {
        return res.status(404).json({ message: "Log not found" });
      }
      res.json(log);
    } catch (error) {
      console.error("Error fetching log:", error);
      res.status(500).json({ message: "Failed to fetch log" });
    }
  });

  app.patch('/api/logs/:date/checklist', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { date } = req.params;
      const { checklistCompleted } = req.body;

      if (!Array.isArray(checklistCompleted)) {
        return res.status(400).json({ message: "checklistCompleted must be an array" });
      }

      const updated = await storage.updateChecklistCompleted(userId, date, checklistCompleted);
      if (!updated) {
        return res.status(404).json({ message: "Log not found" });
      }
      res.json(updated);
    } catch (error) {
      console.error("Error updating checklist:", error);
      res.status(500).json({ message: "Failed to update checklist" });
    }
  });

  app.post('/api/logs', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertDailyLogSchema.parse(req.body);
      const log = await storage.createDailyLog(userId, validatedData);
      res.json(log);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating log:", error);
      res.status(500).json({ message: "Failed to create log" });
    }
  });

  // Active experiment routes
  app.get('/api/experiments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const experiments = await storage.getActiveExperiments(userId);
      res.json(experiments);
    } catch (error) {
      console.error("Error fetching experiments:", error);
      res.status(500).json({ message: "Failed to fetch experiments" });
    }
  });

  app.post('/api/experiments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertActiveExperimentSchema.parse(req.body);
      const experiment = await storage.createActiveExperiment(userId, validatedData);
      res.json(experiment);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating experiment:", error);
      res.status(500).json({ message: "Failed to create experiment" });
    }
  });

  app.patch('/api/experiments/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      const updates = req.body;
      const experiment = await storage.updateActiveExperiment(userId, id, updates);
      res.json(experiment);
    } catch (error) {
      console.error("Error updating experiment:", error);
      res.status(500).json({ message: "Failed to update experiment" });
    }
  });

  app.delete('/api/experiments/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      await storage.deleteActiveExperiment(userId, id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting experiment:", error);
      res.status(500).json({ message: "Failed to delete experiment" });
    }
  });

  // Admin middleware - check if user email is in admin list
  const isAdmin = (req: any, res: any, next: any) => {
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);
    const userEmail = req.user?.claims?.email;
    
    if (!userEmail || !adminEmails.includes(userEmail)) {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
    
    next();
  };

  // Check if current user is admin
  app.get('/api/auth/is-admin', isAuthenticated, async (req: any, res) => {
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);
    const userEmail = req.user?.claims?.email;
    const isUserAdmin = userEmail && adminEmails.includes(userEmail);
    console.log("Admin check - Email:", userEmail, "Admin emails:", adminEmails, "Is admin:", isUserAdmin);
    res.json({ isAdmin: isUserAdmin });
  });

  // Message routes
  app.post('/api/messages', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(userId, validatedData);
      res.json(message);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.get('/api/messages', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const messages = await storage.getUserMessages(userId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.get('/api/admin/messages', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const messages = await storage.getAllMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching all messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.patch('/api/admin/messages/:id', isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { response } = req.body;
      
      if (!response || typeof response !== 'string') {
        return res.status(400).json({ message: "Response is required" });
      }

      const message = await storage.updateMessage(id, response);
      res.json(message);
    } catch (error) {
      console.error("Error updating message:", error);
      res.status(500).json({ message: "Failed to update message" });
    }
  });

  // Food log routes
  app.post('/api/food-logs', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertFoodLogSchema.parse(req.body);
      const foodLog = await storage.createFoodLog(userId, validatedData);
      res.json(foodLog);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        const validationError = fromZodError(error as any);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating food log:", error);
      res.status(500).json({ message: "Failed to create food log" });
    }
  });

  app.get('/api/food-logs', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const date = req.query.date as string | undefined;
      const foodLogs = await storage.getFoodLogs(userId, date);
      res.json(foodLogs);
    } catch (error) {
      console.error("Error fetching food logs:", error);
      res.status(500).json({ message: "Failed to fetch food logs" });
    }
  });

  app.delete('/api/food-logs/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      await storage.deleteFoodLog(userId, id);
    } catch (error) {
      console.error("Error deleting food log:", error);
      res.status(500).json({ message: "Failed to delete food log" });
    }
  });

  // AI Coach route
  app.post('/api/ask', async (req: any, res) => {
    try {
      const { question } = req.body;
      
      if (!question || typeof question !== 'string') {
        return res.status(400).json({ message: "Question is required" });
      }

      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        console.error("OPENAI_API_KEY is not set");
        return res.status(500).json({ message: "AI Coach is not configured" });
      }

      const client = new OpenAI({ apiKey });

      const message = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are the Lighter™ AI Coach. You answer questions using the pro-metabolic and bioenergetic approach. You focus on warmth, carbs, thyroid-friendly foods, low-PUFA eating, gentle healing, and stress reduction. You never make medical claims. You always speak in a warm, supportive, clear tone."
          },
          {
            role: "user",
            content: question
          }
        ]
      });

      const reply = message.choices[0]?.message?.content || "I couldn't generate a response. Please try again.";
      res.json({ reply });
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      res.status(500).json({ message: "Failed to get AI Coach response" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
