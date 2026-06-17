import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  BarChart2,
  Settings,
  Theater,
} from "lucide-react";

import { User, Mail, Bell, Shield, Globe, CreditCard } from "lucide-react";

import { NavItem, NavItemAdmin, NotificationSetting } from "@/@types/types";

// ─── Nav items ────────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "Tableau de bord", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Candidats", href: "/admin/candidates", icon: Users },
  {
    label: "Réseau Talents", // Nom plus pro pour tes "FreeCandidates"
    href: "/admin/talents",
    icon: Globe,
  },
  { label: "Offres d'emploi", href: "/admin/jobs", icon: Briefcase },
  { label: "Entretiens", href: "/admin/interviews", icon: Calendar },
  { label: "Analytiques", href: "/admin/analytics", icon: BarChart2 },
  { label: "Articles", href: "/admin/article", icon: Theater },
  { label: "Paramètres", href: "/admin/settings", icon: Settings },
];

// ── Nav config ────────────────────────────────────────────────────────────────

export const navItems: NavItemAdmin[] = [
  { id: "profil", label: "Profil", icon: User },
  { id: "email", label: "Email", icon: Mail },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "securite", label: "Sécurité", icon: Shield },
  { id: "langue", label: "Langue", icon: Globe },
  { id: "abonnement", label: "Abonnement", icon: CreditCard },
];
