<?php

namespace App\Controller;

use App\Repository\OpeningHourRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class PublicOpeningHourController extends AbstractController
{
    #[Route('/api/hours', name: 'app_opening_hours_public', methods: ['GET'])]
    public function getPublicHours(OpeningHourRepository $repo): JsonResponse
    {
        // Utilise le groupe 'main' pour que les données ne soient pas vides
        return $this->json($repo->findAll(), 200, [], ['groups' => 'main']);
    }
}