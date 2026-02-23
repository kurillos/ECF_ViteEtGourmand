import { Menu } from '../types/Menu';

const API_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
    const authString = localStorage.getItem('auth');
    const authData = authString ? JSON.parse(authString) : null;
    const token = authData?.token;

    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token.replace(/"/g, '')}` : '',
    };
};

const handleResponse = async (response: Response) => {
    if (response.status === 401) {
        const data = await response.json().catch(() => ({}));
        if (data.message === "Expired JWT Token" || data.message === "Invalid JWT Token") {
            console.warn("Session expirée, déconnexion...");
            localStorage.removeItem('auth');
            localStorage.removeItem('user');
            window.location.href = '/login';
            return;
        }
    }
    if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
    }
    return response.json();
};

// --- SECTION MENUS (PUBLIC) ---
export const fetchAllMenus = async (): Promise<Menu[]> => {
    const response = await fetch(`${API_URL}/menus`);
    return handleResponse(response);
};

// --- SECTION AVIS ---
export const postAvis = async (avisData: { message: string; note: number }, token?: string) => {
    const headers: any = getAuthHeaders();
    if (token) {
        headers['Authorization'] = `Bearer ${token.replace(/"/g, '')}`;
    }
    const response = await fetch(`${API_URL}/avis`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(avisData),
    });
    return handleResponse(response);
};

export const fetchAvis = async () => { 
    const response = await fetch(`${API_URL}/avis`);
    return handleResponse(response);
};

export const fetchAdminAvis = async () => {
    const response = await fetch(`${API_URL}/admin/avis`, { headers: getAuthHeaders() });
    return handleResponse(response);
};

export const validateAvis = async (id: number) => {
    const response = await fetch(`${API_URL}/admin/avis/${id}/validate`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
};

export const deleteAvis = async (id: number) => {
    const response = await fetch(`${API_URL}/admin/avis/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
};

// --- SECTION AUTH ---
export const login = async (credentials: any) => {
    const response = await fetch(`${API_URL}/login_check`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return handleResponse(response);
};

export const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    window.location.href = '/login';
};

// --- SECTION HORAIRES (PUBLIC) ---
export const fetchOpeningHours = async () => {
    const response = await fetch(`${API_URL}/hours`);
    return handleResponse(response);
};

// --- SECTION HORAIRES (ADMIN) ---
export const hourService = {
    getAllAdmin: async () => {
        const response = await fetch(`${API_URL}/admin/hours`, { 
            headers: getAuthHeaders() 
        });
        return handleResponse(response);
    },
    update: async (id: number, data: any) => {
        const response = await fetch(`${API_URL}/admin/hours/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    }
};

// --- SECTION COMMANDES (USER) ---
    export const userService = {
        // Récupérer l'historique du client connecté
        getOrders: async () => {
            const response = await fetch(`${API_URL}/user/commandes`, { 
                headers: getAuthHeaders() 
            });
            return handleResponse(response);
        },
        // Annuler une commande
        cancelOrder: async (id: number) => {
            const response = await fetch(`${API_URL}/commande/${id}/annuler`, {
                method: 'PATCH',
                headers: getAuthHeaders(),
            });
            return handleResponse(response);
        }
    };

// --- SECTION COMMANDES (ADMIN) ---
export const commandeService = {
    getAll: async (statut?: string) => {
        const url = statut ? `${API_URL}/admin/commandes?statut=${statut}` : `${API_URL}/admin/commandes`;
        const response = await fetch(url, { headers: getAuthHeaders() });
        return handleResponse(response);
    },
    updateStatus: async (id: number, data: any) => {
        const response = await fetch(`${API_URL}/admin/commandes/${id}/status`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    delete: async (id: number) => {
        const response = await fetch(`${API_URL}/admin/commandes/${id}/supprimer`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    }
};

// --- SECTION SERVICES ADMIN ---
export const menuService = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/menus`);
        return handleResponse(response);
    },
    getAllAdmin: async () => {
        const response = await fetch(`${API_URL}/admin/menus`, { headers: getAuthHeaders() });
        return handleResponse(response);
    },
    getById: async (id: string | number) => {
        const response = await fetch(`${API_URL}/menus/${id}`);
        return handleResponse(response);
    },
    create: async (data: any) => {
        const response = await fetch(`${API_URL}/admin/menus`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    update: async (id: number, data: any) => {
        const response = await fetch(`${API_URL}/admin/menus/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    delete: async (id: number) => {
        const response = await fetch(`${API_URL}/admin/menus/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    }
};

export const platService = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/admin/plats`, { headers: getAuthHeaders() });
        return handleResponse(response);
    },
    create: async (data: any) => {
        const response = await fetch(`${API_URL}/admin/plats`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    delete: async (id: number) => {
        const response = await fetch(`${API_URL}/admin/plats/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    }
};

export const themeService = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/admin/themes`, { headers: getAuthHeaders() });
        return handleResponse(response);
    },
    create: async (data: any) => {
        const response = await fetch(`${API_URL}/admin/themes`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    }
};

    // --- SECTION ADMIN (GÉRÉ PAR JOSÉ) ---
export const adminService = {
    // Créer un employé (US: email + password, notification mail)
    createEmploye: async (data: any) => {
        const response = await fetch(`${API_URL}/admin/users`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    // Désactiver un compte (US: en cas de départ)
    toggleUserStatus: async (userId: number, isActive: boolean) => {
        const response = await fetch(`${API_URL}/admin/users/${userId}/status`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ isActive }),
        });
        return handleResponse(response);
    },

    // Récupérer les stats MongoDB (US: CA et comparaison menus)
    getStats: async (period: string = '7d') => { 
        const response = await fetch(`${API_URL}/admin/stats?period=${period}`, {
            headers: getAuthHeaders(),
        });
        return handleResponse(response);
    },
};