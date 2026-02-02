<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Attribute\Route; // remplace Annotation depuis PHP 8 et syùfony 5.2, ici nous utilisons Symfony 7

class ContactController extends AbstractController
{
    #[Route('/api/contact', name: 'api_contact', methods: ['POST'])]
    public function sendContact(Request $request, MailerInterface $mailer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // 1. Sécurité protection XSS
        $title = strip_tags($data['title'] ?? '');
        $userEmail = strip_tags($data['email'] ?? '');
        $message = strip_tags($data['message'] ?? '');

        if (empty($title) || empty($userEmail) || empty($message)) {
            return new JsonResponse(['error' => 'Données incomplètes'], 400);
        }

        // 2. Envoi de l'email
        $email = (new Email())
            ->from($userEmail)
            ->to('contact@viteetgourmand.fr')
            ->subject("Nouveau message : " . $title)
            ->text("Message de : " . $userEmail . "\n\n" . $message);

        $mailer->send($email);

        return new JsonResponse(['status' =>'success', 'message' => 'Email envoyé !']);
    }
}