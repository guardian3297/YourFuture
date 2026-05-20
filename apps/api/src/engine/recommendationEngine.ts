import { recommendations } from "../data/recommendations.js";
import { AnalysisResult, RankedRecommendation, RecommendationItem } from "../types.js";

export function rankRecommendations(analysis: AnalysisResult): RankedRecommendation[] {
  return recommendations
    .map((item) => rankItem(item, analysis))
    .sort((a, b) => b.compatibility - a.compatibility)
    .slice(0, 12);
}

function rankItem(item: RecommendationItem, analysis: AnalysisResult): RankedRecommendation {
  const tagScore = item.tags.reduce((sum, tag) => sum + (analysis.tags[tag] ?? analysis.tags[tag.replace("ê", "e")] ?? 0), 0);
  const categoryScore = item.categories.reduce((sum, category) => sum + analysis.categories[category] / 18, 0);
  const profileScore = item.compatibleProfiles.includes(analysis.dominantProfile) ? 18 : 4;
  const goalScore = item.goals.reduce((sum, goal) => {
    const normalized = goal.toLowerCase().replace(/\s+/g, "_");
    return sum + (analysis.tags[normalized] ? 6 : 0);
  }, 0);
  const compatibility = Math.min(98, Math.round(38 + tagScore * 3.1 + categoryScore + profileScore + goalScore));
  const strongest = item.categories
    .map((category) => [category, analysis.categories[category]] as const)
    .sort((a, b) => b[1] - a[1])[0][0]
    .replace("_", " ");

  return {
    ...item,
    compatibility,
    explanation: `Combina com seu perfil ${analysis.dominantProfile} porque ativa ${strongest}, conversa com seus sinais de ${item.tags.slice(0, 3).join(", ")} e entrega ${item.benefits[0]}.`
  };
}
