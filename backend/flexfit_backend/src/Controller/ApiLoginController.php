<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use App\Helper\Helper;

class ApiLoginController extends AbstractController
{
    #[Route('/api/login', name: 'api_login')]
    public function index(#[CurrentUser] ?User $user): JsonResponse
    {
        $helper = new Helper();
        if ($user === null) {
            return $this->json(null, Response::HTTP_UNAUTHORIZED);
        }
        $user->nullifyFitnessStyles();
        $user->nullifyLibraryMedias();
        $user->nullifyUserPersonalisationInfo();

        return $this->json([
            'user'  => json_decode($helper->objectToJson($user), true),
            'message' => 'login successful'
        ]);
    }
}
