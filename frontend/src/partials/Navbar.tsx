import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  
  // États pour l'authentification
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [isLogged, setIsLogged] = useState(false);
  
  // ÉTAT POUR LE MENU MOBILE
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('auth') || 'null');
    if (authData) {
      setUserRoles(authData.roles || []);
      setIsLogged(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    setIsLogged(false);
    setUserRoles([]);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-gray-900 z-50">
          VITE <span className="text-orange-500">&</span> GOURMAND
        </Link>

        {/* LIENS DESKTOP */}
        <ul className="hidden md:flex items-center space-x-8 font-semibold text-sm text-gray-600 list-none mb-0">
          <li><Link to="/" className="hover:text-orange-500 transition-colors">Accueil</Link></li>
          <li><Link to="/menus" className="hover:text-orange-500 transition-colors">Menu</Link></li>
          <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
          {!isLogged && <li><Link to="/register" className="hover:text-orange-500 transition-colors">Inscription</Link></li>}
          {(userRoles.includes('ROLE_EMPLOYE') || userRoles.includes('ROLE_ADMIN')) && (
            <li><Link to="/admin" className="text-orange-600 font-bold hover:underline">Espace Admin</Link></li>
          )}
        </ul>

        <div className="flex items-center gap-3">
          {/* BOUTONS CONNEXION (Cachés sur tout petit mobile si besoin) */}
          <div className="hidden sm:flex items-center gap-3">
            {isLogged ? (
              <Link to="/profil" className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-all">
                👤 Mon Profil
              </Link>
            ) : (
              <Link to="/login" className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 transition-all shadow-md">
                Connexion
              </Link>
            )}
          </div>

          {/* BOUTON BURGER (Visible uniquement sur mobile) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-orange-500 focus:outline-none z-50"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MENU MOBILE (OVERLAY) */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 text-2xl font-bold transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-orange-500">Accueil</Link>
        <Link to="/menus" onClick={() => setIsOpen(false)} className="hover:text-orange-500">Menu</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-orange-500">Contact</Link>
        {!isLogged && <Link to="/register" onClick={() => setIsOpen(false)} className="hover:text-orange-500">Inscription</Link>}
        
        {isLogged ? (
          <>
            <Link to="/profil" onClick={() => setIsOpen(false)} className="text-orange-500">Mon Profil</Link>
            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-red-500">Déconnexion</button>
          </>
        ) : (
          <Link to="/login" onClick={() => setIsOpen(false)} className="bg-orange-500 text-white px-8 py-3 rounded-full">Connexion</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;