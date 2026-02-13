import React, { useEffect, useState } from 'react';
import { commandeService } from '../../services/api';

interface Order {
    id: number;
    date_commande: string;
    statut: string;
    total: string;
    a_pret_materiel: boolean;
    client?: { email: string }; // On le met optionnel avec ?
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
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erreur chargement commandes", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(filter); }, [filter]);

    // Sécurisation du filtrage
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
        } catch (error) { console.error(error); }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 font-sans">
            <div className="flex flex-col mb-10">
                <h2 className="text-xl font-bold mb-6 text-orange-600 flex items-center gap-2">
                    <span>📦</span> Gestion des Commandes
                </h2>
                
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <input 
                        type="text"
                        placeholder="Rechercher par email client..."
                        className="grow border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                        value={searchClient}
                        onChange={(e) => setSearchClient(e.target.value)}
                    />
                    <select 
                        className="border rounded-lg px-4 py-2 bg-white text-gray-600 outline-none"
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

            {loading ? (
                <p className="text-center py-10">Chargement...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="bg-gray-50 p-4 rounded-lg border flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${getStatusColor(order.statut)}`}>
                                        {order.statut}
                                    </span>
                                    <span className="text-gray-400 text-xs">#{order.id}</span>
                                </div>
                                <h3 className="font-bold text-gray-800 truncate">
                                    {order.client?.email ? order.client.email.replace(/[\\"]/g, '') : 'Client Inconnu'}
                                </h3>
                                <p className="text-gray-500 text-xs">📅 {new Date(order.date_commande).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-4 flex justify-between items-center border-t pt-3">
                                <span className="text-lg font-bold text-orange-600">{order.total} €</span>
                                <button 
                                    onClick={() => setSelectedOrder(order)}
                                    className="bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition"
                                >
                                    Gérer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminOrders;