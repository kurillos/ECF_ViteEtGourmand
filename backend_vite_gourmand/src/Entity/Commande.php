<?php

namespace App\Entity;

use App\Repository\CommandeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

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
    private ?\DateTimeInterface $date_commande = null;

    /**
     * Statuts possibles : accepté, en préparation, en cours de livraison, 
     * livré, en attente du retour de matériel, terminée
     */
    #[ORM\Column(length: 50)]
    #[Groups(['commande:read'])]
    private ?string $statut = 'accepté';

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Groups(['commande:read'])]
    private ?string $total = null;

    #[ORM\Column]
    #[Groups(['commande:read'])]
    private ?bool $a_pret_materiel = false;

    // Contraintes du cahier des charges pour modification/annulation
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['commande:read'])]
    private ?string $motif_modification = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['commande:read'])]
    private ?string $mode_contact_motif = null; // "Appel GSM" ou "Mail"

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['commande:read'])]
    private ?User $client = null;

    #[ORM\OneToMany(mappedBy: 'commande', targetEntity: LigneCommande::class, cascade: ['persist', 'remove'])]
    #[Groups(['commande:read'])]
    private Collection $lignes;

    public function __construct()
    {
        $this->date_commande = new \DateTime();
        $this->lignes = new ArrayCollection();
    }

    public function getId(): ?int { return $this->id; }

    public function getDateCommande(): ?\DateTimeInterface { return $this->date_commande; }

    public function setDateCommande(\DateTimeInterface $date_commande): static { 
        $this->date_commande = $date_commande; 
        return $this; 
    }

    public function getStatut(): ?string { return $this->statut; }

    public function setStatut(string $statut): static { 
        $this->statut = $statut; 
        return $this; 
    }

    public function getTotal(): ?string { return $this->total; }

    public function setTotal(string $total): static { 
        $this->total = $total; 
        return $this; 
    }

    public function isAPretMateriel(): ?bool { return $this->a_pret_materiel; }

    public function setAPretMateriel(bool $a_pret_materiel): static { 
        $this->a_pret_materiel = $a_pret_materiel; 
        return $this; 
    }

    public function getMotifModification(): ?string { return $this->motif_modification; }

    public function setMotifModification(?string $motif_modification): static { 
        $this->motif_modification = $motif_modification; 
        return $this; 
    }

    public function getModeContactMotif(): ?string { return $this->mode_contact_motif; }

    public function setModeContactMotif(?string $mode_contact_motif): static { 
        $this->mode_contact_motif = $mode_contact_motif; 
        return $this; 
    }

    public function getClient(): ?User { return $this->client; }

    public function setClient(?User $client): static { 
        $this->client = $client; 
        return $this; 
    }

    /** @return Collection<int, LigneCommande> */
    public function getLignes(): Collection { return $this->lignes; }

    public function addLigne(LigneCommande $ligne): static
    {
        if (!$this->lignes->contains($ligne)) {
            $this->lignes->add($ligne);
            $ligne->setCommande($this);
        }
        return $this;
    }
}