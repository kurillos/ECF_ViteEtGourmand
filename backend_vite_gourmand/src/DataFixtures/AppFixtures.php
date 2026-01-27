<?php
namespace App\DataFixtures;

use App\Entity\Menu;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    // src/DataFixtures/AppFixtures.php

public function load(ObjectManager $manager): void
{
    $menus = [
        ['nom' => 'Le Traditionnel', 'prix' => 25.50, 'theme' => 'Français', 'img' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'],
        ['nom' => 'Le Gourmet', 'prix' => 45.00, 'theme' => 'Gastronomique', 'img' => 'https://images.unsplash.com/photo-1559339352-11d035aa65de'],
        ['nom' => 'Le Veggie Green', 'prix' => 22.00, 'theme' => 'Végétarien', 'img' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'],
        ['nom' => 'Brunch du Dimanche', 'prix' => 30.00, 'theme' => 'Détente', 'img' => 'https://images.unsplash.com/photo-1495214713938-301647967b06'],
    ];

    foreach ($menus as $data) {
        $menu = new Menu();
        $menu->setNom($data['nom']);
        $menu->setPrixBase($data['prix']);
        $menu->setTheme($data['theme']);
        $menu->setImageUrl($data['img']); // On ajoute l'image ici !
        $menu->setDescription("Une sélection fraîche pour le menu " . $data['nom']);
        $menu->setNbPersMin(2);
        $menu->setNbPersMax(12);

        $manager->persist($menu);
    }

    $manager->flush();
}
}
