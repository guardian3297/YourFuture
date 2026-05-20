import { Router } from "express";
import { recommendations } from "../data/recommendations.js";
import { rankRecommendations } from "../engine/recommendationEngine.js";
import { requireAuth } from "../middleware/auth.js";

export const recommendationsRouter = Router();
recommendationsRouter.use(requireAuth);

recommendationsRouter.get("/", (_req, res) => res.json({ catalog: recommendations }));
recommendationsRouter.post("/rank", (req, res) => res.json({ recommendations: rankRecommendations(req.body.analysis) }));
