import { Router } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { findOrCreateUser } from "../services/store.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const body = z.object({ email: z.string().email(), password: z.string().min(6), name: z.string().optional() }).parse(req.body);
  const user = await findOrCreateUser(body.email, body.password, body.name);
  const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "7d" });
  res.json({ token, user: { email: user.email, name: user.name } });
});
