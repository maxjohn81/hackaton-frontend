export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

// candidat
export type StatutType = "En attente" | "Entretien" | "Shortlisté" | "Accepté";
export interface Candidate {
  id: number;
  name: string;
  initials: string;
  poste: string;
  statut: StatutType;
  date: string;
}

// Offre d'emploi
export type StatutOffre = "Ouvert" | "Fermé" | "En pause";
export interface Offre {
  id: number;
  titre: string;
  categorie: string;
  statut: StatutOffre;
  location: string;
  contrat: string;
  salaire: string;
  publie: string;
  candidatures: number;
  avatars: string[];
  description: string;
}

// interview
export type InterviewStatus = "Confirmé" | "En attente" | "Annulé";
export type ModeInterview = "visio" | "présentiel";
export interface Interview {
  id: number;
  candidateId: number;
  date: string;
  time: string;
  duration: string;
  mode: ModeInterview;
  meetLink?: string;
  interviewer: string;
  status: InterviewStatus;
  createdAt: string;
  candidate?: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    cv?: string;
    applicationStatus?: string;
  };

  // Pour compatibilité avec tes anciens composants si nécessaire
  name?: string;
  initials?: string;
  role?: string;
}

// metrics

export interface Metric {
  id: number;
  label: string;
  value: string;
  trend: string;
  positive: boolean;
}

export type NavItemAdmin = {
  id: string;
  label: string;
  icon: React.ElementType;
};

// ── Notifications Section ─────────────────────────────────────────────────────

export type NotificationSetting = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};
