import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { postAvis } from '../services/api';

const AvisForm = () => {
    const user = localStorage.getItem('user');
    const [formData, setFormData] = useState({ message: '', note: 5});
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    if (!user) {
        return (
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">Vous devez être connecté pour laisser un avis.</p>
                <Link to="/login" className="text-orange-500 font-bold hover:underline">
                    Se connecter / Créer un compte
                </Link>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await postAvis(formData);
            setStatus({ type: 'success', msg: 'Merci ! Votre avis est en cours de modération.'});
            setFormData({ message: '', note: 5});
        } catch (error: any) {
            setStatus({ type: 'error', msg: "Erreur lors de l'envoi de l'avis" });
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg mx-auto border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6 italic">Donnez-nous votre avis !</h2>
            <p className='text-sm text-gray-500 mb-6'>Connecté en tant que : <span className='font-bold'>{user}</span></p>

            {status && (
                <div className="mb-4 p-4 rounded-lg text-sm font-bold ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}">
                    {status.msg}
                </div>
            )}

            <form onSubmit={handleSubmit} action="" className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Note / 5</label>
                    <select
                        className='w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none'
                        value={formData.note}
                        onChange={(e) => setFormData({...formData, note: parseInt(e.target.value)})}
                    >
                        {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} ★</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Votre Message</label>
                    <textarea
                        required 
                        rows={4}
                        placeholder="Votre message ici..."
                        className='w-full p-3 bg-gray-50 border border-gray-100 placeholder-gray-400 rounded-lg focus:ring-2 focus-ring-orange-500 outilne-none transition'
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                </div>

                <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-lg hover:bg-orange-600 transition duration-300 transform hover:-translate-y-1">
                    Envoyer mon avis
                </button>
            </form>
        </div>
    );
};

export default AvisForm;

