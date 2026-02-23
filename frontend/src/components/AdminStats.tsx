import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { adminService } from '../services/api';

const AdminStats = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        adminService.getStats().then(setData);
    }, []);

    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
            <h2 className="text-2xl font-black italic mb-6">Comparaison des Menus</h2>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="menu" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="ventes" fill="#f97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.map((item: any) => (
                    <div key={item.menu} className="p-4 border rounded-xl">
                        <p className="text-gray-500 text-sm uppercase font-bold">{item.menu}</p>
                        <p className="text-2xl font-black">{item.ca} €</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminStats;