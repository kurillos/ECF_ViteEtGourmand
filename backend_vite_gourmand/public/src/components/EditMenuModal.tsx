import React, { useState, useEffect } from 'react';
import { menuService } from '../services/api';

export const EditMenuModal = ({ menu, themes, plats, onClose, onRefresh }: any) => {
    // Initialisation avec TOUS les champs du cahier des charges
    const [formData, setFormData] = useState({ 
        ...menu, 
        theme_id: menu.theme?.id || '', 
        plat_ids: menu.plats?.map((p: any) => p.id) || [],
        allergenes: menu.allergenes || '',
        conditions: menu.conditions || '',
        regime: menu.regime || 'classique'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Vérification de l'ID avant envoi
            if (!menu.id) throw new Error("ID du menu manquant");
            
            await menuService.update(menu.id, formData);
            alert("Menu mis à jour avec succès !");
            onRefresh();
            onClose();
        } catch (error) {
            console.error("Erreur lors de la mise à jour", error);
            alert("Erreur lors de la sauvegarde.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <h2 className="text-xl font-bold mb-4 text-purple-700">Gérer : {menu.titre_menu}</h2>
                
                <div className="grid grid-cols-2 gap-4 text-left">
                    <label className="block font-bold text-sm">Titre
                        <input type="text" className="w-full border p-2 rounded" value={formData.titre_menu} onChange={e => setFormData({...formData, titre_menu: e.target.value})} />
                    </label>
                    <label className="block font-bold text-sm">Prix (€)
                        <input type="number" className="w-full border p-2 rounded" value={formData.prix_menu} onChange={e => setFormData({...formData, prix_menu: e.target.value})} />
                    </label>
                    <label className="block font-bold text-sm">Stock (Quantité)
                        <input type="number" className="w-full border p-2 rounded" value={formData.quantite_restante} onChange={e => setFormData({...formData, quantite_restante: parseInt(e.target.value)})} />
                    </label>
                    <label className="block font-bold text-sm">Régime
                        <select className="w-full border p-2 rounded" value={formData.regime} onChange={e => setFormData({...formData, regime: e.target.value})}>
                            <option value="classique">Classique</option>
                            <option value="végétarien">Végétarien</option>
                            <option value="vegan">Vegan</option>
                        </select>
                    </label>
                    <label className="block col-span-2 font-bold text-sm">URL Image (Galerie)
                        <input type="text" className="w-full border p-2 rounded" value={formData.image_url || ''} onChange={e => setFormData({...formData, image_url: e.target.value})} />
                    </label>
                    <label className="block col-span-2 font-bold text-sm">Description / Présentation
                        <textarea className="w-full border p-2 rounded" value={formData.description_menu} onChange={e => setFormData({...formData, description_menu: e.target.value})} />
                    </label>
                </div>

                {/* NOUVEAUX CHAMPS CAHIER DES CHARGES */}
                <div className="mt-4 space-y-4 text-left border-t pt-4">
                    <label className="block font-bold text-sm">⚠️ Allergènes
                        <textarea className="w-full border p-2 rounded" placeholder="Ex: Gluten, Lactose..." value={formData.allergenes} onChange={e => setFormData({...formData, allergenes: e.target.value})} />
                    </label>
                    <label className="block font-bold text-sm">📦 Conditions (Délai de commande / Stockage)
                        <textarea className="w-full border p-2 rounded" placeholder="Ex: Commander 48h à l'avance..." value={formData.conditions} onChange={e => setFormData({...formData, conditions: e.target.value})} />
                    </label>
                </div>

                <div className="mt-4 text-left">
                    <p className="font-bold text-sm mb-2">Plats inclus :</p>
                    <div className="grid grid-cols-3 gap-2 border p-2 rounded max-h-32 overflow-y-auto">
                        {plats.map((p: any) => (
                            <label key={p.id} className="text-xs flex items-center gap-1">
                                <input type="checkbox" checked={formData.plat_ids.includes(p.id)} 
                                    onChange={(e) => {
                                        const ids = e.target.checked ? [...formData.plat_ids, p.id] : formData.plat_ids.filter((id: any) => id !== p.id);
                                        setFormData({...formData, plat_ids: ids});
                                    }} 
                                /> {p.titre_plat}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded font-bold">Annuler</button>
                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded font-bold hover:bg-purple-700 shadow">
                        Enregistrer les modifications
                    </button>
                </div>
            </form>
        </div>
    );
};