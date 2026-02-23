<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class StatsController extends AbstractController
{
    #[Route('/api/admin/stats', name: 'admin_stats', methods: ['GET'])]
public function getStats(Request $request): JsonResponse
{
    $period = $request->query->get('period', '7d'); // On récupère '7d', '30d' ou '1y'

    // Simulation de données filtrées (En production, tu ferais une agrégation MongoDB ici)
    // On adapte les chiffres selon la période pour simuler le changement
    $multiplier = match($period) {
        '30d' => 4,
        '1y' => 48,
        default => 1,
    };

    $stats = [
        ['menu' => 'Menu Gourmand', 'ventes' => 45 * $multiplier, 'ca' => 1250.50 * $multiplier],
        ['menu' => 'Menu Express', 'ventes' => 112 * $multiplier, 'ca' => 1890.00 * $multiplier],
        ['menu' => 'Menu Végétarien', 'ventes' => 28 * $multiplier, 'ca' => 640.00 * $multiplier],
    ];

    return $this->json($stats);
}
}