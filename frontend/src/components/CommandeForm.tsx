import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuService } from '../services/api';

const CommandeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // 1. Récupération complète des infos client
    const userString = localStorage.getItem('user');
    const authData = userString ? JSON.parse(userString) : null;
    const client = authData?.user?.user || authData?.user || {};

    const [menu, setMenu] = useState<any>(null);
    const [nbPers, setNbPers] = useState(4);
    const [formData, setFormData] = useState({
        adresse: client.adresse_postale || '',
        date: '',
        heure: '',
        ville: 'Bordeaux'
    });

    useEffect(() => {
        if (!authData?.token) navigate('/login');
        menuService.getById(Number(id)).then(data => {
            setMenu(data);
            if(data) setNbPers(data.nb_personnes);
        });
    }, [id]);

    if (!menu) return <p className="text-center p-10">Chargement des détails du menu...</p>;

    // 2. Logique de Calcul
    const prixBase = menu.prix_menu * nbPers;
    
    // Réduction 10% si nbPers >= (min + 5)
    const seuilRemise = menu.nb_personnes + 5;
    const reductionActive = nbPers >= seuilRemise;
    const remise = reductionActive ? (menu.prix_menu * nbPers) * 0.1 : 0;
    
    // Livraison (Bordeaux gratuit, sinon 5€ + 0.59€/km)
    const isBordeaux = formData.ville.toLowerCase() === 'bordeaux';
    const distanceTest = 10;
    const fraisLivraison = formData.ville.toLowerCase() === 'bordeaux' 
    ? 0  // Si c'est bordeaux, c'est 0
    : 5 + (distanceTest * 0.59); // Sinon c'est 5€ + (km * 0.59)
    
    const total = prixBase - remise + fraisLivraison;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Commande confirmée pour ${client.prenom} ${client.nom}. Un mail a été envoyé à ${client.email} !`);
        navigate('/');
    };

    return (
        <div className="max-w-3xl mx-auto p-10 bg-white rounded-[2.5rem] shadow-2xl mt-10 border border-gray-100">
            <h2 className="text-3xl font-black mb-2 italic">Finaliser ma commande</h2>
            <p className="text-gray-400 mb-8">Menu sélectionné : <span className="text-orange-500 font-bold">{menu.titre_menu}</span></p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Infos Client (Auto-remplies) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50 rounded-3xl">
                    <p className="text-sm"><strong>Client :</strong> {client.prenom} {client.nom}</p>
                    <p className="text-sm"><strong>Email :</strong> {client.email}</p>
                    <p className="text-sm"><strong>GSM :</strong> {client.telephone || "Non renseigné"}</p>
                </div>

                {/* Logistique Prestation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-2">Lieu & Ville</label>
                        <div className="flex gap-2">
                            <input type="text" placeholder="Adresse complète" required value={formData.adresse} className="flex-1 p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500" onChange={e => setFormData({...formData, adresse: e.target.value})} />
                            <input type="text" placeholder="Ville" required value={formData.ville} className="w-1/3 p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500" onChange={e => setFormData({...formData, ville: e.target.value})} />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-2">Date</label>
                        <input type="date" required className="w-full p-4 bg-gray-100 rounded-2xl outline-none" onChange={e => setFormData({...formData, date: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase ml-2">Heure de livraison</label>
                        <input type="time" required className="w-full p-4 bg-gray-100 rounded-2xl outline-none" onChange={e => setFormData({...formData, heure: e.target.value})} />
                    </div>
                </div>

                {/* Convives */}
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase ml-2">Nombre de personnes (Min: {menu.nb_personnes})</label>
                    <input type="number" min={menu.nb_personnes} value={nbPers} onChange={(e) => setNbPers(Number(e.target.value))} className="w-full p-4 bg-gray-100 rounded-2xl text-xl font-bold" />
                </div>

                {/* Récapitulatif Julie */}
<div className="p-6 bg-orange-50 rounded-[2rem] border border-orange-100 space-y-3">
    <div className="flex justify-between font-medium">
        <span>Prestation ({nbPers} pers.)</span>
        <span>{prixBase.toFixed(2)}€</span>
    </div>

    {/* Affichage de la remise en rouge si elle est active */}
    {reductionActive ? (
        <div className="flex justify-between text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-100">
            <span>Remise fidélité (-10%)</span>
            <span>-{remise.toFixed(2)}€</span>
        </div>
    ) : (
        <p className="text-[10px] text-gray-400 italic">
            * Ajoutez {seuilRemise - nbPers} personnes pour bénéficier de -10%
        </p>
    )}

    <div className="flex justify-between font-medium">
        <span>Frais de livraison ({formData.ville})</span>
        <span>{fraisLivraison.toFixed(2)}€</span>
    </div>
    
    <div className="flex justify-between text-2xl font-black border-t border-orange-200 pt-4">
        <span>TOTAL</span>
        <span className="text-orange-600">{total.toFixed(2)}€</span>
    </div>
</div>

                <button className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-xl shadow-lg hover:bg-orange-600 transition-all transform hover:-translate-y-1">
                    VALIDER ET PAYER {total.toFixed(2)}€
                </button>
            </form>
        </div>
    );
};

export default CommandeForm;