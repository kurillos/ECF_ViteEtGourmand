import React, { useEffect, useState } from 'react';
import { menuService, platService, themeService } from '../../services/api';

interface Plat {
    id: number;
    titre_plat: string;
}

interface Theme {
    id: number;
    libelle: string;
}

interface Menu {
    id: number;
    titre_menu: string;
    prix_menu: string;
    description_menu: string;
    plats?: Plat[];
}

const AdminMenus = () => {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [plats, setPlats] = useState<Plat[]>([]);
    const [themes, setThemes] = useState<Theme[]>([]);
    
    const [formData, setFormData] = useState({
        titre_menu: '',
        description_menu: '',
        prix_menu: '',
        nb_personnes: 1,
        quantite_restante: 10,
        theme_id: '',
        plat_ids: [] as number[]
    });

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            const [menusData, platsData, themesData] = await Promise.all([
                menuService.getAll(), 
                platService.getAll(),
                themeService.getAll()
            ]);
            setMenus(menusData);
            setPlats(platsData);
            setThemes(themesData);
        } catch (error) {
            console.error("Erreur de chargement", error);
        }
    };

    const handlePlatChange = (platId: number, isChecked: boolean) => {
        setFormData(prev => ({
            ...prev,
            plat_ids: isChecked 
                ? [...prev.plat_ids, platId] 
                : prev.plat_ids.filter(id => id !== platId)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await menuService.create(formData);
            alert("Menu créé avec succès !");
            loadInitialData();
        } catch (error) {
            alert("Erreur lors de la création");
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce manu ?")) {
            try {
                await menuService.delete(id);

                setMenus(menus.filter(m => m.id !== id));
            } catch (error) {
                console.error("Erreur suppression:", error);
            }
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Gestion de la Carte</h2>
            
            {/* FORMULAIRE D'AJOUT */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8">
                <div className="grid grid-cols-2 gap-4">
                    <input 
                        type="text" 
                        placeholder="Titre du menu"
                        className="border p-2 rounded"
                        onChange={(e) => setFormData({...formData, titre_menu: e.target.value})}
                    />
                    <input 
                        type="number" 
                        placeholder="Prix"
                        className="border p-2 rounded"
                        onChange={(e) => setFormData({...formData, prix_menu: e.target.value})}
                    />
                    <textarea 
                        placeholder="Description du menu"
                        className="border p-2 rounded col-span-2"
                        onChange={(e) => setFormData({...formData, description_menu: e.target.value})}
                    />
                    <input 
                        type="number" 
                        placeholder="Nb de personnes"
                        className="border p-2 rounded"
                        onChange={(e) => setFormData({...formData, nb_personnes: parseInt(e.target.value)})}
                    />

                    <select 
                        className="border p-2 rounded w-full"
                        onChange={(e) => setFormData({...formData, theme_id: e.target.value})}
                        value={formData.theme_id || ""}
                    >
                        <option value="">Choisir un thème</option>
                        {Array.isArray(themes) && themes.map((t: any) => (
                            <option key={t.id} value={t.id}>
                                {t.libelle}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-4">
                    <label className="block font-bold mb-2">Plats inclus :</label>
                    <div className="flex flex-wrap gap-4">
                        {Array.isArray(plats) ? plats.map(plat => (
                            <label key={plat.id} className="flex items-center space-x-2">
                                <input 
                                    type="checkbox" 
                                    onChange={(e) => handlePlatChange(plat.id, e.target.checked)}
                                />
                                <span>{plat.titre_plat}</span>
                            </label>
                        )) : <p className="text-gray-400 italic">Chargement des plats...</p>}
                    </div>
                </div>

                <button type="submit" className="mt-6 bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700">
                    Enregistrer le Menu
                </button>
            </form>

            <h2 className="text-2xl font-bold mb-4">Menus existants</h2>

            {/* LISTE DES MENUS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.isArray(menus) ? menus.map((menu: any) => (
                    <div key={menu.id} className="border p-4 rounded bg-gray-50 shadow">
                        <h3 className="font-bold">{menu.titre_menu} - {menu.prix_menu}€</h3>
                        <p className="text-sm text-gray-600">{menu.description_menu}</p>
                        <div className="mt-2">
                            {Array.isArray(menu.plats) && menu.plats.map((p: any) => (
                                <span key={p.id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1">
                                    {p.titre_plat}
                                </span>
                            ))}
                        </div>
                        <button
                            onClick={() => handleDelete(menu.id)}
                            className="text-red-600 hover:text-red-800 font-bold"
                        >
                            Supprimer
                        </button>
                    </div>
                )) : <p className="text-center py-4 text-gray-500">Aucun menu disponible ou erreur serveur.</p>}
            </div>
        </div>
    );
};

export default AdminMenus;