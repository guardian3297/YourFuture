"use client";

import { Bot, Send } from "lucide-react";
import { useState } from "react";
import { askAssistant } from "@/lib/api";
import { AnalysisResult } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";

export function AssistantPanel({ analysis }: { analysis: AnalysisResult }) {
  const { token } = useAuth();
  const [message, setMessage] = useState("Como eu posso evoluir nos proximos 7 dias?");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    try {
      const data = await askAssistant(message, token, analysis);
      setAnswer(data.answer);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="glass rounded-xl p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-iris/20 p-2 text-iris">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-white/50">Assistente IA interno</p>
          <h3 className="text-xl font-semibold">Conselheiro contextual</h3>
        </div>
      </div>
      <div className="mt-5 flex gap-2">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-3 text-sm outline-none focus:border-mint"
        />
        <button onClick={send} className="rounded-lg bg-mint px-3 text-ink disabled:opacity-60" disabled={loading} title="Enviar">
          <Send className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-4 min-h-24 whitespace-pre-line rounded-lg bg-black/18 p-4 text-sm leading-6 text-white/72">
        {answer || "Pergunte sobre carreira, hábitos, foco, repertório ou recomendações. A resposta usa seu perfil atual como contexto."}
      </p>
    </section>
  );
}
