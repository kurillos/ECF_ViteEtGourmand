import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuService } from '../services/api';

export const MenuDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [menu, setMenu] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                if (id) {
                    // On récupère les données via l'API
                    const data = await menuService.getById(parseInt(id));
                    setMenu(data);
                }
            } catch (error) {
                console.error("Erreur chargement menu", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const handleOrder = () => {
    const userString = localStorage.getItem('user');
    const authData = userString ? JSON.parse(userString) : null;

    if (authData?.token) {
        const menuId = menu?.menu_id || menu?.id || id;
        navigate(`/commande/${menuId}`); 
    } else {
        navigate('/register');
        }
    };

    if (loading) return <div className="p-10 text-center text-orange-500 font-bold">Chargement des saveurs...</div>;
    if (!menu) return <div className="p-10 text-center">Menu introuvable (ID: {id}).</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-2xl rounded-3xl mt-10 mb-10 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-10">
                {/* Galerie d'image corrigée avec le port du backend */}
                <div className="relative group">
                    <img 
                        src={`http://localhost:8000${menu.image_url}`} 
                        alt={menu.titre_menu} 
                        className="rounded-2xl shadow-lg object-cover w-full h-112.5 transition-transform duration-500 group-hover:scale-[1.02]" 
                        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/450?text=Vite+Et+Gourmand"; }}
                    />
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                        {menu.theme?.libelle || 'Menu'}
                    </div>
                </div>
                
                <div className="flex flex-col justify-center space-y-6">
                    <h1 className="text-4xl font-black text-gray-800 tracking-tight">
                        {menu.titre_menu}
                    </h1>
                    
                    <div className="flex items-center gap-4">
                        <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                            {menu.regime || 'Classique'}
                        </span>
                        <span className="text-gray-400">|</span>
                        <p className="text-sm text-gray-500 font-medium">Pour {menu.nb_personnes} personne(s) min.</p>
                    </div>

                    <p className="text-4xl font-black text-orange-500">
                        {menu.prix_menu}€
                    </p>
                    
                    <p className="text-gray-600 text-lg leading-relaxed italic">
                        "{menu.description_menu}"
                    </p>
                    
                    <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
                        <p className="text-sm font-bold text-orange-800">
                            🔥 Stock limité : Plus que {menu.quantite_restante} disponibles !
                        </p>
                    </div>

                    <button 
                        onClick={handleOrder}
                        className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-xl shadow-lg hover:bg-orange-600 transition-all active:scale-95"
                    >
                        COMMANDER MAINTENANT
                    </button>
                </div>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-10 border-t border-gray-100 pt-10">
                <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                        <span>🍽️</span> Composition du menu
                    </h3>
                    <div className="space-y-3">
                        {menu.plats?.map((p: any) => (
                            <div key={p.plat_id || p.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-transparent hover:border-orange-200 transition-colors">
                                <span className="text-orange-500">✔</span>
                                <span className="font-semibold text-gray-700">{p.titre_plat}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 p-5 bg-red-50 rounded-2xl border border-red-100">
                        <h4 className="text-red-800 font-bold mb-1 flex items-center gap-2">
                            <span>⚠️</span> Allergènes :
                        </h4>
                        <p className="text-red-700 text-sm">{menu.allergenes || "Aucun allergène signalé par le chef."}</p>
                    </div>
                </div>

                <div className="bg-gray-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-10 rounded-full -mr-16 -mt-16"></div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span>📦</span> Infos & Logistique
                    </h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">
                        {menu.conditions || "Précautions de stockage et délais de livraison non spécifiés."}
                    </p>
                    <div className="mt-8 pt-6 border-t border-gray-700 text-xs text-gray-400">
                        * Les photos sont non contractuelles. Livraison sous conditions de zone géographique.
                    </div>
                </div>
            </div>
        </div>
    );
};