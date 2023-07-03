<?php

namespace App\Service\MealItem;

use App\Entity\MealItem;
use App\Entity\UserCalories;
use Doctrine\ORM\EntityManagerInterface;
use App\Helper\Helper;

class MealItemService {
    private $entityManager;
    public function __construct
    (
        EntityManagerInterface $entityManagerInterface
    )
    {
        $this->entityManager = $entityManagerInterface;
    }

    public function getAllMealItems () {
        $mealItemRepository = $this->entityManager->getRepository(MealItem::class);
        $mealItems = $mealItemRepository->findAll();
        $helper = new Helper();
        $mealItemsJson = $helper->objectCollectionToJson($mealItems);
        return $mealItemsJson;
    }

    public function getTodayCurrentCalories($userId) {
        $userId = 1;
        $userCaloriesRepository = $this->entityManager->getRepository(UserCalories::class);
        $todayDate = new \DateTime();
        $todayUserCalories = $userCaloriesRepository->findOneBy(['userId' => $userId, 'date'=>$todayDate]);
        $helper = new Helper();
        if (!$todayUserCalories) {
            $newUserCalories = new UserCalories();
            $newUserCalories->setCalorieIntake(0);
            $newUserCalories->setUserId($userId);
            $newUserCalories->setDate($todayDate);
            $this->entityManager->persist($newUserCalories);
            $this->entityManager->flush();
            return $helper->objectToJson($newUserCalories);
        }
        
        return $helper->objectToJson($todayUserCalories);
    }

    public function saveTodayUserCalories($userId, $calorieData) {
        $userId = 1;
        $userCaloriesRepository = $this->entityManager->getRepository(UserCalories::class);
        $todayDate = new \DateTime();
        $todayUserCalories = $userCaloriesRepository->findOneBy(['userId' => $userId, 'date'=>$todayDate]);
        $helper = new Helper();
        if (!$todayUserCalories) {
            $newUserCalories = new UserCalories();
            $newUserCalories->setCalorieIntake($calorieData['calorieIntake']);
            $newUserCalories->setUserId($userId);
            $newUserCalories->setDate($todayDate);
            $this->entityManager->persist($newUserCalories);
            $this->entityManager->flush();
            return $helper->objectToJson($newUserCalories);
        }
        else {
            $todayUserCalories->setCalorieIntake($calorieData['calorieIntake']);
            $this->entityManager->persist($todayUserCalories);
            $this->entityManager->flush();
            return $helper->objectToJson($todayUserCalories);
        }
    }

    public function getAllUserCalories($userId)
    {
        try {
            $helper = new Helper();
            $userCaloriesRepository = $this->entityManager->getRepository(UserCalories::class);
            $userCalories = $userCaloriesRepository->findAll();
            $userCaloriesJson = $helper->objectCollectionToJson($userCalories);
            return $userCaloriesJson;
        } catch (\Exception $ex) {
            return [];
        }
    }
}