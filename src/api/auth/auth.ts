import { Router, type RequestHandler } from "express";
import { signUp } from "./signUpController";
import { expressjwt } from "express-jwt";
import { signIn } from "./signInController";
import type { Request } from "express";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const router = Router();

const getTokenFromCookie = (req: Request) => {
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }
  return null;
};

export const requireAuth = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  getToken: getTokenFromCookie,
  credentialsRequired: true,
});

router.post("/signUp", signUp as RequestHandler);
router.post("/signIn", signIn as RequestHandler);
