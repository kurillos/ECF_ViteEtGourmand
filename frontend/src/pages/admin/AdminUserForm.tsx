import React, { useState } from 'react';
import { adminService } from '../../services/api';

const AdminUserForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '', nom: '', prenom: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await adminService.createEmploye(formData);
            alert("Employé créé et notifié par mail !");
        } catch (err) {
            alert("Erreur lors de la création.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">Ajouter un employé</h2>
            <input type="email" placeholder="Email" className="border p-2 w-full mb-2" 
                   onChange={e => setFormData({...formData, email: e.target.value})} />
            <input type="password" placeholder="Mot de passe" className="border p-2 w-full mb-2" 
                   onChange={e => setFormData({...formData, password: e.target.value})} />
            <button type="submit" className="bg-gray-900 text-white p-2 rounded w-full">Créer le compte</button>
        </form>
    );
};

export default AdminUserForm;