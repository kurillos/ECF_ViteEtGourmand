<?php

namespace App\Controller\Admin;

use App\Entity\Avis;
use App\Repository\AvisRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Valide les avis client pour les afficher sur la page d'accueil. 
 */

#[Route('/api/admin/avis')]
class AvisController extends AbstractController
{
    #[Route('', name: 'admin_avis_list', methods: ['GET'])]
    public function list(AvisRepository $repo): JsonResponse
    {
        return $this->json($repo->findAll(), context: ['groups' => 'avis']);
    }

#[Route('/{id}/validate', name: 'admin_avis_validate', methods: ['PATCH'])]
    public function validate(Avis $avis, EntityManagerInterface $em): JsonResponse
    {
        $avis->setIsValidated(true);
        $em->flush();

        return $this->json(['message' => 'Avis validé avec succès.'], Response::HTTP_OK);
    }

#[Route('/{id}', name: 'admin_avis_delete', methods: ['DELETE'])]
    public function delete(Avis $avis, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($avis);
        $em->flush();

        return $this->json(['message' => 'Avis supprimé avec succès.'], Response::HTTP_OK);
    }
}