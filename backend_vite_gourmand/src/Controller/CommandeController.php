<?php

namespace App\Controller;

use App\Entity\Commande;
use App\Entity\Menu;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

class CommandeController extends AbstractController
{
    #[Route('/api/commande', name: 'api_commande_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, MailerInterface $mailer): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Vous devez être connecté'], 401);
        }

        $data = json_decode($request->getContent(), true);
        $menu = $em->getRepository(Menu::class)->find($data['menuId']);

        if (!$menu) {
            return $this->json(['error' => 'Menu introuvable'], 404);
        }

        $nbPers = $data['nombrePersonnes'];
        if ($nbPers < $menu->getMinPersonnes()) {
            return $this->json(['error' => 'Nombre de personnes insuffisant'], 400);
        }

        // --- CALCULS MÉTIER ---
        
        // 1. Prix de base
        $prixBase = $menu->getPrix() * $nbPers;

        // 2. Remise 10% (si nbPers >= min + 5)
        $remise = 0;
        if ($nbPers >= ($menu->getMinPersonnes() + 5)) {
            $remise = $prixBase * 0.10;
        }

        // 3. Frais de livraison (Bordeaux = 0, sinon 5€ + 0.59€/km)
        // Note : On récupère la distance envoyée par le front ou on la simule
        $lieu = $data['lieuLivraison'];
        $frais = 0;
        if (stripos($lieu, 'bordeaux') === false) {
            $distance = $data['distance'] ?? 10; // 10km par défaut si non fourni
            $frais = 5 + ($distance * 0.59);
        }

        $totalTTC = $prixBase - $remise + $frais;

        // --- ENREGISTREMENT ---
        
        $commande = new Commande();
        $commande->setClient($user);
        $commande->setMenu($menu);
        $commande->setDatePrestation(new \DateTime($data['datePrestation']));
        $commande->setHeureLivraison(new \DateTime($data['heureLivraison']));
        $commande->setLieuLivraison($lieu);
        $commande->setNombrePersonnes($nbPers);
        $commande->setFraisLivraison($frais);
        $commande->setTotalTTC($totalTTC);
        $commande->setStatut('accepté');

        $em->persist($commande);
        $em->flush();

        // --- EMAIL DE CONFIRMATION ---
        
        $email = (new Email())
            ->from('commandes@viteetgourmand.fr')
            ->to($user->getEmail())
            ->subject('Confirmation de votre commande - Vite & Gourmand')
            ->html("
                <h1>Merci {$user->getPrenom()} !</h1>
                <p>Votre commande pour le <strong>{$menu->getNom()}</strong> est validée.</p>
                <ul>
                    <li>Date de livraison : {$data['datePrestation']} à {$data['heureLivraison']}</li>
                    <li>Lieu : {$lieu}</li>
                    <li>Nombre de convives : {$nbPers}</li>
                    <li><strong>Total TTC : " . number_format($totalTTC, 2) . "€</strong></li>
                </ul>
            ");

        $mailer->send($email);

        return $this->json([
            'message' => 'Commande enregistrée avec succès',
            'total' => $totalTTC
        ], 201);
    }
}