import React from 'react';
import { Menu } from '../types/Menu';

interface MenuCardProps {
    menu: Menu;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu }) => {
    
   return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300 flex flex-col h-full">
        {/* Conteneur de l'image avec hauteur FIXE */}
        <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
            <img 
                src={menu.image} 
                alt={menu.nom} 
                className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
                {menu.theme}
            </div>
        </div>

        {/* Contenu textuel */}
        <div className="p-6 flex flex-col flex-grow">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{menu.nom}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                {menu.description}
            </p>
            
            <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                <span className="text-2xl font-black text-gray-900">{menu.prix}€</span>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition-colors shadow-md">
                    Commander
                </button>
            </div>
        </div>
    </div>
);
};

export default MenuCard;