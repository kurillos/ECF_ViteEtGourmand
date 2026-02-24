import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { menuService } from '../services/api';

const MenuDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [menu, setMenu] = useState<any>(null);

    // 1. ON VÉRIFIE LA CONNEXION
    const authString = localStorage.getItem('auth');
    const isConnected = !!authString; 

    useEffect(() => {
        if (id) {
            menuService.getById(id).then(data => setMenu(data));
        }
    }, [id]);

    if (!menu) return <div className="p-20 text-center">Chargement...</div>;

    // 2. LA FONCTION DE COMMANDE
    const handleOrderClick = () => {
        if (isConnected) {
            navigate(`/commande/${menu.id}`);
        } else {
            navigate('/register');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image du Menu */}
                <img 
                    src={`http://localhost:8000/images/${menu.image}`} 
                    alt={menu.titre_menu} 
                    className="rounded-3xl shadow-2xl w-full object-cover h-125"
                />

                {/* Détails */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-5xl font-black italic mb-4">{menu.titre_menu}</h1>
                    <p className="text-gray-500 text-xl mb-6">{menu.description_menu}</p>
                    
                    <div className="bg-orange-50 p-6 rounded-2xl mb-8">
                        <p className="text-3xl font-black text-orange-600">{menu.prix_menu}€ <span className="text-sm text-gray-400">/ personne</span></p>
                        <p className="text-sm text-gray-500 italic mt-2">Minimum {menu.nb_personnes} personnes</p>
                    </div>

                    {/* LE BOUTON */}
                    <button 
                        onClick={handleOrderClick}
                        className="bg-gray-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-600 transition-all transform hover:-translate-y-1 shadow-xl"
                    >
                        {isConnected ? 'Commander maintenant' : 'Connectez-vous pour commander'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuDetail;