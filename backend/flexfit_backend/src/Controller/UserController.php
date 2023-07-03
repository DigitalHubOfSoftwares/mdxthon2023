<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\User\UserService;
use Doctrine\ORM\EntityManagerInterface;
use App\Helper\Helper;
class UserController extends AbstractController {
    private $userService;
    public function __construct(EntityManagerInterface $entityManagerInterface, UserService $userService) {
        $this->userService = $userService;
    }

    #[Route('/api/register', methods: ['POST'])]
    public function register(Request $request) {
        $registrationData = $request->toArray();
        $newUser = $this->userService->registerUser($registrationData);
        if ($newUser) {
            $helper = new Helper();
            $newUserJson = json_decode($helper->objectToJson($newUser), true);
            $this->userService->createEmptyUserPersonalisationInfo($newUser);
            return $this->json(["success"=>true, "user"=>$newUserJson]);
        } else {
            return $this->json(["success"=>false]);
        }
    }

    #[Route('/api/save/aboutme/{userId}', methods: ['POST'])]
    public function saveAboutMe(Request $request, $userId) {
        if ($this->userService->saveUserAboutMe($userId, $request->toArray())) return $this->json(["success" => true]);
        return $this->json(['success' => false]);
    }

    #[Route('/api/save/workoutplan/{userId}', methods: ['POST'])]
    public function saveWorkoutPlan(Request $request, $userId) {
        if ($this->userService->saveWorkoutPlan($userId, $request->toArray())) return $this->json(["success" => true]);
        return $this->json(['success' => false]);
    }

    #[Route('/api/save/goals/{userId}', methods: ['POST'])]
    public function saveGoals(Request $request, $userId) {
        if ( $this->userService->saveGoals($userId, $request->toArray())) return $this->json(['success' => true]);
        else return $this->json(['success' => false]);
       
    }
}