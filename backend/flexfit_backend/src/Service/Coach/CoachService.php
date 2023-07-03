<?php
namespace App\Service\Coach;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Helper\Helper;

class CoachService {
    private $entityManager;
    public function __construct
    (
        EntityManagerInterface $entityManagerInterface
    )
    {
        $this->entityManager = $entityManagerInterface;
    }

    public function getAllCoaches() {
        try {
            $helper = new Helper();
            $userRepository = $this->entityManager->getRepository(User::class);
            $users = $userRepository->findAll();
            $coachesArray = [];
            foreach($users as $user) {
                $roles = $user->getRoles();
                foreach($roles as $role) {
                    if ($role == "COACH") {
                        $user->nullifyReference();
                        $coachJson = json_decode($helper->objectToJson($user), true);
                        $coachesArray[] = $coachJson;
                    }
                }
            }
            return $coachesArray;
        } catch (\Exception $ex) {
            return [];
        }

    }
}