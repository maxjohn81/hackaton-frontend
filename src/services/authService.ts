import api from "./api";

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      username: string;
      email: string;
      Role: string;
      isVerified: boolean;
    };
  };
};

export const loginService = async (email: string, password: string) => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });

    // response.data = { success, message, data: { accessToken, refreshToken, user } }
    localStorage.setItem(
      "smart-traffic-access-token",
      response.data.data.accessToken
    );

    return {
      success: true,
      data: response.data.data, // on déballe directement au bon niveau
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message || "Erreur serveur lors du login",
    };
  }
};