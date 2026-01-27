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

    public function __construct(string $mongoUri, string $mongodb)
    {
        // Connexion à Atlas
        $client = new Client($mongoUri);
        // Sélection de la collection 'menu_stats'
        $this->collection = $client->selectCollection($mongodb, 'menu_stats');
    }

    public function incrementView(string $menuName): void
    {
        // On incrémente le compteur de vues pour le menu spécifié, si il n'existe pas on le crée.
        $this->collection->updateOne(
            ['menu_name' => $menuName],
            ['$inc' => ['views' => 1]],
            ['upsert' => true]
        );

    }
}