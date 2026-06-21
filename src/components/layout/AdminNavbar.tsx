"use client";

import { NAV_ITEMS } from "@/constants/navigations";
import { LogOut, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import logosmart from "./../../../public/smart.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { getUserRole } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";

interface AdminNavbarProps {
  openMenu: boolean;
  toggleMenu: () => void;
}




// ... dans ton composant


// Initiales générées à partir du username (ex: "Rivo Andriharisoa" -> "RA")
const getInitials = (name?: string) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Traduction du rôle technique en libellé lisible
const roleLabel = (role?: string) => {
  switch (role) {
    case "superadmin":
      return "Super Administrateur";
    case "admin":
      return "Administrateur";
    default:
      return role ?? "Utilisateur";
  }
};



export default function AdminNavbar({
  openMenu,
  toggleMenu,
}: AdminNavbarProps) {
  const pathname = usePathname();
  const userRole = getUserRole();

  const user = useAuth((state) => state.user);
  const filteredNav = userRole === "admin" ? NAV_ITEMS.filter(item => item.label !== "Utilisateurs") : NAV_ITEMS;
  return (
    <>
      {/* sidebar desktop */}
      <aside className="relative w-64 h-screen hidden md:flex flex-col border-r">
        <div className="p-6 text-2xl text-center font-bold border-b border-stone-300">
          <Image src={logosmart} alt="Logo smart" className="w-20 mx-auto" />
        </div>
        <div>
          <nav className="flex-1 p-4">
            {/* Vos liens ici */}
            <ul className="space-y-2">
              {filteredNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${pathname === item.href ? "text-primary bg-primary/10 border-l-7 border-l-emerald-500" : ""} flex text-sm font-semibold items-center gap-4 p-3.5 rounded-lg hover:text-primary duration-200 hover:bg-stone-50 dark:hover:bg-secondary`}
                  >
                    <item.icon size={20} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 border-t p-4">
            <div className="rounded-full p-2 text-xs bg-sky-500 text-white">
              {getInitials(user?.name)}
            </div>
            <div className="text-xs">
              <h1>{user?.name ?? "Invité"}</h1>
              <p>{roleLabel(user?.role)}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* SIdebar mobile */}
      {openMenu && (
        <>
          <div className="w-full fixed h-screen z-1 md:hidden bg-white/50 dark:bg-black/50 backdrop-blur-xs"></div>
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className="z-10 fixed w-64 h-screen md:hidden flex-col border-r bg-white dark:bg-black"
          >
            <div className="flex justify-between w-full items-center p-4 text-2xl font-bold border-b border-stone-300">
              <div>
                <Image
                  src={logosmart}
                  alt="Logo smart"
                  className="w-20 mx-auto"
                />
              </div>
              <div>
                <Button onClick={toggleMenu} className="p-2 rounded-md ">
                  <X />
                </Button>
              </div>
            </div>
            <div>
              <nav className="flex-1 p-4">
                {/* liens de navigation  */}
                <ul className="space-y-2">
                  {filteredNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={toggleMenu}
                        className={`${pathname === item.href ? "text-primary  bg-primary/10 border-l-5 border-l-emerald-500" : ""} flex text-sm font-semibold items-center gap-4 p-3.5 rounded-lg hover:text-primary hover:bg-stone-50 dark:hover:bg-stone-950 duration-200`}
                      >
                        <item.icon size={20} />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 border-t p-4">
                <div className="rounded-full p-2 text-xs bg-sky-500 text-white">
                  {getInitials(user?.name)}
                </div>
                <div className="text-xs">
                  <h1>{user?.name ?? "Invité"}</h1>
                  <p>{roleLabel(user?.role)}</p>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </>
  );
}
