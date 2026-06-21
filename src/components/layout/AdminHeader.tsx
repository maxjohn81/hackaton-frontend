"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ModeToggle from "../mode_toggle";
import { Button } from "../ui/button";
import { Menu, Power, Search, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { CardTitle } from "../ui/card";
// import { api } from "@/api"; // Import de ton instance API
import { toast } from "sonner";
import LogoutButton from "../LogoutBtn";

export default function AdminHeader({
  toggleMenu,
}: {
  toggleMenu: () => void;
}) {
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);



  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      // 1. Appel au backend pour invalider la session (optionnel mais propre)
      // await api.auth.logout();
    } catch (error) {
      console.error("Erreur lors de la déconnexion backend:", error);
      // On continue le processus même si le backend échoue
      // pour ne pas bloquer l'utilisateur localement.
    } finally {
      // 2. Nettoyage du stockage local
      localStorage.removeItem("zenith-access-token");
      localStorage.removeItem("zenith-auth-storage");
      // 3. Feedback et redirection
      toast.success("Déconnexion réussie");
      router.push("/login");
      setIsLoggingOut(false);
    }
  };


  return (
    <header className="h-16 border-b flex items-center justify-between px-4 gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
      <div className="md:hidden flex items-center justify-center">
        <Button
          variant="ghost"
          onClick={toggleMenu}
          className="p-2 border rounded-xl hover:bg-primary/5 transition-all"
        >
          <CardTitle>
            <Menu size={20} />
          </CardTitle>
        </Button>
      </div>

      {/* Input search */}
      <div className="max-w-md w-full relative hidden sm:block">
        <Input
          type="search"
          className="w-full pl-10 h-10 rounded-xl bg-muted/50 border-none text-xs focus-visible:ring-primary/20"
          placeholder="Rechercher un candidat, une offre..."
        />
        <Search
          size={16}
          className="absolute top-3 left-4 text-muted-foreground"
        />
      </div>

      <div className="flex items-center justify-end gap-3 ml-auto">
        <ModeToggle />

        <div className="h-6 w-[1px] bg-border mx-2 hidden md:block" />

        <LogoutButton/>
      </div>
    </header>
  );
}
