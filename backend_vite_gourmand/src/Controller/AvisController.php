<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AvisController extends AbstractController
{
    #[Route('/api/avis', name: 'api_avis_index', methods: ['GET'])]
    public function index(AvisRepository $avisRepo): JsonResponse
    {
        // Renvoi que les avis validés
        return $this->json($avisRepo->findBy(['isValidated' => true]));
    }

    #[Route('/api/admin/avis/{id}/validate', name: 'api_avis_validate', methods: ['PATCH'])]
    public function validate(Avis $avis, EntityManagerInterface $em): JsonResponse
    {
        $avis->setIsValidated(true);
        $em->flush();

        return $this->json(['status' => 'Avis validé !']);
    }
}