import type { Express, RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
// NOTE: Vercel serverless ESM requires .js extensions for local imports
import { storage, toSafeUser } from "./storage.js";

const JWT_SECRET = process.env.JWT_SECRET || process.env.SESSION_SECRET || "lighter-app-secret-key";
const JWT_EXPIRES_IN = "30d"; // 30-day session
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

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
    maxAge: COOKIE_MAX_AGE, // 30-day sliding session
    path: '/',
  });
}

// Refresh the session token (for sliding session behavior)
function refreshSession(res: Response, payload: JWTPayload) {
  const newPayload: Omit<JWTPayload, 'iat' | 'exp'> = {
    sub: payload.sub,
    email: payload.email,
  };
  if (payload.firstName) newPayload.firstName = payload.firstName;
  if (payload.lastName) newPayload.lastName = payload.lastName;
  
  const newToken = generateToken(newPayload);
  setAuthCookie(res, newToken);
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

  // Password Reset - Request reset link
  app.post('/api/auth/request-password-reset', async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const user = await storage.getUserByEmail(email);
      
      // Always return success to prevent email enumeration
      if (!user) {
        console.log("[PasswordReset] No user found for email, returning success anyway");
        return res.json({ message: "If an account exists for this email, we've sent a reset link." });
      }

      // Generate a secure random token
      const rawToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
      
      // Token expires in 1 hour
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
      
      // Store hashed token in database
      await storage.setPasswordResetToken(user.id, hashedToken, expiresAt);
      
      // Build reset URL
      const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}`
        : process.env.REPLIT_DOMAINS?.split(',')[0]
          ? `https://${process.env.REPLIT_DOMAINS.split(',')[0]}`
          : 'http://localhost:5000';
      
      const resetUrl = `${baseUrl}/auth/reset-password?token=${rawToken}`;
      
      // Log the reset URL for development testing
      console.log("[PasswordReset] Reset URL for", email.substring(0, 3) + "***:", resetUrl);
      
      // TODO: Send email when SMTP is configured
      // For now, we just log the URL
      
      res.json({ message: "If an account exists for this email, we've sent a reset link." });
    } catch (error) {
      console.error("[PasswordReset] Error:", error);
      res.status(500).json({ message: "Failed to process password reset request" });
    }
  });

  // Password Reset - Reset password with token
  app.post('/api/auth/reset-password', async (req: Request, res: Response) => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({ message: "Token and new password are required" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }

      // Hash the incoming token ONCE to compare with stored hash
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
      
      // Find user with valid token (storage.getUserByResetToken expects the hashed token)
      const user = await storage.getUserByResetToken(hashedToken);
      
      if (!user) {
        return res.status(400).json({ message: "Reset link is invalid or has expired." });
      }

      // Hash the new password with bcrypt
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update password (storage.updatePassword stores the hash directly, no re-hashing)
      // and clear reset token
      await storage.updatePasswordDirect(user.id, hashedPassword);
      await storage.clearPasswordResetToken(user.id);
      
      // Log them in immediately by issuing a new session
      const loginPayload: Omit<JWTPayload, 'iat' | 'exp'> = {
        sub: user.id,
        email: user.email!,
      };
      if (user.firstName) loginPayload.firstName = user.firstName;
      if (user.lastName) loginPayload.lastName = user.lastName;
      const authToken = generateToken(loginPayload);
      setAuthCookie(res, authToken);

      console.log("[PasswordReset] Password reset successful for user:", user.id);
      res.json({ message: "Password has been reset successfully. You are now logged in." });
    } catch (error) {
      console.error("[PasswordReset] Error:", error);
      res.status(500).json({ message: "Failed to reset password" });
    }
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

  // Sliding session: refresh the token on each valid request
  // This extends the session by another 30 days on every use
  refreshSession(res, payload);

  (req as any).user = { claims: payload };
  next();
};
