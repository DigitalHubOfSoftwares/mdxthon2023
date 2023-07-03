<?php

namespace App\Service\LibraryMedia;

use App\Entity\LibraryMedia;
use App\Entity\FitnessStyle;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use App\Helper\Helper;
use App\Entity\User;

class LibraryMediaService {
    private $entityManager;
    private $helper;



    public function __construct
    (
        EntityManagerInterface $entityManagerInterface,
        private $videosPath,
        private $thumbnailsPath
    ) 
    {
        $this->entityManager = $entityManagerInterface;
        $this->helper = new Helper();
    }

    public function getAllMedias() {
        $libraryMediaRepository = $this->entityManager->getRepository(LibraryMedia::class);
        $libraryMedias = array_map(function($libraryMedia) {
            return $this->removeLibraryMediaCircularReference($libraryMedia);
        }, $libraryMediaRepository->findAll());
        $libraryMediasJson = $this->helper->objectCollectionToJson($libraryMedias);
        return $libraryMediasJson;
    }

    public function removeLibraryMediaCircularReference($libraryMedia) {
        $user = $libraryMedia->getUploadedBy();
        $user->nullifyLibraryMedias();
        $libraryMedia->setUploadedBy($user);

        $level = $libraryMedia->getLevel();
        $level->nullifyLibraryMedias();
        $libraryMedia->setLevel($level);

        $fitnessStyle = $libraryMedia->getFitnessStyle();
        $fitnessStyle->nullifyLibraryMedias();
        $libraryMedia->setFitnessStyle($fitnessStyle);

        $libraryMedia->setMediaPath($this->videosPath . $libraryMedia->getMediaPath());
        $libraryMedia->setThumbnailPath($this->thumbnailsPath . $libraryMedia->getThumbnailPath());

        return $libraryMedia;
    }

    public function getAllMediasCategorized() {
        try {
            $fitnessStyleRepository = $this->entityManager->getRepository(FitnessStyle::class);
            $fitnessStyles = $fitnessStyleRepository->findAll();
            foreach($fitnessStyles as &$fitnessStyle) {
                $fitnessStyle->setUsers(new ArrayCollection);
                $libraryMedias = $fitnessStyle->getLibraryMedias();
                foreach ($libraryMedias as &$libraryMedia) {
                    $libraryMedia->setFitnessStyle(null);
                    $uploadedBy = $libraryMedia->getUploadedBy();
                    $uploadedBy->nullifyFitnessStyles();
                    $uploadedBy->nullifyLibraryMedias();
                    $uploadedBy->nullifyUserPersonalisationInfo();
                    $libraryMedia->setUploadedBy($uploadedBy);
                    $libraryMedia->setMediaPath($this->videosPath . $libraryMedia->getMediaPath());
                    $libraryMedia->setThumbnailPath($this->thumbnailsPath . $libraryMedia->getThumbnailPath());
                    $libraryMedia->setFitnessStyle(null);
                    $level = $libraryMedia->getLevel();
                    $level->nullifyLibraryMedias();
                    $libraryMedia->setLevel($level);
                }
                // dd($fitnessStyle->getLibraryMedias());
            }
            $helper = new Helper();
            $fitnessStylesJson = $helper->objectCollectionToJson($fitnessStyles);
            return $fitnessStylesJson;
        } catch (\Exception $ex) {
            return [];
        }
    }


    public function getPersonalizedMedia($userId) {
        try {
            $helper = new Helper();
            $userRepository = $this->entityManager->getRepository(User::class);
            $user = $userRepository->find($userId);
            $userFitnessStyles = $user->getFitnessStyles();
            $libraryMediasArray = [];
            foreach($userFitnessStyles as $userFitnessStyle) {
                $libraryMedias = $userFitnessStyle->getLibraryMedias();
                foreach($libraryMedias as $libraryMedia) {
                    $libraryMedia->setFitnessStyle(null);
                    $uploadedBy = $libraryMedia->getUploadedBy();
                    $uploadedBy->nullifyReference();
                    $libraryMedia->setUploadedBy($uploadedBy);
                    $libraryMedia->setFitnessStyle(null);
                    $level = $libraryMedia->getLevel();
                    $level->nullifyLibraryMedias();
                    $libraryMedia->setLevel($level);
                    $libraryMedia->setMediaPath($this->videosPath . $libraryMedia->getMediaPath());
                    $libraryMedia->setThumbnailPath($this->thumbnailsPath . $libraryMedia->getThumbnailPath());
                    $libraryMediaJson = json_decode($helper->objectToJson($libraryMedia), true);
                    $libraryMediasArray[] = $libraryMediaJson;
                }
            }
            return $libraryMediasArray;
        } catch (\Exception $ex) {
            return [];
        }
    } 

}