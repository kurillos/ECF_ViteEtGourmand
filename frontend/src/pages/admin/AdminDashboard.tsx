import React, { useEffect, useState } from 'react';
import { fetchAdminAvis, validateAvis, deleteAvis } from '../../services/api';
import AdminHoraires from './AdminHoraires';
import AdminMenus from './AdminMenus';
import AdminNavbar from '../../partials/AdminNavbar';
import AdminOrders from '../admin/AdminOrders';

const AdminDashboard: React.FC = () => {
    const [avis, setAvis] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('all'); 
    
    // 1. RÉCUPÉRATION ET NETTOYAGE RADICAL
    const userJson = localStorage.getItem('user');
    
    const cleanData = (data: any): any => {
        if (typeof data === 'string') {
            const cleaned = data.replace(/^"|"$/g, '').replace(/\\"/g, '"');
            try { 
                const parsed = JSON.parse(cleaned);
                return typeof parsed === 'string' ? JSON.parse(parsed) : parsed;
            } catch { return cleaned; }
        }
        return data;
    };

    const userData = cleanData(userJson);
    const userObj = userData?.user;
    
    const isAdmin = Array.isArray(userObj?.roles) ? userObj.roles.includes('ROLE_ADMIN') : false;
    const userEmail = typeof userObj?.email === 'string' ? userObj.email.replace(/"/g, '') : "Julie";

    // 2. CHARGEMENT DES DONNÉES
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchAdminAvis();
                const data = response?.['hydra:member'] || response || [];
                setAvis(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erreur chargement avis:", error);
            }
        };
        loadData();
    }, []);

    // 3. FONCTIONS D'ACTIONS (Elles manquaient !)
    const handleValidate = async (id: number) => {
        try {
            await validateAvis(id);
            setAvis(prev => prev.filter(a => a.id !== id));
        } catch (err) { alert("Erreur validation"); }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteAvis(id);
            setAvis(prev => prev.filter(a => a.id !== id));
        } catch (err) { alert("Erreur suppression"); }
    };

    // 4. LOGIQUE D'AFFICHAGE
    const shouldShow = (tabName: string) => activeTab === 'all' || activeTab === tabName;
    
    if (!userData) return <div className="p-20 text-center text-gray-500 font-bold">Session expirée. Veuillez vous reconnecter.</div>;

    return (
        <div className="min-h-screen bg-gray-100 font-sans pb-20">
            <AdminNavbar activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="max-w-7xl mx-auto p-8">
                <header className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 italic">
                        Espace {isAdmin ? 'Direction' : 'Administration'} - {userEmail}
                    </h1>
                    <p className="text-gray-500">Vue d'ensemble de l'établissement</p>
                </header>

                <div className="flex flex-col gap-12">
                    {/* --- 1. MODÉRATION DES AVIS --- */}
                    {shouldShow('avis') && (
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 text-orange-600 flex items-center gap-2">
                                💬 Avis en attente
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b text-gray-400 text-xs uppercase">
                                            <th className="px-6 py-4">Client</th>
                                            <th className="px-6 py-4">Message</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {avis.map((item: any) => (
                                            <tr key={item.id}>
                                                <td className="py-4 px-6 font-semibold">{item.nom}</td>
                                                <td className="py-4 px-6 text-gray-600 italic">"{item.message}"</td>
                                                <td className="py-4 px-6 text-right">
                                                    <button onClick={() => handleValidate(item.id)} className="text-green-600 font-bold mr-4 hover:underline">Approuver</button>
                                                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">Supprimer</button>
                                                </td>
                                            </tr>
                                        ))}
                                        {avis.length === 0 && (
                                            <tr><td colSpan={3} className="py-8 text-center text-gray-400 font-medium italic">Aucun avis à modérer.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {/* --- 2. GESTION DES MENUS --- */}
                    {shouldShow('menus') && (
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 text-orange-600 flex items-center gap-2">🍴 Gestion de la Carte</h2>
                            <AdminMenus />
                        </section>
                    )}

                    {/* --- 3. GESTION DES HORAIRES --- */}
                    {shouldShow('horaires') && (
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 text-orange-600 flex items-center gap-2">🕒 Horaires d'ouverture</h2>
                            <AdminHoraires />
                        </section>
                    )}

                    {/* --- 4. GESTION DES COMMANDES --- */}
                    {shouldShow('commandes') && (
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <AdminOrders />
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;