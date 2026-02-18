import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserProfile = () => {
    const navigate = useNavigate();
    
    // Récupération initiale
    const userString = localStorage.getItem('user');
    const authData = userString ? JSON.parse(userString) : null;
    const [commandes, setCommandes] = useState<any[]>([]);
    
    // State pour le formulaire
    const [userData, setUserData] = useState(authData?.user || {});
    const [message, setMessage] = useState('');

    // --- FONCTION 1 : MISE À JOUR ---
    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedAuthData = {
            ...authData,
            user: { ...authData.user, ...userData }
        };

        localStorage.setItem('user', JSON.stringify(updatedAuthData));
        
        setMessage("✅ Profil mis à jour ! Vos prochaines commandes seront auto-remplies.");
        
        setTimeout(() => setMessage(''), 3000);
    };

    // --- FONCTION 2 : SUPPRESSION (RGPD) ---
    const handleDeleteAccount = async () => {
        const confirmation = "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible et effacera toutes vos données personnelles conformément au RGPD.";
        
        if (window.confirm(confirmation)) {
            try {
                localStorage.removeItem('user');
                localStorage.removeItem('token');

                alert("Votre compte et vos données ont été effacés de nos registres.");
                
                navigate('/');
                window.location.reload(); 
            } catch (error) {
                console.error("Erreur lors de la suppression", error);
                alert("Une erreur est survenue lors de la suppression.");
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-10 bg-white rounded-[3rem] shadow-2xl mt-10 border border-gray-100">
            <h2 className="text-3xl font-black mb-2 italic">MON ESPACE <span className="text-orange-500">CLIENT</span></h2>
            <p className="text-gray-400 mb-8">Gérez vos informations personnelles et votre droit à l'oubli.</p>

            {/* FORMULAIRE DE MISE À JOUR */}
            <form onSubmit={handleUpdate} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-2">Prénom</label>
                        <input 
                            type="text" className="p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                            value={userData.prenom || ''} onChange={e => setUserData({...userData, prenom: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-2">Nom</label>
                        <input 
                            type="text" className="p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                            value={userData.nom || ''} onChange={e => setUserData({...userData, nom: e.target.value})}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Numéro de GSM</label>
                    <input 
                        type="text" className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                        value={userData.telephone || ''} onChange={e => setUserData({...userData, telephone: e.target.value})}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Adresse de livraison</label>
                    <textarea 
                        rows={3} className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                        value={userData.adresse_postale || ''} onChange={e => setUserData({...userData, adresse_postale: e.target.value})}
                    />
                </div>

                <button type="submit" className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-black transition-all shadow-lg">
                    ENREGISTRER LES MODIFICATIONS
                </button>

                {message && (
                    <div className="text-center text-green-700 font-bold bg-green-50 py-3 rounded-2xl border border-green-100">
                        {message}
                    </div>
                )}
            </form>

            {/* SECTION RGPD : */}
            <div className="mt-12 pt-8 border-t border-red-100">
                <div className="bg-red-50 p-6 rounded-4xl border border-red-100">
                    <h3 className="text-red-600 font-bold mb-2 flex items-center gap-2">
                        <span>⚠️</span> Zone de danger (RGPD)
                    </h3>
                    <p className="text-red-700 text-sm mb-4 leading-relaxed">
                        Conformément au Règlement Général sur la Protection des Données, vous pouvez demander la suppression immédiate et définitive de votre compte.
                    </p>
                    <button 
                        onClick={handleDeleteAccount}
                        className="w-full md:w-auto bg-white text-red-600 border-2 border-red-600 py-3 px-8 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95"
                    >
                        SUPPRIMER MON COMPTE ET MES DONNÉES
                    </button>
                </div>
            </div>
        </div>
    );
};