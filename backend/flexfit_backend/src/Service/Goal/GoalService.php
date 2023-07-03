<?php

namespace App\Service\Goal;
use App\Entity\Goal;
use App\Entity\UserPersonalisationInfo;
use Doctrine\ORM\EntityManagerInterface;

class GoalService {
    private $entityManager;
    public function __construct
    (
        EntityManagerInterface $entityManagerInterface
    )
    {
        $this->entityManager = $entityManagerInterface;
    }

    public function getGoals() {
        $goalRepository = $this->entityManager->getRepository(Goal::class);
        $goals = $goalRepository->findAll();
        return $goals;
    }
}