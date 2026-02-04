<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class SecurityController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
   public function apiLogin(Request $request, UserRespository $userRepository, UserPasswordHasherInterface $passwordHasher): JsonResponse 
    {
        $data = json_decode($request->getContent(), true);
        $user = $userRepository->findOneBy(['email' => $data['email'] ?? '']);

        if (!$user || $passwordHasher->isPasswordValid($user, $data['password'] ?? '')) {
            return $this->json(['message' => 'Identifiants invalides'], 401);
        }

    return $this->json([
        'user' => $user->getUserIdentifier(),
        'roles' => $user->getRoles(),
        'message' => 'Connexion réussie'
        ]);
    }

    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): void
    {
        throw new \Exception('Ceci ne devrait pas être atteint');
    }
}