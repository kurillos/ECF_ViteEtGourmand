import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ title: '', email: '', description: '' });
    const [rgpd, setRgpd] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!rgpd) return alert("Veuillez accepter le RGPD");

        const response = await fetch('http://localhost:8000/api/contact', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) alert("Message envoyé !");
    };

    return (
        <form onSubmit={handleSubmit} className='p-4 max-w-lg mx-auto'>
            <input type="text" placeholder='Titre' 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                required className='border p-2 mb-2 block w-full' />
            
            <input type="email" placeholder='Votre Email' 
                onChange={e => setFormData({...formData, email: e.target.value})} 
                required className="border p-2 mb-2 block w-full" />
            
            <textarea placeholder='Description' 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                required className="border p-2 mb-2 block w-full h-32"></textarea>

            <label className='block mb-4 text-sm italic text-gray-600'>
                {/* Correction des doubles accolades ici */}
                <input type="checkbox" required className="mr-2"
                    onChange={e => setRgpd(e.target.checked)} 
                />
                J'accepte que mes données soient traitées pour répondre à ma demande, conformément au RGPD.
            </label>

            <button type="submit" className='bg-blue-500 text-white p-2 rounded w-full font-bold'>
                Envoyer
            </button>            
        </form>
    );
};

export default Contact;