import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { adminService } from '../services/api';

const AdminStats = () => {
    // 1. Déclarer TOUS les états en haut
    const [data, setData] = useState<any[]>([]);
    const [filterMenu, setFilterMenu] = useState('all');
    const [filterPeriod, setFilterPeriod] = useState('7d');

    // 2. useEffect après les déclarations d'états
    useEffect(() => {
        adminService.getStats(filterPeriod).then(setData);
    }, [filterPeriod]);

    // 3. Logique de filtrage
    const filteredData = data.filter(item => 
        filterMenu === 'all' || item.menu === filterMenu
    );

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
            <h2 className="text-2xl font-black italic mb-6 text-orange-600">📊 Statistiques de Vente</h2>
            
            {/* SECTION FILTRES */}
            <div className="flex gap-4 bg-gray-50 p-4 rounded-xl mb-8">
                <select value={filterPeriod} onChange={(e) => setFilterPeriod(e.target.value)} className="border p-2 rounded">
                    <option value="7d">7 derniers jours</option>
                    <option value="30d">30 derniers jours</option>
                    <option value="1y">Année en cours</option>
                </select>
                
                <select value={filterMenu} onChange={(e) => setFilterMenu(e.target.value)} className="border p-2 rounded">
                    <option value="all">Tous les menus</option>
                    {data.map((m: any) => <option key={m.menu} value={m.menu}>{m.menu}</option>)}
                </select>
            </div>

            {/* GRAPHIQUE */}
            <div className="h-80 w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="menu" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="ventes" fill="#f97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            {/* RÉCAPITULATIF CA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredData.map((item: any) => (
                    <div key={item.menu} className="p-4 border rounded-xl bg-white">
                        <p className="text-gray-500 text-sm uppercase font-bold">{item.menu}</p>
                        <p className="text-2xl font-black">{item.ca} €</p>
                        <p className="text-sm text-gray-400">{item.ventes} commandes</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminStats;