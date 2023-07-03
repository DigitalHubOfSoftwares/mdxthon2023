<?php

namespace App\Service\User;

use App\Entity\FitnessStyle;
use App\Entity\User;
use App\Entity\Goal;
use App\Entity\UserPersonalisationInfo;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use App\Helper\Helper;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService {
    private $entityManager;
    private $helper;

    private $passwordHasher;

    public function __construct(
        EntityManagerInterface $entityManagerInterface,
        UserPasswordHasherInterface $userPasswordHasher
    )
    {
        $this->entityManager = $entityManagerInterface;
        $this->passwordHasher = $userPasswordHasher;
    }
    public function registerUser($registrationData) {
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = new User();
        $user->setEmail($registrationData['username']);
        $userPassword = $registrationData['password'];
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $userPassword
        );
        $user->setPassword($hashedPassword);
        $user->setFullName($registrationData['fullName']);
        if ($registrationData['isCoach']) {
            $roles = $user->getRoles();
            $roles[] = "COACH";
            $user->setRoles($roles);
        }
        $helper = new Helper();
        try {
            $this->entityManager->persist($user);
            $this->entityManager->flush();
            return $user;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function alreadyHasPersonalInfo($userId) {
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->find($userId);
        try {
            return $user->getUserPersonalisationInfo();
        } catch (\Exception $ex) {
            return null;
        }
    }

    public function saveUserAboutMe($userId, $aboutMeData) {
        $userPersonalInfo = null;
        if ($this->alreadyHasPersonalInfo($userId)) {
            $userPersonalInfoRepository = $this->entityManager->getRepository(UserPersonalisationInfo::class);
            $userPersonalInfo = $userPersonalInfoRepository->findOneBy(['user' => $userId]);
        }
        else { 
            $userPersonalInfo = new UserPersonalisationInfo();
        }  
        try {
            $userRepository = $this->entityManager->getRepository(User::class);
            $user = $userRepository->find($userId);
            $user->nullifyFitnessStyles();
            $user->nullifyLibraryMedias();
            $userPersonalInfo->setUser($user)
                            ->setGender($aboutMeData['gender'])
                            ->setHeight($aboutMeData['height'])
                            ->setWeight($aboutMeData['weight'])
                            ->setDateOfBirth(new \DateTime($aboutMeData['dateOfBirth']));
            $this->entityManager->persist($userPersonalInfo);
            $this->entityManager->flush();
            $user->nullifyUserPersonalisationInfo();
            $userPersonalInfo->setUser($user);
            $helper = new Helper();
            return json_decode($helper->objectToJson($userPersonalInfo), true);
        } catch (\Exception $ex) {
            return false;
        }

    }

    public function createEmptyUserPersonalisationInfo($user) {
        try {
            $userPersonalisationInfo = new UserPersonalisationInfo();
            $userPersonalisationInfo->setUser(($user));
            $this->entityManager->persist($userPersonalisationInfo);
            $this->entityManager->flush(); 
            return true;
        } catch (\Exception $ex) {
            return false;
        }
    }

    public function saveWorkoutPlan($userId, $workoutPlanData) {
        $userRepository = $this->entityManager->getRepository(User::class);
        $fitnessStyleRepository = $this->entityManager->getRepository(FitnessStyle::class);
        $userPersonalisationInfoRepository = $this->entityManager->getRepository(UserPersonalisationInfo::class);
        try {
            $user = $userRepository->find($userId);
            $fitnessStyles = $workoutPlanData['fitnessStyles'];
            $user->setFitnessStyles(new ArrayCollection);
            foreach ($fitnessStyles as $fitnessStyleName => $selected) {
                $fitnessStyle = $fitnessStyleRepository->findOneBy(['name' => $fitnessStyleName]);
                $user->addFitnessStyle($fitnessStyle);
            }
            $userPersonalisationInfo = $userPersonalisationInfoRepository->findOneBy(['user' => $userId]);
            $userPersonalisationInfo->setWorkoutDays($workoutPlanData["days"]);
            $this->entityManager->persist($user);
            $this->entityManager->persist(($userPersonalisationInfo));
            $this->entityManager->flush();
            $user->nullifyFitnessStyles();
            $user->nullifyLibraryMedias();
            $user->nullifyUserPersonalisationInfo();
            $userPersonalisationInfo->setUser(($user));
            $helper = new Helper();
            return json_decode($helper->objectToJson($userPersonalisationInfo), true);
        } catch (\Exception $ex) {
            return false;
        }
    }

    public function saveGoals($userId, $goalsData) {
        try {
            $userRepository = $this->entityManager->getRepository(User::class);
            $goalRepository = $this->entityManager->getRepository(Goal::class);
            $goal = $goalRepository->findOneBy(['name' => $goalsData['selectedGoal']]);
            $user = $userRepository->find($userId);
            $user->setGoal($goal);

            $userPersonalisationInfoRepository = $this->entityManager->getRepository(UserPersonalisationInfo::class);
            $userPersonalisationInfo = $userPersonalisationInfoRepository->findOneBy(['user'=>$userId]);
            $userPersonalisationInfo->setWaterIntake($goalsData['waterIntake']);
            $userPersonalisationInfo->setSleep($goalsData['sleep']);
            $this->entityManager->persist($user);
            $this->entityManager->persist($userPersonalisationInfo);
            $this->entityManager->flush();
            return true;
        } catch (\Exception $ex) {
            dd($ex->getMessage());
            return false;
        }
    }
}