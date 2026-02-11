import { Menu } from '../types/Menu';

const API_URL = 'http://localhost:8000/api';

/**
 * Helper pour récupérer les headers d'authentification.
 * Plus robuste : évite d'envoyer "Bearer undefined"
 */
const getAuthHeaders = (): Record<string, string> => {
    const userJson = localStorage.getItem('user');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    if (!userJson) return headers;

    try {
        // 1. On parse une première fois
        let data = JSON.parse(userJson);
        
        // 2. Si c'est encore du texte (le bug des doubles guillemets), on re-parse
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }

        const token = data?.token;

        if (token) {
            // 3. NETTOYAGE ULTIME : on enlève les guillemets s'ils sont restés collés
            const cleanToken = token.replace(/"/g, '');
            headers['Authorization'] = `Bearer ${cleanToken}`;
        }
    } catch (error) {
        console.error("Erreur d'extraction du token :", error);
    }

    return headers;
};


// --- SECTION MENUS (PUBLIC) ---
export const fetchAllMenus = async (): Promise<Menu[]> => {
    const response = await fetch(`${API_URL}/menus`);
    if (!response.ok) throw new Error('Erreur réseau');
    return response.json();
};

// --- SECTION AVIS ---
// 1. Pour les clients connectés (Soumission d'avis)
export const postAvis = async (avisData: { message: string; note: number }) => {
    const response = await fetch(`${API_URL}/avis`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(avisData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'envoi");
    }
    return response.json();
};

// 2. Pour la page publique (Consultation)
export const fetchAvis = async () => { 
    // Pas besoin de headers si la route est PUBLIC_ACCESS en GET
    const response = await fetch(`${API_URL}/avis`);
    if (!response.ok) throw new Error('Erreur chargement avis');
    return response.json();
};

// 3. Pour l'Admin (Modération)
export const fetchAdminAvis = async () => {
    const response = await fetch(`${API_URL}/admin/avis`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Erreur récupération avis admin');
    return response.json();
};

export const validateAvis = async (id: number) => {
    const response = await fetch(`${API_URL}/admin/avis/${id}/validate`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error(`Erreur validation avis ${id}`);
    return response.json();
};

export const deleteAvis = async (id: number) => {
    const response = await fetch(`${API_URL}/admin/avis/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Erreur suppression avis');
    return response.json();
};

// --- SECTION AUTH ---
export const login = async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/login_check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    
    if (!response.ok) throw new Error('Erreur de connexion');

    const data = await response.json();
    const userStore = {
        token: data.token,
        user: {
            email: credentials.email,
            // Optionnel : tu pourrais récupérer les vrais rôles ici si ton back les renvoie
            roles: data.roles || ['ROLE_EMPLOYE'] 
        }
    };

    localStorage.setItem('user', JSON.stringify(userStore));
    return userStore; 
};

export const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
};

// --- SECTION HORAIRES ---
export const fetchOpeningHours = async () => {
    const response = await fetch(`${API_URL}/hours`);
    if (!response.ok) throw new Error('Impossible d\'afficher les horaires');
    return response.json();
};

// --- SECTION COMMANDES ---
export const commandeService = {
    getAll: async (statut?: string) => {
        const url = statut ? `${API_URL}/admin/commandes?statut=${statut}` : `${API_URL}/admin/commandes`;
        const response = await fetch(url, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Erreur chargement commandes');
        return response.json();
    },
    updateStatus: async (id: number, data: any) => {
        const response = await fetch(`${API_URL}/admin/commandes/${id}/status`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return response.json();
    },
    delete: async (id: number) => {
        const response = await fetch(`${API_URL}/admin/commandes/${id}/supprimer`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        return response.json();
    }
};

// --- SECTION SERVICES ADMIN ---
export const menuService = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/admin/menus`, { headers: getAuthHeaders() });
        return response.json();
    }
};

export const platService = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/admin/plats`, { headers: getAuthHeaders() });
        return response.json();
    }
};

export const themeService = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/admin/themes`, { headers: getAuthHeaders() });
        return response.json();
    }
};