<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Menu;
use App\Entity\Theme;
use App\Entity\Commande;
use App\Entity\LigneCommande;
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
        // 1. Création des Thèmes
        $themes = [];
        $nomsThemes = ['Français', 'Gastronomique', 'Végétarien', 'Détente'];
    
        foreach ($nomsThemes as $nomT) {
            $themeObj = new Theme();
            $themeObj->setLibelle($nomT);
            $manager->persist($themeObj);
            $themes[$nomT] = $themeObj; 
        }
        $manager->flush();

        // 2. Les Menus
        $menusData = [
            ['nom' => 'Le Traditionnel', 'prix' => 25.50, 'theme' => 'Français', 'img' => '/images/traditionnel.jpg'],
            ['nom' => 'Le Gourmet', 'prix' => 45.00, 'theme' => 'Gastronomique', 'img' => '/images/gourmet.jpg'],
            ['nom' => 'Le Veggie Green', 'prix' => 22.00, 'theme' => 'Végétarien', 'img' => '/images/veggie.jpg'],
            ['nom' => 'Brunch du Dimanche', 'prix' => 30.00, 'theme' => 'Détente', 'img' => '/images/brunch.jpg'],
        ];

        $firstMenu = null;
        foreach ($menusData as $data) {
            $menu = new Menu();
            $menu->setTitreMenu($data['nom'])
                 ->setPrixMenu($data['prix'])
                 ->setTheme($themes[$data['theme']])
                 ->setDescriptionMenu("Une sélection fraîche pour le menu " . $data['nom'])
                 ->setNbPersonnes(2)
                 ->setQuantiteRestante(10)
                 ->setImageUrl($data['img']);
        
            $manager->persist($menu);
            if (!$firstMenu) { $firstMenu = $menu; }
        }
        $manager->flush();

        // 3. L'Utilisateur Client
        $client = new User();
        $client->setEmail('client@test.fr')
               ->setRoles(['ROLE_USER'])
               ->setPassword($this->passwordHasher->hashPassword($client, 'ViteGourmand2026!'))
               ->setNom('Doe')
               ->setPrenom('Jane')
               ->setTelephone('0601020304')
               ->setAdressePostale('10 rue de la Paix, Bordeaux');
        $manager->persist($client);
        

       // JOSE (L'Admin)
        $jose = new User();
        $jose->setEmail('jose@viteetgourmand.fr')
             ->setRoles(['ROLE_ADMIN'])
             ->setPassword($this->passwordHasher->hashPassword($jose, 'ViteGourmand2026!'))
             ->setNom('Gomez')
             ->setPrenom('Jose')
             ->setTelephone('0600000001')
             ->setAdressePostale('Bureaux Vite et Gourmand');
        $manager->persist($jose);

        // JULIE (L'Employée)
        $julie = new User();
        $julie->setEmail('julie@viteetgourmand.fr')
             ->setRoles(['ROLE_EMPLOYE'])
             ->setPassword($this->passwordHasher->hashPassword($julie, 'ViteGourmand2026!'))
             ->setNom('Dupont')
             ->setPrenom('Julie')
             ->setTelephone('0600000002')
             ->setAdressePostale('Bureaux Vite et Gourmand');
        $manager->persist($julie);

        $manager->flush();

        // 4. Les Horaires
        $days = [
            'Lundi' => [null, null, null, null, true],
            'Mardi' => ['12:00', '14:30', '19:00', '22:30', false],
            'Mercredi' => ['12:00', '14:30', '19:00', '22:30', false],
            'Jeudi' => ['12:00', '14:30', '19:00', '22:30', false],
            'Vendredi' => ['12:00', '14:30', '19:00', '23:30', false],
            'Samedi' => ['12:00', '14:30', '19:00', '23:30', false],
            'Dimanche' => ['12:00', '14:30', '19:00', '22:30', false],
        ];

        foreach ($days as $dayName => $times) {
            $hour = new OpeningHour();
            $hour->setDay($dayName)
                 ->setOpenAM($times[0])->setCloseAM($times[1])
                 ->setOpenPM($times[2])->setClosePM($times[3])
                 ->setIsClosed($times[4]);
            $manager->persist($hour);
        }

        // 5. CRÉATION DES COMMANDES (uniquement si le menu existe)
        if ($firstMenu && $client) {
            $statuts = ['en attente', 'accepté', 'en préparation', 'terminée'];
            
            foreach ($statuts as $key => $statut) {
                $commande = new Commande();
                $commande->setClient($client)
                         ->setStatut($statut)
                         ->setDateCommande(new \DateTime("-" . $key . " days")) 
                         ->setDatePrestation(new \DateTime("+" . (7 - $key) . " days"))
                         ->setHeureLivraison(new \DateTime("12:30:00"))
                         ->setLieuLivraison($client->getAdressePostale())
                         ->setNombrePersonnes(4)
                         ->setFraisLivraison(5.00)
                         ->setTotalTTC(95.00);

                $manager->persist($commande);

                $ligne = new LigneCommande();
                $ligne->setCommande($commande)
                      ->setMenu($firstMenu)
                      ->setQuantite(2)
                      ->setPrixUnitaire((string)$firstMenu->getPrixMenu());
                
                $manager->persist($ligne);
            }
        }

        $manager->flush();
    }
}