import { drizzle } from "drizzle-orm/neon-serverless";
import { neonConfig, Pool } from "@neondatabase/serverless";
import ws from "ws";

// Configure WebSocket for Neon in both serverless and server environments
neonConfig.webSocketConstructor = ws;

// Allow fetch polyfill in serverless environments
if (typeof globalThis.fetch === 'undefined') {
  console.log("[DB] Running in environment without native fetch");
}

if (!process.env.DATABASE_URL) {
  console.error("[DB] DATABASE_URL environment variable is not set!");
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

console.log("[DB] Initializing database connection...");

let pool: Pool;
try {
  pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    // Add connection timeout for serverless
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
  });
  console.log("[DB] Database pool created successfully");
} catch (error: any) {
  console.error("[DB] Failed to create database pool:", error?.message || error);
  throw error;
}

export const db = drizzle(pool);
