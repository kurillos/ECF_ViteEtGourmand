<?php

/**
 * StatService
 * Ce service permet de décoréller la gestion des statistiques métier (NoSQL)
 * de la gestion des données transactionnelles (SQL)
 * @author Cyril BOCAGE / ECF Vite & Gourmand
 */

namespace App\Service;

use MongoDB\Client;

class StatService {
    private $collection;

    public function __construct(string $mongoUri, string $mongoDb)
    {
        // Connexion à Atlas
        $client = new \MongoDB\Client($mongoUri);
        // Sélection de la collection 'menu_stats'
        $this->collection = $client->selectDatabase($mongoDb)->menu_stats;
    }

    public function incrementView(string $menuName): void
    {
        // On incrémente le compteur de vues pour le menu spécifié, si il n'existe pas on le crée.
        // Utilisation de l'opérateur atomique $inc pour éviter les conflits d'accès concurrents.
        // EN php si un utilisateur click en même temps sur le même menu il pourrait écrire deux fois la même valeur
        $this->collection->updateOne(
            ['menu_name' => $menuName],
            ['$inc' => ['views' => 1]],
            ['upsert' => true]
        );

    }
}