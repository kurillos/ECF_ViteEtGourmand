<?php

namespace App\Controller\Admin;

use App\Repository\AvisRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/admin/avis')]
class AvisController extends AbstractController
{
    #[Route('', name: 'admin_avis_list', methods: ['GET'])]
    public function list(AvisRepository $repo): JsonResponse
    {
        return $this->json($repo->findAll());
    }
}