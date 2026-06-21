"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, Pencil, Shield } from "lucide-react";
import { getAllUsersService, User } from "@/services/userService";
import { toast } from "sonner";

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

const getInitials = (name?: string) => {
  if (!name) return "??";
  return name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);
};

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getAllUsersService();
      if (result.success) {
        setUsers(result.data);
      } else {
        toast.error(result.message);
      }
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen w-full bg-background p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
        Gestion des Utilisateurs
      </h1>

      <Card className="mt-6">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Shield className="h-4 w-4" />
              Liste des Utilisateurs
            </div>
            <Badge variant="secondary">{users.length} compte(s)</Badge>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Chargement...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="py-2 font-medium">Utilisateur</th>
                    <th className="py-2 font-medium">Email</th>
                    <th className="py-2 font-medium text-center">Rôle</th>
                    <th className="py-2 font-medium text-center">Vérifié</th>
                    <th className="py-2 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b last:border-0 cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`/admin/users/${u.id}`)}
                    >
                      <td className="py-3 text-foreground">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-[10px]">
                              {getInitials(u.username)}
                            </AvatarFallback>
                          </Avatar>
                          {u.username}
                        </div>
                      </td>
                      <td className="py-3 text-muted-foreground">{u.email}</td>
                      <td className="py-3 text-center">
                        <Badge variant={u.Role === "superadmin" ? "default" : "outline"}>
                          {roleLabel(u.Role)}
                        </Badge>
                      </td>
                      <td className="py-3 text-center">
                        {u.isVerified ? (
                          <CheckCircle2 className="mx-auto h-4 w-4 text-emerald-500" />
                        ) : (
                          <XCircle className="mx-auto h-4 w-4 text-red-500" />
                        )}
                      </td>
                      <td className="py-3 text-center">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/users/${u.id}`);
                          }}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}