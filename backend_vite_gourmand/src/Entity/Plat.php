<?php

namespace App\Entity;

use App\Repository\DishRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DishRepository::class)]
class Dish
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "menu_id")]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\Regex(
        pattern: "/^[a-zA-Z0-9\s'àâäéèêëîïôöùûüç\-]{3,100}$/",
        message: "Le titre contient des caractères non autorisés."
    )]
    private ?string $title = null;

    #[(ORM\Column(type: INT))]
    #[(Assert\Positive(message: "Le nombre de personne doit être supérieur à 0"))]
    private ?int $nb_pers_min = null;

    #[ORM\Column(type: "decimal", precision: 10, scale: 2)]
    #[Assert\Positive(message: "Le prix doit être supérieur à 0")]
    private ?int $nb_prix_by_pers = null;

    #[(ORM\Column(length: 50))]
    #[Assert\Regex(
        pattern: "/^[a-zA-Z0-9\s'àâäéèêëîïôöùûüç\-]{3,100}$/",
        message: "Le titre contient des caractères non autorisés."
    )]
    private ?string $regime = null;

    #[(ORM\Column(length: 50))]
    private ?string $description = null;

    #[(ORM\Column(type: INT))]
    #[(Assert\Positive(message: "Le nombre de personne doit être supérieur à 0"))]
    private ?int $quantite_restante = null;

    #[ORM\ManyToOne(inversedBy: 'dishes')]
    private ?Theme $theme = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

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

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }
}
