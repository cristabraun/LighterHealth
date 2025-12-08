import type { Express, RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// NOTE: Vercel serverless ESM requires .js extensions for local imports
import { storage, toSafeUser } from "./storage.js";

const JWT_SECRET = process.env.JWT_SECRET || process.env.SESSION_SECRET || "lighter-app-secret-key";
const JWT_EXPIRES_IN = "7d";

export interface JWTPayload {
  sub: string;
  email: string;
  firstName?: string;
  lastName?: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedUser {
  claims: JWTPayload;
}

function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

function setAuthCookie(res: Response, token: string) {
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
}

function clearAuthCookie(res: Response) {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);

  app.post('/api/auth/register', async (req: Request, res: Response) => {
    try {
      const { email, firstName, lastName, password } = req.body;

      console.log("[Register] Attempting registration for email:", email ? email.substring(0, 3) + '***' : 'undefined');

      if (!email || !password) {
        console.log("[Register] Missing email or password");
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.log("[Register] Invalid email format");
        return res.status(400).json({ message: "Please enter a valid email address" });
      }

      // Validate password length
      if (password.length < 6) {
        console.log("[Register] Password too short");
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }

      let existingUser;
      try {
        existingUser = await storage.getUserByEmail(email);
      } catch (dbError: any) {
        console.error("[Register] Database error checking existing user:", dbError?.message || dbError);
        return res.status(500).json({ message: "Database connection error. Please try again." });
      }

      if (existingUser) {
        console.log("[Register] User already exists");
        return res.status(400).json({ message: "An account with this email already exists. Please sign in instead." });
      }

      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      console.log("[Register] Creating user with ID:", userId);
      
      let newUser;
      try {
        newUser = await storage.upsertUser({
          id: userId,
          email,
          firstName: firstName || null,
          lastName: lastName || null,
          profileImageUrl: null,
          passwordHash: password,
        });
        console.log("[Register] User created successfully");
      } catch (dbError: any) {
        console.error("[Register] Database error creating user:", dbError?.message || dbError);
        console.error("[Register] Full error:", JSON.stringify(dbError, Object.getOwnPropertyNames(dbError)));
        return res.status(500).json({ message: "Failed to create account. Please try again." });
      }

      const tokenPayload: Omit<JWTPayload, 'iat' | 'exp'> = {
        sub: userId,
        email,
      };
      if (firstName) tokenPayload.firstName = firstName;
      if (lastName) tokenPayload.lastName = lastName;
      const token = generateToken(tokenPayload);

      setAuthCookie(res, token);

      res.json(toSafeUser(newUser));
    } catch (error: any) {
      console.error("[Register] Unexpected error:", error?.message || error);
      console.error("[Register] Stack:", error?.stack);
      res.status(500).json({ message: "Registration failed. Please try again." });
    }
  });

  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValidPassword = await storage.verifyPassword(user.id, password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const loginPayload: Omit<JWTPayload, 'iat' | 'exp'> = {
        sub: user.id,
        email: user.email!,
      };
      if (user.firstName) loginPayload.firstName = user.firstName;
      if (user.lastName) loginPayload.lastName = user.lastName;
      const token = generateToken(loginPayload);

      setAuthCookie(res, token);

      res.json(toSafeUser(user));
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Failed to log in" });
    }
  });

  app.get("/api/logout", (req: Request, res: Response) => {
    clearAuthCookie(res);
    res.json({ success: true });
  });

  app.get("/api/login", (req: Request, res: Response) => {
    res.redirect('/');
  });
}

export const isAuthenticated: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies?.auth_token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const payload = verifyToken(token);
  if (!payload) {
    clearAuthCookie(res);
    return res.status(401).json({ message: "Unauthorized" });
  }

  (req as any).user = { claims: payload };
  next();
};
