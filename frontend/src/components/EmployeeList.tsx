import React, { useState, useEffect } from 'react'; // Règle l'erreur 'useState'
import { adminService } from '../services/api'; // Règle l'erreur 'adminService'

// On définit une interface pour régler l'erreur 'any' sur 'emp'
interface Employee {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    isActive: boolean;
}

const EmployeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]); // Type défini ici

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const data = await adminService.getStats(); // Ou ta future méthode listEmployees
            setEmployees(data);
        } catch (err) {
            console.error("Erreur chargement employés", err);
        }
    };

    const handleToggle = async (id: number, currentStatus: boolean) => {
        try {
            // On appelle l'API pour inverser le statut
            await adminService.toggleUserStatus(id, !currentStatus);
            // On rafraîchit la liste localement
            setEmployees(prev => prev.map(emp => 
                emp.id === id ? { ...emp, isActive: !currentStatus } : emp
            ));
        } catch (err) {
            alert("Erreur lors du changement de statut");
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full mt-6 text-left">
                <thead>
                    <tr className="text-gray-400 text-xs uppercase border-b">
                        <th className="pb-4">Collaborateur</th>
                        <th className="pb-4">Email</th>
                        <th className="pb-4">Statut</th>
                        <th className="pb-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {employees.map((emp: Employee) => (
                        <tr key={emp.id} className="hover:bg-gray-50 transition">
                            <td className="py-4 font-bold">{emp.nom} {emp.prenom}</td>
                            <td className="py-4 text-gray-600">{emp.email}</td>
                            <td className="py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    emp.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                    {emp.isActive ? 'ACTIF' : 'SORTI'}
                                </span>
                            </td>
                            <td className="py-4 text-right">
                                <button 
                                    onClick={() => handleToggle(emp.id, emp.isActive)}
                                    className={`text-sm font-bold ${emp.isActive ? 'text-red-500' : 'text-blue-600'}`}
                                >
                                    {emp.isActive ? 'Rendre inutilisable' : 'Réactiver'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeList;