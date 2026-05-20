import { Category } from "../types.js";

export const categories: Category[] = [
  "criatividade",
  "analise",
  "execucao",
  "social",
  "bem_estar",
  "lideranca",
  "aprendizado",
  "futuro"
];

export const questionnaire = [
  {
    id: "q1",
    title: "Quando surge um problema complexo, sua primeira reação é:",
    category: "analise",
    options: [
      { label: "Mapear variáveis e hipóteses", value: 92, tags: ["estrategia", "sistemas", "clareza"] },
      { label: "Testar uma solução rápida", value: 74, tags: ["execucao", "prototipagem"] },
      { label: "Conversar com pessoas envolvidas", value: 68, tags: ["social", "empatia"] }
    ]
  },
  {
    id: "q2",
    title: "Sua rotina ideal tem mais:",
    category: "bem_estar",
    options: [
      { label: "Blocos profundos e silêncio", value: 86, tags: ["foco", "profundidade"] },
      { label: "Ritmo flexível e estímulos", value: 78, tags: ["criatividade", "exploracao"] },
      { label: "Rituais claros e previsíveis", value: 82, tags: ["disciplina", "consistencia"] }
    ]
  },
  {
    id: "q3",
    title: "O que mais prende sua atenção em conteúdos?",
    category: "criatividade",
    options: [
      { label: "Ideias grandes sobre futuro", value: 94, tags: ["futuro", "filosofia", "visao"] },
      { label: "Técnicas aplicáveis agora", value: 84, tags: ["produtividade", "pratica"] },
      { label: "Histórias humanas e emoção", value: 76, tags: ["narrativa", "empatia"] }
    ]
  },
  {
    id: "q4",
    title: "Em equipes, você costuma assumir o papel de:",
    category: "lideranca",
    options: [
      { label: "Arquitetar direção e prioridades", value: 90, tags: ["lideranca", "estrategia"] },
      { label: "Conectar pessoas e destravar decisões", value: 82, tags: ["social", "influencia"] },
      { label: "Executar com consistência", value: 78, tags: ["execucao", "confiabilidade"] }
    ]
  },
  {
    id: "q5",
    title: "Você aprende melhor quando:",
    category: "aprendizado",
    options: [
      { label: "Cria um projeto real", value: 90, tags: ["projeto", "aprendizado_ativo"] },
      { label: "Lê referências densas", value: 84, tags: ["leitura", "teoria"] },
      { label: "Recebe feedback frequente", value: 80, tags: ["feedback", "iteracao"] }
    ]
  },
  {
    id: "q6",
    title: "Seu maior risco de produtividade é:",
    category: "execucao",
    options: [
      { label: "Pensar demais antes de lançar", value: 62, tags: ["perfeccionismo", "atrito"] },
      { label: "Assumir tarefas demais", value: 58, tags: ["sobrecarga", "priorizacao"] },
      { label: "Perder energia social", value: 64, tags: ["energia", "limites"] }
    ]
  }
];
