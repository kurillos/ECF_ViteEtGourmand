<?php

namespace App\DataFixtures;

use App\Entity\Avis;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AvisFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Avis déjà validé
        $avis1 = new Avis();
        $avis1->setNom("Jane Doe")
              ->setMessage("Le menu traditionnel était incroyable !")
              ->setNote(5)
              ->setIsValidated(true);
        $manager->persist($avis1);

        // Avis en attente de validation
        $avis2 = new Avis();
        $avis2->setNom("John Smith")
              ->setMessage("C'était bon, mais un peu trop épicé à mon goût")
              ->setNote(4)
              ->setIsValidated(false);
        $manager->persist($avis2);

        $manager->flush();
    }
}
