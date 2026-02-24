import React, { useState } from 'react';
import Navbar from '../partials/Navbar';
import Footer from '../partials/Footer';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ title: '', email: '', description: '' });
    const [rgpd, setRgpd] = useState(false);
    const [status, setStatus] = useState<{type: 'success' | 'error', msg: string} | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!rgpd) return alert("Veuillez accepter le RGPD");

        try {
            const response = await fetch('http://localhost:8000/api/contact', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                setStatus({type: 'success', msg: "Message envoyé avec succès !"});
                setFormData({ title: '', email: '', description: '' });
            } else {
                setStatus({type: 'error', msg: "Une erreur est survenue lors de l'envoi."});
            }
        } catch (error) {
            setStatus({type: 'error', msg: "Impossible de joindre le serveur."});
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">            
            <main className="grow flex items-center justify-center py-16 px-6">
                <div className="max-w-2xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden">
                    <div className="bg-gray-950 p-8 text-center">
                        <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter">
                            VITE <span className="text-orange-500">&</span> GOURMAND
                        </h1>
                        <p className="text-gray-400 text-sm mt-2 uppercase tracking-widest">Nous contacter</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 space-y-6">
                        <div className="space-y-4">
                            <input 
                                type="text" 
                                placeholder='Titre de votre demande' 
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})} 
                                required 
                                className='w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-orange-500 outline-none transition-all' 
                            />
                            
                            <input 
                                type="email" 
                                placeholder='Votre Email' 
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})} 
                                required 
                                className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-orange-500 outline-none transition-all" 
                            />
                            
                            <textarea 
                                placeholder='Comment pouvons-nous vous aider ?' 
                                value={formData.description}
                                onChange={e => setFormData({...formData, description: e.target.value})} 
                                required 
                                className="w-full p-4 border-2 border-gray-100 rounded-2xl h-40 focus:border-orange-500 outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        <label className='flex items-start gap-3 p-4 bg-orange-50 rounded-2xl cursor-pointer group'>
                            <input 
                                type="checkbox" 
                                required 
                                className="mt-1 w-5 h-5 accent-orange-500"
                                onChange={e => setRgpd(e.target.checked)} 
                            />
                            <span className="text-xs text-gray-600 leading-tight italic group-hover:text-orange-900 transition-colors">
                                J'accepte que mes données soient traitées pour répondre à ma demande, conformément au RGPD.
                            </span>
                        </label>

                        <button 
                            type="submit" 
                            className='w-full bg-orange-500 text-white font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-black transition-all transform hover:-translate-y-1 shadow-lg'
                        >
                            Envoyer le message
                        </button>

                        {status && (
                            <div className={`p-4 rounded-xl text-center font-bold animate-pulse ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {status.msg}
                            </div>
                        )}
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Contact;