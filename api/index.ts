import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { storage, toSafeUser } from "../server/storage";
import { setupAuth, isAuthenticated } from "../server/jwtAuth";
import { insertDailyLogSchema, insertActiveExperimentSchema, insertMessageSchema, insertFoodLogSchema } from "../shared/schema";
import { fromZodError } from "zod-validation-error";
import OpenAI from "openai";
import { getUncachableStripeClient, getStripePublishableKey } from "../server/stripeClient";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      console.log(logLine);
    }
  });

  next();
});

let isInitialized = false;

async function initializeRoutes() {
  if (isInitialized) return;
  
  await setupAuth(app);
  
  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(toSafeUser(user));
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Check admin status
  app.get('/api/auth/is-admin', isAuthenticated, async (req: any, res) => {
    try {
      const userEmail = req.user.claims.email;
      const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
      const isAdmin = adminEmails.includes(userEmail?.toLowerCase() || '');
      res.json({ isAdmin });
    } catch (error) {
      console.error("Error checking admin status:", error);
      res.status(500).json({ message: "Failed to check admin status" });
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
      if (user) {
        res.json(toSafeUser(user));
      } else {
        res.status(404).json({ message: "User not found" });
      }
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

  // Food log routes
  app.get('/api/food-logs', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { date } = req.query;
      const logs = await storage.getFoodLogs(userId, date as string | undefined);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching food logs:", error);
      res.status(500).json({ message: "Failed to fetch food logs" });
    }
  });

  app.post('/api/food-logs', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertFoodLogSchema.parse(req.body);
      const log = await storage.createFoodLog(userId, validatedData);
      res.json(log);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating food log:", error);
      res.status(500).json({ message: "Failed to create food log" });
    }
  });

  app.delete('/api/food-logs/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      await storage.deleteFoodLog(userId, id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting food log:", error);
      res.status(500).json({ message: "Failed to delete food log" });
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
      const experiment = await storage.updateActiveExperiment(userId, id, req.body);
      if (!experiment) {
        return res.status(404).json({ message: "Experiment not found" });
      }
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

  // Message routes
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
      res.status(500).json({ message: "Failed to create message" });
    }
  });

  // Admin routes
  app.get('/api/admin/messages', isAuthenticated, async (req: any, res) => {
    try {
      const userEmail = req.user.claims.email;
      const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
      if (!adminEmails.includes(userEmail?.toLowerCase() || '')) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      const messages = await storage.getAllMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching admin messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.patch('/api/admin/messages/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userEmail = req.user.claims.email;
      const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
      if (!adminEmails.includes(userEmail?.toLowerCase() || '')) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      const { id } = req.params;
      const { response } = req.body;
      const message = await storage.updateMessage(id, response);
      res.json(message);
    } catch (error) {
      console.error("Error responding to message:", error);
      res.status(500).json({ message: "Failed to respond to message" });
    }
  });

  // Stripe routes
  app.get("/api/stripe/publishable-key", async (_req, res) => {
    try {
      const key = await getStripePublishableKey();
      if (!key) {
        return res.status(500).json({ message: "Stripe publishable key not configured" });
      }
      res.json({ publishableKey: key });
    } catch (error) {
      console.error("Error getting Stripe key:", error);
      res.status(500).json({ message: "Stripe not configured" });
    }
  });

  app.post("/api/create-checkout-session", isAuthenticated, async (req: any, res) => {
    try {
      const stripe = await getUncachableStripeClient();
      if (!stripe) {
        return res.status(500).json({ message: "Stripe is not configured" });
      }
      
      const userId = req.user.claims.sub;
      const userEmail = req.user.claims.email;
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Lighter Premium",
                description: "Full access to all metabolic healing features",
              },
              unit_amount: 1900,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        customer_email: userEmail,
        client_reference_id: userId,
        subscription_data: {
          trial_period_days: 3,
        },
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ message: "Failed to create checkout session" });
    }
  });

  // AI Coach routes
  app.post('/api/coach/message', isAuthenticated, async (req: any, res) => {
    try {
      const openaiApiKey = process.env.OPENAI_API_KEY;
      if (!openaiApiKey) {
        return res.status(500).json({ message: "AI coach is not configured" });
      }

      const openai = new OpenAI({ apiKey: openaiApiKey });
      const { message, context } = req.body;

      const systemPrompt = `You are a warm, supportive metabolic health coach for the Lighter app. You help women understand and heal their metabolism through the lens of pro-metabolic nutrition and lifestyle practices.

Your approach:
- Focus on nourishing the body, not restriction
- Emphasize the importance of temperature, pulse, and energy as metabolic markers
- Encourage adequate calories, protein, and carbs from whole food sources
- Support stress reduction and quality sleep
- Be encouraging and positive, never judgmental
- Keep responses concise but helpful (2-3 paragraphs max)

User context: ${JSON.stringify(context || {})}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 500,
      });

      res.json({ 
        response: completion.choices[0].message.content,
        usage: completion.usage
      });
    } catch (error) {
      console.error("Error with AI coach:", error);
      res.status(500).json({ message: "Failed to get AI response" });
    }
  });

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Error:", err);
    res.status(status).json({ message });
  });

  isInitialized = true;
}

const handler = async (req: Request, res: Response) => {
  await initializeRoutes();
  return app(req, res);
};

export default handler;
