
"use client";

import { useRouter } from "next/navigation";
import CaptchaCard from "../../components/Captchacard";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <CaptchaCard
      onVerified={() => router.push("/verify-email")}
    />
  );
}