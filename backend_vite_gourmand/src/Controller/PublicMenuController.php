<?php

namespace App\Controller;

use App\Repository\MenuRepository;
use App\Repository\PlatRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class PublicMenuController extends AbstractController
{
    #[Route('/api/menus', name: 'app_menus_public', methods: ['GET'])]
    public function publicList(MenuRepository $menuRepo): JsonResponse
    {
        return $this->json($menuRepo->findAll(), 200, [], ['groups' => 'main']);
    }
}