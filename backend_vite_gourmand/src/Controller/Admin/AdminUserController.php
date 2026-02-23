<?php

namespace App\Controller\Admin;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class AdminUserController extends AbstractController
{
    #[Route('/api/admin/users', name: 'admin_user_create', methods: ['POST'])]
    public function createEmploye(
        Request $request, 
        UserPasswordHasherInterface $hasher, 
        EntityManagerInterface $em, 
        MailerInterface $mailer
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['error' => 'Données invalides'], 400);
        }

        $user = new User();
        $user->setEmail($data['email']);
        $user->setRoles(['ROLE_EMPLOYE']); // Forcé en Employé pour la sécurité
        $user->setPassword($hasher->hashPassword($user, $data['password']));
        $user->setNom($data['nom']);
        $user->setPrenom($data['prenom']);
        $user->setTelephone($data['telephone'] ?? '0000000000');
        $user->setAdressePostale($data['adresse'] ?? 'À renseigner');

        $em->persist($user);
        $em->flush();

        // Notification sans mot de passe (exigence US)
        $email = (new Email())
            ->from('admin@viteetgourmand.fr')
            ->to($user->getEmail())
            ->subject('Création de votre compte employé')
            ->html("<p>Bonjour, votre compte a été créé. Contactez l'administrateur pour vos accès.</p>");

        $mailer->send($email);

        return $this->json(['message' => 'Employé créé avec succès'], 201);
    }
}