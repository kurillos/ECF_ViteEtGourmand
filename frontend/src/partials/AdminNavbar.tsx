import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/api';

const AdminNavbar: React.FC = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.roles?.includes('ROLE_ADMIN');

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 mb-8">
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-6">
                    <Link to="/admin" className="text-xl font-bold text-orange-600 italic">Vite & Gourmand Admin</Link>
                    
                    <div className="flex gap-4">
                        <Link to="/admin" className="text-sm font-medium text-gray-600 hover:text-orange-600">Dashboard</Link>
                        <Link to="/admin/commandes" className="text-sm font-medium text-gray-600 hover:text-orange-600">Commandes</Link>
                        {isAdmin && (
                            <>
                                <button className="text-sm font-medium text-gray-600 hover:text-orange-600">Menus</button>
                                <button className="text-sm font-medium text-gray-600 hover:text-orange-600">Horaires</button>
                            </>
                        )}
                    </div>
                </div>
                
                <button onClick={logout} className="text-sm font-bold text-red-500 hover:text-red-700">
                    Déconnexion
                </button>
            </div>
        </nav>
    );
};

export default AdminNavbar;