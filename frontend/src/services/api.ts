import { Menu } from '../types/Menu';

const API_URL = 'http://localhost:8000/api';

export const fetchAllMenus = async (): Promise<Menu[]> => {
    const response = await fetch('http://localhost:8000/api/menus');
    if (!response.ok) throw new Error('Erreur réseau');
    return response.json();
};