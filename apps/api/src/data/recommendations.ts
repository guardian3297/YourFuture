import { RecommendationItem } from "../types.js";

export const recommendations: RecommendationItem[] = [
  {
    id: "film-interstellar",
    name: "Interstellar",
    type: "filme",
    tags: ["criatividade", "filosofia", "ciencia", "visao", "futuro"],
    categories: ["criatividade", "analise", "futuro"],
    goals: ["expandir repertorio", "pensamento estrategico"],
    styles: ["cinematografico", "profundo"],
    compatibleProfiles: ["Estrategista Visionario", "Arquiteto Analitico"],
    benefits: ["estimula pensamento de longo prazo", "combina emocao e ciencia"],
    premiumSignal: "Exploração épica de escolhas, tempo e ambição humana."
  },
  {
    id: "series-severance",
    name: "Severance",
    type: "serie",
    tags: ["identidade", "trabalho", "sistemas", "comportamento"],
    categories: ["analise", "bem_estar", "futuro"],
    goals: ["entender rotina", "repensar trabalho"],
    styles: ["minimalista", "psicologico"],
    compatibleProfiles: ["Arquiteto Analitico", "Curador Profundo"],
    benefits: ["provoca reflexão sobre limites", "fortalece leitura de sistemas sociais"],
    premiumSignal: "Uma lente elegante sobre produtividade, alienação e desejo."
  },
  {
    id: "game-disco",
    name: "Disco Elysium",
    type: "jogo",
    tags: ["narrativa", "psicologia", "decisao", "filosofia"],
    categories: ["criatividade", "social", "analise"],
    goals: ["autoconhecimento", "repertorio narrativo"],
    styles: ["imersivo", "autorreflexivo"],
    compatibleProfiles: ["Curador Profundo", "Estrategista Visionario"],
    benefits: ["desenvolve interpretação emocional", "treina tomada de decisão ambígua"],
    premiumSignal: "RPG literário para quem gosta de complexidade humana."
  },
  {
    id: "book-thinking-systems",
    name: "Thinking in Systems",
    type: "livro",
    tags: ["sistemas", "estrategia", "analise", "futuro"],
    categories: ["analise", "aprendizado", "futuro"],
    goals: ["pensamento sistemico", "lideranca"],
    styles: ["conceitual", "pratico"],
    compatibleProfiles: ["Arquiteto Analitico", "Estrategista Visionario"],
    benefits: ["melhora diagnóstico de problemas", "aumenta clareza causal"],
    premiumSignal: "Base intelectual para decisões complexas."
  },
  {
    id: "course-ai-product",
    name: "AI Product Strategy",
    type: "curso",
    tags: ["ia", "produto", "estrategia", "futuro"],
    categories: ["lideranca", "aprendizado", "futuro"],
    goals: ["crescimento profissional", "produto"],
    styles: ["executivo", "aplicado"],
    compatibleProfiles: ["Estrategista Visionario", "Construtor Pragmatico"],
    benefits: ["conecta tecnologia e mercado", "aumenta repertorio de decisões"],
    premiumSignal: "Trilha para transformar IA em vantagem competitiva."
  },
  {
    id: "habit-deep-work",
    name: "Blocos de Deep Work de 90 minutos",
    type: "habito",
    tags: ["foco", "disciplina", "profundidade", "execucao"],
    categories: ["execucao", "bem_estar"],
    goals: ["produtividade", "clareza"],
    styles: ["minimalista", "ritual"],
    compatibleProfiles: ["Arquiteto Analitico", "Construtor Pragmatico"],
    benefits: ["reduz troca de contexto", "aumenta sensação de progresso"],
    premiumSignal: "Ritual simples para produção de alta densidade."
  },
  {
    id: "skill-systems-design",
    name: "Design de Sistemas e Arquitetura SaaS",
    type: "habilidade",
    tags: ["sistemas", "arquitetura", "produto", "analise"],
    categories: ["analise", "lideranca", "aprendizado"],
    goals: ["carreira", "lideranca tecnica"],
    styles: ["profissional", "estrategico"],
    compatibleProfiles: ["Arquiteto Analitico", "Construtor Pragmatico"],
    benefits: ["eleva decisões técnicas", "melhora comunicação com negócios"],
    premiumSignal: "Competência de alto valor para produtos complexos."
  },
  {
    id: "routine-weekly-review",
    name: "Revisão Semanal com Métricas Pessoais",
    type: "rotina",
    tags: ["consistencia", "feedback", "priorizacao", "clareza"],
    categories: ["execucao", "bem_estar", "lideranca"],
    goals: ["evolucao", "produtividade"],
    styles: ["calmo", "analitico"],
    compatibleProfiles: ["Construtor Pragmatico", "Arquiteto Analitico"],
    benefits: ["transforma intenção em aprendizado", "mostra tendências reais"],
    premiumSignal: "Sistema operacional leve para evolução contínua."
  },
  {
    id: "area-ai-ux",
    name: "IA Contextual para UX e Produto",
    type: "area_profissional",
    tags: ["ia", "ux", "produto", "comportamento", "futuro"],
    categories: ["criatividade", "analise", "futuro"],
    goals: ["carreira", "inovacao"],
    styles: ["futurista", "humano"],
    compatibleProfiles: ["Estrategista Visionario", "Curador Profundo"],
    benefits: ["une tecnologia e empatia", "cria produtos mais adaptativos"],
    premiumSignal: "Fronteira rara entre inteligência artificial e sensibilidade humana."
  },
  {
    id: "content-lenny",
    name: "Lenny's Newsletter",
    type: "conteudo",
    tags: ["produto", "crescimento", "lideranca", "estrategia"],
    categories: ["lideranca", "aprendizado", "execucao"],
    goals: ["produto", "carreira"],
    styles: ["tatico", "premium"],
    compatibleProfiles: ["Construtor Pragmatico", "Estrategista Visionario"],
    benefits: ["oferece frameworks acionaveis", "melhora repertorio de produto"],
    premiumSignal: "Conteúdo recorrente para operadores de alto desempenho."
  }
];
