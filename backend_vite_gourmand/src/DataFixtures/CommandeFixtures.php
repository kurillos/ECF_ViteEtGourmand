<?php

namespace App\DataFixtures;

use App\Entity\Commande;
use App\Entity\LigneCommande;
use App\Entity\Menu;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class CommandeFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        // On récupère le client "test"
        $user = $manager->getRepository(User::class)->findOneBy([]);
        $menus = $manager->getRepository(Menu::class)->findAll();

        if (!$user || empty($menus)) return;

        $statuts = ['accepté', 'en préparation', 'en cours de livraison', 'en attente du retour de matériel'];

        foreach ($statuts as $key => $statut) {
            $commande = new Commande();
            $commande->setClient($user)
                     ->setStatut($statut)
                     ->setDateCommande(new \DateTime("-" . $key . " days"))
                     ->setTotal('45.00')
                     ->setAPretMateriel($statut === 'en attente du retour de matériel');

            $manager->persist($commande);

            $ligne = new LigneCommande();
            $ligne->setCommande($commande)
                  ->setMenu($menus[0])
                  ->setQuantite(2)
                  ->setPrixUnitaire($menus[0]->getPrixMenu());
            
            $manager->persist($ligne);
        }

        $manager->flush();
    }

    // S'exécute APRES les Menus et Users
    public function getDependencies(): array
    {
        return [
            AppFixtures::class,
        ];
    }
}