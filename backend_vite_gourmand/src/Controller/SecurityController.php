<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class SecurityController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
   public function apiLogin(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher): JsonResponse 
{
    // Gestion de la requête "Preflight" CORS
    if ($request->getMethod() === 'OPTIONS') {
        return new JsonResponse(null, 204, [
            'Access-Control-Allow-Origin' => 'http://localhost:5173',
            'Access-Control-Allow-Methods' => 'POST, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type',
        ]);
    }

    $data = json_decode($request->getContent(), true);
    $user = $userRepository->findOneBy(['email' => $data['email'] ?? '']);

    if (!$user || !$passwordHasher->isPasswordValid($user, $data['password'] ?? '')) {
        $response = $this->json(['message' => 'Identifiants invalides'], 401);
    } else {
        $response = $this->json([
            'user' => $user->getUserIdentifier(),
            'roles' => $user->getRoles(),
        ]);
    }

    // On force le header CORS sur la réponse
    $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
    return $response;


        // Si tout est bon, on renvoie les infos à React
        return $this->json([
            'user' => $user->getUserIdentifier(),
            'roles' => $user->getRoles(),
            'message' => 'Connexion réussie'
        ]);

        $content = $request->getContent();
        $data = json_decode($content, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
        return $this->json(['message' => 'Format JSON invalide'], Response::HTTP_BAD_REQUEST);
        }
    }
}