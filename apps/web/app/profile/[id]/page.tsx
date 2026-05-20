"use client";

import { ArrowLeft, Download, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RadarPanel } from "@/components/Metrics";
import { RecommendationCard } from "@/components/RecommendationCard";
import { AnalysisResult, Recommendation } from "@/lib/types";

export default function SharedProfilePage() {
  const [data, setData] = useState<{ analysis: AnalysisResult; recommendations: Recommendation[]; aiReport: string } | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("lumina-last-analysis");
    if (!saved) return;
    try {
      setData(JSON.parse(saved));
    } catch {
      window.localStorage.removeItem("lumina-last-analysis");
    }
  }, []);

  if (!data) {
    return (
      <main className="grid min-h-screen place-items-center px-5">
        <div className="glass max-w-lg rounded-xl p-6 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-mint" />
          <h1 className="mt-4 text-2xl font-semibold">Perfil aguardando análise</h1>
          <p className="mt-3 text-sm leading-6 text-white/60">Gere um relatório no dashboard para ativar esta visualização compartilhável.</p>
          <Link href="/dashboard" className="mt-5 inline-flex rounded-lg bg-white px-4 py-3 text-sm font-semibold text-ink">
            Voltar ao dashboard
          </Link>
        </div>
      </main>
    );
  }

  const { analysis, recommendations, aiReport } = data;

  return (
    <main className="min-h-screen px-4 py-6 md:px-8">
      <div className="no-print mx-auto mb-5 flex max-w-6xl items-center justify-between">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-mint">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
        <button onClick={() => window.print()} className="rounded-lg border border-white/10 p-3 text-white/70 hover:text-mint" title="Exportar PDF">
          <Download className="h-4 w-4" />
        </button>
      </div>
      <section className="mx-auto max-w-6xl space-y-5">
        <div className="glass rounded-xl p-6">
          <p className="text-sm text-white/50">Perfil compartilhável</p>
          <h1 className="mt-2 text-4xl font-semibold">{analysis.profile.name} · {analysis.dominantProfile}</h1>
          <p className="mt-4 max-w-4xl whitespace-pre-line text-sm leading-7 text-white/70">{aiReport}</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <RadarPanel analysis={analysis} />
          <div className="glass rounded-xl p-5">
            <p className="text-sm text-white/50">Recomendações principais</p>
            <h2 className="text-2xl font-semibold">Alta compatibilidade</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {recommendations.slice(0, 4).map((item) => (
                <RecommendationCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
