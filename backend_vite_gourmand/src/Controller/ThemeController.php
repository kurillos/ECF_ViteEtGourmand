<?php

namespace App\Controller;

use App\Repository\ThemeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ThemeController extends AbstractController
{
    #[Route('/api/themes', name: 'api_themes_list', methods: ['GET'])]
    public function list(ThemeRepository $themeRepo): JsonResponse
    {
        $themes = $themeRepo->findAll();

        $data = [];
        foreach ($themes as $theme) {
            $data[] = [
                'id' => $theme->getId(),
                'libelle' => $theme->getLibelle(),
            ];
        }

        return $this->json($data);
    }
}