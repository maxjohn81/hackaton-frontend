"use client";
import AdminHeader from "@/components/layout/AdminHeader";
import AdminNavbar from "@/components/layout/AdminNavbar";
import { ThemeProvider } from "@/components/theme-provider";
import React, { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="flex h-screen">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {/* 1. Sidebar - Fixe à gauche */}
        <AdminNavbar
          openMenu={openMenu}
          toggleMenu={() => setOpenMenu(!openMenu)}
        />
        {/* 2. Zone principale */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <AdminHeader toggleMenu={() => setOpenMenu(!openMenu)} />
          {/* 3. Contenu de la page (Scrollable) */}
          <main className="flex-1 scrollbar-thin-custom overflow-y-auto p-2">
            {children}
          </main>
        </div>
      </ThemeProvider>
    </div>
  );
}
