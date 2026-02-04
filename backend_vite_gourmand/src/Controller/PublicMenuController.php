<?php

namespace App\Controller;

use App\Repository\MenuRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class PublicMenuController extends AbstractController
{
    // C'est cette route que fetchAllMenus() dans api.ts recherche
    #[Route('/api/menus', name: 'app_menus_public', methods: ['GET'])]
    public function index(MenuRepository $menuRepo): JsonResponse
    {
        $menus = $menuRepo->findAll();
        
        // On renvoie le JSON avec le groupe 'main' défini dans ton entité Menu.php
        return $this->json($menus, 200, [], ['groups' => 'main']);
    }
}