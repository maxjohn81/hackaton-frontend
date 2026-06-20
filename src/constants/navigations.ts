import {
  TriangleAlert,
  LayoutDashboard,
  Building,
  Users,
  BellRing,
  Dam,
  Settings,
} from "lucide-react";

import { User, Mail, Bell, Shield, Globe, CreditCard } from "lucide-react";

import { NavItem, NavItemAdmin, NotificationSetting } from "@/@types/types";

// ─── Nav items ────────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "Tableau de bord", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Gestion des villes", href: "/admin/cities", icon: Building },
  { label: "Utilisateurs", href: "/admin/users", icon: Users },
  {
    label: "Incidents",href: "/admin/",icon: TriangleAlert,
  },
  { label: "Alertes", href: "/admin/jobs", icon: BellRing },
  { label: "Controle des feux", href: "/admin/interviews", icon:  Dam },
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
