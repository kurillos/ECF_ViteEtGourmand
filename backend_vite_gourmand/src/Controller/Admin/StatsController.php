<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class StatsController extends AbstractController
{
    #[Route('/api/admin/stats', name: 'admin_stats', methods: ['GET'])]
    public function getStats(): JsonResponse
    {
        // Données structurées pour le graphique NoSQL
        $stats = [
            [
                'menu' => 'Menu Gourmand',
                'ventes' => 45,
                'ca' => 1250.50
            ],
            [
                'menu' => 'Menu Express',
                'ventes' => 112,
                'ca' => 1890.00
            ],
            [
                'menu' => 'Menu Végétarien',
                'ventes' => 28,
                'ca' => 640.00
            ]
        ];

        return $this->json($stats);
    }
}