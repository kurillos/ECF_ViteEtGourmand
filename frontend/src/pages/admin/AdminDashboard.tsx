import React, { useState, useEffect } from 'react'; // Correction de l'import
import { Navigate } from 'react-router-dom';
import { fetchAdminAvis, validateAvis, deleteAvis } from '../../services/api';
import AdminHoraires from './AdminHoraires';
import AdminMenus from './AdminMenus';
import AdminNavbar from '../../partials/AdminNavbar';
import AdminOrders from '../admin/AdminOrders';

const AdminDashboard: React.FC = () => {
    // 1. États (States)
    const [avis, setAvis] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('all'); 
    
    // 2. Récupération des données AUTH (Structure stable)
    const auth = JSON.parse(localStorage.getItem('auth') || 'null');
    const roles = auth?.roles || [];
    const isAdmin = roles.includes('ROLE_ADMIN');
    const isEmploye = roles.includes('ROLE_EMPLOYE');
    const userEmail = auth?.email || "Julie";

    // 3. VERROU DE SÉCURITÉ (On éjecte Julie si elle n'est pas staff)
    if (!isAdmin && !isEmploye) {
        return <Navigate to="/" replace />;
    }

    // 4. CHARGEMENT DES DONNÉES
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

    // 5. FONCTIONS D'ACTIONS
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

    const shouldShow = (tabName: string) => activeTab === 'all' || activeTab === tabName;

    return (
        <div className="min-h-screen bg-gray-100 font-sans pb-20">
            {/* On affiche la Navbar d'admin, pas la Navbar générale ! */}
            <AdminNavbar activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="max-w-7xl mx-auto p-8">
                <header className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 italic">
                        Espace {isAdmin ? 'Direction' : 'Administration'} - {userEmail}
                    </h1>
                </header>

                <div className="flex flex-col gap-12">
                    {shouldShow('avis') && (
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 text-orange-600">💬 Avis en attente</h2>
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
                                                    <button onClick={() => handleValidate(item.id)} className="text-green-600 font-bold mr-4">Approuver</button>
                                                    <button onClick={() => handleDelete(item.id)} className="text-red-500">Supprimer</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {avis.length === 0 && <p className="p-8 text-center text-gray-400">Aucun avis à modérer.</p>}
                            </div>
                        </section>
                    )}

                    {shouldShow('menus') && <AdminMenus />}
                    {shouldShow('horaires') && <AdminHoraires />}
                    {shouldShow('commandes') && <AdminOrders />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;