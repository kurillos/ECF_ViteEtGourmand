import React, { useState, useEffect } from 'react';

const AdminHoraires: React.FC = () => {
    const [hours, setHours] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWithAuth = async (url: string, options: any = {}) => {
        const userJson = localStorage.getItem('user');
        if (!userJson) return fetch(url, options);

        try {
            let user = JSON.parse(userJson);
            if (typeof user === 'string') user = JSON.parse(user);
            const token = user?.token?.replace(/[\\"]/g, '');

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers
            };
            return fetch(url, { ...options, headers });
        } catch (e) {
            return fetch(url, options);
        }
    };

    useEffect(() => {
        fetchWithAuth('http://localhost:8000/api/admin/hours')
            .then(res => res.json())
            .then(data => {
                // ✅ SÉCURITÉ : Extrait le tableau Hydra ou JSON brut
                const finalData = data['hydra:member'] || data;
                setHours(Array.isArray(finalData) ? finalData : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur chargement horaires:", err);
                setHours([]);
                setLoading(false);
            });
    }, []);

    const handleSave = async (hour: any) => {
        try {
            const response = await fetchWithAuth(`http://localhost:8000/api/admin/hours/${hour.id}`, {
                method: 'PUT',
                body: JSON.stringify(hour)
            });
            if (response.ok) alert("Sauvegardé !");
        } catch (error) {
            console.error("Erreur réseau:", error);
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
                        {/* ✅ SÉCURITÉ SUPPLÉMENTAIRE ICI */}
                        {Array.isArray(hours) && hours.length > 0 ? (
                            hours.map((h) => (
                                <tr key={h.id} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="py-4 px-2 font-bold text-gray-700">{h.day}</td>
                                    {/* ... le reste de tes colonnes ... */}
                                </tr>
                            ))
                        ) : (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center text-gray-400 italic">
                                        Aucun horaire disponible ou erreur de format API.
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