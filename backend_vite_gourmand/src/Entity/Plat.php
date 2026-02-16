<?php

namespace App\Entity;

use App\Repository\PlatRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: PlatRepository::class)]
class Plat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "plat_id")]
    #[Groups(['main'])]
    private ?int $id = null;

    #[ORM\Column(name: "titre_plat", length: 50)]
    #[Groups(['main'])]
    private ?string $titre_plat = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['main'])]
    private ?string $photo = null;

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

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto($photo): static
    {
        $this->photo = $photo;
        return $this;
    }
}