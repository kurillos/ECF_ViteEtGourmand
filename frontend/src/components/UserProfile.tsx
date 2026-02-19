import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();

    const authString = localStorage.getItem('auth');
    const authData = authString ? JSON.parse(authString) : null;

    const [userData, setUserData] = useState({
        email: authData?.email || '',
        nom: authData?.nom || '',
        prenom: authData?.prenom || '',
        telephone: authData?.telephone || '',
        adresse: authData?.adresse || '',
    });

    const [message, setMessage] = useState('');

    if (!authData) {
        navigate('/login');
        return null;
    }

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        
        const updatedAuthData = { ...authData, ...userData };
        localStorage.setItem('auth', JSON.stringify(updatedAuthData));

        setMessage("✅ Profil mis à jour localement !");
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="max-w-3xl mx-auto p-10 bg-white rounded-[2.5rem] shadow-xl mt-10 mb-10 border border-gray-100">
            <h2 className="text-3xl font-black mb-2 italic text-gray-900">Mon Profil</h2>
            <p className="text-gray-400 mb-8 font-medium italic text-sm">Gérez vos informations personnelles</p>
            
            {message && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-2xl font-bold text-sm border border-green-100">
                    {message}
                </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-6">
                {/* Ligne Email (Lecture seule) */}
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Email (Identifiant)</label>
                    <input type="email" disabled value={userData.email} className="w-full p-4 bg-gray-50 text-gray-400 rounded-2xl border border-gray-100 cursor-not-allowed" />
                </div>

                {/* Grille Nom / Prénom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-2">Nom</label>
                        <input type="text" placeholder="Votre nom" className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500" 
                        value={userData.nom} onChange={e => setUserData({...userData, nom: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-2">Prénom</label>
                        <input type="text" placeholder="Votre prénom" className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500" 
                        value={userData.prenom} onChange={e => setUserData({...userData, prenom: e.target.value})} />
                    </div>
                </div>

                {/* Téléphone */}
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Téléphone (GSM)</label>
                    <input type="tel" placeholder="06 XX XX XX XX" className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500" 
                    value={userData.telephone} onChange={e => setUserData({...userData, telephone: e.target.value})} />
                </div>

                {/* Adresse */}
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Adresse de livraison par défaut</label>
                    <textarea rows={2} placeholder="Votre adresse complète" className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500" 
                    value={userData.adresse} onChange={e => setUserData({...userData, adresse: e.target.value})} />
                </div>

                <div className="flex flex-col gap-4 pt-6">
                    <button type="submit" className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-600 transition shadow-lg transform hover:-translate-y-1">
                        ENREGISTRER LES MODIFICATIONS
                    </button>
                    
                    <button type="button" onClick={() => {if(window.confirm("Supprimer votre compte ?")) { localStorage.removeItem('auth'); navigate('/'); window.location.reload(); }}} className="text-red-500 font-bold text-sm hover:underline">
                        Supprimer définitivement mon compte
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserProfile;