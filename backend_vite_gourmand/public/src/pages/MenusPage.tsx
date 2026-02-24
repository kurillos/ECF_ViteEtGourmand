import React, { useEffect, useState } from 'react';
import { menuService } from '../services/api';
import MenuCard from '../components/MenuCard';
import { Menu } from '../types/Menu';

const MenusPage = () => {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);

    // États pour les filtres
    const [maxPrice, setMaxPrice] = useState<number>(100);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [selectedTheme, setSelectedTheme] = useState<string>('');
    const [selectedRegime, setSelectedRegime] = useState<string>('');
    const [minPersons, setMinPersons] = useState<number>(1);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const data = await menuService.getAll();
                setMenus(data);
                setFilteredMenus(data);
            } catch (error) {
                console.error("Erreur API :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMenus();
    }, []);

    // Logique de filtrage en temps réel
    useEffect(() => {
        const result = menus.filter(menu => {
            const prix = parseFloat(menu.prix_menu);
            const matchPrix = prix >= minPrice && prix <= maxPrice;
            const matchTheme = selectedTheme === '' || menu.theme?.libelle === selectedTheme;
            const matchRegime = selectedRegime === '' || menu.regime === selectedRegime;
            const matchPersons = menu.nb_personnes >= minPersons;

            return matchPrix && matchTheme && matchRegime && matchPersons;
        });
        setFilteredMenus(result);
    }, [minPrice, maxPrice, selectedTheme, selectedRegime, minPersons, menus]);

    if (loading) return <div className="text-center p-20 text-orange-500 font-bold">Chargement de la carte...</div>;

    const handleReset = () => {
    setMinPrice(0);
    setMaxPrice(100);
    setSelectedTheme('');
    setSelectedRegime('');
    setMinPersons(1);
    // On n'a pas besoin de recharger, le useEffect des filtres va se déclencher tout seul
};

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="bg-orange-500 text-white py-12 text-center shadow-inner">
                <h1 className="text-4xl font-black uppercase">La Carte de Saison</h1>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-8">
                {/* BARRE DE FILTRES */}
                <div className="bg-white p-6 rounded-2xl shadow-sm mb-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-end">
                    
                    {/* Fourchette de prix */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Prix ({minPrice}€ - {maxPrice}€)</label>
                        <div className="flex gap-2">
                            <input type="number" placeholder="Min" className="w-full p-2 border rounded-lg text-sm" 
                                   onChange={(e) => setMinPrice(Number(e.target.value) || 0)} />
                            <input type="number" placeholder="Max" className="w-full p-2 border rounded-lg text-sm" 
                                   onChange={(e) => setMaxPrice(Number(e.target.value) || 100)} />
                        </div>
                    </div>

                    {/* Thème */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Thème</label>
                        <select className="p-2 border rounded-lg text-sm" onChange={(e) => setSelectedTheme(e.target.value)}>
                            <option value="">Tous les thèmes</option>
                            {[...new Set(menus.map(m => m.theme?.libelle))].filter(Boolean).map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    {/* Régime */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Régime</label>
                        <select className="p-2 border rounded-lg text-sm" onChange={(e) => setSelectedRegime(e.target.value)}>
                            <option value="">Tous les régimes</option>
                            <option value="Végétarien">Végétarien</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Sans Gluten">Sans Gluten</option>
                            <option value="Classique">Classique</option>
                        </select>
                    </div>

                    {/* Nb Personnes */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Pers. min ({minPersons})</label>
                        <input type="range" min="1" max="20" value={minPersons} 
                               className="accent-orange-500"
                               onChange={(e) => setMinPersons(Number(e.target.value))} />
                    </div>

                    <button 
                        onClick={handleReset} 
                        className="text-xs text-orange-500 font-bold hover:text-orange-700 transition-colors uppercase tracking-wider"
                    >
                        Réinitialiser les filtres
                    </button>
                </div>

                {/* GRILLE DES MENUS FILTRÉS */}
                {filteredMenus.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredMenus.map((m) => (
                            <MenuCard key={m.id} menu={m} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg italic">Aucun menu ne correspond à vos critères.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenusPage;