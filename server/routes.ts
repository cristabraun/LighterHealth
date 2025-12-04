import type { Express } from "express";
import express from "express";
import path from "path";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertDailyLogSchema, insertActiveExperimentSchema, insertMessageSchema, insertFoodLogSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import OpenAI from "openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve public folder for PWA assets (manifest, service worker, icons, etc.)
  app.use(express.static(path.resolve(import.meta.dirname, "..", "public")));

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

  app.get('/api/food-logs/:date', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { date } = req.params;
      const foodLogs = await storage.getFoodLogs(userId, date);
      res.json(foodLogs);
    } catch (error) {
      console.error("Error fetching food logs:", error);
      res.status(500).json({ message: "Failed to fetch food logs" });
    }
  });

  // Legacy query parameter support (for backwards compatibility)
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
            content: `You are the Lighter™ AI Coach, grounded in Ray Peat's bioenergetic and pro-metabolic framework. Your role is to guide women toward metabolic healing through evidence-based nutritional and lifestyle practices.

CORE PRINCIPLES YOU EMBODY:
- Metabolism = Energy = Health. Higher metabolic rate through proper nutrition leads to wellness.
- Body temperature indicates metabolic health. Warmth matters. Cold is stress.
- Thyroid function is central to metabolism. Support it through carbs, iodine, and selenium.
- The nervous system must be supported. Stress reduction is metabolic medicine.

FOODS TO EMPHASIZE (Pro-Metabolic Foundation):
- Carbohydrates: They fuel metabolism. Include sweet potatoes, white rice, oats, fruit, and honey.
- Fruit: Fresh fruit and fruit juice (especially orange juice) provide quick energy and thyroid support.
- Milk: A complete, pro-metabolic food rich in calcium, lactose, and protein.
- Gelatin: Supports digestion, skin, joints, and metabolic balance. Include in broths and desserts.
- Salt: Essential for thyroid, nervous system, and metabolic function. Don't fear salt.
- Eggs: Complete protein supporting hormones and energy.
- Fish and shellfish: Rich in iodine and minerals supporting thyroid function.
- Coconut oil and butter: Saturated fats support hormones and metabolism.

FOODS TO AVOID OR MINIMIZE (Pro-Inflammatory and Metabolic Disruptors):
- Polyunsaturated fats (PUFAs): Seed oils, vegetable oils, nuts, seeds in excess. They suppress metabolism.
- Processed foods and additives: Avoid artificial sweeteners, food coloring, emulsifiers.
- Industrial seed oils: Soy, corn, sunflower, safflower, canola oils. Use butter, coconut oil instead.
- Excessive fiber from whole grains: Can inhibit nutrient absorption. Refined carbs are okay.
- Extreme calorie restriction: Slows metabolism. Eat enough to support warmth and energy.

LIFESTYLE PRACTICES YOU RECOMMEND:
- Prioritize body temperature: Cold exposure reduces metabolism. Stay warm.
- Light exposure: Circadian rhythm supports hormone and metabolic health. Morning light is essential.
- Adequate sleep: Metabolic repair happens during sleep. Support natural sleep patterns.
- Movement without exhaustion: Gentle activity supports metabolism. Avoid chronic overtraining.
- Stress reduction: Chronic stress suppresses thyroid and metabolism. Prioritize calm and safety.
- Sunshine and vitamin D: Natural light and vitamin D support immune and metabolic function.

WHAT YOU NEVER RECOMMEND (These Suppress Metabolism):
- Keto or very low-carb diets: These suppress thyroid and lower metabolic rate.
- Extended fasting or calorie restriction: These are metabolic stressors.
- Extreme exercise or chronic cardio: This creates sympathetic stress and metabolic suppression.
- Low-fat diets: Fats are essential for hormones and neurological health.
- Products labeled "sugar-free" or heavily processed: Trust natural foods.

TONE AND APPROACH:
- Warm, supportive, and non-judgmental. You meet users where they are.
- Evidence-based within the Ray Peat framework. Never contradict these principles.
- Practical and actionable. Give specific, easy steps.
- Never make medical claims. Direct serious concerns to healthcare providers.
- Empower users to listen to their bodies and feel their warmth increase.

RESPONSE GUIDELINES:
- Answer questions directly using the pro-metabolic framework.
- If asked about contradictory advice, explain how the pro-metabolic approach differs clearly.
- If unsure, default to warmth, adequate carbs, adequate calories, and stress reduction.
- Keep responses conversational but educational. Share the "why" behind recommendations.
- Always prioritize the user's sense of safety, warmth, and energy.`
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

  // AI Insight for experiments
  app.post('/api/ai/insight', async (req, res) => {
    try {
      const { experimentId, experimentTitle, logs, date } = req.body;

      if (!experimentId || !experimentTitle || !logs || !Array.isArray(logs)) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const logsText = logs
        .map(log => `Date: ${new Date(log.date).toLocaleString()}, Temp: ${log.temp || 'N/A'}°F, Pulse: ${log.pulse || 'N/A'} bpm, Notes: ${log.notes || 'N/A'}`)
        .join('\n');

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 150,
        messages: [
          {
            role: "system",
            content: "You are an AI coach for metabolic health tracking. Provide concise, actionable insights (1-2 sentences max) about metabolic patterns and health trends based on logged data."
          },
          {
            role: "user",
            content: `Experiment: ${experimentTitle}\nDate: ${date}\n\nLogs:\n${logsText}\n\nProvide a brief, insightful observation about the logged data.`
          }
        ]
      });

      const insight = response.choices[0]?.message?.content || "Unable to generate insights.";
      res.json({ insight });
    } catch (error) {
      console.error("Error generating AI insight:", error);
      res.status(500).json({ message: "Failed to generate insight" });
    }
  });

  // GitHub export endpoint - integrates with Replit GitHub connector
  app.post('/api/github/export', async (req, res) => {
    try {
      const { repoName } = req.body;
      const finalRepoName = repoName || 'LighterHealth';

      // Get GitHub access token via Replit connector
      const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
      const xReplitToken = process.env.REPL_IDENTITY 
        ? 'repl ' + process.env.REPL_IDENTITY 
        : process.env.WEB_REPL_RENEWAL 
        ? 'depl ' + process.env.WEB_REPL_RENEWAL 
        : null;

      if (!xReplitToken || !hostname) {
        return res.status(500).json({ message: "GitHub connector not properly configured" });
      }

      const connectionSettings = await fetch(
        'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
        {
          headers: {
            'Accept': 'application/json',
            'X_REPLIT_TOKEN': xReplitToken
          }
        }
      ).then(r => r.json()).then(data => data.items?.[0]);

      const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;

      if (!accessToken) {
        return res.status(500).json({ message: "Unable to access GitHub token" });
      }

      // Dynamically import Octokit
      const { Octokit } = await import('@octokit/rest');
      const octokit = new Octokit({ auth: accessToken });

      // Get authenticated user
      const { data: user } = await octokit.rest.users.getAuthenticated();
      const owner = user.login;

      // Create new repository
      const { data: repo } = await octokit.rest.repos.createForAuthenticatedUser({
        name: finalRepoName,
        description: 'LighterHealth - Pro-Metabolic Health Tracking App',
        private: false,
        auto_init: false
      }).catch(async (err: any) => {
        // If repo already exists, get it instead
        if (err.status === 422) {
          return await octokit.rest.repos.get({ owner, repo: finalRepoName });
        }
        throw err;
      });

      // Initialize git if needed and push
      const { execSync } = await import('child_process');
      const projectRoot = process.cwd();

      try {
        // Check if git is initialized
        execSync('git rev-parse --git-dir', { cwd: projectRoot, stdio: 'ignore' });
      } catch {
        // Git not initialized, initialize it
        execSync('git init', { cwd: projectRoot });
      }

      // Always ensure git config is set (globally and locally)
      execSync('git config --global user.email "dev@lighter.app"', { cwd: projectRoot });
      execSync('git config --global user.name "LighterHealth App"', { cwd: projectRoot });
      execSync('git config user.email "dev@lighter.app"', { cwd: projectRoot });
      execSync('git config user.name "LighterHealth App"', { cwd: projectRoot });

      // Set remote
      try {
        execSync('git remote remove origin', { cwd: projectRoot, stdio: 'ignore' });
      } catch {
        // Remote doesn't exist yet, that's fine
      }

      execSync(`git remote add origin https://${accessToken}@github.com/${owner}/${finalRepoName}.git`, { cwd: projectRoot });

      // Stage all files
      execSync('git add .', { cwd: projectRoot });

      // Check if there are changes to commit
      try {
        execSync('git diff --cached --exit-code', { cwd: projectRoot, stdio: 'ignore' });
      } catch {
        // Changes exist, create commit
        execSync('git commit -m "Initial export of LighterHealth app"', { cwd: projectRoot });

        // Push to GitHub
        try {
          execSync('git push -u origin main', { cwd: projectRoot });
        } catch {
          // If main doesn't exist, try master
          execSync('git push -u origin master', { cwd: projectRoot });
        }
      }

      res.json({
        success: true,
        repoUrl: `https://github.com/${owner}/${finalRepoName}`,
        message: `Repository created and code pushed successfully to ${finalRepoName}`
      });
    } catch (error: any) {
      console.error("Error exporting to GitHub:", error);
      res.status(500).json({ 
        message: "Failed to export to GitHub",
        error: error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
