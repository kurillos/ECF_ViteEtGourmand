import React from 'react';
import { logout } from '../services/api';

export interface AdminNavbarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 mb-8 w-full">
            {/* Conteneur principal flexible */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* LOGO ET TITRE */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    <span className="text-xl font-bold text-orange-600 italic">
                        Vite & Gourmand Admin
                    </span>
                </div>

                {/* BOUTONS */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 w-full md:w-auto">
                    {[
                        { id: 'avis', label: 'Avis' },
                        { id: 'menus', label: 'Menus' },
                        { id: 'horaires', label: 'Horaires' },
                        { id: 'commandes', label: '📦 Commandes' },
                        { id: 'users', label: '👥 Employés' },
                        { id: 'stats', label: '📊 Tableau de Bord' },
                    ].map((tab) => (
                        <button 
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`px-3 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'bg-orange-50 text-orange-600' 
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* BOUTON DÉCONNEXION */}
                <button 
                    onClick={logout}
                    className="text-red-500 font-bold hover:text-red-700 transition text-sm py-2"
                >
                    Déconnexion
                </button>
            </div>
        </nav>
    );
};