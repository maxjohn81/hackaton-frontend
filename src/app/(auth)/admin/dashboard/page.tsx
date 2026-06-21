"use client";

import { AlertTriangle, BellRing, Building2, ChevronRight, Eye, Sparkles, Truck, UsersRound, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const cards = [
  {
    icon: UsersRound,
    title: "Utilisateurs totaux",
    value: "14,284",
    badge: "+12%",
    badgeClass: "text-emerald-400",
    iconBg: "bg-slate-800 text-sky-400",
  },
  {
    icon: Building2,
    title: "Villes connectées",
    value: "42",
    badge: "Active",
    badgeClass: "text-sky-300",
    iconBg: "bg-slate-800 text-slate-200",
  },
  {
    icon: AlertTriangle,
    title: "Incidents signalés",
    value: "18",
    badge: "En cours",
    badgeClass: "text-rose-300",
    iconBg: "bg-slate-800 text-rose-400",
  },
  {
    icon: BellRing,
    title: "Alertes trafic",
    value: "326",
    badge: "Temps réel",
    badgeClass: "text-sky-300",
    iconBg: "bg-slate-800 text-sky-400",
  },
];

const summaryItems = [
  { label: "Zone Nord - Paris", value: "Fluide", progress: "85%", color: "bg-emerald-400", highlight: "text-emerald-400" },
  { label: "Centre Ville", value: "Modéré", progress: "55%", color: "bg-amber-400", highlight: "text-amber-400" },
  { label: "Périphérique Sud", value: "Critique", progress: "95%", color: "bg-rose-400", highlight: "text-rose-400" },
];

const trafficFlowData = [
  { label: "00:00", value: 14 },
  { label: "04:00", value: 18 },
  { label: "08:00", value: 22 },
  { label: "12:00", value: 28 },
  { label: "16:00", value: 25 },
  { label: "20:00", value: 20 },
  { label: "23:59", value: 16 },
];

const incidents = [
  { type: "Collision", location: "Av. des Champs-Élysées", time: "Il y a 4 min", severity: "Haute", color: "bg-rose-500", icon: AlertTriangle },
  { type: "Travaux", location: "Bd de Magenta", time: "Il y a 12 min", severity: "Moyenne", color: "bg-amber-500", icon: Wrench },
  { type: "Panne véhicule", location: "Rue de Rivoli", time: "Il y a 22 min", severity: "Faible", color: "bg-emerald-500", icon: Truck },
];

const legend = [
  { label: "Fluide", color: "bg-emerald-400" },
  { label: "Moyen", color: "bg-amber-400" },
  { label: "Congestion", color: "bg-rose-400" },
];

type StatCardProps = {
  icon: LucideIcon;
  title: string;
  value: string;
  badge: string;
  badgeClass: string;
  iconBg: string;
};

function StatCard({ icon: Icon, title, value, badge, badgeClass, iconBg }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/20">
      <div className="flex items-start justify-between gap-4">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg} shadow-lg shadow-slate-950/20`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className={`text-sm font-semibold ${badgeClass}`}>{badge}</div>
      </div>

      <div className="mt-8">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{title}</p>
        <p className="mt-3 text-4xl font-semibold text-slate-100">{value}</p>
      </div>
    </div>
  );
}

function SummaryCard() {
  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Résumé Temps Réel</p>
          <p className="mt-2 text-xs text-slate-500">Mise à jour dynamique</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/80 px-3 py-2 text-xs uppercase tracking-[0.20em] text-slate-300">
          <Sparkles className="h-4 w-4 text-slate-300" />
          Live
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {summaryItems.map((item) => (
          <div key={item.label} className="space-y-3 rounded-3xl bg-slate-950/80 p-4">
            <div className="flex items-center justify-between gap-4 text-sm font-medium text-slate-100">
              <span>{item.label}</span>
              <span className={`text-xs font-semibold ${item.highlight}`}>{item.value}</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-800">
              <div className={`h-full rounded-full ${item.color}`} style={{ width: item.progress }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrafficFlowCard() {
  const maxValue = Math.max(...trafficFlowData.map((item) => item.value));

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Flux de Trafic</p>
          <p className="mt-2 text-xs text-slate-500">Dernières 24 heures</p>
        </div>
      </div>

      <div className="mt-6 flex items-end gap-2 min-h-[220px] sm:h-36">
        {trafficFlowData.map((item) => (
          <div key={item.label} className="flex-1">
            <div className="mx-auto flex h-full max-w-[40px] items-end justify-center rounded-full bg-slate-800">
              <div className="w-full rounded-full bg-sky-400 transition-all duration-300" style={{ height: `${(item.value / maxValue) * 100}%` }} />
            </div>
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function Dashboard() {
  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-8">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            value={card.value}
            badge={card.badge}
            badgeClass={card.badgeClass}
            iconBg={card.iconBg}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] overflow-hidden">
        <div className="rounded-3xl border border-slate-700/80 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/20">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-700/80 bg-slate-950/80">
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/90 px-3 py-2 text-sm text-slate-100 shadow-xl shadow-slate-950/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/30" />
              Système opérationnel - Live
            </div>

            <div className="relative h-[260px] sm:h-[360px] lg:h-screen linear-gradient(180deg,_#0f172a_0%,_#020617_100%)]">
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-semibold uppercase tracking-[0.24em] text-slate-500/60">
                Carte de trafic
              </div>
            </div>

            <div className="absolute left-5 bottom-5 rounded-3xl border border-slate-700/80 bg-slate-950/90 p-4 text-sm text-slate-200 shadow-xl shadow-slate-950/30">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">LÉGENDE TRAFIC</p>
              <div className="mt-3 space-y-2">
                {legend.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className={`h-1.5 w-8 rounded-full ${item.color}`} />
                    <span className="text-sm text-slate-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <SummaryCard />
          <TrafficFlowCard />
        </div>
      </div>
    </div>
  );
}
