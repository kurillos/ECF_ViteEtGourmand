<?php

namespace App\DataFixtures;

use App\Entity\Avis;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AvisFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // 1. Création du premier avis (Déjà validé pour la Home)
        $avis1 = new Avis();
        $avis1->setNom("Jane Doe")
              ->setMessage("Le menu traditionnel était incroyable ! Une expérience culinaire que je recommande vivement.")
              ->setNote(5)
              ->setIsValidated(true);
        
        $manager->persist($avis1);

        // 2. Création du deuxième avis (En attente de validation)
        $avis2 = new Avis();
        $avis2->setNom("John Smith")
              ->setMessage("C'était très bon, mais l'attente était un peu longue. Le dessert au chocolat est à tomber !")
              ->setNote(4)
              ->setIsValidated(false);
        
        $manager->persist($avis2);

        // 3. Création d'un troisième avis pour étoffer
        $avis3 = new Avis();
        $avis3->setNom("Alice Martin")
              ->setMessage("Superbe découverte, les produits sont frais et le cadre est magnifique.")
              ->setNote(5)
              ->setIsValidated(true);
        
        $manager->persist($avis3);

        $manager->flush();
    }
}