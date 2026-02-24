export interface Menu {
    id: number;
    titre_menu: string;
    description_menu: string;
    prix_menu: string;
    image_url: string;
    nb_personnes: number;
    quantite_restante: number;
    regime: string;
    allergenes?: string;
    conditions?: string;
    theme?: {
        id: number;
        libelle: string;
    };
    plats?: any[];
}