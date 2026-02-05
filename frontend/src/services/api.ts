import { Menu } from '../types/Menu';

const API_URL = 'http://localhost:8000/api';

// Helper pour récupérer le token JWT
const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
    };
};

export const fetchAllMenus = async (): Promise<Menu[]> => {
    const response = await fetch(`${API_URL}/menus`);
    if (!response.ok) throw new Error('Erreur réseau');
    return response.json();
};

// --- SECTION AVIS ---
export const fetchAdminAvis = async () => {
    const response = await fetch(`${API_URL}/admin/avis`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Erreur lors de la récupération des avis');
    return response.json();
};

export const validateAvis = async (id:number) => {
    const response = await fetch(`${API_URL}/admin/avis/${id}/validate`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error(`Erreur lors de la validation de l'avis ${id}`);
    return response.json();
};

export const deleteAvis = async (id: number) => {
    const response = await fetch(`${API_URL}/admin/avis/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression de l\'avis');
    return response.json();
};

export const postAvis = async (avisData: { message: string; note: number}) => {
    const response = await fetch(`${API_URL}/avis`, {
        method: 'POST',
        headers: getAuthHeaders(),
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

// --- SECTION AUTH ---
export const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
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

// --- SECTION COMMANDES ---
export const commandeService = {
  getAll: async (statut?: string) => {
    const url = statut ? `${API_URL}/admin/commandes?statut=${statut}` : `${API_URL}/admin/commandes`;
    const response = await fetch(url, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Erreur lors du chargement des commandes');
    return response.json();
  },

  updateStatus: async (id: number, data: { statut: string; motif_modification?: string; mode_contact_motif?: string }) => {
    const response = await fetch(`${API_URL}/admin/commandes/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour du statut');
    return response.json();
  },

  // Dans ton commandeService (api.ts)
    delete: async (id: number) => {
    const response = await fetch(`${API_URL}/admin/commandes/${id}/supprimer`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur lors de la suppression");
        return response.json();
    },
};