<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\Goal\GoalService;

class GoalController extends AbstractController {
    private $goalService;
    public function __construct
    (
        GoalService $goalService
    )
    {
        $this->goalService = $goalService;
    }

    #[Route('/api/goals/all', methods: ['GET'])]
    public function getAllGoals(Request $request) {
        $goalsJson = [];
        $goalsObjects = $this->goalService->getGoals();
        foreach($goalsObjects as $goalObject) {
            $goalJson['name'] = $goalObject->getName();
            $goalJson['title'] = $goalObject->getTitle();
            $goalsJson[] = $goalJson;
        }

        return $this->json($goalsJson);
    }
}