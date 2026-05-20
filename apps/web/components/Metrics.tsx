"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";
import { AnalysisResult } from "@/lib/types";

const labels: Record<string, string> = {
  criatividade: "Criatividade",
  analise: "Análise",
  execucao: "Execução",
  social: "Social",
  bem_estar: "Bem-estar",
  lideranca: "Liderança",
  aprendizado: "Aprendizado",
  futuro: "Futuro"
};

export function RadarPanel({ analysis }: { analysis: AnalysisResult }) {
  const data = Object.entries(analysis.categories).map(([category, value]) => ({ category: labels[category], value }));
  return (
    <div className="glass rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-white/50">Mapa comportamental</p>
          <h3 className="text-xl font-semibold">Radar de identidade</h3>
        </div>
        <div className="rounded-lg bg-mint/15 px-3 py-2 text-sm text-mint">{analysis.score}%</div>
      </div>
      <div className="h-72">
        <ResponsiveContainer>
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(255,255,255,.12)" />
            <PolarAngleAxis dataKey="category" tick={{ fill: "rgba(255,255,255,.72)", fontSize: 12 }} />
            <Radar dataKey="value" stroke="#5AF2C6" fill="#5AF2C6" fillOpacity={0.28} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TrendPanel({ analysis }: { analysis: AnalysisResult }) {
  return (
    <div className="glass rounded-xl p-5">
      <p className="text-sm text-white/50">Evolução temporal</p>
      <h3 className="text-xl font-semibold">Trajetória de score</h3>
      <div className="mt-6 h-52">
        <ResponsiveContainer>
          <LineChart data={analysis.trends}>
            <XAxis dataKey="label" stroke="rgba(255,255,255,.45)" />
            <Tooltip contentStyle={{ background: "#10131c", border: "1px solid rgba(255,255,255,.12)", borderRadius: 8 }} />
            <Line type="monotone" dataKey="score" stroke="#8C7DFF" strokeWidth={3} dot={{ fill: "#8C7DFF" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
