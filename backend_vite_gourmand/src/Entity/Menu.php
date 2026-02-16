<?php

namespace App\Entity;

use App\Repository\MenuRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: MenuRepository::class)]
class Menu
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(name: "menu_id")]
    #[Groups(['main'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'menus')]
    #[ORM\JoinColumn(
    name: "theme_id",
    referencedColumnName: "theme_id",
    nullable: false
    )]
    #[Groups(['main'])]
    private ?Theme $theme = null;

    #[ORM\Column(length: 50)]
    #[Assert\NotBlank]
    #[Assert\Regex(
        pattern: "/^[a-zA-Z0-9\s'àâäéèêëîïôöùûüç\-]{3,50}$/",
        message: "Le titre contient des caractères interdits."
    )]
    #[Groups(['main'])]
    private ?string $titre_menu = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotBlank]
    #[Groups(['main'])]
    private ?string $description_menu = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Assert\PositiveOrZero]
    #[Groups(['main'])]
    private ?string $prix_menu = null;

    #[ORM\Column]
    #[Assert\Positive]
    #[Groups(['main'])]
    private ?int $nb_personnes = null;   

    #[ORM\Column(length: 20, nullable: true)]
    #[Assert\Length(max: 20)]
    #[Groups(['main'])]
    private ?string $regime = null;

    #[ORM\Column(type: "integer")]
    #[Assert\PositiveOrZero]
    #[Groups(['main'])]
    private ?int $quantite_restante = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['main'])]
    private ?string $image_url = null;

    #[ORM\ManyToMany(targetEntity: Plat::class)]
    #[ORM\JoinTable(name: "menu_plats")]
    #[ORM\JoinColumn(name: "menu_id", referencedColumnName: "menu_id")]
    #[ORM\InverseJoinColumn(name: "plat_id", referencedColumnName: "plat_id")]
    #[Groups(['main'])]
    private Collection $plats;

    public function __construct()
    {
        $this->plats = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrixMenu(): ?string
    {
        return $this->prix_menu;
    }

    public function setPrixMenu(string $prix_menu): static
    {
        $this->prix_menu = $prix_menu;

        return $this;
    }

    public function getTitreMenu(): ?string
    {
        return $this->titre_menu;
    }

    public function setTitreMenu(string $titre_menu): static
    {
        $this->titre_menu = $titre_menu;

        return $this;
    }

    public function getDescriptionMenu(): ?string
    {
        return $this->description_menu;
    }

    public function setDescriptionMenu(string $description_menu): static
    {
        $this->description_menu = $description_menu;

        return $this;
    }

    public function getNbPersonnes(): ?int
    {
        return $this->nb_personnes;
    }

    public function setNbPersonnes(int $nb_personnes): static
    {
        $this->nb_personnes = $nb_personnes;

        return $this;
    }

    public function getQuantiteRestante(): ?int
    {
        return $this->quantite_restante;
    }

    public function setQuantiteRestante(int $quantite_restante): static
    {
        $this->quantite_restante = $quantite_restante;

        return $this;
    }

    public function getTheme(): ?Theme
    {
        return $this->theme;
    }

    public function setTheme(?Theme $theme): static
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

    /**
     * @return Collection<int, Plat>
     */
    public function getPlats(): Collection
    {
        return $this->plats;
    }

    public function addPlat(Plat $plat): static
    {
        if (!$this->plats->contains($plat)) {
            $this->plats->add($plat);
        }
        return $this;
    }

    public function removePlat(Plat $plat): static
    {
        $this->plats->removeElement($plat);

        return $this;
    }

}
