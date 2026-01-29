import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  
  // On récupère l'utilisateur stocké
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem('user'); // On vide la session
    navigate('/'); // Retour à l'accueil
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-gray-900 cursor-pointer">
          VITE <span className="text-orange-500">&</span> GOURMAND
        </Link>

        {/* Liens (Desktop) */}
        <div className="hidden md:flex space-x-8 font-semibold text-sm text-gray-600">
          <Link to="/" className="hover:text-orange-500 transition-colors">Accueil</Link>
          <a href="#menus" className="hover:text-orange-500 transition-colors">Nos Menus</a>
          
          {user && (
            <Link to="/admin" className="text-orange-600 font-bold hover:underline">Admin</Link>
          )}
        </div>

        {/* Action (Dynamique) */}
        <div className="flex items-center gap-4">
          {user ? (
            <button 
              onClick={handleLogout}
              className="bg-red-50 text-red-600 px-5 py-2 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition-all"
            >
              Déconnexion
            </button>
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