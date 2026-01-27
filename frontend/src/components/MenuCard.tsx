import React, { useEffect, useState } from 'react';
import { Menu } from '../types/Menu';
import { fetchMenu } from '../services/api';

interface MenuCardProps {
    menuNom: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ menuNom }) => {
    const [menu, setMenu] = useState<Menu | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchMenu(menuNom)
            .then((data: Menu) => {
                setMenu(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [menuNom]);

    if (loading) return <p>Chargement...</p>;
    if (!menu) return <p>Menu introuvable.</p>;

    return (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h2>{menu.nom}</h2>
            <p>{menu.description}</p>
            <strong>{menu.prix} €</strong>
        </div>
    );
};

export default MenuCard;