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


export const updateIncidentStatusService = async (
 id: string,
 status: IncidentStatus
) => {
 try {
  const response = await api.patch<GetIncidentResponse>(`/incident/delete_incident/${id}`, {
   status,
  });
  return { success: true, data: response.data.data };
 } catch (error: any) {
  return {
   success: false,
   message:
    error?.response?.data?.message ||
    "Erreur lors de la mise à jour de l'incident",
  };
 }
};