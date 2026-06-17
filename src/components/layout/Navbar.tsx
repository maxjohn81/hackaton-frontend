"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode_toggle";
import LanguageSelector from "@/components/language-selector";

export default function Navbar() {
 const [isOpen, setIsOpen] = useState(false);
 const [scrollProgress, setScrollProgress] = useState(0);

 const toggleMenu = () => setIsOpen((prev) => !prev);

 // Bloque le scroll du body quand le menu est ouvert
 useEffect(() => {
  if (isOpen) {
   document.body.style.overflow = "hidden";
  } else {
   document.body.style.overflow = "unset";
  }
  return () => {
   document.body.style.overflow = "unset";
  };
 }, [isOpen]);

 // Magnifique Scroll Progress Bar
 useEffect(() => {
  const handleScroll = () => {
   const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;
   const progress =
    totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
   setScrollProgress(Math.min(Math.max(progress, 0), 100));
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 return (
  <>
   <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/75 dark:bg-background/75 backdrop-blur-lg">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
     <div className="flex h-16 items-center justify-between">
      {/* LOGO */}
      <Link
       href="/"
       className="relative h-14 w-45 flex-shrink-0"
       onClick={() => setIsOpen(false)}
      >
       <Image
        src="/logo_white.png"
        alt="Zenith Logo"
        fill
        className="object-contain rounded-2xl object-left dark:hidden"
        priority
       />
       <Image
        src="/logo_dark.png"
        alt="Zenith Logo"
        fill
        className="object-contain rounded-2xl object-left hidden dark:block"
        priority
       />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-9 text-sm uppercase font-semibold tracking-wide">
       <Link href="/" className="hover:text-primary transition-colors">
        Accueil
       </Link>
       {/*<Link href="/offers" className="hover:text-primary transition-colors">
                Missions
              </Link>*/}
       <Link
        href="/blog"
        className="hover:text-primary transition-colors"
       >
        Blog
       </Link>
       <Link
        href="/faq"
        className="hover:text-primary transition-colors"
       >
        FAQ
       </Link>
       <Link
        href="/about"
        className="hover:text-primary transition-colors"
       >
        À propos
       </Link>
       <Link
        href="/contact"
        className="hover:text-primary transition-colors"
       >
        Contact
       </Link>

       <div className="flex items-center gap-4 pl-6 border-l border-border">
        <ModeToggle />
        <LanguageSelector />
       </div>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center gap-3">
       <ModeToggle />
       <LanguageSelector />
       <button
        onClick={toggleMenu}
        className="h-11 w-11 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
        aria-label="Toggle Menu"
       >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
       </button>
      </div>
     </div>
    </div>

    {/* ================= MAGNIFIQUE SCROLL PROGRESS BAR ================= */}
    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-muted/30 overflow-hidden">
     <div
      className="h-full bg-gradient-to-r from-primary via-blue-500 to-violet-500 transition-all duration-200 ease-out shadow-[0_0_12px_rgb(59,130,246)]"
      style={{ width: `${scrollProgress}%` }}
     />
    </div>
   </nav>

   {/* ================= MOBILE MENU – SLIDE DOWN ================= */}
   {/* Placé en dehors de la <nav> pour éviter les conflits de z-index et d'affichage */}
   <div
    className={`fixed inset-0 z-[100] bg-white dark:bg-background md:hidden flex flex-col transition-all duration-500 ease-in-out ${isOpen
      ? "translate-y-0 opacity-100 pointer-events-auto"
      : "-translate-y-full opacity-0 pointer-events-none"
     }`}
   >
    {/* En-tête du menu mobile (aligné avec la navbar pour fermer proprement) */}
    <div className="flex justify-end items-center h-16 px-5 sm:px-6">
     <button
      onClick={toggleMenu}
      className="h-11 w-11 flex items-center justify-center rounded-lg hover:bg-muted transition-colors mt-2"
     >
      <X size={28} />
     </button>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center gap-8 text-2xl font-semibold uppercase pb-16">
     <Link
      href="/"
      onClick={toggleMenu}
      className="hover:text-primary transition-colors"
     >
      Accueil
     </Link>
     <Link
      href="/blog"
      onClick={toggleMenu}
      className="hover:text-primary transition-colors"
     >
      Blog
     </Link>
     <Link
      href="/faq"
      onClick={toggleMenu}
      className="hover:text-primary transition-colors"
     >
      FAQ
     </Link>
     <Link
      href="/about"
      onClick={toggleMenu}
      className="hover:text-primary transition-colors"
     >
      À propos
     </Link>
     <Link
      href="/contact"
      onClick={toggleMenu}
      className="hover:text-primary transition-colors"
     >
      Contact
     </Link>

     <Link href="/offers" onClick={toggleMenu} className="mt-4">
      <Button
       size="lg"
       className="rounded-full px-10 py-6 text-lg bg-primary text-white"
      >
       Nos offres
      </Button>
     </Link>
    </div>
   </div>
  </>
 );
}
