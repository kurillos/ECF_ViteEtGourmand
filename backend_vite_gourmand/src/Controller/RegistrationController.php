<?php
namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class RegistrationController extends AbstractController
{
    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    public function register(
        Request $request, 
        UserPasswordHasherInterface $userPasswordHasher, 
        EntityManagerInterface $entityManager,
        MailerInterface $mailer
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // 1. Validation du mot de passe (Specs: 10 caractères, Maj, Min, Chiffre, Spécial)
        $passwordRegex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{10,}$/';
        if (!isset($data['password']) || !preg_match($passwordRegex, $data['password'])) {
            return $this->json(['error' => 'Le mot de passe doit contenir 10 caractères minimum, une majuscule, une minuscule, un chiffre et un caractère spécial.'], 400);
        }

        $user = new User();
        $user->setEmail($data['email']);
        $user->setNom($data['nom']);
        $user->setPrenom($data['prenom']);
        $user->setTelephone($data['telephone']);
        $user->setAdressePostale($data['adresse_postale']);
        $user->setRoles(['ROLE_USER']);

        // Hachage du mot de passe
        $user->setPassword($userPasswordHasher->hashPassword($user, $data['password']));

        try {
            $entityManager->persist($user);
            $entityManager->flush();

            // 2. Envoi du mail de bienvenue (Mailtrap / Mailhog)
            $email = (new Email())
                ->from('ne-pas-repondre@viteetgourmand.fr')
                ->to($user->getEmail())
                ->subject('Bienvenue chez Vite & Gourmand !')
                ->html("<h1>Bonjour {$user->getPrenom()} !</h1><p>Merci d'avoir rejoint Julie et son équipe. Votre compte est prêt.</p>");

            $mailer->send($email);

            return $this->json(['message' => 'Inscription réussie !'], 201);
            
        } catch (\Exception $e) {
            return $this->json(['error' => 'Une erreur est survenue (email peut-être déjà utilisé ou configuration mail incorrecte).'], 400);
        }
    }
}