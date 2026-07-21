import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { AuthUser } from "../types";
import { AuthContext } from "./AuthContext";
import { authEndpoints } from "../api/authEndpoints";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = user !== null;
  const value = useMemo(
    () => ({ user, isAuthenticated, isLoading, setUser, setIsLoading }),
    [isAuthenticated, isLoading, user],
  );

  useEffect(() => {
    const loadUser = async () => {
      setUser({
        id: 1,
        email: "test@example.com",
        name: "Test User",
      });

    //   try {
    //     const response = await fetch(authEndpoints.me, {
    //       credentials: "include",
    //     });

    //     if (!response.ok) {
    //       setUser(null);
    //     } else {
    //       const user = await response.json();
    //       setUser(user);
    //     }
    //   } catch {
    //     setUser(null);
    //   } finally {
    //     setIsLoading(false);
    //   }
    };

    loadUser();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
