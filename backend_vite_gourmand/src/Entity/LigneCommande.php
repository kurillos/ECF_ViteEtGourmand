<?php

namespace App\Entity;

use App\Repository\LigneCommandeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: LigneCommandeRepository::class)]
class LigneCommande
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['commande:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['commande:read'])]
    private ?int $quantite = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Groups(['commande:read'])]
    private ?string $prix_unitaire = null;

    #[ORM\ManyToOne(targetEntity: Commande::class, inversedBy: 'lignes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Commande $commande = null;

    #[ORM\ManyToOne(targetEntity: Menu::class)]
    #[ORM\JoinColumn(
        name: "menu_id",             // Nom de la colonne dans la table ligne_commande
        referencedColumnName: "menu_id", // NOM RÉEL dans la table menu
        nullable: false
    )]
    #[Groups(['commande:read'])]
    private ?Menu $menu = null;
    public function getId(): ?int { return $this->id; }

    public function getQuantite(): ?int { return $this->quantite; }

    public function setQuantite(int $quantite): static { $this->quantite = $quantite; return $this; }

    public function getPrixUnitaire(): ?string { return $this->prix_unitaire; }

    public function setPrixUnitaire(string $prix_unitaire): static { $this->prix_unitaire = $prix_unitaire; return $this; }

    public function getCommande(): ?Commande { return $this->commande; }

    public function setCommande(?Commande $commande): static { $this->commande = $commande; return $this; }

    public function getMenu(): ?Menu { return $this->menu; }

    public function setMenu(?Menu $menu): static { $this->menu = $menu; return $this; }
}