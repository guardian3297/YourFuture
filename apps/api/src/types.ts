export type Category =
  | "criatividade"
  | "analise"
  | "execucao"
  | "social"
  | "bem_estar"
  | "lideranca"
  | "aprendizado"
  | "futuro";

export type RecommendationType =
  | "filme"
  | "serie"
  | "jogo"
  | "livro"
  | "curso"
  | "habito"
  | "conteudo"
  | "habilidade"
  | "rotina"
  | "area_profissional";

export interface Answer {
  questionId: string;
  value: number;
  tags: string[];
  text?: string;
}

export interface ProfileInput {
  name: string;
  role: string;
  goals: string[];
  interests: string[];
  routine: string;
  answers: Answer[];
  freeText: string;
}

export interface AnalysisResult {
  id: string;
  createdAt: string;
  score: number;
  level: number;
  xp: number;
  dominantProfile: string;
  categories: Record<Category, number>;
  tags: Record<string, number>;
  strengths: string[];
  risks: string[];
  patterns: string[];
  trends: Array<{ label: string; score: number }>;
  profile: ProfileInput;
}

export interface RecommendationItem {
  id: string;
  name: string;
  type: RecommendationType;
  tags: string[];
  categories: Category[];
  goals: string[];
  styles: string[];
  compatibleProfiles: string[];
  benefits: string[];
  premiumSignal: string;
}

export interface RankedRecommendation extends RecommendationItem {
  compatibility: number;
  explanation: string;
}
