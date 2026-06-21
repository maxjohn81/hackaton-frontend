"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Share2, Sliders, Car, Construction, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllIncidentsService, Incident } from "@/services/incidentService";
import { toast } from "sonner";

function timeAgo(date: string | Date) {
 const d = typeof date === "string" ? new Date(date) : date;
 const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

 if (seconds < 60) return "à l'instant";
 const minutes = Math.floor(seconds / 60);
 if (minutes < 60) return `il y a ${minutes} min`;
 const hours = Math.floor(minutes / 60);
 if (hours < 24) return `il y a ${hours} h`;
 const days = Math.floor(hours / 24);
 return `il y a ${days} j`;
}

const defaultImages: Record<string, string> = {
 accident: "/images/default/accident.jpg",
 embouteillage: "/images/default/embouteillage.jpg",
 route_bloquee: "/images/default/route_bloquee.jpg",
};

const fallbackIcons: Record<string, any> = {
 accident: Car,
 embouteillage: AlertTriangle,
 route_bloquee: Construction,
};

const filters = ["Tous les types", "accident", "embouteillage", "route_bloquee"];

const typeLabels: Record<string, string> = {
 accident: "Accident",
 embouteillage: "Embouteillage",
 route_bloquee: "Route bloquée",
};

const statusLabels: Record<string, string> = {
 en_attente: "En attente",
 confirme: "Confirmé",
 resolu: "Résolu",
};

const actionLabels: Record<string, string> = {
 accident: "Déployer unité",
 embouteillage: "Ajuster feux",
 route_bloquee: "Marquer rouvert",
};

export default function IncidentDashboard() {
 const router = useRouter();
 const [activeFilter, setActiveFilter] = useState("Tous les types");
 const [query, setQuery] = useState("");
 const [incidents, setIncidents] = useState<Incident[]>([]);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const fetchIncidents = async () => {
   const result = await getAllIncidentsService();
   if (result.success) {
    setIncidents(result.data);
   } else {
    toast.error(result.message);
   }
   setIsLoading(false);
  };
  fetchIncidents();

  // Rafraîchissement automatique toutes les 30s pour rester "Live"
  const interval = setInterval(fetchIncidents, 30000);
  return () => clearInterval(interval);
 }, []);

 const filtered = incidents.filter((incident) => {
  const matchesFilter = activeFilter === "Tous les types" || incident.type === activeFilter;
  const matchesQuery =
   query.trim() === "" ||
   incident.ville.toLowerCase().includes(query.toLowerCase()) ||
   incident.id.toLowerCase().includes(query.toLowerCase());
  return matchesFilter && matchesQuery;
 });

 const activeCount = incidents.filter((i) => i.status !== "resolu").length;
 const resolvedCount = incidents.filter((i) => i.status === "resolu").length;

 return (
  <div className="min-h-screen w-full bg-background p-4 sm:p-6 md:p-8">
   {/* Header */}
   <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-start md:justify-between">
    <div className="max-w-xl">
     <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
      Surveillance des incidents
     </h1>
     <p className="mt-2 text-sm text-muted-foreground">
      Gestion centralisée des événements critiques et temps réel sur
      l&apos;ensemble du réseau urbain.
     </p>
    </div>

    <div className="grid grid-cols-2 gap-3 sm:flex">
     <StatCard label="Actifs" value={activeCount} />
     <StatCard label="Résolus" value={resolvedCount} />
    </div>
   </div>

   {/* Toolbar */}
   <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div className="flex flex-1 flex-wrap items-center gap-2">
     <div className="relative w-full sm:w-auto sm:flex-1 sm:min-w-[220px] sm:max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       placeholder="Rechercher une zone ou un ID..."
       className="pl-9"
      />
     </div>

     <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
       <Button
        key={f}
        variant={activeFilter === f ? "default" : "outline"}
        size="sm"
        onClick={() => setActiveFilter(f)}
       >
        {f === "Tous les types" && <Sliders className="h-3.5 w-3.5" />}
        {typeLabels[f] || f}
       </Button>
      ))}
     </div>
    </div>

    <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
     <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-50" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
     </span>
     Live
    </div>
   </div>

   {/* Incident list */}
   <div className="mt-6 flex flex-col gap-3">
    {isLoading ? (
     <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      Chargement des incidents...
     </div>
    ) : filtered.length === 0 ? (
     <p className="py-8 text-center text-sm text-muted-foreground">
      Aucun incident .
     </p>
    ) : (
     filtered.map((incident) => (
      <IncidentCard
       key={incident.id}
       incident={incident}
       onClick={() => router.push(`/admin/incidents/${incident.id}`)}
      />
     ))
    )}
   </div>
  </div>
 );
}

function StatCard({ label, value }: { label: string; value: number }) {
 return (
  <Card className="px-3 py-2.5 sm:px-4">
   <CardContent className="p-0">
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    <p className="mt-0.5 text-lg sm:text-xl font-semibold text-foreground">{value}</p>
   </CardContent>
  </Card>
 );
}

function IncidentCard({ incident, onClick }: { incident: Incident; onClick: () => void }) {
 const [imgError, setImgError] = useState(false);
 const FallbackIcon = fallbackIcons[incident.type];
 const imageSrc = incident.image || defaultImages[incident.type];

 return (
  <Card className="cursor-pointer transition-colors hover:border-foreground/30" onClick={onClick}>
   <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
    <div className="flex h-14 w-full sm:w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted sm:h-14">
     {!imgError ? (
      <img
       src={imageSrc}
       alt={typeLabels[incident.type]}
       onError={() => setImgError(true)}
       className="h-14 w-full object-cover sm:w-14"
      />
     ) : (
      <FallbackIcon className="h-6 w-6 text-muted-foreground" />
     )}
    </div>

    <div className="flex-1 min-w-0">
     <div className="flex flex-wrap items-center gap-2">
      <h3 className="text-sm font-semibold text-foreground">{incident.description}</h3>
      <Badge variant="secondary">{statusLabels[incident.status]}</Badge>
     </div>
     <p className="mt-1 text-xs text-muted-foreground">
      {timeAgo(incident.createdAt)} · {typeLabels[incident.type]} · {incident.id}
     </p>
     <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
      {incident.ville}
     </p>
    </div>

    <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
     <Button size="sm" className="flex-1 sm:flex-none">
      {actionLabels[incident.type]}
     </Button>
     <Button size="icon" variant="outline">
      <Share2 className="h-4 w-4" />
     </Button>
    </div>
   </CardContent>
  </Card>
 );
}