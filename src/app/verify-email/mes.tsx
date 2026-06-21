"use client";

import { useRouter } from "next/navigation";
import EmailVerificationCard from "@/components/EmailVerificationCard";

export default function VerifyEmailPage() {
  const router = useRouter();

  return (
    <EmailVerificationCard
      email="finoana@exemple.com" // ← remplace par ton email dynamique
      onResend={async () => {
        await fetch("/api/auth/resend-verification", { method: "POST" });
      }}
      onVerified={() => router.push("/dashboard")}
    />
  );
}