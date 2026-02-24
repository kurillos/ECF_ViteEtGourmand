import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', nom: '', prenom: '', telephone: '', adresse_postale: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
        setError("Les mots de passe ne sont pas identiques.");
        return;
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{10,}$/;
    if (!passwordRegex.test(formData.password)) {
        setError("Le mot de passe ne respecte pas les critères (10 caractères, Maj, Min, Chiffre, Spécial).");
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Inscription réussie ! Vous pouvez vous connecter.");
                navigate('/login');
            } else {
                setError(data.error || "Une erreur est survenue.");
            }
    } catch (err) {
        setError("Impossible de contacter le serveur.");
    }
};

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-3xl font-black text-gray-900 mb-2 text-center italic">
                    REJOINDRE <span className="text-orange-500">VITE & GOURMAND</span>
                </h2>
                <p className="text-gray-500 text-center mb-8 font-medium">Créez votre compte pour commander vos menus.</p>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm font-bold border border-red-100">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="Prénom" required className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                            onChange={(e) => setFormData({...formData, prenom: e.target.value})} />
                        <input type="text" placeholder="Nom" required className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                            onChange={(e) => setFormData({...formData, nom: e.target.value})} />
                    </div>
                    <input type="text" placeholder="Numéro de GSM" required className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                        onChange={(e) => setFormData({...formData, telephone: e.target.value})} />
                    <textarea placeholder="Adresse postale complète" required className="w-full p-4 bg-gray-50 rounded-2xl mb-4"
                        onChange={(e) => setFormData({...formData, adresse_postale: e.target.value})}></textarea>
                    <input type="email" placeholder="Email" required className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                        onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <input type="password" placeholder="Mot de passe" required className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                        onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    <input type="password" placeholder="Confirmez le mot de passe" required className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
                    
                    <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-orange-600 transition-all active:scale-95 mt-4">
                        S'INSCRIRE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;