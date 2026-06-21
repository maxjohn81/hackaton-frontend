"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import logoZenith from "./../../../public/smart.png";
import loginImage from "./../../../public/smart.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthSmart } from "@/contexts/AuthContext";
import { loginService } from "@/services/authService";
import { toast } from "sonner";
import Link from "next/link";
import ModeToggle from "@/components/mode_toggle";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const router = useRouter();

  const { login } = useAuthSmart();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const result = await loginService(email, password);

      if (result.success && result.data?.accessToken) {
        localStorage.setItem(
          "smart-traffic-access-token",
          result.data.accessToken
        );

        login(result.data.user, result.data.accessToken);

        toast.success("Authentification réussie !");
        // La redirection vers /admin/dashboard se fera via le useEffect du AuthProvider
      } else {
        toast.error(result.message || "Erreur de connexion");
      }
    } catch (error: any) {
      toast.error(error.message || "Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  space-y-10">
      <ModeToggle />
      {/* Container principal avec une ombre douce */}
      <Card className="w-full max-w-5xl p-0 overflow-hidden border-none rounded-[2rem] ">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Section Gauche : L'IMAGE (Cachée sur petit mobile, visible en lg) */}
          <div className="relative hidden m-0 lg:block bg-muted">
            <Image
              src={loginImage}
              alt="Zenith Work Environment"
              fill
              className="object-cover h-full"
              priority
            />
            {/* Overlay pour donner du cachet à l'image */}
            <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent" />
            <div className="absolute bottom-10 left-10 text-white p-6 space-y-2">
              <h2 className="text-3xl font-black text-primary uppercase italic tracking-tighter">
                Smart Trafic <span className="text-white ">Admin</span>
              </h2>
              <p className="text-sm font-medium opacity-90 max-w-xs">
                Propulsez votre recrutement vers de nouveaux sommets avec notre
                évaluation.
              </p>
            </div>
          </div>

          {/* Section Droite : LE FORMULAIRE */}
          <div className="flex flex-col justify-center px-10 lg:px-16 py-12 bg-white dark:bg-card">
            <CardHeader className="space-y-8 p-0 mb-10">
              {/* Logo centré avec un léger souffle en dessous */}
              <div className="flex flex-col items-center lg:items-start gap-6">
                <div className="p-3 bg-slate-50 dark:bg-zinc-800 rounded-2xl">
                  <Image
                    src={logoZenith}
                    alt="Logo Zenith"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="space-y-2 text-center lg:text-left">
                <CardTitle className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  Bonjour <span className="text-primary italic">!</span>
                </CardTitle>
                <CardDescription className="text-base font-medium text-slate-500 dark:text-zinc-400 max-w-[300px] lg:max-w-none mx-auto">
                  Accédez à votre tableau de bord Smart Trafic pour piloter vos
                  recrutements.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Champ Email */}
                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500 ml-1"
                  >
                    Identifiant Email
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nom@smartTrafic.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className={`pl-12 h-14 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border-none text-base focus-visible:ring-2 focus-visible:ring-primary/20 transition-all ${errors.email ? "ring-2 ring-red-500" : ""}`}
                      required
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-1 text-red-500 text-xs font-medium ml-1">
                      <AlertCircle size={12} />
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Champ Mot de passe */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <Label
                      htmlFor="password"
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500"
                    >
                      Mot de passe
                    </Label>
                    <button
                      type="button"
                      className="text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity"
                    >
                      Oublié ?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      className={`pl-12 pr-12 h-14 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border-none text-base focus-visible:ring-2 focus-visible:ring-primary/20 transition-all ${errors.password ? "ring-2 ring-red-500" : ""}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 dark:hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && errors.password !== " " && (
                    <div className="flex items-center gap-1 text-red-500 text-xs font-medium ml-1">
                      <AlertCircle size={12} />
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Footer du formulaire : Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                  <div
                    className="flex items-center space-x-3 group cursor-pointer"
                    onClick={() => setRememberMe(!rememberMe)}
                  >
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked as boolean)
                      }
                      className="w-5 h-5 rounded-md border-slate-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-semibold text-slate-600 dark:text-zinc-400 cursor-pointer select-none"
                    >
                      Rester connecté
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full sm:w-auto px-10 h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <span className="flex items-center gap-2">
                        Connexion <ArrowRight size={20} />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
