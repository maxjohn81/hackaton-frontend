"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthSmart } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function LogoutButton() {
 const { logout } = useAuthSmart();

 const handleLogout = () => {
  logout();
  toast.success("Vous avez été déconnecté.");
 };

 return (
  <Button
   variant="ghost"
   onClick={handleLogout}
   className="flex items-center gap-2 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
  >
   <LogOut size={18} />
   <span className="font-semibold">Déconnexion</span>
  </Button>
 );
}