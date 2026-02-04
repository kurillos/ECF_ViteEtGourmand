<?php

namespace App\Controller;

use App\Entity\Menu;
use App\Entity\Theme;
use App\Repository\MenuRepository;
use App\Repository\ThemeRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\StatService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

    class MenuController extends AbstractController
    {

        #[Route('/api/menus', name: 'app_menus_public', methods: ['GET'])]
        public function publicList(MenuRepository $menuRepo): JsonResponse
        {
            return $this->json($menuRepo->findAll());
        }

        #[Route('/create', name: 'create', methods: ['POST'])]
        public function create(
            Request $request,
            EntityManagerInterface $em,
            ThemeRepository $themeRepo,
            ValidatorInterface $validator
        ): JsonResponse {
            $data = json_decode($request->getContent(), true);

            // 1. Récupération du Thème parent
            $theme = $themeRepo->find($data['theme_id'] ?? 0);
            if (!$theme) {
                return $this->json(['error' => 'Thème invalide ou manquant'], 400);
            }

            // Instancie le Menu
            $menu = new Menu();
            $menu->setTitreMenu($data['titre'])
                 ->setDescriptionMenu($data['description'])
                 ->setPrixMenu($data['prix'])
                 ->setNbPersonnes($data['nb_pers'])
                 ->setRegime($data['regime'] ?? null)
                 ->setQuantiteRestante($data['quantite'] ?? 0)
                 ->setTheme($theme);

            // Validation par les Asserts
            $errors = $validator->validate($menu);
            if (count($errors) > 0) {
                return $this->json(['error' => (string) $errors], 400);
            }
            
            $em->persist($menu);
            $em->flush();

            return $this->json(['message' => 'Le menu à été créé avec succès !'], 201);
        }

        #[Route('/api/admin/menus', name: 'app_admin_menus_list', methods: ['GET'])]
        public function list(MenuRepository $menuRepo): JsonResponse
        {
            return $this->json($menuRepo->findAll(), 200, [], ['groups' => 'main']);
        }
    }