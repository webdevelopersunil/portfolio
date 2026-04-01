import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db, adminUsersTable } from "@workspace/db";
import { LoginBody, LoginResponse, GetMeResponse, LogoutResponse } from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const JWT_SECRET = process.env.SESSION_SECRET ?? "portfolio-secret-fallback";

export function verifyToken(token: string): { username: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { username: string };
  } catch {
    return null;
  }
}

export function extractToken(req: { headers: { authorization?: string } }): string | null {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return null;
  return auth.slice(7);
}

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const { username, password } = parsed.data;

  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.username, username));

  if (!user) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: "7d" });

  req.log.info({ username }, "Admin login successful");

  res.json(LoginResponse.parse({ token, message: "Login successful" }));
});

router.post("/auth/logout", async (_req, res): Promise<void> => {
  res.json(LogoutResponse.parse({ message: "Logged out" }));
});

router.get("/auth/me", async (req, res): Promise<void> => {
  const token = extractToken(req);
  if (!token) {
    res.json(GetMeResponse.parse({ authenticated: false, username: null }));
    return;
  }
  const payload = verifyToken(token);
  if (!payload) {
    res.json(GetMeResponse.parse({ authenticated: false, username: null }));
    return;
  }
  res.json(GetMeResponse.parse({ authenticated: true, username: payload.username }));
});

export async function seedAdminUser(): Promise<void> {
  const [existing] = await db.select().from(adminUsersTable).where(eq(adminUsersTable.username, "admin"));
  if (!existing) {
    const passwordHash = await bcrypt.hash("portfolio@123", 10);
    await db.insert(adminUsersTable).values({ username: "admin", passwordHash });
    logger.info("Default admin user created — username: admin, password: portfolio@123");
  }
}

export default router;
