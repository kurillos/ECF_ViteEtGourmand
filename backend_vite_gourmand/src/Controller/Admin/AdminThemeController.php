<?php

namespace App\Controller\Admin;

use App\Repository\ThemeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/admin/themes')]
class AdminThemeController extends AbstractController
{
    #[Route('', name: 'api_admin_theme_list', methods: ['GET'])]
    public function list(ThemeRepository $repo): JsonResponse
    {
        return $this->json($repo->findAll(), 200, [], [
            'groups' => 'main',
            'circular_reference_handler' => function ($object) {
        return $object->getId();
    }
]);
    }
}