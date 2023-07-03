<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\Booking\BookingService;

class BookingController extends AbstractController {
    private $bookingService;
    public function __construct(
        BookingService $bookingService
    ) {
        $this->bookingService = $bookingService;
    }   
    
    #[Route('/api/userbookings/{userId}', methods: ['GET'])]
    public function getAllUserBookings(Request $request, $userId) {
        $userBookings = $this->bookingService->getAllUserBookings($userId);
        return $this->json($userBookings);
    }

    #[Route('/api/createbooking/{userId}/{coachId}', methods: ['POST'])]
    public function createBooking($userId, $coachId) {
        $didBook = $this->bookingService->createBooking($userId, $coachId);
        return $this->json($didBook);
    }
}