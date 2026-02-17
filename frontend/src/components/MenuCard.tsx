import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '../types/Menu';

interface MenuCardProps {
    menu: any;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu }) => {
    const navigate = useNavigate();

    const menuId = menu.menu_id || menu.id;

    const handleSeeDetails = () => {
        if (menuId) {
            navigate(`/menu/${menuId}`);
        } else {
            console.error("ID du menu manquant dans l'objet :", menu);
        }
    };
    
   return (
    <div 
        onClick={handleSeeDetails}
        className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 hover:cursor-pointer duration-300 flex flex-col h-full"
    >
       <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
        <img 
            src={`http://localhost:8000${menu.image_url}`} 
            alt={menu.titre_menu} 
            className="w-full h-full object-cover"
            onError={(e) => {
                e.currentTarget.onerror = null; 
                e.currentTarget.src = "https://placehold.co/400x300?text=Image+Indisponible";
            }}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
            {menu.theme?.libelle || 'Menu'}
        </div>
    </div>
        {/* Contenu textuel */}
        <div className="p-6 flex flex-col flex-grow">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{menu.titre_menu}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                {menu.description_menu}
            </p>
            
            <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                <span className="text-2xl font-black text-gray-900">{menu.prix_menu}€</span>
                <div className="flex flex-col items-end gap-2">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSeeDetails();
                        }}
                        className="text-xs text-orange-600 font-bold hover:underline"
                    >
                        Voir allergènes & infos
                    </button>
                    <button 
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition-colors shadow-md"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSeeDetails();
                        }}
                    >
                        Commander
                    </button>
                </div>
            </div>
        </div>
    </div>
);
};

export default MenuCard;