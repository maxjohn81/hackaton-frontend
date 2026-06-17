"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const iconRef = useRef<HTMLDivElement | null>(null);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";

    gsap.fromTo(
      iconRef.current,
      { rotate: -90, scale: 0.6, opacity: 0 },
      {
        rotate: 0,
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(2)",
      },
    );

    setTheme(next);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden"
    >
      <div ref={iconRef} className="flex items-center justify-center">
        {theme === "dark" ? (
          <Sun size={20} className="text-yellow-500" />
        ) : (
          <Moon size={20} />
        )}
      </div>
    </Button>
  );
}
