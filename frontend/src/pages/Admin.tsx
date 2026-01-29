import React, { useState, useEffect } from 'react';
import Navbar from "../partials/Navbar";
import Footer from "../partials/Footer";
import { fetchAdminAvis, validateAvis, deleteAvis } from "../services/api"

/**
 * Page d'administration pour la modération des avis.
 * Récupère les avis via le service API et permet la validation.
 */

const Admin = () => {
    const [avis, setAvis] = useState([]);
    const [isUpdating, setIsUpdating] = useState<number | null>(null);

    const loadAvis = async () => {
        fetchAdminAvis()
        .then(setAvis)
        .catch(console.error);
    };

    useEffect(() => {
        loadAvis();
    }, []);


    const handleValidate = async (id: number) => {
        setIsUpdating(id);
        try{
            await validateAvis(id);
            loadAvis();
        } catch (error) {
            alert("Erreur lors de la validation");
        } finally {
            setIsUpdating(null);
       }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Confirmer la suppression de cet avis ?")) {
            try {
                await deleteAvis(id);
                loadAvis();
            } catch (error) {
                alert("Erreur lors de la suppression");
            }
        }
    };

     return (
        <div className="min-h-screen bg-grey-100 font-sans">
            <Navbar />
            <div className="max-w-7xl mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-900 italic">Espace Administration - Julie</h1>

                {/* Liste des avis à valider */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 text-gray-400 text-sm uppercase">
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4">Note</th>
                                    <th className="px-6 py-4">Message</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {avis.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-gray-400">Aucun avis à valider</td>
                                    </tr>
                                ) : (
                                    avis.map((item: any) => (
                                        <tr key={item.id} className="border-b border-gray-50 hover:bg-fray-50 transition">
                                            <td className="py-4 px-2 font-semibold text-gray-800">{item.nom}</td>
                                            <td className="py-4 px-6">
                                                <span className="flex items-center text-orange-500 font-bold">
                                                    {item.note} <span className='ml-1 text-xs'>★</span>
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 text-gray-600 italic text-sm">{item.message}</td>
                                            <td className="py-4 px-6 text-right">
                                                {item.isValidated ? (
                                                    <span className="text-green-500 font-bold text-xs bg-green-50 px-2 py-1 rounded">Validé</span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleValidate(item.id)}
                                                        disabled={isUpdating === item.id}
                                                        className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
                                                    >
                                                        {isUpdating === item.id ? 'Chargement...' : 'Approuver'}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="ml-2 bg-red-500 hover:bg-red-600 hover:text-white text-xs font-bold py-2 px-4 rounded-lg transition"
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;