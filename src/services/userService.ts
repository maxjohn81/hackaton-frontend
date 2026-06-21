// services/userService.ts
import api from "./api";

export type User = {
  id: number;
  username: string;
  email: string;
  Role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export const getAllUsersService = async () => {
  try {
    const response = await api.get("/user/getUsers");
    return { success: true, data: response.data.data as User[] };
  } catch (error: any) {
    return { success: false, message: error?.response?.data?.message || "Erreur serveur" };
  }
};

export const getUserByIdService = async (id: string | number) => {
  try {
    const response = await api.get(`/user/getUser/${id}`);
    return { success: true, data: response.data.data as User };
  } catch (error: any) {
    return { success: false, message: error?.response?.data?.message || "Erreur serveur" };
  }
};

export const updateUserService = async (id: string | number, payload: Partial<User>) => {
  try {
    const response = await api.patch(`/user/updateUser/${id}`, payload);
    return { success: true, data: response.data.data as User };
  } catch (error: any) {
    return { success: false, message: error?.response?.data?.message || "Erreur lors de la mise à jour" };
  }
};

export const deleteUserService = async (id: string | number) => {
  try {
    await api.delete(`/user/deleteUser/${id}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error?.response?.data?.message || "Erreur lors de la suppression" };
  }
};