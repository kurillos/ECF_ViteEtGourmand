export interface Menu {
  id: number;
  titre_menu: string;
  description_menu: string;
  prix_menu: string;
  image_url: string;
  nb_personnes: number;
  quantite_restante: number;
  theme?: {
    id: number;
    libelle: string;
  };
}