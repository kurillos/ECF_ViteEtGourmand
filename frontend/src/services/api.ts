import { Menu } from '../types/Menu';

const API_URL = 'http://localhost:8000/api';

export const fetchAllMenus = async (): Promise<Menu[]> => {
    const response = await fetch('http://localhost:8000/api/menus');
    if (!response.ok) throw new Error('Erreur réseau');
    return response.json();
};

// Fonction pour l'administrateur 

export const fetchAdminAvis = async () => {
    const response = await fetch(`${API_URL}/admin/avis`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des avis');
    return response.json();
};

export const validateAvis = async (id:number) => {
    const response = await fetch(`${API_URL}/admin/avis/${id}/validate`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
    });
    if (!response.ok) throw new Error(`Erreur lors de la validation de l'avis ${id}`);
    return response.json();
};

// Fonction pour supprimer un avis
export const deleteAvis = async (id: number) => {
    const response = await fetch(`${API_URL}/admin/avis/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression de l\'avis');
    return response.json();
};

// Formulaire d'avis transofmration du JS en JSON
export const postAvis = async (avisData: { nom: string; message: string; note: number}) => {
    const response = await fetch(`${API_URL}/avis`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(avisData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'envoi de l'avis");
    }
    return response.json();
}

export const fetchAvis = async () => { 
    const response = await fetch(`${API_URL}/avis`);
    if (!response.ok) throw new Error('Erreur lors du chargement des avis');
    return response.json();
};

export const logout = () => {
    localStorage.removeItem('user'); // Supprime les infos
    window.location.href = '/login'; // Force la redirection
};

export const login = async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur de connexion');
    }

    return response.json();
};

export const fetchOpeningHours = async () => {
    const response = await fetch(`${API_URL}/hours`);
    if (!response.ok) throw new Error('Oops, nous ne pouvons afficher les horraires');
    return response.json();
};