import { AnalysisResult, ProfileInput, Recommendation } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function login(email: string, password: string, name?: string) {
  return request<{ token: string; user: { email: string; name: string } }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password, name })
  });
}

export async function submitAnalysis(profile: ProfileInput, token: string) {
  return request<{ analysis: AnalysisResult; recommendations: Recommendation[]; aiReport: string }>("/analysis", {
    method: "POST",
    token,
    body: JSON.stringify(profile)
  });
}

export async function askAssistant(message: string, token: string, analysis?: AnalysisResult) {
  return request<{ answer: string }>("/assistant", {
    method: "POST",
    token,
    body: JSON.stringify({ message, analysis })
  });
}

async function request<T>(path: string, init: RequestInit & { token?: string } = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.token ? { Authorization: `Bearer ${init.token}` } : {}),
      ...init.headers
    }
  });
  if (!response.ok) throw new Error((await response.json()).error || "Falha na requisicao");
  return response.json();
}
