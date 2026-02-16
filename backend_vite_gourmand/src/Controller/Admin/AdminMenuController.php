<?php

namespace App\Controller\Admin;

use App\Entity\Menu;
use App\Repository\MenuRepository;
use App\Repository\ThemeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/admin/menus')]
#[IsGranted('ROLE_EMPLOYE')]
class AdminMenuController extends AbstractController
{
    #[Route('', name: 'api_admin_menu_list', methods: ['GET'])]
    public function list(MenuRepository $repository): JsonResponse
    {
        $menus = $repository->findAll();
        return $this->json($menus, 200, [], ['groups' => 'main']);
    }

    #[Route('', name: 'api_admin_menu_create', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        ThemeRepository $themeRepository,
        PlatRepository $platRepository,
        ValidatorInterface $validator
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $menu = new Menu();
        $menu->setTitreMenu($data['titre_menu'] ?? '');
        $menu->setDescriptionMenu($data['description_menu'] ?? '');
        $menu->setPrixMenu($data['prix_menu'] ?? '0');
        $menu->setNbPersonnes($data['nb_personnes'] ?? 1);
        $menu->setQuantiteRestante($data['quantite_restante'] ?? 0);
        $menu->setImageUrl($data['image_url'] ?? null);

        // Liaison des plats
        if (!empty($data['plat_ids']) && is_array($data['plat_ids'])) {
            foreach ($data['plat_ids'] as $platId) {
                $plat = $platRepository->find($platId);
                if ($plat) {
                    $menu->addPlat($plat);
                }
            }
        }

        // Récupération du thème (ID 1 par défaut pour le test)
        $themeId = $data['theme_id'] ?? 1;
        $theme = $themeRepository->find($themeId);

        if (!$theme) {
            return $this->json(['message' => 'Thème introuvable'], 400);
        }
        $menu->setTheme($theme);

        // Validation selon les @Assert de l'entité Menu
        $errors = $validator->validate($menu);
        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        $em->persist($menu);
        $em->flush();

        return $this->json($menu, 201, [], ['groups' => 'main']);
    }

    #[Route('/{id}', name: 'api_admin_menu_delete', methods: ['DELETE'])]
    public function delete(Menu $menu, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($menu);
        $em->flush();

        return $this->json(['message' => 'Menu supprimé avec succès']);
    }

    #[Route('/{id}', name: 'api_admin_menu_update', methods: ['PUT'])]
public function update(
    int $id, 
    Request $request, 
    MenuRepository $repository, 
    ThemeRepository $themeRepo, 
    EntityManagerInterface $em
): JsonResponse {
    $menu = $repository->find($id);
    if (!$menu) return $this->json(['message' => 'Menu non trouvé'], 404);

    $data = json_decode($request->getContent(), true);
    if (!$data) return $this->json(['message' => 'JSON invalide'], 400);

    if (isset($data['titre_menu'])) $menu->setTitreMenu($data['titre_menu']);
    if (isset($data['description_menu'])) $menu->setDescriptionMenu($data['description_menu']);
    
    if (isset($data['prix_menu'])) $menu->setPrixMenu((string)$data['prix_menu']);
    
    if (isset($data['nb_personnes'])) $menu->setNbPersonnes((int)$data['nb_personnes']);
    if (isset($data['quantite_restante'])) $menu->setQuantiteRestante((int)$data['quantite_restante']);
    
    if (isset($data['regime'])) $menu->setRegime($data['regime']);
    if (isset($data['image_url'])) $menu->setImageUrl($data['image_url']);
    
    if (isset($data['allergenes'])) $menu->setAllergenes($data['allergenes']);
    if (isset($data['conditions'])) $menu->setConditions($data['conditions']);

    if (isset($data['theme_id'])) {
        $theme = $themeRepo->find($data['theme_id']);
        if ($theme) $menu->setTheme($theme);
    }

    try {
        $em->flush();
    } catch (\Exception $e) {
        return $this->json(['message' => $e->getMessage()], 500);
    }

    return $this->json($menu, 200, [], ['groups' => 'main']);
}
}