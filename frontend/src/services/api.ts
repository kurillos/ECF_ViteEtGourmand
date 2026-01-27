import { Menu } from '../types/Menu';

const API_URL = 'http://localhost:8000/api';

export const fetchMenu = async (nom: string): Promise<Menu> => {
    const response = await fetch(`${API_URL}/menu/${encodeURIComponent(nom)}`);
    if (!response.ok) throw new Error('Menu non trouvé');
    return response.json();
};