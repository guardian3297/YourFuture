import { Router } from "express";
import { z } from "zod";
import { questionnaire } from "../data/questionnaire.js";
import { analyzeProfile } from "../engine/analysisEngine.js";
import { rankRecommendations } from "../engine/recommendationEngine.js";
import { requireAuth, AuthedRequest } from "../middleware/auth.js";
import { generateAIReport } from "../services/openaiService.js";
import { listAnalyses, saveAnalysis } from "../services/store.js";

export const analysisRouter = Router();
analysisRouter.use(requireAuth);

analysisRouter.get("/questionnaire", (_req, res) => res.json({ questionnaire }));

analysisRouter.get("/history", async (req: AuthedRequest, res) => {
  res.json({ history: await listAnalyses(req.user!.email) });
});

analysisRouter.post("/", async (req: AuthedRequest, res) => {
  const profile = z
    .object({
      name: z.string().min(2),
      role: z.string().min(2),
      goals: z.array(z.string()).min(1),
      interests: z.array(z.string()).min(1),
      routine: z.string().min(5),
      freeText: z.string().default(""),
      answers: z.array(z.object({ questionId: z.string(), value: z.number(), tags: z.array(z.string()), text: z.string().optional() }))
    })
    .parse(req.body);

  const analysis = analyzeProfile(profile);
  const recommendations = rankRecommendations(analysis);
  const aiReport = await generateAIReport(analysis, recommendations);
  await saveAnalysis(req.user!.email, analysis);
  res.json({ analysis, recommendations, aiReport });
});
