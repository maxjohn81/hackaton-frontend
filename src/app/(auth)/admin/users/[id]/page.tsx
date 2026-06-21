"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
 ArrowLeft,
 Mail,
 Calendar,
 ShieldCheck,
 ShieldOff,
 CheckCircle2,
 XCircle,
 Pencil,
 Save,
 X,
 Trash2,
 MoreVertical,
 Loader2,
 UserCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
 getUserByIdService,
 updateUserService,
 deleteUserService,
 User,
} from "@/services/userService";
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

const formatDate = (date?: string) => {
 if (!date) return "—";
 return new Date(date).toLocaleString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
 });
};

export default function UserDetailPage() {
 const { id } = useParams<{ id: string }>();
 const router = useRouter();

 const [user, setUser] = useState<User | null>(null);
 const [isLoading, setIsLoading] = useState(true);
 const [isEditing, setIsEditing] = useState(false);
 const [isSaving, setIsSaving] = useState(false);
 const [isDeleting, setIsDeleting] = useState(false);

 const [draft, setDraft] = useState<Partial<User>>({});

 useEffect(() => {
  const fetchUser = async () => {
   const result = await getUserByIdService(id);
   if (result.success && result.data) {
    setUser(result.data);
    setDraft(result.data);
   } else {
    toast.error(result.message);
   }
   setIsLoading(false);
  };
  fetchUser();
 }, [id]);

 const handleEdit = () => {
  setDraft(user ?? {});
  setIsEditing(true);
 };

 const handleCancel = () => {
  setDraft(user ?? {});
  setIsEditing(false);
 };

 const handleSave = async () => {
  if (!user) return;
  setIsSaving(true);
  const result = await updateUserService(user.id, {
   username: draft.username,
   email: draft.email,
   Role: draft.Role,
  });
  if (result.success && result.data) {
   setUser(result.data);
   setIsEditing(false);
   toast.success("Utilisateur mis à jour avec succès.");
  } else {
   toast.error(result.message);
  }
  setIsSaving(false);
 };

 const handleToggleVerified = async () => {
  if (!user) return;
  const result = await updateUserService(user.id, { isVerified: !user.isVerified });
  if (result.success && result.data) {
   setUser(result.data);
   toast.success(
    result.data.isVerified ? "Compte vérifié." : "Vérification retirée."
   );
  } else {
   toast.error(result.message);
  }
 };

 const handleDelete = async () => {
  if (!user) return;
  setIsDeleting(true);
  const result = await deleteUserService(user.id);
  if (result.success) {
   toast.success("Utilisateur supprimé.");
   router.push("/admin/users");
  } else {
   toast.error(result.message);
   setIsDeleting(false);
  }
 };

 // ---------- Loading skeleton ----------
 if (isLoading) {
  return (
   <div className="min-h-screen w-full bg-background p-4 sm:p-6 md:p-8">
    <Skeleton className="h-9 w-36 mb-6" />
    <Card className="max-w-3xl">
     <CardContent className="p-6 space-y-6">
      <div className="flex items-center gap-4">
       <Skeleton className="h-20 w-20 rounded-full" />
       <div className="space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-24" />
       </div>
      </div>
      <Skeleton className="h-px w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
     </CardContent>
    </Card>
   </div>
  );
 }

 // ---------- Not found ----------
 if (!user) {
  return (
   <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-8 text-center">
    <UserCircle2 className="h-12 w-12 text-muted-foreground" />
    <p className="text-sm text-muted-foreground">Utilisateur introuvable.</p>
    <Button variant="outline" size="sm" onClick={() => router.push("/admin/users")}>
     <ArrowLeft className="h-4 w-4" />
     Retour à la liste
    </Button>
   </div>
  );
 }

 return (
  <div className="min-h-screen w-full p-4 sm:p-6 md:p-8">
   {/* Top bar */}
   <div className="flex items-center w-full justify-between mb-6">
    <Button variant="ghost" size="sm" onClick={() => router.push("/admin/users")}>
     <ArrowLeft className="h-4 w-4" />
     Retour à la liste
    </Button>

    <DropdownMenu>
     <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon">
       <MoreVertical className="h-4 w-4" />
      </Button>
     </DropdownMenuTrigger>
     <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={handleEdit}>
       <Pencil className="h-4 w-4 mr-2" />
       Modifier
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleToggleVerified}>
       {user.isVerified ? (
        <>
         <ShieldOff className="h-4 w-4 mr-2" />
         Retirer la vérification
        </>
       ) : (
        <>
         <ShieldCheck className="h-4 w-4 mr-2" />
         Vérifier le compte
        </>
       )}
      </DropdownMenuItem>
      <AlertDialog>
       <AlertDialogTrigger asChild>
        <DropdownMenuItem
         onSelect={(e) => e.preventDefault()}
         className="text-red-500 focus:text-red-500"
        >
         <Trash2 className="h-4 w-4 mr-2" />
         Supprimer
        </DropdownMenuItem>
       </AlertDialogTrigger>
       <AlertDialogContent>
        <AlertDialogHeader>
         <AlertDialogTitle>Supprimer cet utilisateur ?</AlertDialogTitle>
         <AlertDialogDescription>
          Cette action est irréversible. Le compte de{" "}
          <strong>{user.username}</strong> sera définitivement supprimé.
         </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
         <AlertDialogCancel>Annuler</AlertDialogCancel>
         <AlertDialogAction
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 hover:bg-red-600"
         >
          {isDeleting ? (
           <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
           "Supprimer"
          )}
         </AlertDialogAction>
        </AlertDialogFooter>
       </AlertDialogContent>
      </AlertDialog>
     </DropdownMenuContent>
    </DropdownMenu>
   </div>

   {/* Main card */}
   <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
   >
    <Card className="max-w-full overflow-hidden">
     {/* Header band */}
     <div className="relative h-24 bg-gradient-to-r from-primary/80 to-primary/40 sm:h-28" />

     <CardContent className="px-4 sm:px-6 pb-6 -mt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
       <div className="flex items-end gap-4">
        <Avatar className="h-20 w-20 border-4 border-background shadow-md">
         <AvatarFallback className="text-xl font-semibold bg-sky-500 text-white">
          {getInitials(user.username)}
         </AvatarFallback>
        </Avatar>

        <div className="pb-1">
         {isEditing ? (
          <Input
           value={draft.username ?? ""}
           onChange={(e) => setDraft((d) => ({ ...d, username: e.target.value }))}
           className="h-8 w-44 text-base font-semibold"
          />
         ) : (
          <h1 className="text-lg font-semibold text-foreground sm:text-xl">
           {user.username}
          </h1>
         )}
         <div className="mt-1 flex items-center gap-2">
          <Badge variant={user.Role === "superadmin" ? "default" : "outline"}>
           {roleLabel(user.Role)}
          </Badge>
          {user.isVerified ? (
           <Badge variant="outline" className="text-emerald-600 border-emerald-300">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Vérifié
           </Badge>
          ) : (
           <Badge variant="outline" className="text-red-500 border-red-300">
            <XCircle className="h-3 w-3 mr-1" /> Non vérifié
           </Badge>
          )}
         </div>
        </div>
       </div>

       {/* Action buttons (desktop) */}
       <div className="hidden sm:flex items-center gap-2">
        {isEditing ? (
         <>
          <Button variant="outline" size="sm" onClick={handleCancel} disabled={isSaving}>
           <X className="h-4 w-4" />
           Annuler
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSaving}>
           {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
           ) : (
            <Save className="h-4 w-4" />
           )}
           Enregistrer
          </Button>
         </>
        ) : (
         <Button variant="outline" size="sm" onClick={handleEdit}>
          <Pencil className="h-4 w-4" />
          Modifier
         </Button>
        )}
       </div>
      </div>

      <Separator className="my-6" />

      {/* Info grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
       <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
         <Mail className="h-3.5 w-3.5" />
         Email
        </label>
        {isEditing ? (
         <Input
          value={draft.email ?? ""}
          onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
         />
        ) : (
         <p className="text-sm text-foreground">{user.email}</p>
        )}
       </div>

       <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
         <ShieldCheck className="h-3.5 w-3.5" />
         Rôle Système
        </label>
        {isEditing ? (
         <Select
          value={draft.Role}
          onValueChange={(v) => setDraft((d) => ({ ...d, Role: v }))}
         >
          <SelectTrigger>
           <SelectValue>{roleLabel(draft.Role)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
           <SelectItem value="admin">Administrateur</SelectItem>
           <SelectItem value="superadmin">Super Administrateur</SelectItem>
          </SelectContent>
         </Select>
        ) : (
         <p className="text-sm text-foreground">{roleLabel(user.Role)}</p>
        )}
       </div>

       <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
         <Calendar className="h-3.5 w-3.5" />
         Créé le
        </label>
        <p className="text-sm text-foreground">{formatDate(user.createdAt)}</p>
       </div>

       <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
         <Calendar className="h-3.5 w-3.5" />
         Mis à jour le
        </label>
        <p className="text-sm text-foreground">{formatDate(user.updatedAt)}</p>
       </div>
      </div>

      {/* Action buttons (mobile, fixed at bottom of card) */}
      {isEditing && (
       <div className="mt-6 flex gap-2 sm:hidden">
        <Button variant="outline" className="flex-1" onClick={handleCancel} disabled={isSaving}>
         <X className="h-4 w-4" />
         Annuler
        </Button>
        <Button className="flex-1" onClick={handleSave} disabled={isSaving}>
         {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
         Enregistrer
        </Button>
       </div>
      )}
      {!isEditing && (
       <Button variant="outline" className="mt-6 w-full sm:hidden" onClick={handleEdit}>
        <Pencil className="h-4 w-4" />
        Modifier
       </Button>
      )}
     </CardContent>
    </Card>
   </motion.div>
  </div>
 );
}