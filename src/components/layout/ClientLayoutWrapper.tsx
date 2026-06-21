"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/sonner"; // N'oublie pas ton Toaster ici !

// oublie pas ton Toaster ici !

export default function ClientLayoutWrapper({
 children,
}: {
 children: React.ReactNode;
}) {
 const pathname = usePathname();

 const isAdminRoute = pathname.startsWith("/admin");
 const isLoginPage = pathname === "/login";
 const isCandidateTest = pathname.includes("testcandidate");

 const shouldHideLayout = isAdminRoute || isLoginPage || isCandidateTest;

 return (
  <>
   {!shouldHideLayout && <Navbar />}
   <main className={!shouldHideLayout ? "pt-16" : ""}>{children}</main>

   <Toaster position="top-right" richColors />
  </>
 );
}
