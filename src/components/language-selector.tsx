"use client";

import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/* ================= FLAGS SVG ================= */

function FlagFR() {
  return (
    <svg width="20" height="14" viewBox="0 0 3 2" className="rounded-sm">
      <rect width="1" height="2" fill="#0055A4" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#EF4135" />
    </svg>
  );
}

function FlagEN() {
  return (
    <svg width="20" height="14" viewBox="0 0 60 30" className="rounded-sm">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFF" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath="url(#t)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#FFF" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

/* ================= CONFIG ================= */

const languages = [
  { code: "FR", label: "Français", Flag: FlagFR },
  { code: "EN", label: "English", Flag: FlagEN },
];

export default function LanguageSelector() {
  const [lang, setLang] = useState("FR");
  const contentRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    gsap.from(contentRef.current, {
      y: -8,
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [lang]);

  const current = languages.find((l) => l.code === lang)!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <current.Flag />
          {lang}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent ref={contentRef} align="end" className="w-48">
        {languages.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <l.Flag />
            <span>{l.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
