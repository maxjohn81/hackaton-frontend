"use client";

import { useState } from "react";
import { Megaphone, History, SlidersHorizontal, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";

/**
 * AlertsDashboard
 * Stack : Next.js (App Router) + shadcn/ui
 *
 * Installation :
 *   npx shadcn@latest add button input textarea card badge select
 *
 * Thème : uniquement des couleurs sémantiques shadcn (bg-background,
 * text-foreground, text-muted-foreground, border, bg-muted, bg-card...).
 * S'adapte automatiquement au thème sombre défini dans globals.css.
 *
 * Modèle de données attendu (ex. Prisma) :
 *   model Alerte {
 *     id          String   @id @default(cuid())
 *     titre       String
 *     zone        String
 *     priorite    String   // "information" | "urgence" | "critique"
 *     message     String
 *     usersCount  Int?
 *     zoneLabel   String?  // ex: "Zone Sud-Est"
 *     createdAt   DateTime @default(now())
 *   }
 */

// ---- Helper : transforme un datetime en "il y a Xmin" ----
function timeAgo(date) {
 const d = typeof date === "string" ? new Date(date) : date;
 const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

 if (seconds < 60) return "à l'instant";
 const minutes = Math.floor(seconds / 60);
 if (minutes < 60) return `il y a ${minutes} min`;
 const hours = Math.floor(minutes / 60);
 if (hours < 24) return `il y a ${hours} h ${minutes % 60}min`;
 const days = Math.floor(hours / 24);
 return `il y a ${days} j`;
}

const priorityLabels = {
 information: "Information",
 urgence: "Urgence",
 critique: "Critique",
};

const zones = [
 "Centre-Ville",
 "Zone Sud-Est",
 "Zone Nord",
 "Tunnel Sud",
 "Périphérique",
];

// ---- Données d'exemple (à remplacer par un fetch /api/alertes) ----
const alertes = [
 {
  id: "ALT-301",
  titre: "Incident majeur : Tunnel fermé",
  zone: "Zone Sud-Est",
  priorite: "critique",
  message:
   "Collision en chaîne dans le tunnel sous la Marne. Évacuation en cours. Toutes les issues sont bloquées. Déviation par l'A86 fortement conseillée.",
  usersCount: 45000,
  createdAt: new Date(Date.now() - 5 * 60 * 1000),
 },
 {
  id: "ALT-298",
  titre: "Panne de feu de signalisation",
  zone: "Centre-Ville",
  priorite: "urgence",
  message:
   "Intersection Rue de la République / Quai de Seine. Circulation alternée manuelle. Équipe technique en route.",
  usersCount: 12400,
  createdAt: new Date(Date.now() - 42 * 60 * 1000),
 },
 {
  id: "ALT-290",
  titre: "Travaux de maintenance de nuit",
  zone: "Périphérique",
  priorite: "information",
  message:
   "Réfection de la chaussée prévue entre 22h et 5h sur le boulevard périphérique. Réduction à une seule voie.",
  usersCount: null,
  createdAt: new Date(Date.now() - (2 * 60 + 15) * 60 * 1000),
 },
];

export default function AlertsDashboard() {
 const [titre, setTitre] = useState("");
 const [zone, setZone] = useState("");
 const [priorite, setPriorite] = useState("");
 const [message, setMessage] = useState("");

 const handleSubmit = () => {
  // Brancher ici un POST vers /api/alertes
  console.log({ titre, zone, priorite, message });
 };

 return (
  <div className="min-h-screen w-full bg-background p-4 sm:p-6 md:p-8">
   {/* Header */}
   <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div className="max-w-xl">
     <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
      Système d&apos;Alertes
     </h1>
     <p className="mt-2 text-sm text-muted-foreground">
      Diffusez des informations critiques en temps réel sur le réseau
      urbain.
     </p>
    </div>

    <Badge variant="secondary" className="flex w-fit items-center gap-1.5 px-3 py-1.5">
     <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-50" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
     </span>
     Système opérationnel
    </Badge>
   </div>

   {/* Content grid */}
   <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[380px_1fr]">
    {/* Left : form */}
    <Card>
     <CardContent className="flex flex-col gap-4 p-4 sm:p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
       <Megaphone className="h-4 w-4" />
       Nouvelle Alerte
      </div>

      <div className="flex flex-col gap-1.5">
       <label className="text-xs font-medium text-muted-foreground">
        Titre de l&apos;alerte
       </label>
       <Input
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        placeholder="Ex: Accident Zone Nord"
       />
      </div>

      <div className="grid grid-cols-2 gap-3">
       <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">
         Zone / Ville
        </label>
        <Select value={zone} onValueChange={setZone}>
         <SelectTrigger>
          <SelectValue placeholder="Sélectionner" />
         </SelectTrigger>
         <SelectContent>
          {zones.map((z) => (
           <SelectItem key={z} value={z}>
            {z}
           </SelectItem>
          ))}
         </SelectContent>
        </Select>
       </div>

       <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">
         Priorité
        </label>
        <Select value={priorite} onValueChange={setPriorite}>
         <SelectTrigger>
          <SelectValue placeholder="Information" />
         </SelectTrigger>
         <SelectContent>
          {Object.entries(priorityLabels).map(([value, label]) => (
           <SelectItem key={value} value={value}>
            {label}
           </SelectItem>
          ))}
         </SelectContent>
        </Select>
       </div>
      </div>

      <div className="flex flex-col gap-1.5">
       <label className="text-xs font-medium text-muted-foreground">
        Message
       </label>
       <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Description détaillée pour les usagers..."
        className="min-h-[100px] resize-none"
       />
      </div>

      <Button onClick={handleSubmit} className="mt-1 w-full">
       <Send className="h-4 w-4" />
       Diffuser l&apos;alerte
      </Button>
     </CardContent>
    </Card>

    {/* Right : history */}
    <div className="flex flex-col gap-3">
     <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
       <History className="h-4 w-4" />
       Historique des diffusions
      </div>
      <Button size="icon" variant="outline">
       <SlidersHorizontal className="h-4 w-4" />
      </Button>
     </div>

     <div className="flex flex-col gap-3">
      {alertes.map((alerte) => (
       <AlerteCard key={alerte.id} alerte={alerte} />
      ))}
     </div>
    </div>
   </div>
  </div>
 );
}

function AlerteCard({ alerte }) {
 return (
  <Card>
   <CardContent className="flex flex-col gap-2 p-4">
    <div className="flex items-start justify-between gap-2">
     <div>
      <h3 className="text-sm font-semibold text-foreground">
       {alerte.titre}
      </h3>
      <p className="mt-0.5 text-xs font-medium text-muted-foreground">
       Priorité : {priorityLabels[alerte.priorite]}
      </p>
     </div>
     <Badge variant={alerte.priorite === "critique" ? "default" : "secondary"}>
      {priorityLabels[alerte.priorite]}
     </Badge>
    </div>

    <p className="text-sm text-muted-foreground">{alerte.message}</p>

    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
     <span>{timeAgo(alerte.createdAt)}</span>
     <span>·</span>
     <span>{alerte.zone}</span>
     {alerte.usersCount && (
      <>
       <span>·</span>
       <span>{alerte.usersCount.toLocaleString("fr-FR")} usagers</span>
      </>
     )}
    </div>

    <Button variant="link" className="h-auto w-fit p-0 text-xs">
     Détails de diffusion
    </Button>
   </CardContent>
  </Card>
 );
}