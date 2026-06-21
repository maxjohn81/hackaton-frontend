"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { RefreshCw, CheckCircle, ShieldCheck, ShieldX } from "lucide-react";
import { Button } from "./ui/button";

interface CaptchaCardProps {
  onVerified?: () => void;
}

function generateCaptchaText(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function drawCaptcha(canvas: HTMLCanvasElement, text: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fond
  ctx.fillStyle = isDark ? "#1f2937" : "#f8fafc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Lignes de bruit
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.strokeStyle = isDark
      ? `rgba(139,92,246,${0.15 + Math.random() * 0.2})`
      : `rgba(109,40,217,${0.1 + Math.random() * 0.15})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Points de bruit
  for (let i = 0; i < 40; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
    ctx.fill();
  }

  // Lettres
  const colors = isDark
    ? ["#a78bfa", "#818cf8", "#c4b5fd", "#6ee7b7", "#67e8f9"]
    : ["#6d28d9", "#4338ca", "#7c3aed", "#065f46", "#0e7490"];

  text.split("").forEach((char, i) => {
    ctx.save();
    const x = 20 + i * 32;
    const y = 38 + (Math.random() * 12 - 6);
    ctx.translate(x, y);
    ctx.rotate((Math.random() - 0.5) * 0.4);
    ctx.font = `bold ${26 + Math.floor(Math.random() * 6)}px monospace`;
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });
}

export default function CaptchaCard({ onVerified }: CaptchaCardProps) {
  const [captchaText, setCaptchaText] = useState("");
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "verified">("idle");
  const [attempts, setAttempts] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const refresh = useCallback(() => {
    const text = generateCaptchaText();
    setCaptchaText(text);
    setInput("");
    setStatus("idle");
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (canvasRef.current && captchaText) {
      drawCaptcha(canvasRef.current, captchaText);
    }
  }, [captchaText]);

  const handleVerify = () => {
    if (input.trim().toLowerCase() === captchaText.toLowerCase()) {
      setStatus("verified");
      if (onVerified) onVerified();
    } else {
      setStatus("error");
      setAttempts((a) => a + 1);
      setInput("");
      setTimeout(() => {
        refresh();
        setStatus("idle");
      }, 1200);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="
          rounded-2xl overflow-hidden
          bg-white border border-slate-200
          dark:bg-gray-900 dark:border-gray-700
        ">

          {/* En-tête */}
          <div className="
            px-8 pt-8 pb-6 text-center border-b
            bg-gradient-to-br from-violet-50 to-indigo-50 border-slate-100
            dark:from-gray-800 dark:to-gray-800 dark:border-gray-700
          ">
            <div className="
              inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 border
              bg-white border-violet-100
              dark:bg-gray-800 dark:border-gray-600
            ">
              {status === "verified" ? (
                <ShieldCheck className="w-7 h-7 text-emerald-500" />
              ) : status === "error" ? (
                <ShieldX className="w-7 h-7 text-red-500" />
              ) : (
                <ShieldCheck className="w-7 h-7 text-violet-500" />
              )}
            </div>

            <h1 className="text-xl font-semibold mb-1 text-slate-800 dark:text-white">
              {status === "verified" ? "Vérifié !" : "Vérification humaine"}
            </h1>
            <p className="text-sm text-slate-500 dark:text-gray-400">
              {status === "verified"
                ? "Vous avez prouvé que vous n'êtes pas un robot."
                : "Saisissez les caractères affichés ci-dessous"}
            </p>
          </div>

          {/* Corps */}
          <div className="px-8 py-7 space-y-5">
            {status === "verified" ? (

              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Captcha validé avec succès</span>
                </div>
                <button
                  onClick={onVerified}
                  className="
                    w-full flex items-center justify-center gap-2
                    bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98]
                    text-white text-sm font-medium py-3 px-4 rounded-xl
                    transition-all duration-150
                  "
                >
                  Continuer
                </button>
              </div>

            ) : (
              <>
                {/* Canvas captcha */}
                <div className="relative flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    width={220}
                    height={64}
                    className="rounded-xl border border-slate-200 dark:border-gray-600 select-none"
                  />
                  <button
                    onClick={refresh}
                    aria-label="Rafraîchir le captcha"
                    className="
                      absolute right-2 top-2
                      p-1.5 rounded-lg
                      text-slate-400 hover:text-violet-500
                      hover:bg-violet-50 dark:hover:bg-violet-950
                      transition-all duration-150
                    "
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                {/* Message erreur */}
                {status === "error" && (
                  <div className="
                    flex items-center gap-2 text-sm px-4 py-3 rounded-xl border
                    bg-red-50 border-red-100 text-red-700
                    dark:bg-red-950 dark:border-red-800 dark:text-red-300
                  ">
                    <ShieldX className="w-4 h-4 shrink-0" />
                    Code incorrect. Un nouveau captcha est généré…
                  </div>
                )}

                {/* Input */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-500 dark:text-gray-400">
                    Entrez les caractères
                  </label>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                    maxLength={6}
                    placeholder="ex : aB3xZ9"
                    className="
                      w-full px-4 py-3 rounded-xl border text-sm tracking-widest font-mono
                      bg-white border-slate-200 text-slate-800 placeholder-slate-300
                      focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400
                      dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-600
                      transition-all duration-150
                    "
                  />
                </div>

                {/* Bouton vérifier */}
                <Button
                  onClick={handleVerify}
                  disabled={input.length < 6}
                  className="w-full"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Vérifier
                </Button>

                {/* Tentatives */}
                {attempts > 0 && (
                  <p className="text-center text-xs text-slate-400 dark:text-gray-600">
                    {attempts} tentative{attempts > 1 ? "s" : ""} échouée{attempts > 1 ? "s" : ""}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer */}

      </div>
    </div>
  );
}