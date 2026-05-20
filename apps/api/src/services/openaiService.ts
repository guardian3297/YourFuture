import OpenAI from "openai";
import { AnalysisResult, RankedRecommendation } from "../types.js";

const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const model = process.env.OPENAI_MODEL || "gpt-5.5";

export async function generateAIReport(analysis: AnalysisResult, recommendations: RankedRecommendation[]) {
  if (!client) return localReport(analysis, recommendations);

  const response = await client.responses.create({
    model,
    reasoning: { effort: "low" },
    instructions: [
      "Voce e o motor de inteligencia contextual da plataforma Lumina Profile AI.",
      "Gere analises em portugues do Brasil, com tom premium, humano e preciso.",
      "Interprete metricas, detecte padroes, identifique inconsistencias e explique recomendacoes.",
      "Nunca diga que e apenas uma opiniao generica. Use os dados fornecidos."
    ].join("\n"),
    input: JSON.stringify({
      profile: analysis.profile,
      scores: analysis.categories,
      dominantProfile: analysis.dominantProfile,
      strengths: analysis.strengths,
      risks: analysis.risks,
      patterns: analysis.patterns,
      topRecommendations: recommendations.slice(0, 6).map((item) => ({
        name: item.name,
        type: item.type,
        compatibility: item.compatibility,
        tags: item.tags,
        benefits: item.benefits
      }))
    })
  });

  return response.output_text || localReport(analysis, recommendations);
}

export async function answerAssistant(message: string, analysis?: AnalysisResult) {
  if (!client || !analysis) {
    return `Pelo seu perfil atual, eu investigaria a pergunta "${message}" olhando para tres sinais: energia, foco e direcao. Seu perfil ${analysis?.dominantProfile ?? "em construcao"} sugere que boas respostas devem virar um pequeno experimento semanal.`;
  }

  const response = await client.responses.create({
    model,
    reasoning: { effort: "low" },
    instructions: "Voce e um assistente interno de analise comportamental. Seja direto, sofisticado e acionavel.",
    input: JSON.stringify({ message, analysis })
  });

  return response.output_text;
}

function localReport(analysis: AnalysisResult, recommendations: RankedRecommendation[]) {
  const top = recommendations[0];
  return [
    `Seu perfil demonstra ${analysis.dominantProfile.toLowerCase()} com score geral de ${analysis.score}.`,
    `O sistema detectou uma combinacao forte entre ${analysis.strengths[0].toLowerCase()} e preferencia por experiencias que ampliam repertorio.`,
    `O principal ponto de atencao e ${analysis.risks[0].toLowerCase()}. A recomendacao mais compativel agora e ${top.name}, com ${top.compatibility}% de aderencia, porque ${top.explanation.toLowerCase()}`,
    "Para evoluir, mantenha um ritual semanal de revisao, escolha um conteudo profundo por vez e transforme insights em micro-acoes observaveis."
  ].join("\n\n");
}
