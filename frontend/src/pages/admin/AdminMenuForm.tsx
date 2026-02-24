import React, { useState, useEffect } from 'react';

const AdminMenuForm: React.FC = () => {
    // États des données
    const [themes, setThemes] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        prix: '',
        nb_pers: 1,
        regime: '',
        quantite: 0,
        theme_id: ''
    });
    const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

    // Charger les thèmes
    useEffect(() => {
        fetch('http://localhost:8000/api/themes')
            .then(res => res.json())
            .then(data => setThemes(data))
            .catch(err => console.error("Erreur thèmes:", err));
    }, []);

    const validateTitre = (titre: string) => {
        const regex = /^[a-zA-Z0-9\s'àâäéèêëîïôöùûüç\-]{3,50}$/;
        return regex.test(titre);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);

        if (!validateTitre(formData.titre)) {
            return setMessage({type: 'error', text: "Le titre contient des caractères non autorisés."});
        }

        try {
            const response = await fetch('http://localhost:8000/api/admin/menus/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({type: 'success', text: result.message});
                // Reset du formulaire
                setFormData({ titre: '', description: '', prix: '', nb_pers: 1, regime: '', quantite: 0, theme_id: ''});
            } else {
                setMessage({type: 'error', text: result.error || "Erreur lors de la création"});
            }
        } catch (error) {
            setMessage({type: 'error', text: "Serveur injoignable"});
        }
    };

    return (
        <div className="p-8 bg-white rounded-3xl shadow-xl max-w-2xl mx-auto my-10">
            <h2 className="text-2xl font-black mb-6 uppercase italic text-gray-800 border-l-4 border-orange-500 pl-3">
                Ajouter un Menu (Admin)
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text"
                            placeholder="Titre du menu" required
                            value={formData.titre}
                            onChange={e => setFormData({...formData, titre: e.target.value})}
                            className="p-3 border rounded-xl outline-none focus:border-orange-500" />

                    <select required
                            value={formData.theme_id}
                            onChange={e => setFormData({...formData, theme_id: e.target.value})}
                            className="p-3 border rounded-xl outline-none focus:border-orange-500">
                            <option value="">Choisir un Thème</option>
                            {/* Vérifie si l'API renvoie id ou theme_id */}
                            {themes.map(t => <option key={t.id || t.theme_id} value={t.id || t.theme_id}>{t.libelle}</option>)}
                    </select>
                </div>

                <textarea placeholder='Description' required
                          value={formData.description}
                          onChange={e => setFormData({...formData, description: e.target.value})}
                          className='w-full p-3 border rounded-xl h-24 outline-none focus:border-orange-500'>        
                </textarea>

                <div className="grid grid-cols-3 gap-4">
                    <input type="number" step="0.01" placeholder="Prix" required
                           value={formData.prix}
                           onChange={e => setFormData({...formData, prix: e.target.value})}
                           className="p-3 border rounded-xl" />

                    <input type="number" placeholder="Nb Pers." required
                           value={formData.nb_pers}
                           onChange={e => setFormData({...formData, nb_pers: parseInt(e.target.value)})}
                           className="p-3 border rounded-xl" />

                    <input type="number" placeholder="Stock (Qté)" required
                           value={formData.quantite}
                           onChange={e => setFormData({...formData, quantite: parseInt(e.target.value)})}
                           className="p-3 border rounded-xl" />
                </div>

                <input type="text"
                       placeholder='Régime (ex: Végétarien)'
                       value={formData.regime}
                       onChange={e => setFormData({...formData, regime: e.target.value})}
                       className="w-full p-3 border rounded-xl" 
                />

                <button type="submit" className='w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-orange-500 transition shadow-lg'>
                    Enregistrer le Menu
                </button>

                {message && (
                    <div className={`p-4 rounded-xl text-center font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
};

export default AdminMenuForm;