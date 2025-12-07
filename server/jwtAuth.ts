import type { Express, RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { storage, toSafeUser } from "./storage";

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

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      await storage.upsertUser({
        id: userId,
        email,
        firstName: firstName || null,
        lastName: lastName || null,
        profileImageUrl: null,
        passwordHash: password,
      });

      const tokenPayload: Omit<JWTPayload, 'iat' | 'exp'> = {
        sub: userId,
        email,
      };
      if (firstName) tokenPayload.firstName = firstName;
      if (lastName) tokenPayload.lastName = lastName;
      const token = generateToken(tokenPayload);

      setAuthCookie(res, token);

      const user = await storage.getUser(userId);
      res.json(toSafeUser(user!));
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Failed to register user" });
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
