"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthState {
  token: string;
  user: { email: string; name: string } | null;
  setSession: (token: string, user: { email: string; name: string }) => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("lumina-session");
    if (!saved) return;
    try {
      const session = JSON.parse(saved) as { token: string; user: { email: string; name: string } };
      setToken(session.token);
      setUser(session.user);
    } catch {
      window.localStorage.removeItem("lumina-session");
    }
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      setSession(nextToken: string, nextUser: { email: string; name: string }) {
        setToken(nextToken);
        setUser(nextUser);
        window.localStorage.setItem("lumina-session", JSON.stringify({ token: nextToken, user: nextUser }));
      }
    }),
    [token, user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
