import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../partials/Navbar';
import { logout, fetchAdminAvis, validateAvis, deleteAvis } from '../services/api';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [avis, setAvis] = useState([]);
    
    // 1. Récupération des infos utilisateur pour les rôles
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    
    const isAdmin = user?.roles?.includes('ROLE_ADMIN');
    const displayName = isAdmin ? "Benoît" : "Julie";

    // 2. Chargement des avis au montage du composant
    useEffect(() => {
        const loadAvis = async () => {
            try {
                const data = await fetchAdminAvis();
                setAvis(data);
            } catch (error) {
                console.error("Erreur chargement avis", error);
            }
        };
        loadAvis();
    }, []);

    // 3. Fonctions de gestion (Validate/Delete)
    const handleValidate = async (id: number) => {
        await validateAvis(id);
        setAvis(avis.filter((a: any) => a.id !== id));
    };

    const handleDelete = async (id: number) => {
        await deleteAvis(id);
        setAvis(avis.filter((a: any) => a.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Navbar />
            <div className="max-w-7xl mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 italic">
                            Espace {isAdmin ? 'Direction' : 'Administration'} - {displayName}
                        </h1>
                        <p className="text-gray-500">
                            {isAdmin 
                                ? "Gestion complète : menus, horaires et avis." 
                                : "Bienvenue. Voici les avis à modérer."}
                        </p>
                    </div>

                    <button 
                        onClick={logout} 
                        className="flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-red-50 transition border border-red-100"
                    >
                        <span>Déconnexion</span>
                    </button>
                </div>

                {/* --- NAVIGATION SPECIFIQUE ADMIN (BENOIT) --- */}
                {isAdmin && (
                    <div className="flex gap-4 mb-8">
                        <button className="bg-white px-4 py-2 rounded-lg shadow-sm font-bold text-orange-600 border border-orange-200">
                            Modération Avis
                        </button>
                        <button className="bg-white px-4 py-2 rounded-lg shadow-sm font-bold text-gray-600 hover:text-orange-600 transition">
                            Gestion des Menus
                        </button>
                        <button className="bg-white px-4 py-2 rounded-lg shadow-sm font-bold text-gray-600 hover:text-orange-600 transition">
                            Gestion des Horaires
                        </button>
                    </div>
                )}

                {/* --- TABLEAU DES AVIS (POUR TOUS) --- */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Avis en attente</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 text-gray-400 text-sm uppercase">
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Message</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {avis.map((item: any) => (
                                    <tr key={item.id}>
                                        <td className="py-4 px-6 font-semibold">{item.nom}</td>
                                        <td className="py-4 px-6 text-gray-600 italic">{item.message}</td>
                                        <td className="py-4 px-6 text-right">
                                            <button onClick={() => handleValidate(item.id)} className="text-green-600 font-bold mr-4">Approuver</button>
                                            <button onClick={() => handleDelete(item.id)} className="text-red-600 font-bold">Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;