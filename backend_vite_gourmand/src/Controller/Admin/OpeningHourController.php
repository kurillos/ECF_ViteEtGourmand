<?php

namespace App\Controller\Admin;

use App\Repository\OpeningHourRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

final class OpeningHourController extends AbstractController
{
    #[Route('/api/admin/hours', name: 'app_admin_hours_index', methods: ['GET'])]
    public function index(OpeningHourRepository $repository): JsonResponse
    {
      $hours = $repository->findAll();
      return $this->json($hours, 200, [], ['groups' => 'main']);
    }

    #[Route('/api/admin/hours{id}', name: 'app_admin_hours_update', methods: ['PUT', 'OPTIONS'])]
    public function update(
        int $id,
        Request $request,
        OpeningHourRepository $repository,
        EntityManagerInterface $em
    ): JsonResponse {
        $hour = $repository->find($id);
        
        if (!$hour) {
            return $this->json(['error' => 'Horaire non trouvé'], 404);
        }
        
        $data = json_decode($request->getContent(), true);

        $hour->setOpenAM(!empty($data['openAM']) ? $data['openAM'] : null)
             ->setCloseAM(!empty($data['closeAM']) ? $data['closeAM'] : null)
             ->setOpenPM(!empty($data['openPM']) ? $data['openPM'] : null)
             ->setClosePM(!empty($data['closePM']) ? $data['closePM'] : null)
             ->setIsClosed((bool) ($data['isClosed'] ?? false));

        $em->flush();

        return $this->json(['message' => 'Horaires mis à jour avec succès !']);
    }
}