"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
 Navigation,
 AlertOctagon,
 ShieldCheck,
 Stethoscope,
 Flame,
 Play,
 Repeat,
 type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * TrafficLightControl
 * Stack : Next.js (App Router, TypeScript) + shadcn/ui + react-leaflet
 *
 * Installation :
 *   npx shadcn@latest add button card badge
 *   npm install react-leaflet leaflet
 *   npm install -D @types/leaflet
 *
 * Fichiers requis :
 *   - ./TrafficMap.tsx  (composant carte Leaflet, fourni séparément)
 *
 * La carte est importée en dynamique avec ssr:false car Leaflet a besoin
 * de `window`, indisponible côté serveur Next.js.
 *
 * Note couleurs : les feux (rouge/jaune/vert) gardent des couleurs
 * littérales car elles représentent un état physique réel. Le reste de
 * l'UI utilise les tokens sémantiques shadcn (dark mode automatique).
 */

type Mode = "auto" | "manuel" | "attente";
type LightColor = "rouge" | "jaune" | "vert";
type IntersectionId = "A-102" | "B-204" | "C-310";

interface QuickAction {
 label: string;
 icon: LucideIcon;
}

interface Camera {
 label: string;
 time: string;
 img: string;
}

interface IntersectionInfo {
 nom: string;
 adresse: string;
 volume: number;
 attente: number;
}

const TrafficMap = dynamic(() => import("@/components/TrafficMap"), {
 ssr: false,
 loading: () => (
  <div className="flex h-full w-full items-center justify-center bg-muted">
   <p className="text-sm text-muted-foreground">Chargement de la carte...</p>
  </div>
 ),
});

const fluxData: number[] = [40, 65, 30, 80, 55, 90, 45, 70, 35, 60];

const quickActions: QuickAction[] = [
 { label: "Escorte Police", icon: ShieldCheck },
 { label: "Couloir Médical", icon: Stethoscope },
 { label: "Intervention Incendie", icon: Flame },
];

const cameras: Camera[] = [
 { label: "CAM 04 - HAUSSMANN", time: "ENC 00:15:32", img: "/images/default/camera-nuit-1.jpg" },
 { label: "CAM 09 - TRONCHET", time: "ENC 00:15:32", img: "/images/default/camera-nuit-2.jpg" },
];

const intersectionsData: Record<IntersectionId, IntersectionInfo> = {
 "A-102": { nom: "Carrefour A-102", adresse: "Bd. Haussmann x Rue Tronchet", volume: 1240, attente: 42 },
 "B-204": { nom: "Carrefour B-204", adresse: "Quai de Seine x Rue de la République", volume: 980, attente: 58 },
 "C-310": { nom: "Carrefour C-310", adresse: "Av. de la Bourdonnais", volume: 1510, attente: 35 },
};

export default function TrafficLightControl() {
 const [activeId, setActiveId] = useState<IntersectionId>("A-102");
 const [mode, setMode] = useState<Mode>("attente");
 const [activeLight, setActiveLight] = useState<LightColor>("jaune");

 const intersection = intersectionsData[activeId];

 const handleSelect = (id: string) => {
  if (id in intersectionsData) {
   setActiveId(id as IntersectionId);
  }
 };

 return (
  <div className="relative min-h-screen w-full overflow-hidden bg-background">
   {/* ---- Calque carte réelle ---- */}
   <div className="absolute inset-0">
    <TrafficMap activeId={activeId} onSelect={handleSelect} />
   </div>

   {/* ---- Overlay : Urgence priorité (haut droite) ---- */}
   <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
    <Button variant="destructive" size="sm" className="shadow-lg">
     <AlertOctagon className="h-4 w-4" />
     Urgence priorité
    </Button>
   </div>

   {/* ---- Overlay : Actions rapides ---- */}
   <Card className="absolute right-4 top-16 z-10 w-56 shadow-lg sm:right-6 sm:top-20">
    <CardContent className="flex flex-col gap-2 p-3">
     <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      Actions Rapides
     </p>
     {quickActions.map(({ label, icon: Icon }) => (
      <Button key={label} variant="outline" size="sm" className="justify-start">
       <Icon className="h-3.5 w-3.5" />
       {label}
      </Button>
     ))}
    </CardContent>
   </Card>

   {/* ---- Overlay : Panneau gauche (feu + flux) ---- */}
   <div className="absolute left-4 top-4 z-10 flex w-72 flex-col gap-3 sm:left-6 sm:top-6">
    {/* Carte feu de circulation */}
    <Card className="shadow-lg">
     <CardContent className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
       <Navigation className="h-4 w-4 text-muted-foreground" />
       <div>
        <p className="text-sm font-semibold text-foreground">
         {intersection.nom}
        </p>
        <p className="text-xs text-muted-foreground">
         {intersection.adresse}
        </p>
       </div>
      </div>

      {/* Feu de circulation visuel */}
      <div className="flex justify-center">
       <div className="flex flex-col gap-2 rounded-xl bg-zinc-950 p-3">
        <LightDot active={activeLight === "rouge"} color="bg-red-500" glow="shadow-red-500/60" />
        <LightDot active={activeLight === "jaune"} color="bg-amber-400" glow="shadow-amber-400/60" />
        <LightDot active={activeLight === "vert"} color="bg-green-500" glow="shadow-green-500/60" />
       </div>
      </div>

      <div className="text-center">
       <p className="text-xs text-muted-foreground">Statut actuel</p>
       <p className="text-sm font-semibold text-amber-400">
        {mode === "attente" ? "Attente" : mode === "auto" ? "Automatique" : "Manuel"}
       </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
       <Button
        variant={mode === "auto" ? "default" : "outline"}
        size="sm"
        onClick={() => setMode("auto")}
       >
        <Play className="h-3.5 w-3.5" />
        Auto
       </Button>
       <Button
        variant={mode === "manuel" ? "default" : "outline"}
        size="sm"
        onClick={() => setMode("manuel")}
       >
        <Repeat className="h-3.5 w-3.5" />
        Manuel
       </Button>
      </div>
     </CardContent>
    </Card>

    {/* Flux en temps réel */}
    <Card className="shadow-lg">
     <CardContent className="flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
       <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Flux en temps réel
       </p>
       <Badge variant="secondary" className="text-[10px]">Live</Badge>
      </div>

      <div className="flex h-16 items-end gap-1">
       {fluxData.map((v, i) => (
        <div
         key={i}
         className="flex-1 rounded-sm bg-foreground/70"
         style={{ height: `${v}%` }}
        />
       ))}
      </div>

      <div className="grid grid-cols-2 gap-2 border-t pt-3 text-center">
       <div>
        <p className="text-[10px] uppercase text-muted-foreground">Volume</p>
        <p className="text-sm font-semibold text-foreground">
         {intersection.volume.toLocaleString("fr-FR")}
        </p>
       </div>
       <div>
        <p className="text-[10px] uppercase text-muted-foreground">Attente moy.</p>
        <p className="text-sm font-semibold text-foreground">{intersection.attente}s</p>
       </div>
      </div>
     </CardContent>
    </Card>
   </div>

   {/* ---- Overlay : Caméras (bas droite) ---- */}
   <div className="absolute bottom-4 right-4 z-10 grid grid-cols-2 gap-3 sm:bottom-6 sm:right-6">
    {cameras.map((cam) => (
     <CameraThumb key={cam.label} {...cam} />
    ))}
   </div>

   <div className="relative h-screen" />
  </div>
 );
}

function LightDot({ active, color, glow }: { active: boolean; color: string; glow: string }) {
 return (
  <div
   className={`h-8 w-8 rounded-full sm:h-9 sm:w-9 ${active ? `${color} shadow-lg ${glow}` : "bg-zinc-800"
    }`}
  />
 );
}

function CameraThumb({ label, time, img }: Camera) {
 const [error, setError] = useState(false);

 return (
  <div className="relative h-20 w-32 overflow-hidden rounded-md border border-border shadow-lg sm:h-24 sm:w-40">
   {!error ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
     src={img}
     alt={label}
     onError={() => setError(true)}
     className="h-full w-full object-cover"
    />
   ) : (
    <div className="flex h-full w-full items-center justify-center bg-muted">
     <p className="text-[10px] text-muted-foreground">Pas de flux</p>
    </div>
   )}
   <div className="absolute inset-x-0 bottom-0 bg-background/80 px-1.5 py-1">
    <p className="truncate text-[9px] font-medium text-foreground">{label}</p>
    <p className="text-[8px] text-muted-foreground">{time}</p>
   </div>
  </div>
 );
}