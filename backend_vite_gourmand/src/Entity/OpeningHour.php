<?php

namespace App\Entity;

use App\Repository\OpeningHourRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OpeningHourRepository::class)]
class OpeningHour
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['main'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['main'])]
    private ?string $day = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['main'])]
    private ?string $openAM = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['main'])]
    private ?string $closeAM = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['main'])]
    private ?string $openPM = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['main'])]
    private ?string $closePM = null;

    #[ORM\Column]
    #[Groups(['main'])]
    private ?bool $isClosed = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDay(): ?string
    {
        return $this->day;
    }

    public function setDay(string $day): static
    {
        $this->day = $day;

        return $this;
    }

    public function getOpenAM(): ?string
    {
        return $this->openAM;
    }

    public function setOpenAM(?string $openAM): self
    {
        $this->openAM = $openAM;

        return $this;
    }

    public function getCloseAM(): ?string
    {
        return $this->closeAM;
    }

    public function setCloseAM(?string $closeAM): self
    {
        $this->closeAM = $closeAM;

        return $this;
    }

    public function getOpenPM(): ?string
    {
        return $this->openPM;
    }

    public function setOpenPM(?string $openPM): static
    {
        $this->openPM = $openPM;

        return $this;
    }

    public function getClosePM(): ?string
    {
        return $this->closePM;
    }

    public function setClosePM(?string $closePM): static
    {
        $this->closePM = $closePM;

        return $this;
    }

    public function setIsClosed(bool $isClosed): self
{
    $this->isClosed = $isClosed;
    return $this;
}

    public function getIsClosed(): ?bool
{
    return $this->isClosed;
}

    public function isClosed(): ?bool
    {
        return $this->isClosed;
    }
}
