"use client";

import React, {
 createContext,
 useContext,
 useEffect,
 useState,
 useMemo,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { User } from "@/types";
import { useAuth } from "@/hooks/useAuth";

interface AuthContextType {
 user: User | null;
 isAuthenticated: boolean;
 isLoading: boolean;
 login: (user: User, token: string) => void;
 logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
 const [isReady, setIsReady] = useState(false); // On remplace mounted par isReady
 const { user, isAuthenticated, setAuth, logout: clearAuth } = useAuth();
 const router = useRouter();
 const pathname = usePathname();

 // 1. Gérer uniquement le montage initial
 useEffect(() => {
  setIsReady(true);
 }, []);

 // 2. Gérer la protection des routes séparement
 useEffect(() => {
  if (isReady && !isAuthenticated && pathname.startsWith("/admin")) {
   router.replace("/login");
  }

  // Si on est déjà connecté et qu'on va sur /login, on redirige vers dashboard
  if (isReady && isAuthenticated && pathname === "/login") {
   router.replace("/admin/dashboard");
  }
 }, [isReady, isAuthenticated, pathname, router]);

 const contextValue = useMemo(
  () => ({
   user,
   isAuthenticated,
   isLoading: !isReady,
   login: (u: User, t: string) => {
    // 1. On met à jour le store Zustand
    setAuth(u, t);

    // 2. FORCE : On s'assure que le router redirige APRES le changement d'état
    // La redirection automatique se fera via le useEffect (point 2 de ton code)
   },
   logout: () => {
    clearAuth();
    router.push("/login");
   },
  }),
  [user, isAuthenticated, isReady, setAuth, clearAuth, router],
 );

 if (!isReady) return null;

 return (
  <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
 );
};

export const useAuthSmart = () => {
 const context = useContext(AuthContext);
 if (!context) throw new Error("useAuth must be used inside AuthProvider");
 return context;
};