<?php

namespace App\Entity;

use App\Repository\LibraryMediaRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LibraryMediaRepository::class)]
class LibraryMedia
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $mediaPath = null;

    #[ORM\ManyToOne(inversedBy: 'libraryMedias')]
    private ?User $uploadedBy = null;

    #[ORM\ManyToOne(inversedBy: 'libraryMedia')]
    private ?FitnessStyle $fitnessStyle = null;

    #[ORM\ManyToOne(inversedBy: 'libraryMedias')]
    private ?Level $level = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $thumbnailPath = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getMediaPath(): ?string
    {
        return $this->mediaPath;
    }

    public function setMediaPath(?string $mediaPath): static
    {
        $this->mediaPath = $mediaPath;

        return $this;
    }

    public function getUploadedBy(): ?User
    {
        return $this->uploadedBy;
    }

    public function setUploadedBy(?User $uploadedBy): static
    {
        $this->uploadedBy = $uploadedBy;

        return $this;
    }

    public function getFitnessStyle(): ?FitnessStyle
    {
        return $this->fitnessStyle;
    }

    public function setFitnessStyle(?FitnessStyle $fitnessStyle): static
    {
        $this->fitnessStyle = $fitnessStyle;

        return $this;
    }

    public function getLevel(): ?Level
    {
        return $this->level;
    }

    public function setLevel(?Level $level): static
    {
        $this->level = $level;

        return $this;
    }

    public function getThumbnailPath(): ?string
    {
        return $this->thumbnailPath;
    }

    public function setThumbnailPath(?string $thumbnailPath): static
    {
        $this->thumbnailPath = $thumbnailPath;

        return $this;
    }
}
