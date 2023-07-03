<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\OneToMany(mappedBy: 'uploadedBy', targetEntity: LibraryMedia::class)]
    private Collection $libraryMedias;

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'])]
    private ?UserPersonalisationInfo $userPersonalisationInfo = null;

    #[ORM\ManyToMany(targetEntity: FitnessStyle::class, inversedBy: 'users')]
    private Collection $fitnessStyles;

    #[ORM\ManyToOne(inversedBy: 'users')]
    private ?Goal $goal = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fullName = null;

    public function __construct()
    {
        $this->libraryMedias = new ArrayCollection();
        $this->fitnessStyles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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
            $libraryMedia->setUploadedBy($this);
        }

        return $this;
    }

    public function removeLibraryMedia(LibraryMedia $libraryMedia): static
    {
        if ($this->libraryMedias->removeElement($libraryMedia)) {
            // set the owning side to null (unless already changed)
            if ($libraryMedia->getUploadedBy() === $this) {
                $libraryMedia->setUploadedBy(null);
            }
        }

        return $this;
    }

    public function nullifyLibraryMedias(): static
    {
        $this->libraryMedias = new ArrayCollection();
        
        return $this;
    }

    public function nullifyFitnessStyles(): static
    {
        $this->fitnessStyles = new ArrayCollection();
        
        return $this;
    }

    public function nullifyUserPersonalisationInfo(): static
    {
        $this->userPersonalisationInfo = null;
        
        return $this;
    }

    public function __toString() {
        return $this->email;
    }

    public function getUserPersonalisationInfo(): ?UserPersonalisationInfo
    {
        return $this->userPersonalisationInfo;
    }

    public function setUserPersonalisationInfo(?UserPersonalisationInfo $userPersonalisationInfo): static
    {
        // unset the owning side of the relation if necessary
        if ($userPersonalisationInfo === null && $this->userPersonalisationInfo !== null) {
            $this->userPersonalisationInfo->setUser(null);
        }

        // set the owning side of the relation if necessary
        if ($userPersonalisationInfo !== null && $userPersonalisationInfo->getUser() !== $this) {
            $userPersonalisationInfo->setUser($this);
        }

        $this->userPersonalisationInfo = $userPersonalisationInfo;

        return $this;
    }

    /**
     * @return Collection<int, FitnessStyle>
     */
    public function getFitnessStyles(): Collection
    {
        return $this->fitnessStyles;
    }

    public function setFitnessStyles(?Collection $fitessStyles): static 
    {
        $this->fitnessStyles = $fitessStyles;
        return $this;
    }

    public function addFitnessStyle(FitnessStyle $fitnessStyle): static
    {
        if (!$this->fitnessStyles->contains($fitnessStyle)) {
            $this->fitnessStyles->add($fitnessStyle);
        }

        return $this;
    }

    public function removeFitnessStyle(FitnessStyle $fitnessStyle): static
    {
        $this->fitnessStyles->removeElement($fitnessStyle);

        return $this;
    }

    public function getGoal(): ?Goal
    {
        return $this->goal;
    }

    public function setGoal(?Goal $goal): static
    {
        $this->goal = $goal;

        return $this;
    }

    public function nullifyReference(): static {
        $this->nullifyFitnessStyles();
        $this->nullifyLibraryMedias();
        $this->nullifyUserPersonalisationInfo();
        
        return $this;
    }

    public function getFullName(): ?string
    {
        return $this->fullName;
    }

    public function setFullName(?string $fullName): static
    {
        $this->fullName = $fullName;

        return $this;
    }
}
