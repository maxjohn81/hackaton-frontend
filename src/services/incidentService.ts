import api from "./api";

export type IncidentType = "accident" | "embouteillage" | "route_bloquee";
export type IncidentStatus = "en_attente" | "confirme" | "resolu";

export type Incident = {
 id: string;
 type: IncidentType;
 description: string;
 image: string | null;
 ville: string;
 status: IncidentStatus;
 createdAt: string;
};

type GetIncidentsResponse = {
 success: boolean;
 message: string;
 data: Incident[];
};

type GetIncidentResponse = {
 success: boolean;
 message: string;
 data: Incident;
};

type DeleteIncidentResponse = {
 success: boolean;
 message: string;
};

export const getAllIncidentsService = async () => {
 try {
  const response = await api.get<GetIncidentsResponse>("/incident/");
  return { success: true, data: response.data.data };
 } catch (error: any) {
  return {
   success: false,
   message:
    error?.response?.data?.message ||
    "Erreur serveur lors de la récupération des incidents",
  };
 }
};


export const deleteIncidentService = async (id: string) => {
 try {
  const response = await api.delete<DeleteIncidentResponse>(
   `/incident/delete_incident/${id}`
  );
  return { success: true, message: response.data.message };
 } catch (error: any) {
  console.log("Erreur suppression incident:", error?.response?.status, error?.response?.data ?? error?.message);
  return {
   success: false,
   message:
    error?.response?.data?.message ||
    "Erreur lors de la suppression de l'incident",
  };
 }
};