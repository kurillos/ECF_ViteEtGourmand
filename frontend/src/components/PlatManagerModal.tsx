import React, { useState, useEffect } from 'react';
import { platService } from '../services/api';

interface Plat {
    id: number;
    titre_plat: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onRefresh: () => void; // Pour rafraîchir la liste dans AdminMenus après fermeture
}

const PlatManagerModal = ({ isOpen, onClose, onRefresh }: Props) => {
    const [plats, setPlats] = useState<Plat[]>([]);
    const [newPlatTitle, setNewPlatTitle] = useState('');

    useEffect(() => {
        if (isOpen) loadPlats();
    }, [isOpen]);

    const loadPlats = async () => {
        const data = await platService.getAll();
        setPlats(data);
    };

    const handleAddPlat = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await platService.create({ titre_plat: newPlatTitle });
            setNewPlatTitle('');
            loadPlats();
        } catch (error) {
            alert("Erreur lors de l'ajout du plat");
        }
    };

    const handleDeletePlat = async (id: number) => {
        if (window.confirm("Supprimer ce plat ?")) {
            await platService.delete(id);
            loadPlats();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">🍳 Gérer les Plats</h2>
                    <button onClick={() => { onRefresh(); onClose(); }} className="text-gray-500 hover:text-black">✕</button>
                </div>

                <form onSubmit={handleAddPlat} className="flex gap-2 mb-6">
                    <input 
                        type="text"
                        value={newPlatTitle}
                        onChange={(e) => setNewPlatTitle(e.target.value)}
                        placeholder="Nom du plat (ex: Entrecôte)"
                        className="flex-1 border p-2 rounded"
                        required
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold">Ajouter</button>
                </form>

                <div className="max-h-64 overflow-y-auto border-t pt-4">
                    {plats.map(plat => (
                        <div key={plat.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                            <span>{plat.titre_plat}</span>
                            <button 
                                onClick={() => handleDeletePlat(plat.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={() => { onRefresh(); onClose(); }}
                    className="w-full mt-6 bg-gray-200 py-2 rounded font-bold hover:bg-gray-300"
                >
                    Fermer et Actualiser
                </button>
            </div>
        </div>
    );
};

export default PlatManagerModal;