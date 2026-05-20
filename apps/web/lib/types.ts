export type Category = "criatividade" | "analise" | "execucao" | "social" | "bem_estar" | "lideranca" | "aprendizado" | "futuro";

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

export interface ProfileInput {
  name: string;
  role: string;
  goals: string[];
  interests: string[];
  routine: string;
  freeText: string;
  answers: Array<{ questionId: string; value: number; tags: string[]; text?: string }>;
}

export interface Recommendation {
  id: string;
  name: string;
  type: string;
  tags: string[];
  categories: Category[];
  goals: string[];
  benefits: string[];
  premiumSignal: string;
  compatibility: number;
  explanation: string;
}
