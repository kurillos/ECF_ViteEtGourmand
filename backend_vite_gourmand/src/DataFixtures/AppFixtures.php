<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Menu;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // 1. Les Menus
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
            $menu->setImageUrl($data['img']);
            $menu->setDescription("Une sélection fraîche pour le menu " . $data['nom']);
            $menu->setNbPersMin(2);
            $menu->setNbPersMax(12);

            $manager->persist($menu);
        }

        // 2. L'utilisateur Julie
        $user = new User();
        $user->setEmail('julie@viteetgourmand.fr');
        $user->setRoles(['ROLE_EMPLOYE']); // Ajout du ; ici

        $hashedPassword = $this->passwordHasher->hashPassword($user, 'JuliePassword123!');
        $user->setPassword($hashedPassword);

        $manager->persist($user);

        // 3. Enregistrement global
        $manager->flush();
    }
}