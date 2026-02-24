import React, { useState, useEffect } from 'react';
import { hourService } from '../../services/api';

const AdminHoraires: React.FC = () => {
    const [hours, setHours] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        hourService.getAllAdmin()
            .then(data => {
                console.log("Données reçues :", data);
                // On gère le format API Platform (hydra) ou JSON pur
                const finalData = data['hydra:member'] || data;
                setHours(Array.isArray(finalData) ? finalData : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur chargement horaires:", err);
                setLoading(false);
            });
    }, []);

    const handleSave = async (hour: any) => {
        try {
            await hourService.update(hour.id, hour);
            alert("Horaires mis à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors de la sauvegarde:", error);
            alert("Erreur lors de la sauvegarde");
        }
    };

    const handleChange = (id: number, field: string, value: any) => {
        setHours(prev => prev.map(h => h.id === id ? { ...h, [field]: value } : h));
    };

    if (loading) return <p className="p-8 text-center text-gray-500 italic">Chargement des horaires...</p>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm mt-8 border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Gestion des Horaires</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-400 text-xs uppercase border-b">
                            <th className="py-3 px-2">Jour</th>
                            <th className="py-3 px-2">Matin (Ouv/Fer)</th>
                            <th className="py-3 px-2">Soir (Ouv/Fer)</th>
                            <th className="py-3 px-2 text-center">Fermé</th>
                            <th className="py-3 px-2 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hours.length > 0 ? (
                            hours.map((h) => (
                                <tr key={h.id} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="py-4 px-2 font-bold text-gray-700">{h.day}</td>
                                    <td className="py-4 px-2">
                                        <div className="flex gap-1">
                                            <input 
                                                type="text" 
                                                value={h.openAM || ''} 
                                                onChange={e => handleChange(h.id, 'openAM', e.target.value)}
                                                className="w-20 border rounded p-1 text-sm text-center"
                                            />
                                            <input 
                                                type="text" 
                                                value={h.closeAM || ''} 
                                                onChange={e => handleChange(h.id, 'closeAM', e.target.value)}
                                                className="w-20 border rounded p-1 text-sm text-center"
                                            />
                                        </div>
                                    </td>
                                    <td className="py-4 px-2">
                                        <div className="flex gap-1">
                                            <input 
                                                type="text" 
                                                value={h.openPM || ''} 
                                                onChange={e => handleChange(h.id, 'openPM', e.target.value)}
                                                className="w-20 border rounded p-1 text-sm text-center"
                                            />
                                            <input 
                                                type="text" 
                                                value={h.closePM || ''} 
                                                onChange={e => handleChange(h.id, 'closePM', e.target.value)}
                                                className="w-20 border rounded p-1 text-sm text-center"
                                            />
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-center">
                                        <input 
                                            type="checkbox" 
                                            checked={h.isClosed || false} 
                                            onChange={e => handleChange(h.id, 'isClosed', e.target.checked)}
                                            className="w-4 h-4 cursor-pointer"
                                        />
                                    </td>
                                    <td className="py-4 px-2 text-right">
                                        <button 
                                            onClick={() => handleSave(h)} 
                                            className="bg-orange-500 text-white px-4 py-1 rounded-lg text-xs font-bold hover:bg-orange-600 transition"
                                        >
                                           Sauver
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-10 text-center text-gray-400 italic">
                                    Aucun horaire disponible.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminHoraires;