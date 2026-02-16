import React from 'react';
import { logout } from '../services/api';

export interface AdminNavbarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 mb-8">
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-6">
                    <span className="text-xl font-bold text-orange-600 italic cursor-default">
                        Vite & Gourmand Admin
                    </span>
                    
                    <div className="flex gap-2">
                        <button 
                            onClick={() => onTabChange('avis')}
                            className={`px-4 py-2 rounded-lg font-bold transition ${activeTab === 'avis' ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            Avis
                        </button>
                        <button 
                            onClick={() => onTabChange('menus')}
                            className={`px-4 py-2 rounded-lg font-bold transition ${activeTab === 'menus' ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            Menus
                        </button>
                        <button 
                            onClick={() => onTabChange('horaires')}
                            className={`px-4 py-2 rounded-lg font-bold transition ${activeTab === 'horaires' ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            Horaires
                        </button>
                        <button 
                            onClick={() => onTabChange('commandes')}
                            className={`px-4 py-2 rounded-lg font-bold transition ${activeTab === 'commandes' ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            📦 Commandes
                        </button>
                    </div>
                </div>

                <button 
                    onClick={logout}
                    className="text-red-500 font-bold hover:text-red-700 transition"
                >
                    Déconnexion
                </button>
            </div>
        </nav>
    );
};

export default AdminNavbar;