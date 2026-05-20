import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthedRequest extends Request {
  user?: { email: string; name: string };
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Token ausente" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "dev-secret") as { email: string; name: string };
    next();
  } catch {
    res.status(401).json({ error: "Token invalido" });
  }
}
