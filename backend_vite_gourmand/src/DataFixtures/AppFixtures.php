<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Menu;
use App\Entity\OpeningHour;
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

        // 2. Les Horaires
        $days = [
            'Lundi'     => [null, null, null, null, true],
            'Mardi'     => ['12:00', '14:30', '19:00', '22:30', false],
            'Mercredi'  => ['12:00', '14:30', '19:00', '22:30', false],
            'Jeudi'     => ['12:00', '14:30', '19:00', '22:30', false],
            'Vendredi'  => ['12:00', '14:30', '19:00', '23:30', false],
            'Samedi'    => ['12:00', '14:30', '19:00', '23:30', false],
            'Dimanche'  => ['12:00', '14:30', '19:00', '22:30', false],
            
        ];

       

        foreach ($days as $dayName => $times) {
            $hour = new OpeningHour();
            $hour->setDay($dayName)
                 ->setOpenAM($times[0])
                 ->setCloseAM($times[1])
                 ->setOpenPM($times[2])
                 ->setClosePM($times[3])
                 ->setIsClosed($times[4]);

                 $manager->persist($hour);

        }

        // 2. Les Utilisateurs

        // Julie (Employée)
        $julie = new User();
        $julie->setEmail('julie@viteetgourmand.fr');
        $julie->setRoles(['ROLE_EMPLOYE']);
        $julie->setPassword($this->passwordHasher->hashPassword($julie, 'Julie123!'));
        $manager->persist($julie);

        // José l'admin
        $jose = new User();
        $jose->setEmail('jose@viteetgourmand.fr');
        $jose->setRoles(['ROLE_ADMIN']);
        $jose->setPassword($this->passwordHasher->hashPassword($jose, 'Admin123!'));
        $manager->persist($jose);

        $hashedPassword = $this->passwordHasher->hashPassword($julie, 'JuliePassword123!');
        $julie->setPassword($hashedPassword);

        $manager->persist($julie);

        // 3. Enregistrement global
        $manager->flush();
    }
}