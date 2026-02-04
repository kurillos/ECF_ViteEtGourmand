import React, { useState, useEffect } from 'react';

const AdminHoraires: React.FC = () => {
    const [hours, setHours] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/admin/hours')
            .then(res => res.json())
            .then(data => {
                setHours(data);
                setLoading(false);
            });
    }, []);

    const handleChange = (id: number, field: string, value: any) => {
        setHours(hours.map(h => h.id === id ? { ...h, [field]: value } : h));
    };

    const handleSave = async (hour: any) => {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/hours/${hour.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hour)
            });
            if (response.ok) alert(`Horaires du ${hour.day} mis à jour !`);
        } catch (error) {
            alert("Erreur lors de la sauvegarde");
        }
    };

    if (loading) return <p>Chargement des horaires...</p>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm mt-8">
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
                        {hours.map((h) => (
                            <tr key={h.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="py-4 px-2 font-bold text-gray-700">{h.day}</td>
                                <td className="py-4 px-2">
                                    <div className="flex gap-1">
                                        <input type="text" value={h.openAM} onChange={e => handleChange(h.id, 'openAM', e.target.value)} className="w-16 border rounded p-1 text-sm" />
                                        <input type="text" value={h.closeAM} onChange={e => handleChange(h.id, 'closeAM', e.target.value)} className="w-16 border rounded p-1 text-sm" />
                                    </div>
                                </td>
                                <td className="py-4 px-2">
                                    <div className="flex gap-1">
                                        <input type="text" value={h.openPM} onChange={e => handleChange(h.id, 'openPM', e.target.value)} className="w-16 border rounded p-1 text-sm" />
                                        <input type="text" value={h.closePM} onChange={e => handleChange(h.id, 'closePM', e.target.value)} className="w-16 border rounded p-1 text-sm" />
                                    </div>
                                </td>
                                <td className="py-4 px-2 text-center">
                                    <input type="checkbox" checked={h.isClosed} onChange={e => handleChange(h.id, 'isClosed', e.target.checked)} />
                                </td>
                                <td className="py-4 px-2 text-right">
                                    <button onClick={() => handleSave(h)} className="bg-orange-500 text-white px-4 py-1 rounded-lg text-xs font-bold hover:bg-orange-600 transition">
                                        Sauver
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminHoraires;