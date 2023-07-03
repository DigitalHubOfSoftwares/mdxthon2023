<?php

namespace App\Service\FitnessStyle;
use App\Entity\FitnessStyle;
use Doctrine\ORM\EntityManagerInterface;

class FitnessStyleService {
    private $entityManager;
    public function __construct
    (
        EntityManagerInterface $entityManagerInterface
    )
    {
        $this->entityManager = $entityManagerInterface;
    }

    public function getFitnessStyles() {
        $fitnessStyleRepository = $this->entityManager->getRepository(FitnessStyle::class);
        $fitnessStyles = $fitnessStyleRepository->findAll();
        return $fitnessStyles;
    }
}