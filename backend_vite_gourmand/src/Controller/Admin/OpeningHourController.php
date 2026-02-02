<?php

namespace App\Controller\Admin;

use App\Repository\OpeningHourRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class OpeningHourController extends AbstractController
{
    #[Route('/api/admin/hours', name: 'app_admin_hours_index', methods: ['GET'])]
    public function index(OpeningHourRepository $repository): JsonResponse
    {
        $hours = $repository->findAll();

        $data = [];
        foreach ($hours as $hour) {
            $data[] = [
                'id' => $hour->getId(),
                'day' => $hour->getDay(),
                'openAM' => $hour->getOpensAM(),
                'closeAM' => $hour->getCloseAM(),
                'openPM' => $hour->getOpenPm(),
                'closePM' => $hour->getClosePM(),
                'isClosed' => $hour->getIsClosed(),
            ];
        }

        return $this->json($data);
    }
}
