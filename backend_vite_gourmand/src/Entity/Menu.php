<?php

namespace App\Entity;

use App\Repository\MenuRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: MenuRepository::class)]
class Menu
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "menu_id")]
    private ?int $id = null;

    #[ORM\Column(name: "theme_id")]
    #[ORM\ManyToOne(targetEntity: Theme::class)]
    #[ORM\JoinColumn(name: "theme_id", referencedColumnName: "theme_id", nullable: false)]
    private ?Theme $theme = null;

    #[ORM\Column(length: 50)]
    #[Assert\NotBlank]
    #[Assert\Regex(
        pattern: "/^[a-zA-Z0-9\s'àâäéèêëîïôöùûüç\-]{3,50}$/",
        message: "Le titre contient des caractères interdits."
    )]
    private ?string $titre_menu = null;

     #[ORM\Column(type: Types::TEXT)]
     #[Assert\NotBlank]
    private ?string $description_menu = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Assert\PositiveOrZero]
    private ?string $prix_menu = null;

    #[ORM\Column]
    #[Assert\Positive]
    private ?int $nb_personnes = null;   

    #[ORM\Column(length: 20, nullable: true)]
    #[Assert\Length(max: 20)]
    private ?string $regime = null;

    #[ORM\Column(type: "integer")]
    #[Assert\PositiveOrZero]
    private ?int $quantite_restante = null;

    #[ORM\Column(length: 255)]
    private ?string $image_url = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrixBase(): ?string
    {
        return $this->prix_base;
    }

    public function setPrixBase(string $prix_base): static
    {
        $this->prix_base = $prix_base;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getNbPersMin(): ?int
    {
        return $this->nb_pers_min;
    }

    public function setNbPersMin(int $nb_pers_min): static
    {
        $this->nb_pers_min = $nb_pers_min;

        return $this;
    }

    public function getNbPersMax(): ?int
    {
        return $this->nb_pers_max;
    }

    public function setNbPersMax(int $nb_pers_max): static
    {
        $this->nb_pers_max = $nb_pers_max;

        return $this;
    }

    public function getTheme(): ?string
    {
        return $this->theme;
    }

    public function setTheme(?string $theme): static
    {
        $this->theme = $theme;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->image_url;
    }

    public function setImageUrl(string $image_url): static
    {
        $this->image_url = $image_url;

        return $this;
    }
}
