<?php

namespace App\Controller;

use App\Service\Coach\CoachService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class CoachController extends AbstractController {
    private $coachService;
    public function __construct(
        CoachService $coachService
    )
    {
        $this->coachService = $coachService;
    }

    #[Route('/api/coach/all/', methods: ['GET'])]
    public function getAllCoaches() {
        $allCoaches = $this->coachService->getAllCoaches();
        return $this->json($allCoaches);
    }
}