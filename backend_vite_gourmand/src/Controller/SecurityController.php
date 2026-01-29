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
    public function apiLogin(
        Request $request, 
        UserRepository $userRepository, 
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        
        // On cherche l'utilisateur par son email
        $user = $userRepository->findOneBy(['email' => $data['email'] ?? '']);

        // Si l'utilisateur n'existe pas ou si le mot de passe est faux
        if (!$user || !$passwordHasher->isPasswordValid($user, $data['password'] ?? '')) {
            return $this->json(['message' => 'Identifiants invalides'], Response::HTTP_UNAUTHORIZED);
        }

        // Si tout est bon, on renvoie les infos à React
        return $this->json([
            'user' => $user->getUserIdentifier(),
            'roles' => $user->getRoles(),
            'message' => 'Connexion réussie'
        ]);
    }
}