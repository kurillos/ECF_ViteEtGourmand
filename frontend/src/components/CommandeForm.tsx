import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuService } from '../services/api';

const CommandeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [menu, setMenu] = useState<any>(null);
    const [nbPers, setNbPers] = useState(4);
    const [ville, setVille] = useState('Bordeaux');

    // 1. Récupération sécurisée du user pour l'email
    const userString = localStorage.getItem('user');
    const authData = userString ? JSON.parse(userString) : null;
    const userEmail = authData?.user?.email || authData?.email;

    useEffect(() => {
        if (!authData?.token) navigate('/login');
        menuService.getById(Number(id)).then(setMenu);
    }, [id]);

    if (!menu) return <p>Chargement du menu...</p>;

    // 2. Logique Julie : Calcul des frais et remise
    const prixBase = menu.prix_menu * nbPers;
    const remise = nbPers >= 10 ? prixBase * 0.1 : 0;
    const fraisLivraison = ville.toLowerCase() === 'bordeaux' ? 0 : 5 + (15 * 0.59);
    const total = prixBase - remise + fraisLivraison;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Commande validée pour ${userEmail} ! Total : ${total.toFixed(2)}€. Vérifiez MailHog.`);
        navigate('/');
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-xl mt-10">
            <h2 className="text-2xl font-black mb-6 italic">Finaliser ma commande</h2>
            <p className="mb-4 text-sm text-gray-500">Facturé à : <strong>{userEmail}</strong></p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-400">Nombre de convives</label>
                    <input type="number" min={4} value={nbPers} onChange={(e) => setNbPers(Number(e.target.value))} className="w-full p-3 bg-gray-50 rounded-xl" />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-400">Ville de livraison</label>
                    <input type="text" value={ville} onChange={(e) => setVille(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl" />
                </div>

                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 space-y-2">
                    <div className="flex justify-between text-sm"><span>Prix menus :</span><span>{prixBase}€</span></div>
                    {remise > 0 && <div className="flex justify-between text-green-600 font-bold"><span>Remise (10%) :</span><span>-{remise.toFixed(2)}€</span></div>}
                    <div className="flex justify-between text-sm"><span>Frais de port :</span><span>{fraisLivraison.toFixed(2)}€</span></div>
                    <div className="flex justify-between text-xl font-black border-t pt-2"><span>TOTAL :</span><span>{total.toFixed(2)}€</span></div>
                </div>

                <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-orange-600">
                    PAYER {total.toFixed(2)}€
                </button>
            </form>
        </div>
    );
};

export default CommandeForm;