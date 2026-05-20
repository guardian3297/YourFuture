"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Gauge, Lock, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/Button";

export default function LandingPage() {
  const router = useRouter();
  const { setSession } = useAuth();
  const [email, setEmail] = useState("alex@lumina.ai");
  const [password, setPassword] = useState("lumina-demo");
  const [loading, setLoading] = useState(false);

  async function enter() {
    setLoading(true);
    try {
      const data = await login(email, password, "Alex");
      setSession(data.token, data.user);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-mint text-ink">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <span className="font-semibold">Lumina Profile AI</span>
        </div>
        <div className="hidden items-center gap-6 text-sm text-white/60 md:flex">
          <span>Análise</span>
          <span>Recomendações</span>
          <span>Assistente IA</span>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-8 pb-12 pt-16 lg:grid-cols-[1.1fr_.9fr] lg:pt-24">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="inline-flex rounded-lg border border-mint/25 bg-mint/10 px-3 py-2 text-sm text-mint">Inteligência pessoal para alta performance</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl">
            Lumina Profile AI
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
            Uma plataforma premium que interpreta personalidade, rotina, interesses e ambições para gerar análises comportamentais, recomendações profundas e um plano de evolução com IA contextual.
          </p>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ["Score vivo", Gauge],
              ["IA contextual", Sparkles],
              ["JWT seguro", Lock]
            ].map(([label, Icon]) => (
              <div key={String(label)} className="rounded-xl border border-white/10 bg-white/[0.055] p-4">
                <Icon className="h-5 w-5 text-mint" />
                <p className="mt-3 text-sm text-white/72">{String(label)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.7 }} className="glass rounded-xl p-5">
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <p className="text-sm text-white/50">Acesso demo</p>
            <h2 className="mt-1 text-2xl font-semibold">Entre no cockpit</h2>
            <div className="mt-5 space-y-3">
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 outline-none focus:border-mint" />
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 outline-none focus:border-mint" />
              <Button loading={loading} onClick={enter} className="w-full">
                Acessar plataforma <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/[0.055] p-4">
              <p className="text-3xl font-semibold">92%</p>
              <p className="text-sm text-white/50">Aderência preditiva</p>
            </div>
            <div className="rounded-xl bg-white/[0.055] p-4">
              <p className="text-3xl font-semibold">10</p>
              <p className="text-sm text-white/50">Tipos de recomendação</p>
            </div>
          </div>
        </motion.div>
      </section>
      <div className="soft-line mx-auto h-px max-w-5xl" />
    </main>
  );
}
