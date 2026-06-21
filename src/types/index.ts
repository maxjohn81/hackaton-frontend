export interface User {
 id: string | number;
 role: string;
 name?: string; // Ajoute le "?" pour le rendre optionnel
 email?: string; // Optionnel
 createdAt?: string; // Optionnel
 updatedAt?: string; // Optionnel
}