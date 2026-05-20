import { nanoid } from "nanoid";
import { categories } from "../data/questionnaire.js";
import { AnalysisResult, Category, ProfileInput } from "../types.js";

const categoryWeights: Record<Category, number> = {
  criatividade: 1.15,
  analise: 1.2,
  execucao: 1.05,
  social: 0.9,
  bem_estar: 1,
  lideranca: 1.1,
  aprendizado: 1.1,
  futuro: 1.15
};

const profileMatrix = [
  { name: "Arquiteto Analitico", keys: ["analise", "sistemas", "foco", "estrategia"] },
  { name: "Estrategista Visionario", keys: ["futuro", "visao", "criatividade", "ia"] },
  { name: "Construtor Pragmatico", keys: ["execucao", "prototipagem", "disciplina", "pratica"] },
  { name: "Curador Profundo", keys: ["filosofia", "narrativa", "empatia", "leitura"] }
];

export function analyzeProfile(profile: ProfileInput): AnalysisResult {
  const categoryTotals = Object.fromEntries(categories.map((category) => [category, 45])) as Record<Category, number>;
  const categoryCounts = Object.fromEntries(categories.map((category) => [category, 1])) as Record<Category, number>;
  const tags: Record<string, number> = {};

  profile.answers.forEach((answer) => {
    const category = inferCategory(answer.questionId);
    categoryTotals[category] += answer.value * categoryWeights[category];
    categoryCounts[category] += categoryWeights[category];
    answer.tags.forEach((tag) => {
      tags[tag] = (tags[tag] ?? 0) + answer.value / 20;
    });
  });

  for (const interest of profile.interests) tags[normalize(interest)] = (tags[normalize(interest)] ?? 0) + 4;
  for (const goal of profile.goals) tags[normalize(goal)] = (tags[normalize(goal)] ?? 0) + 5;

  const categoryScores = Object.fromEntries(
    categories.map((category) => [category, clamp(Math.round(categoryTotals[category] / categoryCounts[category]), 0, 100)])
  ) as Record<Category, number>;

  const score = Math.round(Object.values(categoryScores).reduce((sum, value) => sum + value, 0) / categories.length);
  const xp = score * 16 + Object.keys(tags).length * 18;
  const level = Math.max(1, Math.floor(xp / 420));
  const dominantProfile = calculateDominantProfile(tags, categoryScores);

  return {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    score,
    level,
    xp,
    dominantProfile,
    categories: categoryScores,
    tags,
    strengths: buildStrengths(categoryScores, tags),
    risks: buildRisks(categoryScores, tags),
    patterns: detectPatterns(categoryScores, tags, profile),
    trends: buildTrends(score),
    profile
  };
}

function inferCategory(questionId: string): Category {
  const map: Record<string, Category> = {
    q1: "analise",
    q2: "bem_estar",
    q3: "criatividade",
    q4: "lideranca",
    q5: "aprendizado",
    q6: "execucao"
  };
  return map[questionId] ?? "analise";
}

function calculateDominantProfile(tags: Record<string, number>, scores: Record<Category, number>) {
  const ranked = profileMatrix
    .map((profile) => ({
      name: profile.name,
      score: profile.keys.reduce((sum, key) => sum + (tags[key] ?? 0), 0) + scores.analise / 20 + scores.futuro / 24
    }))
    .sort((a, b) => b.score - a.score);
  return ranked[0].name;
}

function buildStrengths(scores: Record<Category, number>, tags: Record<string, number>) {
  const topCategories = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([category]) => category.replace("_", " "));
  const topTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]).slice(0, 3);
  return [
    `Alta capacidade em ${topCategories.join(", ")}`,
    `Motivadores dominantes: ${topTags.join(", ")}`,
    "Boa aptidão para transformar interesses em sistemas pessoais de evolução"
  ];
}

function buildRisks(scores: Record<Category, number>, tags: Record<string, number>) {
  const risks = [];
  if ((tags.perfeccionismo ?? 0) > 2.5) risks.push("Tendência a refinar demais antes de publicar resultados");
  if ((tags.sobrecarga ?? 0) > 2.5) risks.push("Risco de dispersão por excesso de frentes abertas");
  if (scores.bem_estar < 70) risks.push("Energia e recuperação podem limitar consistência");
  if (risks.length === 0) risks.push("Principal risco: subestimar o valor de revisões periódicas");
  return risks;
}

function detectPatterns(scores: Record<Category, number>, tags: Record<string, number>, profile: ProfileInput) {
  const patterns = [];
  if (scores.analise > 78 && scores.criatividade > 76) patterns.push("Criatividade analítica: você combina imaginação com raciocínio estruturado.");
  if (scores.lideranca > 74 && scores.social < 72) patterns.push("Liderança estratégica mais forte em direção do que em exposição social constante.");
  if ((tags.foco ?? 0) > 3 && profile.routine.length > 20) patterns.push("Rotina tende a funcionar melhor com blocos protegidos e objetivos visíveis.");
  if (scores.futuro > 76) patterns.push("Preferência por conteúdos que conectam tecnologia, filosofia e impacto de longo prazo.");
  return patterns;
}

function buildTrends(score: number) {
  return ["Jan", "Fev", "Mar", "Abr", "Mai"].map((label, index) => ({
    label,
    score: clamp(score - 12 + index * 4 + (index % 2 === 0 ? 3 : -1), 30, 100)
  }));
}

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_");
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
