import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // On récupère les données de la nouvelle clé stable 'auth'
  const auth = JSON.parse(localStorage.getItem('auth') || 'null');
  const roles = auth?.roles || [];
  const isLogged = !!auth;

  const handleLogout = () => {
    // Nettoyage complet des deux clés pour éviter les "fantômes"
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    
    // Redirection vers l'accueil ou login
    navigate('/');
    
    // On recharge pour réinitialiser l'état global de l'application
    window.location.reload(); 
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-gray-900 cursor-pointer">
          VITE <span className="text-orange-500">&</span> GOURMAND
        </Link>

        {/* LIENS PRINCIPAUX */}
        <ul className="hidden md:flex items-center space-x-8 font-semibold text-sm text-gray-600 list-none mb-0">
          <li>
            <Link to="/" className="hover:text-orange-500 transition-colors">Accueil</Link>
          </li>
          <li>
            <Link to="/menus" className="hover:text-orange-500 transition-colors">Menu</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
          </li>
          
          {/* Inscription visible seulement si non connecté */}
          {!isLogged && (
            <li>
              <Link to="/register" className="hover:text-orange-500 transition-colors">Inscription</Link>
            </li>
          )}

          {/* ESPACE ADMIN : Visible seulement pour ROLE_EMPLOYE ou ROLE_ADMIN */}
          {(roles.includes('ROLE_EMPLOYE') || roles.includes('ROLE_ADMIN')) && (
            <li>
              <Link to="/admin" className="text-orange-600 font-bold hover:underline">
                Espace Admin
              </Link>
            </li>
          )}
        </ul>

        {/* ACTIONS DROITE (Profil / Connexion / Déconnexion) */}
        <div className="flex items-center gap-3">
          {isLogged ? (
            <>
              <Link 
                to="/profil" 
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-all"
              >
                <span className="text-lg">👤</span>
                <span className="hidden sm:inline">Mon Profil</span>
              </Link>

              <button 
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-5 py-2 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition-all"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 transition-all shadow-md"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;