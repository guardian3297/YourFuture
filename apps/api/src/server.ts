import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { analysisRouter } from "./routes/analysis.js";
import { assistantRouter } from "./routes/assistant.js";
import { authRouter } from "./routes/auth.js";
import { recommendationsRouter } from "./routes/recommendations.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors({ origin: process.env.WEB_ORIGIN || "http://localhost:3000" }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => res.json({ ok: true, product: "Lumina Profile AI" }));
app.use("/auth", authRouter);
app.use("/analysis", analysisRouter);
app.use("/recommendations", recommendationsRouter);
app.use("/assistant", assistantRouter);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(400).json({ error: error instanceof Error ? error.message : "Erro inesperado" });
});

app.listen(port, () => {
  console.log(`Lumina API listening on http://localhost:${port}`);
});
