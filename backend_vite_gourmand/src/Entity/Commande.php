<?php

namespace App\Entity;

use App\Repository\CommandeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CommandeRepository::class)]
class Commande
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['commande:read'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['commande:read'])]
    private ?\DateTimeInterface $dateCommande = null;

    #[ORM\Column(length: 50)]
    #[Groups(['commande:read'])]
    private ?string $statut = 'accepté';

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['commande:read'])]
    private ?\DateTimeInterface $datePrestation = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    #[Groups(['commande:read'])]
    private ?\DateTimeInterface $heureLivraison = null;

    #[ORM\Column(length: 255)]
    #[Groups(['commande:read'])]
    private ?string $lieuLivraison = null;

    #[ORM\Column]
    #[Groups(['commande:read'])]
    private ?int $nombrePersonnes = null;

    #[ORM\Column]
    #[Groups(['commande:read'])]
    private ?float $fraisLivraison = null;

    #[ORM\Column]
    #[Groups(['commande:read'])]
    private ?float $totalTTC = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['commande:read'])]
    private ?User $client = null;

    #[ORM\ManyToOne(targetEntity: Menu::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['commande:read'])]
    private ?Menu $menu = null;

    public function __construct()
    {
        $this->dateCommande = new \DateTime();
    }

    public function getId(): ?int { return $this->id; }

    public function getDateCommande(): ?\DateTimeInterface { return $this->dateCommande; }
    public function setDateCommande(\DateTimeInterface $dateCommande): self { $this->dateCommande = $dateCommande; return $this; }

    public function getStatut(): ?string { return $this->statut; }
    public function setStatut(string $statut): self { $this->statut = $statut; return $this; }

    public function getDatePrestation(): ?\DateTimeInterface { return $this->datePrestation; }
    public function setDatePrestation(\DateTimeInterface $datePrestation): self { $this->datePrestation = $datePrestation; return $this; }

    public function getHeureLivraison(): ?\DateTimeInterface { return $this->heureLivraison; }
    public function setHeureLivraison(\DateTimeInterface $heureLivraison): self { $this->heureLivraison = $heureLivraison; return $this; }

    public function getLieuLivraison(): ?string { return $this->lieuLivraison; }
    public function setLieuLivraison(string $lieuLivraison): self { $this->lieuLivraison = $lieuLivraison; return $this; }

    public function getNombrePersonnes(): ?int { return $this->nombrePersonnes; }
    public function setNombrePersonnes(int $nombrePersonnes): self { $this->nombrePersonnes = $nombrePersonnes; return $this; }

    public function getFraisLivraison(): ?float { return $this->fraisLivraison; }
    public function setFraisLivraison(float $fraisLivraison): self { $this->fraisLivraison = $fraisLivraison; return $this; }

    public function getTotalTTC(): ?float { return $this->totalTTC; }
    public function setTotalTTC(float $totalTTC): self { $this->totalTTC = $totalTTC; return $this; }

    public function getClient(): ?User { return $this->client; }
    public function setClient(?User $client): self { $this->client = $client; return $this; }

    public function getMenu(): ?Menu { return $this->menu; }
    public function setMenu(?Menu $menu): self { $this->menu = $menu; return $this; }
}