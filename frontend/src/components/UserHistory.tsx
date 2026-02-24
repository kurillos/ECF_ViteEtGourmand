import React, { useEffect, useState } from 'react';
import { userService } from '../services/api';

const UserHistory = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadOrders = async () => {
        try {
            const data = await userService.getOrders();
            setOrders(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Erreur historique:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleCancel = async (id: number) => {
        if (window.confirm("Êtes-vous sûr de vouloir annuler cette commande ?")) {
            try {
                await userService.cancelOrder(id);
                alert("Commande annulée.");
                loadOrders();
            } catch (err) {
                alert("Impossible d'annuler cette commande.");
            }
        }
    };

    if (loading) return <div className="p-10 text-center">Chargement de vos commandes...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-black italic mb-8">Mon Historique</h1>

            {orders.length === 0 ? (
                <p className="text-gray-500 italic">Vous n'avez pas encore passé de commande.</p>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Commande #{order.id}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                                        order.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-700' :
                                        order.statut === 'accepté' ? 'bg-green-100 text-green-700' :
                                        order.statut === 'annulée' ? 'bg-red-100 text-red-700' : 'bg-gray-100'
                                    }`}>
                                        {order.statut}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{order.menu?.nom}</h3>
                                <p className="text-gray-500 text-sm">Prévue le {new Date(order.datePrestation).toLocaleDateString()} à {order.heureLivraison}</p>
                                <p className="font-bold text-orange-600 mt-2">{order.totalTTC.toFixed(2)} €</p>
                            </div>

                            <div className="mt-4 md:mt-0 flex gap-3">
                                {order.statut === 'en_attente' && (
                                    <button 
                                        onClick={() => handleCancel(order.id)}
                                        className="px-4 py-2 border border-red-200 text-red-600 rounded-xl text-sm font-bold hover:bg-red-50 transition-all"
                                    >
                                        Annuler
                                    </button>
                                )}
                                {order.statut === 'terminée' && (
                                    <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-orange-600 transition-all">
                                        Donner un avis
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserHistory;