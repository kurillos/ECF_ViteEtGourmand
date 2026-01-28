<?php

namespace App\Controller;

use App\Repository\MenuRepository;
use App\Service\StatService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class MenuController extends AbstractController
{
    #[Route('/api/menu/{nom}', name: 'app_menu_show', methods: ['GET'])]
    public function show(string $nom, MenuRepository $menuRepository, StatService $statService): JsonResponse
    {
        // 1. Cherche le menu dans MySQL
        $menu = $menuRepository->findOneBy(['nom' => $nom]);

        if (!$menu) {
            return new JsonResponse(['error' => 'Menu non trouvé'], 404);
        }

        // 2. Enregistre la vue dans MongoDB Atlas
        $statService->incrementView($nom);

        // 3. Retourne les infos en JSON (prêt pour ton futur React)
        return new JsonResponse([
            'nom' => $menu->getNom(),
            'prix' => $menu->getPrixBase(),
            'description' => $menu->getDescription(),
            'image' => $menu->getImageUrl(),
            'theme' => $menu->getTheme()
        ]);
    }

    #[Route('/api/menus', name: 'app_menu_index', methods: ['GET'])]
    public function index(MenuRepository $menuRepository): JsonResponse
    {
        // On récupère TOUS les menus depuis MySQL
        $menus = $menuRepository->findAll();

        $data = [];
        foreach ($menus as $menu) {
            $data[] = [
                'nom' => $menu->getNom(),
                'prix' => $menu->getPrixBase(),
                'description' => $menu->getDescription(),
                'image' => $menu->getImageUrl(),
                'theme' => $menu->getTheme()
            ];
        }

        return new JsonResponse($data);
    }
}