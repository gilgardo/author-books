import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET environment variable must be set in production");
}

export const config = {
  jwtSecret: JWT_SECRET || "dev_secret_do_not_use_in_prod",
  isProduction: process.env.NODE_ENV === "production",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  nodeEnv: process.env.NODE_ENV || "development",
} as const;
