<?php

namespace App\Controller;

use App\Entity\Avis;
use App\Repository\AvisRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/avis')]
class PublicAvisController extends AbstractController
{
    /**
     * Affiche les avis validés sur la page d'accueil
     */
    #[Route('', name: 'api_avis_public', methods: ['GET'])]
    public function index(AvisRepository $repo): JsonResponse 
    {
        $avis = $repo->findBy(['isValidated' => true], ['id' => 'DESC']);

        return $this->json($avis, 200, [], ['groups' => 'avis']);
    }

    /**
     * Reçoit le formulaire d'avis envoyé par le client (AvisForm.tsx)
     */
    #[Route('', name: 'api_avis_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, ValidatorInterface $validator): JsonResponse 
    {
        // Récupération de l'utilisateur
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['message' => "Accès refusé. Vous devez être connecté."], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);

        if (empty($data['message']) || !isset($data['note'])) {
            return $this->json(['message' => 'Données incomplètes'], Response::HTTP_BAD_REQUEST);
        }

        $avis = new Avis();
        $avis->setNom($user->getUserIdentifier())
             ->setMessage(strip_tags($data['message']))
             ->setNote((int)$data['note'])
             ->setIsValidated(false); // Toujours faux par défaut pour modération

        $em->persist($avis);
        $em->flush();

        return $this->json([
            'message' => 'Merci ! ' . $user->getUserIdentifier() . ' ! votre avis a été envoyé, il sera modéré dans les plus brefs délais !'
        ], Response::HTTP_CREATED);
    }
}