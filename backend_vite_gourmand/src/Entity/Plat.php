<?php

namespace App\Entity;

use App\Repository\PlatRepository; // Vérifie que le nom du repo est correct
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PlatRepository::class)]
class Plat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "plat_id")] // Conforme MCD
    private ?int $id = null;

    #[ORM\Column(name: "titre_plat", length: 50)] // Conforme MCD
    private ?string $titre_plat = null;

    #[ORM\Column(type: Types::BLOB, nullable: true)] // Conforme MCD
    private $photo = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitrePlat(): ?string
    {
        return $this->titre_plat;
    }

    public function setTitrePlat(string $titre_plat): static
    {
        $this->titre_plat = $titre_plat;
        return $this;
    }

    public function getPhoto()
    {
        return $this->photo;
    }

    public function setPhoto($photo): static
    {
        $this->photo = $photo;
        return $this;
    }
}