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
class CommandeController extends AbstractController
{
    /**
     * Liste les commandes avec filtres (statut ou email client)
     */
    #[Route('', name: 'admin_commandes_list', methods: ['GET'])]
    public function list(Request $request, CommandeRepository $repo): JsonResponse
    {
        $statut = $request->query->get('statut');
        $email = $request->query->get('email');

        // On utilise findBy ou un QueryBuilder personnalisé pour les filtres
        if ($statut && $email) {
            $commandes = $repo->findBy(['statut' => $statut]);
        } elseif ($statut) {
            $commandes = $repo->findBy(['statut' => $statut], ['date_commande' => 'DESC']);
        } else {
            $commandes = $repo->findAll();
        }

        return $this->json($commandes, 200, [], ['groups' => 'commande:read']);
    }

    /**
     * Met à jour le statut d'une commande
     * Gère la contrainte de motif si modification/annulation
     */
    #[Route('/{id}/status', name: 'admin_commande_update_status', methods: ['PATCH'])]
    public function updateStatus(Commande $commande, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $newStatus = $data['statut'] ?? null;

        if (!$newStatus) {
            return $this->json(['message' => 'Statut manquant'], 400);
        }

        // En cas de modification ou annulation, on vérifie si le motif est présent
        if (isset($data['motif_modification'])) {
            $commande->setMotifModification($data['motif_modification']);
            $commande->setModeContactMotif($data['mode_contact_motif'] ?? 'Non spécifié');
        }

        $commande->setStatut($newStatus);
        $em->flush();

        return $this->json(['message' => 'Statut mis à jour avec succès']);
    }
}