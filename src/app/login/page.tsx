"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto w-full max-w-md">
        <Card className="overflow-hidden border border-slate-200/80 bg-white shadow-lg shadow-slate-900/5 dark:border-slate-700/80 dark:bg-slate-900">
          <CardHeader className="space-y-2 px-6 pt-6">
            <CardTitle className="text-2xl">Connexion</CardTitle>
            <CardDescription>
              Accédez à votre compte avec votre adresse email et votre mot de passe.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6">
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Adresse email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  autoComplete="email"
                  required
                  className="mt-2 w-full"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Mot de passe
                </label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    autoComplete="current-password"
                    required
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute inset-y-0 right-2 flex items-center rounded-md border border-transparent bg-transparent p-1 text-slate-500 transition hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/60 dark:text-slate-400 dark:hover:text-slate-100"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
