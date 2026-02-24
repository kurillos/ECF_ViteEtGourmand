import React, { useEffect, useState } from 'react';
import { menuService, platService, themeService } from '../../services/api';
import PlatManagerModal from '../../components/PlatManagerModal';
import { EditMenuModal } from '../../components/EditMenuModal';

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
    nb_personnes: number;
    quantite_restante: number;
    theme?: Theme;
    plats?: Plat[];
    regime?: string;
}

const AdminMenus = () => {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [plats, setPlats] = useState<Plat[]>([]);
    const [themes, setThemes] = useState<Theme[]>([]);
    const [isPlatModalOpen, setIsPlatModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null); // Correction : Déclaration de l'état manquant
    
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
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce menu ?")) {
            try {
                await menuService.delete(id);
                setMenus(prev => prev.filter(m => m.id !== id));
            } catch (error) {
                console.error("Erreur suppression:", error);
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Gestion de la Carte</h2>
                <button 
                    onClick={() => setIsPlatModalOpen(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded font-bold hover:bg-purple-700"
                >
                    ⚙️ Gérer les Plats (Global)
                </button>
            </div>
            
            {/* FORMULAIRE D'AJOUT */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8 border-t-4 border-green-500">
                <h3 className="text-lg font-bold mb-4">Créer un nouveau menu</h3>
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Titre du menu" className="border p-2 rounded" onChange={(e) => setFormData({...formData, titre_menu: e.target.value})} />
                    <input type="number" placeholder="Prix" className="border p-2 rounded" onChange={(e) => setFormData({...formData, prix_menu: e.target.value})} />
                    <textarea placeholder="Description / Présentation du menu" className="border p-2 rounded col-span-2" onChange={(e) => setFormData({...formData, description_menu: e.target.value})} />
                    <input type="number" placeholder="Nb de personnes min" className="border p-2 rounded" onChange={(e) => setFormData({...formData, nb_personnes: parseInt(e.target.value)})} />
                    <select className="border p-2 rounded w-full" onChange={(e) => setFormData({...formData, theme_id: e.target.value})} value={formData.theme_id || ""}>
                        <option value="">Choisir un thème</option>
                        {themes.map((t) => (
                            <option key={t.id} value={t.id}>{t.libelle}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <label className="block font-bold mb-2">Plats inclus :</label>
                    <div className="flex flex-wrap gap-4">
                        {plats.map(plat => (
                            <label key={plat.id} className="flex items-center space-x-2">
                                <input type="checkbox" onChange={(e) => handlePlatChange(plat.id, e.target.checked)} />
                                <span>{plat.titre_plat}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit" className="mt-6 bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 w-full">
                    Enregistrer le Menu
                </button>
            </form>

            <h2 className="text-2xl font-bold mb-4">Menus existants</h2>

            {/* LISTE DES MENUS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menus.map((menu) => (
                    <div key={menu.id} className="border p-4 rounded bg-gray-50 shadow flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-lg text-blue-900">{menu.titre_menu}</h3>
                                <span className="font-bold text-green-700">{menu.prix_menu}€</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 italic">{menu.description_menu}</p>
                            <div className="mb-4">
                                {menu.plats?.map((p) => (
                                    <span key={p.id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1">
                                        {p.titre_plat}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2 border-t pt-3">
                            <button
                                onClick={() => setSelectedMenu(menu)}
                                className="flex-1 bg-blue-500 text-white py-1 rounded font-bold hover:bg-blue-600"
                            >
                                Gérer
                            </button>
                            <button
                                onClick={() => handleDelete(menu.id)}
                                className="px-3 py-1 text-red-600 border border-red-600 rounded font-bold hover:bg-red-50"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODALES */}
            <PlatManagerModal 
                isOpen={isPlatModalOpen} 
                onClose={() => setIsPlatModalOpen(false)} 
                onRefresh={loadInitialData} 
            />
            {selectedMenu && (
                <EditMenuModal
                    menu={selectedMenu}
                    themes={themes}
                    plats={plats}
                    onClose={() => setSelectedMenu(null)}
                    onRefresh={loadInitialData}
                />
            )}
        </div>
    );
};

export default AdminMenus;