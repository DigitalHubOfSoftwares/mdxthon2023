<?php

namespace App\Entity;

use App\Repository\UserPersonalisationInfoRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserPersonalisationInfoRepository::class)]
class UserPersonalisationInfo
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'userPersonalisationInfo', cascade: ['persist', 'remove'])]
    private ?User $user = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $gender = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateOfBirth = null;

    #[ORM\Column(nullable: true)]
    private ?float $height = null;

    #[ORM\Column(nullable: true)]
    private ?float $weight = null;

    #[ORM\Column(nullable: true)]
    private ?int $workoutDays = null;

    #[ORM\Column(nullable: true)]
    private ?float $waterIntake = null;

    #[ORM\Column(nullable: true)]
    private ?float $sleep = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(?string $gender): static
    {
        $this->gender = $gender;

        return $this;
    }

    public function getDateOfBirth(): ?\DateTimeInterface
    {
        return $this->dateOfBirth;
    }

    public function setDateOfBirth(?\DateTimeInterface $dateOfBirth): static
    {
        $this->dateOfBirth = $dateOfBirth;

        return $this;
    }

    public function getHeight(): ?float
    {
        return $this->height;
    }

    public function setHeight(?float $height): static
    {
        $this->height = $height;

        return $this;
    }

    public function getWeight(): ?float
    {
        return $this->weight;
    }

    public function setWeight(?float $weight): static
    {
        $this->weight = $weight;

        return $this;
    }

    public function getWorkoutDays(): ?int
    {
        return $this->workoutDays;
    }

    public function setWorkoutDays(?int $workoutDays): static
    {
        $this->workoutDays = $workoutDays;

        return $this;
    }

    public function getWaterIntake(): ?float
    {
        return $this->waterIntake;
    }

    public function setWaterIntake(?float $waterIntake): static
    {
        $this->waterIntake = $waterIntake;

        return $this;
    }

    public function getSleep(): ?float
    {
        return $this->sleep;
    }

    public function setSleep(?float $sleep): static
    {
        $this->sleep = $sleep;

        return $this;
    }
}
