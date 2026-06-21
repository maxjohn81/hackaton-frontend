import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        // Log de debug pour vérifier ce qui arrive au store
        //console.log("Données reçues par Zustand:", { user, token });
        set({ user, token, isAuthenticated: true });
      },
      logout: () =>
        set(() => {
          if (typeof window !== "undefined") {
            localStorage.removeItem("smart-traffic-access-token");
          }
          return { user: null, token: null, isAuthenticated: false };
        }),
    }),
    {
      name: "smart-auth-storage",
      // Ajoute ceci pour forcer l'utilisation du localStorage standard
      storage: {
        getItem: (name) =>
          localStorage.getItem(name)
            ? JSON.parse(localStorage.getItem(name)!)
            : null,
        setItem: (name, value) =>
          localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
