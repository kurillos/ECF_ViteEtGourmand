<?php

namespace App\Controller\Admin;

use App\Repository\CommandeRepository;
use App\Entity\Commande;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/admin/commandes')]
class AdminCommandeController extends AbstractController
{

    #[Route('', name: 'api_admin_commandes_list', methods: ['GET'])]
    #[IsGranted('ROLE_EMPLOYE')]
    public function list(CommandeRepository $repository): JsonResponse
    {
        $commandes = $repository->findAll();
        return $this->json($commandes, 200, [], ['groups' => 'commande:read']);
    }

    #[Route('/{id}/status', name: 'api_admin_commande_update_status', methods: ['PATCH'])]
    #[IsGranted('ROLE_EMPLOYE')]
    public function updateStatus(int $id, Request $request, CommandeRepository $repository, EntityManagerInterface $em): JsonResponse 
    {
        $commande = $repository->find($id);
        if (!$commande) return $this->json(['message' => 'Non trouvee'], 404);
        $data = json_decode($request->getContent(), true);
        $commande->setStatut($data['statut']);
        $commande->setMotifModification($data['motif_modification']);
        $em->flush();
        return $this->json(['message' => 'Mis a jour']);
    }

    #[Route('/{id}/supprimer', name: 'app_admin_commande_delete_force', methods: ['DELETE'])]
    #[IsGranted('ROLE_EMPLOYE')]
    public function delete(int $id, CommandeRepository $repository, EntityManagerInterface $em): JsonResponse
    {
        $commande = $repository->find($id);

        if (!$commande) {
            return $this->json(['message' => 'Commande introuvable'], 404);
        }

        $em->remove($commande);
        $em->flush();

        return $this->json(['message' => 'Suppression reussie']);
    }
}