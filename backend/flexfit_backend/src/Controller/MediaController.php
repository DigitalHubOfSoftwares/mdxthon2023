<?php

namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\FileUploader\FileUploaderService;
use App\Service\LibraryMedia\LibraryMediaService;
use Doctrine\ORM\EntityManagerInterface;

class MediaController extends AbstractController {
    private $fileUploaderService;
    private $libraryMediaService;
    public function __construct
    (
        FileUploaderService $fileUploaderService,
        EntityManagerInterface $entityManagerInterface,
        LibraryMediaService $libraryMediaService
    ) 
    {
        $this->fileUploaderService = $fileUploaderService;
        $this->libraryMediaService = $libraryMediaService;
    }


    #[Route('/api/media/upload', name: 'upload_media', methods: ['POST'])]
    public function uploadMedia(Request $request) {
        $uploadedFile = $request->files->get('file');
        $this->fileUploaderService->upload($uploadedFile);
        return $this->json(['filename' => $uploadedFile->getClientOriginalName()]);
    }

    #[Route('/api/media/all', name: 'get_media', methods: ['GET'])]
    public function getLibrary() {
        $libraryMedias = $this->libraryMediaService->getAllMedias();
        return $this->json($libraryMedias);
    }

    #[Route('/api/media/categorized', name: 'get_media_categorized', methods: ['GET'])]
    public function getMediaCategorized() {
        $libraryMedias = $this->libraryMediaService->getAllMediasCategorized();
        return $this->json($libraryMedias);
    }

    #[Route('/api/media/personalized/{userId}', methods: ['GET'])]
    public function getPersonalizedMedia(Request $request, $userId) {
        $libraryMedias = $this->libraryMediaService->getPersonalizedMedia($userId);
        return $this->json($libraryMedias);
    }


}