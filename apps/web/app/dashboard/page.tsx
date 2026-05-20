"use client";

import { motion } from "framer-motion";
import { Download, Share2, Trophy, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AssistantPanel } from "@/components/AssistantPanel";
import { Button } from "@/components/Button";
import { RadarPanel, TrendPanel } from "@/components/Metrics";
import { RecommendationCard } from "@/components/RecommendationCard";
import { useAuth } from "@/contexts/AuthContext";
import { submitAnalysis } from "@/lib/api";
import { defaultProfile, questionnaire } from "@/lib/mock";
import { AnalysisResult, ProfileInput, Recommendation } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const { token, user } = useAuth();
  const [profile, setProfile] = useState<ProfileInput>(defaultProfile);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [aiReport, setAiReport] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) router.push("/");
  }, [token, router]);

  async function generate() {
    setLoading(true);
    try {
      const result = await submitAnalysis(profile, token);
      setAnalysis(result.analysis);
      setRecommendations(result.recommendations);
      setAiReport(result.aiReport);
      window.localStorage.setItem("lumina-last-analysis", JSON.stringify(result));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token && !analysis) generate();
  }, [token]);

  if (!token) return null;

  return (
    <main className="min-h-screen px-4 py-5 md:px-8">
      <header className="no-print mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur">
        <div>
          <p className="text-sm text-white/50">Sessão ativa</p>
          <h1 className="text-xl font-semibold">Lumina Intelligence Console</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigator.clipboard?.writeText(`${window.location.origin}/profile/${analysis?.id || "preview"}`)} className="rounded-lg border border-white/10 p-3 text-white/70 hover:text-mint" title="Compartilhar">
            <Share2 className="h-4 w-4" />
          </button>
          <button onClick={() => window.print()} className="rounded-lg border border-white/10 p-3 text-white/70 hover:text-mint" title="Exportar PDF">
            <Download className="h-4 w-4" />
          </button>
          <Button loading={loading} onClick={generate}>
            <Wand2 className="h-4 w-4" /> Recalcular IA
          </Button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 py-6 lg:grid-cols-[.78fr_1.22fr]">
        <aside className="no-print glass rounded-xl p-5">
          <p className="text-sm text-white/50">Questionário inteligente</p>
          <h2 className="text-2xl font-semibold">Sinais do perfil</h2>
          <div className="mt-5 space-y-4">
            <input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-3 outline-none focus:border-mint" />
            <input value={profile.role} onChange={(event) => setProfile({ ...profile, role: event.target.value })} className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-3 outline-none focus:border-mint" />
            <textarea value={profile.routine} onChange={(event) => setProfile({ ...profile, routine: event.target.value })} className="min-h-24 w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-3 outline-none focus:border-mint" />
            {questionnaire.map((question) => (
              <div key={question.id} className="rounded-xl border border-white/10 bg-white/[0.045] p-3">
                <p className="text-sm font-medium">{question.title}</p>
                <div className="mt-3 grid gap-2">
                  {question.options.map((option) => {
                    const selected = profile.answers.find((answer) => answer.questionId === question.id)?.value === option.value;
                    return (
                      <button
                        key={option.label}
                        onClick={() =>
                          setProfile({
                            ...profile,
                            answers: [...profile.answers.filter((answer) => answer.questionId !== question.id), { questionId: question.id, value: option.value, tags: option.tags }]
                          })
                        }
                        className={`rounded-lg border px-3 py-2 text-left text-sm transition ${selected ? "border-mint bg-mint/12 text-mint" : "border-white/10 bg-black/10 text-white/64 hover:border-white/25"}`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {analysis && (
          <div className="space-y-5">
            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-white/50">{user?.name || profile.name}</p>
                  <h2 className="text-4xl font-semibold">{analysis.dominantProfile}</h2>
                  <p className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-7 text-white/68">{aiReport}</p>
                </div>
                <div className="rounded-xl border border-mint/20 bg-mint/10 p-4 text-center">
                  <p className="text-5xl font-semibold text-mint">{analysis.score}</p>
                  <p className="text-sm text-white/52">Score geral</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <Stat title="Nível" value={analysis.level} />
                <Stat title="XP" value={analysis.xp} />
                <Stat title="Ranking" value={`Top ${Math.max(1, 12 - analysis.level)}%`} />
              </div>
            </motion.section>

            <div className="grid gap-5 xl:grid-cols-2">
              <RadarPanel analysis={analysis} />
              <TrendPanel analysis={analysis} />
            </div>

            <section className="grid gap-5 xl:grid-cols-[1fr_.85fr]">
              <div className="glass rounded-xl p-5">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-ember" />
                  <h3 className="text-xl font-semibold">Insights automáticos</h3>
                </div>
                <div className="mt-4 grid gap-3">
                  {[...analysis.strengths, ...analysis.patterns, ...analysis.risks].map((item) => (
                    <p key={item} className="rounded-lg border border-white/10 bg-white/[0.045] p-3 text-sm leading-6 text-white/70">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <AssistantPanel analysis={analysis} />
            </section>

            <section className="glass rounded-xl p-5">
              <p className="text-sm text-white/50">Sistema de recomendação</p>
              <h3 className="text-2xl font-semibold">Próximas escolhas inteligentes</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {recommendations.map((item) => (
                  <RecommendationCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.055] p-4">
      <p className="text-sm text-white/50">{title}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
