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
        return $this->json($menuRepo->findAll(), 200, [], [
            'groups' => 'main',
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
    }

    #[Route('/api/menus', name: 'app_menu_list', methods: ['GET'])]
    public function list(MenuRepository $repo): JsonResponse
    {
        $menus = $repo->findAll();
        return $this->json($menus, 200, [], ['groups' => 'main']);
    }

    #[Route('/api/menus/{id}', name: 'app_menu_detail', methods: ['GET'])]
    public function detail(int $id, MenuRepository $repo): JsonResponse
    {
        $menu = $repo->find($id);

        if (!$menu) {
            return $this->json(['message' => 'Menu non trouvé'], 404);
        }

        try {
            return $this->json($menu, 200, [], [
                'groups' => 'main',
                'circular_reference_handler' => function ($object) {
                    return $object->getId();
                }
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'error' => 'Erreur de sérialisation',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}