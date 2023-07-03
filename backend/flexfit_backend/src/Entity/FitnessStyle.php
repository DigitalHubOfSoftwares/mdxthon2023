<?php

namespace App\Entity;

use App\Repository\FitnessStyleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FitnessStyleRepository::class)]
class FitnessStyle
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $title = null;

    #[ORM\OneToMany(mappedBy: 'fitnessStyle', targetEntity: LibraryMedia::class)]
    private Collection $libraryMedias;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'fitnessStyles')]
    private Collection $users;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $color = null;

    public function __construct()
    {
        $this->libraryMedias = new ArrayCollection();
        $this->users = new ArrayCollection();
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
            $libraryMedia->setFitnessStyle($this);
        }

        return $this;
    }

    public function removeLibraryMedia(LibraryMedia $libraryMedia): static
    {
        if ($this->libraryMedias->removeElement($libraryMedia)) {
            // set the owning side to null (unless already changed)
            if ($libraryMedia->getFitnessStyle() === $this) {
                $libraryMedia->setFitnessStyle(null);
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

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function setUsers(Collection $users) 
    {       
        $this->users = $users;
    }
    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->addFitnessStyle($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            $user->removeFitnessStyle($this);
        }

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): static
    {
        $this->color = $color;

        return $this;
    }
}
