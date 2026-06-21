"use client";

import { useState } from "react";
import { Mail, CheckCircle, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface EmailVerificationCardProps {
  email?: string;
  onResend?: () => Promise<void>;
  onVerified?: () => void;
}

export default function EmailVerificationCard({
  email = "finoana@exemple.com",
  onResend,
  onVerified,
}: EmailVerificationCardProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "verified">("idle");
  const [countdown, setCountdown] = useState(0);

  const handleSendVerification = async () => {
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");

    let secs = 60;
    setCountdown(secs);
    const timer = setInterval(() => {
      secs -= 1;
      setCountdown(secs);
      if (secs <= 0) {
        clearInterval(timer);
        setCountdown(0);
      }
    }, 1000);

    if (onResend) await onResend();
  };

  const handleVerified = () => {
    setStatus("verified");
    if (onVerified) onVerified();
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Card principale */}
        <div className="
          rounded-2xl shadow-sm overflow-hidden
          bg-white border border-slate-200
          dark:bg-gray-900 dark:border-gray-700
        ">

          {/* En-tête */}
          <div className="
            px-8 pt-10 pb-8 text-center border-b
            bg-gradient-to-br from-violet-50 to-indigo-50 border-slate-100
            dark:bg-none dark:from-gray-800 dark:to-gray-800 dark:border-gray-700
          ">
            <div className="
              inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 shadow-sm border
              bg-white border-violet-100
              dark:bg-gray-800 dark:border-gray-600
            ">
              {status === "verified" ? (
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              ) : (
                <Mail className="w-8 h-8 text-violet-500" />
              )}
            </div>

            <h1 className="
              text-xl font-semibold mb-1
              text-slate-800
              dark:text-white
            ">
              {status === "verified" ? "Email vérifié !" : "Vérifiez votre email"}
            </h1>

            <p className="text-sm text-slate-500 dark:text-gray-400">
              {status === "verified"
                ? "Votre compte est maintenant actif."
                : "Un lien de vérification sera envoyé à"}
            </p>

            {status !== "verified" && (
              <p className="mt-1 text-sm font-medium text-violet-600 dark:text-violet-400 truncate">
                {email}
              </p>
            )}
          </div>

          {/* Corps */}
          <div className="px-8 py-7">

            {status === "verified" ? (
              <div className="text-center space-y-4">
                <p className="text-sm text-slate-500 dark:text-gray-400">
                  Vous pouvez maintenant accéder à toutes les fonctionnalités.
                </p>
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
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            ) : status === "sent" ? (
              <div className="space-y-5">
                <div className="
                  flex gap-3 rounded-xl p-4 border
                  bg-emerald-50 border-emerald-100
                  dark:bg-emerald-950 dark:border-emerald-800
                ">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                      Lien envoyé !
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                      Consultez votre boîte mail et cliquez sur le lien pour activer votre compte.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-center text-slate-400 dark:text-gray-500">
                    Vous n&apos;avez pas reçu l&apos;email ?
                  </p>
                  <button
                    onClick={handleSendVerification}
                    disabled={countdown > 0}
                    className="
                      w-full flex items-center justify-center gap-2
                      border text-sm font-medium py-3 px-4 rounded-xl
                      border-slate-200 text-slate-600
                      hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600
                      disabled:opacity-40 disabled:cursor-not-allowed
                      dark:border-gray-600 dark:text-gray-300
                      dark:hover:border-violet-500 dark:hover:bg-violet-950 dark:hover:text-violet-400
                      transition-all duration-150
                    "
                  >
                    <RefreshCw className="w-4 h-4" />
                    {countdown > 0 ? `Renvoyer dans ${countdown}s` : "Renvoyer le lien"}
                  </button>
                </div>

                <button
                  onClick={handleVerified}
                  className="
                    w-full text-xs py-1 transition-colors
                    text-slate-300 hover:text-slate-400
                    dark:text-gray-600 dark:hover:text-gray-500
                  "
                >
                  [dev] Simuler la vérification →
                </button>
              </div>

            ) : (
              <div className="space-y-5 flex flex-col items-center">
                <p className="text-sm leading-relaxed text-slate-500 dark:text-gray-400">
                  Cliquez sur le bouton ci-dessous pour recevoir votre lien de vérification.
                  Le lien expirera dans{" "}
                  <span className="font-medium text-slate-700 dark:text-gray-200">24 heures</span>.
                </p>

                <Button
                  onClick={handleSendVerification}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Envoyer le lien de vérification
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}