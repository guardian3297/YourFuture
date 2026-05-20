import { Sparkles } from "lucide-react";
import { Recommendation } from "@/lib/types";

export function RecommendationCard({ item }: { item: Recommendation }) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.055] p-4 transition hover:-translate-y-1 hover:border-mint/40 hover:bg-white/[0.08]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-mint">{item.type.replace("_", " ")}</p>
          <h4 className="mt-1 text-lg font-semibold">{item.name}</h4>
        </div>
        <div className="rounded-lg bg-white/10 px-2.5 py-1 text-sm font-semibold">{item.compatibility}%</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/68">{item.explanation}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/60">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-ember">
        <Sparkles className="h-4 w-4" />
        {item.premiumSignal}
      </div>
    </article>
  );
}
