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
  { label: "Utilisateurs", href: "/admin/users", icon: Users },
  {
    label: "Incidents",href: "/admin/incident",icon: TriangleAlert,
  },
  { label: "Alertes", href: "/admin/alerte", icon: BellRing },
  { label: "Controle des feux", href: "/admin/controlle", icon:  Dam },
  { label: "Paramètres", href: "/admin/parametre", icon: Settings },
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
