import React, { useEffect, useState } from 'react';
import { fetchOpeningHours } from '../services/api';

const Footer: React.FC = () => {
  const [hours, setHours] = useState<any[]>([]);

  useEffect(() => {
    fetchOpeningHours().then(setHours).catch(console.error);
  }, []);

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

        {/* Horaires */}
        <div>
          <h3 className="text-white font-bold mb-4">Nos Horraires</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            {hours.map((h) => (
            <li key={h.id} className='flex justify-between border-b border-gray-800 pb-1'>
              <span className='font-semibold text-white'>{h.day}</span>
                <span className="text-right">
                  {h.isClosed ? (
                    <span className='text-red-500 font-bold italic'>Fermé</span>
                    ) : (
                      <div className="flex flex-col text-[11px]">
                        {/* Créneau Matin */}
                        <div>
                        {h.openAM && h.closeAM ? `${h.openAM} - ${h.closeAM}` : <span className="text-red-400 italic">Midi: Fermé</span>}
                        </div>
                        {/* Créneau Soir */}
                        <div>
                          {h.openPM && h.closePM ? `${h.openPM} - ${h.closePM}` : <span className="text-red-400 italic">Soir: Fermé</span>}
                        </div>
                      </div>
                    )}
                  </span>
              </li>
            ))}
          </ul>
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
          <p className="text-gray-400 text-sm italic">75010 Paris — 123 Rue de la Gastronomie</p>
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