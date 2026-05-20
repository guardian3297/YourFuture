import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { answerAssistant } from "../services/openaiService.js";

export const assistantRouter = Router();
assistantRouter.use(requireAuth);

assistantRouter.post("/", async (req, res) => {
  const body = z.object({ message: z.string().min(2), analysis: z.any().optional() }).parse(req.body);
  const answer = await answerAssistant(body.message, body.analysis);
  res.json({ answer });
});
