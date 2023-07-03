<?php

namespace App\Service\Booking;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Booking;
use App\Entity\User;
use App\Helper\Helper;

class BookingService {
    private $entityManager;
    public function __construct
    (
        EntityManagerInterface $entityManagerInterface
    )
    {
        $this->entityManager = $entityManagerInterface;
    }

    public function getAllUserBookings($userId) {
        try {
            $helper = new Helper();
            $userRepository = $this->entityManager->getRepository(User::class);
            $bookingRepository = $this->entityManager->getRepository(Booking::class);
            $bookings = $bookingRepository->findBy(['userId' => $userId]);
            $bookingsArray = [];
            foreach($bookings as $booking) {
                $customerId = $booking->getUserId();
                $coachId = $booking->getCoachId();
                $customer = $userRepository->find($customerId);
                $coach = $userRepository->find($coachId);
                $customer->nullifyReference();
                $coach->nullifyReference();
                $customerJson = json_decode($helper->objectToJson($customer), true);
                $coachJson = json_decode($helper->objectToJson($coach), true);
                $bookingJson['coach'] = $coachJson;
                $bookingJson['customer'] = $customerJson;
                $bookingsArray[] = $bookingJson;
            }
    
            return $bookingsArray;
        } catch (\Exception $ex) {
            return [];
        }
    } 

    public function createBooking($userId, $coachId) {
        try {
            $booking = new Booking();
            $booking->setCoachId($coachId);
            $booking->setUserId($userId);
            $this->entityManager->persist($booking);
            $this->entityManager->flush();
            return true;
        } catch (\Exception $ex) {
            return false;
        }
    }
}