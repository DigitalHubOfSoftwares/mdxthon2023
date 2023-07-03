<?php

namespace App\Controller;
use App\Service\MealItem\MealItemService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class MealItemController extends AbstractController {
    private $mealItemService;
    public function __construct
    (
        MealItemService $mealItemService
    )
    {
        $this->mealItemService = $mealItemService;
    }


    #[Route('/api/mealitem/all', methods: ['GET'])]
    public function getAllMealItems() {
        $allMealItems = $this->mealItemService->getAllMealItems();
        return $this->json($allMealItems);
    }

    #[Route('/api/currentcalorie/{userId}', methods: ['GET'])]
    public function getTodayUserCalories(Request $request, $userId) {
       $todayUserCalories = $this->mealItemService->getTodayCurrentCalories($userId);
       $todayUserCaloriesJson = json_decode($todayUserCalories, true);
       return $this->json($todayUserCaloriesJson);
    }

    #[Route('/api/savecalorie/today/{userId}', methods: ['POST'])]
    public function saveTodayUserCalories(Request $request, $userId) {
       $savedUserCalories = $this->mealItemService->saveTodayUserCalories($userId, $request->toArray());
       return $this->json($savedUserCalories);
    }

    #[Route('/api/calorie/all/{userId}', methods: ['GET'])]
    public function getAllUserCalories(Request $request, $userId) {
       $allUserCalories = $this->mealItemService->getAllUserCalories($userId);
       return $this->json($allUserCalories);
    }

    


}