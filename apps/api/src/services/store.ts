import bcrypt from "bcryptjs";
import { getDb } from "./db.js";
import { AnalysisResult } from "../types.js";

const memory = {
  users: new Map<string, any>(),
  analyses: new Map<string, AnalysisResult[]>()
};

export async function findOrCreateUser(email: string, password: string, name = "Alex Lumina") {
  const db = await getDb().catch(() => null);
  if (db) {
    const users = db.collection("users");
    const found = await users.findOne({ email });
    if (found) return found;
    const user = { email, name, passwordHash: await bcrypt.hash(password, 10), createdAt: new Date().toISOString() };
    await users.insertOne(user);
    return user;
  }

  if (!memory.users.has(email)) {
    memory.users.set(email, { email, name, passwordHash: await bcrypt.hash(password, 10), createdAt: new Date().toISOString() });
  }
  return memory.users.get(email);
}

export async function saveAnalysis(email: string, analysis: AnalysisResult) {
  const db = await getDb().catch(() => null);
  if (db) {
    await db.collection("analyses").insertOne({ email, ...analysis });
    return analysis;
  }
  const list = memory.analyses.get(email) ?? [];
  list.unshift(analysis);
  memory.analyses.set(email, list.slice(0, 20));
  return analysis;
}

export async function listAnalyses(email: string) {
  const db = await getDb().catch(() => null);
  if (db) {
    return db.collection("analyses").find({ email }).sort({ createdAt: -1 }).limit(20).toArray();
  }
  return memory.analyses.get(email) ?? [];
}
