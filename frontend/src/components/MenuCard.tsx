return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300">
        {/* Image du menu */}
        <div className="relative h-48 w-full">
            <img 
                src={menu.image} 
                alt={menu.nom} 
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
                {menu.theme}
            </div>
        </div>

        {/* Contenu textuel */}
        <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{menu.nom}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {menu.description}
            </p>
            
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-2xl font-black text-gray-900">{menu.prix}€</span>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition-colors shadow-md shadow-orange-200">
                    Commander
                </button>
            </div>
        </div>
    </div>
);