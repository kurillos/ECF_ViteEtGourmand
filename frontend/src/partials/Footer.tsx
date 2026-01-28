import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
        {/* Colonne 1: Bio */}
        <div className="space-y-4">
          <h3 className="text-xl font-black italic">Vite & Gourmand</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            L'excellence du goût et le professionnalisme d'une équipe passionnée pour vos réceptions depuis 2010.
          </p>
        </div>

        {/* Colonne 2: Liens rapides */}
        <div className="space-y-4">
          <h4 className="font-bold text-orange-500 uppercase text-xs tracking-widest">Navigation</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><a href="#" className="hover:text-white transition">Mentions Légales</a></li>
            <li><a href="#" className="hover:text-white transition">Politique de Cookies</a></li>
            <li><a href="#" className="hover:text-white transition">Conditions de Vente</a></li>
          </ul>
        </div>

        {/* Colonne 3: Contact */}
        <div className="space-y-4">
          <h4 className="font-bold text-orange-500 uppercase text-xs tracking-widest">Contact</h4>
          <p className="text-gray-400 text-sm italic">75010 Paris — Rue de la Gastronomie</p>
          <p className="text-xl font-bold tracking-tight">01 42 00 00 00</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] uppercase tracking-widest">
        <p>© 2026 Vite & Gourmand — Tous droits réservés</p>
        <p className="mt-2 md:mt-0 italic">Projet ECF — Développé par Cyril</p>
      </div>
    </footer>
  );
};

export default Footer;