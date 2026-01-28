import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-black tracking-tighter text-gray-900">
          VITE <span className="text-orange-500">&</span> GOURMAND
        </div>

        {/* Liens (Desktop) */}
        <div className="hidden md:flex space-x-8 font-semibold text-sm text-gray-600">
          <a href="#" className="hover:text-orange-500 transition-colors">Accueil</a>
          <a href="#menus" className="hover:text-orange-500 transition-colors">Nos Menus</a>
          <a href="#equipe" className="hover:text-orange-500 transition-colors">L'Équipe</a>
          <a href="#avis" className="hover:text-orange-500 transition-colors">Avis</a>
        </div>

        {/* Action */}
        <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 transition-all shadow-md">
          Réserver
        </button>
      </div>
    </nav>
  );
};

export default Navbar;