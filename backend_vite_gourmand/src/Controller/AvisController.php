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
class AvisController extends AbstractController
{
    // Affiche les avis validé
    #[Route('', name: 'api_avis_index', methods: ['GET'])]
    public function index(AvisRepository $avisRepo): JsonResponse
    {
        // Récupération des avis validé uniquement
        $avisValides = $avisRepo->findBy(['isValidated' => true], ['id' => 'DESC']);
        return $this->json($avisValides, 200, [], ['groups' => 'avis']);
    }

    // Reçois le formulaire du client
    #[Route('', name: 'api_avis_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, ValidatorInterface $validator): JsonResponse {
        // Décode le JSON reçu du front
        $data = json_decode($request->getContent(), true);

         // Vérification des champs
        if (empty($data['nom']) || empty($data['message']) || !isset($data['note'])) {
            return $this->json(['message' => 'Données incomplètes'], Response::HTTP_BAD_REQUEST);
        }

        $avis = new Avis();
        $avis->setNom(strip_tags($data['nom']))
             ->setMessage(strip_tags($data['message']))
             ->setNote((int)$data['note'])
             ->setIsValidated(false);

        $em->persist($avis);
        $em->flush();

        return $this->json([
            'message' => 'Merci ! votre avis a été envoyé et sera modéré dans les plus brefs délais.'
        ], Response::HTTP_CREATED);
    }
}