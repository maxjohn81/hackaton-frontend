import axios from "axios";

const api = axios.create({
 baseURL: "http://localhost:5000/api",
 headers: {
  "Content-Type": "application/json",
 },
});

// Intercepteur de requête : on injecte le token sur chaque appel
api.interceptors.request.use((config) => {
 if (typeof window !== "undefined") {
  const token = localStorage.getItem("smart-traffic-access-token");
  if (token) {
   config.headers.Authorization = `Bearer ${token}`;
  }
 }
 return config;
});

// Intercepteur de réponse : si le token est expiré/invalide (401), on déconnecte
api.interceptors.response.use(
 (response) => response,
 (error) => {
  if (error.response?.status === 401 && typeof window !== "undefined") {
   localStorage.removeItem("smart-traffic-access-token");
   localStorage.removeItem("smart-auth-storage");

   // On évite une boucle infinie si on est déjà sur /login
   if (window.location.pathname !== "/login") {
    window.location.href = "/login";
   }
  }
  return Promise.reject(error);
 }
);

export default api;