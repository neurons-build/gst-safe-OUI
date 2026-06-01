"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/sb/client";

type Profile = {
  username: string | null;
};

type UserContextValue = {
  loading: boolean;
  error: string | null;
  profile: Profile | null;
  userEmail: string | null;
  roleId: "member" | "admin" | null;
  roleRank: number | null;
  refresh: () => Promise<void>;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<"member" | "admin" | null>(null);
  const [roleRank, setRoleRank] = useState<number | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      // Try up to 3 times with small backoff to allow session cookies to settle
      let lastErr: Error | null = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await fetch("/api/profile", {
            credentials: "include",
            cache: "no-store",
          });
          if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(body?.error || `Request failed (${res.status})`);
          }
          const data = (await res.json()) as {
            profile: Profile;
            email?: string | null;
            roleId?: "member" | "admin" | null;
            roleRank?: number | null;
          };
          setProfile(data.profile ?? null);
          setUserEmail(data.email ?? null);
          setRoleId(data.roleId ?? null);
          setRoleRank(data.roleRank ?? null);
          lastErr = null;
          break;
        } catch (e) {
          lastErr = e instanceof Error ? e : new Error(String(e));
          // small delay before retrying
          await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
        }
      }
      if (lastErr) throw lastErr;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch user profile");
      setProfile(null);
      setUserEmail(null);
      setRoleId(null);
      setRoleRank(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // Listen for auth state changes to proactively refresh user/profile
    const supabase = createClient();
    const { data: sub } = supabase.auth.onAuthStateChange((_event) => {
      // On SIGNED_IN, TOKEN_REFRESHED, SIGNED_OUT etc., try to reload
      void load();
    });
    return () => {
      sub?.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<UserContextValue>(
    () => ({ loading, error, profile, userEmail, roleId, roleRank, refresh: load }),
    [loading, error, profile, userEmail, roleId, roleRank],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
}
