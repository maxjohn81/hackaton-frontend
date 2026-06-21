"use client";

import { useState } from "react";
import {
 Settings2,
 Shield,
 LogOut,
 RotateCcw,
 Save,
 Plus,
 Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useAuthSmart } from "@/contexts/AuthContext";

/**
 * SystemSettings
 * Stack : Next.js (App Router) + shadcn/ui
 *
 * Modèle de données (Prisma) :
 *   model User {
 *     id            Int            @id @default(autoincrement())
 *     username      String         @unique
 *     email         String         @unique
 *     password      String
 *     Role          Role           @default(admin)
 *     isVerified    Boolean        @default(false)
 *     refreshTokens RefreshToken[]
 *     createdAt     DateTime       @default(now())
 *     updatedAt     DateTime       @updatedAt
 *   }
 */

// Rôles disponibles côté enum Prisma (à adapter selon ton schema.prisma réel)
const roles = ["superadmin", "admin"];

const roleLabel = (role?: string) => {
 switch (role) {
  case "superadmin":
   return "Super Administrateur";
  case "admin":
   return "Administrateur";
  default:
   return role ?? "Utilisateur";
 }
};

const getInitials = (name?: string) => {
 if (!name) return "??";
 return name
  .split(" ")
  .map((part) => part[0])
  .join("")
  .toUpperCase()
  .slice(0, 2);
};

const permissions = [
 { id: "1", module: "Flux de Caméras (IA)", lecture: true, ecriture: false, supervision: true },
 { id: "2", module: "Synchronisation des Feux", lecture: true, ecriture: true, supervision: true },
 { id: "3", module: "Rapports d'Incidents", lecture: true, ecriture: true, supervision: false },
];

export default function SystemSettings() {
 const user = useAuth((state) => state.user);
 const { logout } = useAuthSmart();

 const [role, setRole] = useState(user?.Role ?? "admin");
 const [frequence, setFrequence] = useState([500]);
 const [perms, setPerms] = useState(permissions);

 const togglePermission = (id: string, field: "lecture" | "ecriture" | "supervision") => {
  setPerms((prev) =>
   prev.map((p) => (p.id === id ? { ...p, [field]: !p[field] } : p))
  );
 };

 const lastLogin = user?.updatedAt
  ? new Date(user.updatedAt).toLocaleString("fr-FR", {
   day: "numeric",
   month: "long",
   year: "numeric",
   hour: "2-digit",
   minute: "2-digit",
  })
  : "Indisponible";

 return (
  <div className="min-h-screen w-full bg-background p-4 sm:p-6 md:p-8">
   {/* Header */}
   <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div className="max-w-xl">
     <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
      Paramètres Système
     </h1>
     <p className="mt-2 text-sm text-muted-foreground">
      Gérez vos préférences administratives et les configurations
      critiques du réseau.
     </p>
    </div>

    <div className="flex flex-wrap items-center gap-2">
     <Button variant="outline" size="sm">
      <RotateCcw className="h-4 w-4" />
      Réinitialiser
     </Button>
     <Button size="sm">
      <Save className="h-4 w-4" />
      Enregistrer
     </Button>
     <Button variant="destructive" size="sm" onClick={logout}>
      <LogOut className="h-4 w-4" />
      Se déconnecter
     </Button>
    </div>
   </div>

   {/* Top grid : profil + configuration */}
   <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
    {/* Profil administrateur */}
    <Card>
     <CardContent className="flex flex-col gap-5 p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
       Profil Administrateur
      </p>

      <div className="flex items-center gap-3">
       <Avatar className="h-12 w-12">
        <AvatarImage src="/images/default/avatar.jpg" alt="Avatar" />
        <AvatarFallback>{getInitials(user?.username)}</AvatarFallback>
       </Avatar>
       <div>
        <p className="text-sm font-semibold text-foreground">
         {user?.username ?? "Utilisateur inconnu"}
        </p>
        <p className="text-xs text-muted-foreground">
         {user?.email ?? "—"}
        </p>
       </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
       <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">
         Rôle Système
        </label>
        <Select value={role} onValueChange={setRole}>
         <SelectTrigger>
          <SelectValue>{roleLabel(role)}</SelectValue>
         </SelectTrigger>
         <SelectContent>
          {roles.map((r) => (
           <SelectItem key={r} value={r}>
            {roleLabel(r)}
           </SelectItem>
          ))}
         </SelectContent>
        </Select>
       </div>

       <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">
         Dernière mise à jour du compte
        </label>
        <Input value={lastLogin} disabled />
       </div>
      </div>
     </CardContent>
    </Card>

    {/* Configuration */}
    <Card>
     <CardContent className="flex flex-col gap-5 p-4 sm:p-5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
       <Settings2 className="h-3.5 w-3.5" />
       Configuration
      </div>

      <p className="text-xs text-muted-foreground">
       Ajustez la fréquence de rafraîchissement des flux de données en
       temps réel pour optimiser la charge serveur.
      </p>

      <div className="flex flex-col gap-3">
       <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Fréquence Flux (ms)</span>
        <span className="font-semibold text-foreground">{frequence[0]} ms</span>
       </div>
       <Slider
        value={frequence}
        onValueChange={setFrequence}
        min={100}
        max={2000}
        step={50}
       />
       <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Haute performance</span>
        <span>Économe énergie</span>
       </div>
      </div>
     </CardContent>
    </Card>
   </div>

   {/* Gestion des permissions */}
   <Card className="mt-4">
    <CardContent className="p-4 sm:p-5">
     <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
       <Shield className="h-4 w-4" />
       Gestion des Permissions
      </div>
      <Button variant="ghost" size="sm">
       <Plus className="h-4 w-4" />
       Nouveau Rôle
      </Button>
     </div>

     <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[480px] text-sm">
       <thead>
        <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
         <th className="py-2 font-medium">Module de contrôle</th>
         <th className="py-2 font-medium text-center">Accès lecture</th>
         <th className="py-2 font-medium text-center">Accès écriture</th>
         <th className="py-2 font-medium text-center">Supervision</th>
         <th className="py-2 font-medium text-center">Actions</th>
        </tr>
       </thead>
       <tbody>
        {perms.map((p) => (
         <tr key={p.id} className="border-b last:border-0">
          <td className="py-3 text-foreground">{p.module}</td>
          <td className="py-3 text-center">
           <Switch
            checked={p.lecture}
            onCheckedChange={() => togglePermission(p.id, "lecture")}
           />
          </td>
          <td className="py-3 text-center">
           <Switch
            checked={p.ecriture}
            onCheckedChange={() => togglePermission(p.id, "ecriture")}
           />
          </td>
          <td className="py-3 text-center">
           <Switch
            checked={p.supervision}
            onCheckedChange={() => togglePermission(p.id, "supervision")}
           />
          </td>
          <td className="py-3 text-center">
           <Button size="icon" variant="ghost" className="h-7 w-7">
            <Pencil className="h-3.5 w-3.5" />
           </Button>
          </td>
         </tr>
        ))}
       </tbody>
      </table>
     </div>
    </CardContent>
   </Card>
  </div>
 );
}