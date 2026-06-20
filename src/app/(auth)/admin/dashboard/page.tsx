"use client";

import { BellRing, Building2, TriangleAlert, UsersRound } from "lucide-react";
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
    icon: TriangleAlert,
    title: "Incidents signalés",
    value: "18",
    badge: "En cours",
    badgeClass: "text-rose-300",
    iconBg: "bg-slate-800 text-rose-400",
  },
  {
    icon: BellRing,
    title: "Alertes traffic",
    value: "151",
    badge: "Temps réel",
    badgeClass: "text-sky-300",
    iconBg: "bg-slate-800 text-sky-400",
  },
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

export default function Dashboard() {
  return (
    <div className="space-y-4 px-4 py-8">
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
  );
}
