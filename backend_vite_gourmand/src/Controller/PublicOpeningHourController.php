<?php

namespace App\Controller;

use App\Repository\OpeningHourRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class PublicOpeningHourController extends AbstractController
{
    #[Route('/api/hours', name: 'api_public_hours_index', methods: ['GET'])]
    public function index(OpeningHourRepository $repository): JsonResponse
    {
        $hours = $repository->findAll();
        
        // On retourne les données en JSON pour React
        return $this->json($hours, 200, [], ['groups' => 'main']);
    }
}