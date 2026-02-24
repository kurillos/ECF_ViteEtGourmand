<?php

namespace App\Entity;

use App\Repository\AvisRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AvisRepository::class)]
class Avis
{
    #[Groups(['avis'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "avis_id")]
    private ?int $id = null;

    #[Groups(['avis'])]
    #[Assert\NotBlank(message: "Le nom est obligatoire")]
    #[Assert\Length(max: 50)]
    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[Groups(['avis'])]
    #[Assert\NotBlank]
    #[Assert\Length(min: 10, max: 500, minMessage: "Message trop court, il doit contenir au moins 10 caractères.")]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $message = null;

    #[Groups(['avis'])]
    #[Assert\Range(min: 1, max: 5)]
    #[ORM\Column]
    private ?int $note = null;

    #[Groups(['avis'])]
    #[ORM\Column]
    private ?bool $isValidated = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): static
    {
        $this->message = $message;

        return $this;
    }

    public function getNote(): ?int
    {
        return $this->note;
    }

    public function setNote(int $note): static
    {
        $this->note = $note;

        return $this;
    }

    public function isValidated(): ?bool
    {
        return $this->isValidated;
    }

    public function setIsValidated(bool $isValidated): static
    {
        $this->isValidated = $isValidated;

        return $this;
    }
}
