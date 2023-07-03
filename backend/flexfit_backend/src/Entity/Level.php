<?php

namespace App\Entity;

use App\Repository\LevelRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LevelRepository::class)]
class Level
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $title = null;

    #[ORM\OneToMany(mappedBy: 'level', targetEntity: LibraryMedia::class)]
    private Collection $libraryMedias;

    public function __construct()
    {
        $this->libraryMedias = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): static
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return Collection<int, LibraryMedia>
     */
    public function getLibraryMedias(): Collection
    {
        return $this->libraryMedias;
    }

    public function addLibraryMedia(LibraryMedia $libraryMedia): static
    {
        if (!$this->libraryMedias->contains($libraryMedia)) {
            $this->libraryMedias->add($libraryMedia);
            $libraryMedia->setLevel($this);
        }

        return $this;
    }

    public function removeLibraryMedia(LibraryMedia $libraryMedia): static
    {
        if ($this->libraryMedias->removeElement($libraryMedia)) {
            // set the owning side to null (unless already changed)
            if ($libraryMedia->getLevel() === $this) {
                $libraryMedia->setLevel(null);
            }
        }

        return $this;
    }

    public function nullifyLibraryMedias(): static
    {
        $this->libraryMedias = new ArrayCollection();
        
        return $this;
    }

    public function __toString() {
        return $this->title;
    }
}
