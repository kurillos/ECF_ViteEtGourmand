import React, { useEffect, useState } from 'react';
import { commandeService } from '../../services/api';
import AdminNavbar from '../../partials/AdminNavbar';
import Footer from '../../partials/Footer';

interface Order {
    id: number;
    date_commande: string;
    statut: string;
    total: string;
    a_pret_materiel: boolean;
    client: { email: string };
}

const AdminOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [newStatus, setNewStatus] = useState<string>('');
    const [motif, setMotif] = useState<string>('');
    const [contactMode, setContactMode] = useState<string>('Mail');
    const [searchClient, setSearchClient] = useState('');

    const fetchOrders = async (statut?: string) => {
        setLoading(true);
        try {
            const data = await commandeService.getAll(statut);
            setOrders(data);
        } catch (error) {
            console.error("Erreur chargement commandes", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(filter); }, [filter]);

    // LOGIQUE DE FILTRAGE PAR RECHERCHE CLIENT
    const filteredOrders = orders.filter(order => {
    const email = order.client?.email || ""; 
        return email.toLowerCase().includes(searchClient.toLowerCase());
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'accepté': return 'bg-blue-100 text-blue-800';
            case 'en préparation': return 'bg-yellow-100 text-yellow-800';
            case 'en cours de livraison': return 'bg-purple-100 text-purple-800';
            case 'en attente du retour de matériel': return 'bg-red-100 text-red-800 font-bold';
            case 'terminée': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleUpdateStatus = async () => {
        if (!selectedOrder || !motif) return;
        try {
            await commandeService.updateStatus(selectedOrder.id, {
                statut: newStatus,
                motif_modification: motif,
                mode_contact_motif: contactMode
            });
            setSelectedOrder(null);
            setMotif('');
            fetchOrders(filter);
            alert("Commande mise à jour !");
        } catch (error) { alert("Erreur mise à jour"); }
    };

    const handleDeleteOrder = async (orderId: number) => {
    const confirmFirst = window.confirm("ATTENTION : Souhaitez-vous vraiment supprimer cette commande ?");
    
    if (confirmFirst) {
        const motifSuppression = window.prompt("Motif de suppression (pour traçabilité) :");
        
        if (!motifSuppression) {
            alert("Action annulée : un motif est obligatoire.");
            return;
        }

        try {
                await commandeService.delete(orderId); 
                fetchOrders(filter); 
                alert("La commande a été définitivement supprimée.");
            } catch (error) {
                alert("Erreur lors de la suppression en base de données.");
            }
        }
    };

    return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <AdminNavbar />

        <main className="flex-grow max-w-7xl mx-auto w-full p-8">
            {/* --- 1. ENTÊTE ET BARRE D'OUTILS --- */}
            <div className="flex flex-col mb-10">
                <h1 className="text-3xl font-bold text-gray-800 italic mb-6">Gestion des Commandes</h1>
                
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    {/* BARRE DE RECHERCHE */}
                    <div className="flex-grow relative">
                        <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                        <input 
                            type="text"
                            placeholder="Rechercher par email client..."
                            className="w-full border shadow-sm rounded-lg pl-10 pr-4 py-2 bg-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            value={searchClient}
                            onChange={(e) => setSearchClient(e.target.value)}
                        />
                    </div>

                    {/* FILTRE STATUT */}
                    <select 
                        className="border shadow-sm rounded-lg px-4 py-2 bg-white text-gray-600 outline-none focus:ring-2 focus:ring-orange-500 min-w-[200px]"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="">Tous les statuts</option>
                        <option value="accepté">Accepté</option>
                        <option value="en préparation">En préparation</option>
                        <option value="en cours de livraison">En livraison</option>
                        <option value="en attente du retour de matériel">Matériel à récupérer</option>
                        <option value="terminée">Terminée</option>
                    </select>
                </div>
            </div>

            {/* --- 2. AFFICHAGE DES RÉSULTATS --- */}
            {loading ? (
                <div className="flex flex-col items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
                    <p className="font-bold text-gray-500">Chargement des commandes...</p>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-dashed border-gray-300">
                    <p className="text-gray-400">Aucune commande ne correspond à votre recherche.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500 flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(order.statut)}`}>
                                        {order.statut}
                                    </span>
                                    <span className="text-gray-400 text-sm font-mono">#{order.id}</span>
                                </div>
                                <h3 className="font-bold text-gray-800 truncate" title={order.client?.email}>
                                    {order.client?.email || 'Client inconnu'}
                                </h3>
                                <p className="text-gray-500 text-xs mt-1">📅 {new Date(order.date_commande).toLocaleDateString()}</p>
                                
                                {order.a_pret_materiel && (
                                    <div className="mt-3 py-1 px-2 bg-red-50 rounded text-[10px] text-red-600 font-bold flex items-center gap-1 border border-red-100">
                                        ⚠️ PRÊT DE MATÉRIEL EN COURS
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-6 flex flex-col gap-3 border-t pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-black text-orange-600">{order.total} €</span>
                                    <button 
                                        onClick={() => { setSelectedOrder(order); setNewStatus(order.statut); }}
                                        className="bg-gray-900 text-white px-5 py-2 rounded-lg font-bold hover:bg-orange-600 transition shadow-sm"
                                    >
                                        Gérer
                                    </button>
                                </div>
                                <button 
                                    onClick={() => handleDeleteOrder(order.id)}
                                    className="text-[10px] text-gray-300 hover:text-red-500 transition text-right uppercase tracking-widest font-bold"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* --- 3. MODALE (Reste inchangée) --- */}
            {/* ... ton code de modale ici ... */}
        </main>
        <Footer />
    </div>
);
};

export default AdminOrders;