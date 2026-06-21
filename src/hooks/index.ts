import { useAuth } from "@/hooks/useAuth";

export const getUserRole = () => {
 const user = useAuth((state) => state.user);
 return user?.role ?? null;
};