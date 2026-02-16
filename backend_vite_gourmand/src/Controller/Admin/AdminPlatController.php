<?php

namespace App\Controller\Admin;

use App\Entity\Plat;
use App\Repository\PlatRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/admin/plats')]
#[IsGranted('ROLE_EMPLOYE')]
class AdminPlatController extends AbstractController
{
    #[Route('', name: 'api_admin_plat_list', methods: ['GET'])]
    public function list(PlatRepository $repo): JsonResponse
    {

        return $this->json($repo->findAll(), 200, [], [
            'groups' => 'main',
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
    }

    #[Route('', name: 'api_admin_plat_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        $plat = new Plat();
        $plat->setTitrePlat($data['titre_plat'] ?? '');
        
        $plat->setPhoto($data['image_url'] ?? null); 

        $em->persist($plat);
        $em->flush();

        return $this->json($plat, 201, [], ['groups' => 'main']);
    }

    #[Route('/api/admin/plats/{id}', name: 'api_admin_plat_delete', methods: ['DELETE'])]
    public function delete(int $id, PlatRepository $repo, EntityManagerInterface $em): JsonReponse
    {
        $plat = $repo->find($id);
        if (!$plat) return $this->json(['message' => 'Plat non trouvé'], 404);

        $em->remove($plat);
        $em->flush();

        return $this->json(['message' => 'Plat supprimé']);
    }
}