import { Router } from "express";
import { requireAuth } from "../auth/auth";
import cookieParser from "cookie-parser";
import type { Response, Request } from "express";
import type { JwtPayload } from "jsonwebtoken";
// import csrf from "csurf";

interface AuthenticatedRequest extends Request {
  auth?: JwtPayload | string;
}

export const router = Router();

// const csrfProtection = csrf({
//   cookie: true,
// });
router.use(cookieParser());
// router.use(csrfProtection);
router.use(requireAuth);

router.get("/", (req: AuthenticatedRequest, res: Response) => {
  res.json({ user: req.auth });
});
