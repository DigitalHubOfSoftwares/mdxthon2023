<?php

namespace App\Controller;

use App\Repository\ProductRepository;
use App\Service\FitnessStyle\FitnessStyleService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ProductRepository as NewProductRepository;
use App\Helper\Helper;
class FitnessStyleController extends AbstractController {
    private $fitnessStyleService;
    private $productRepository;
    public function __construct
    (
        FitnessStyleService $fitnessStyleService,
        NewProductRepository $productRepository
    )
    {
        $this->productRepository = $productRepository;
        $this->fitnessStyleService = $fitnessStyleService;
    }
    #[Route('/api/fitnesstyles/all', methods: ['GET'])]
    public function getAllFitnessStyles() {
        $finessStylesJson = [];
        $finessStylesObjects = $this->fitnessStyleService->getFitnessStyles();
        foreach($finessStylesObjects as $fitnessStyleObject) {
            $fitnessStyleJson["name"] = $fitnessStyleObject->getName();
            $fitnessStyleJson["title"] = $fitnessStyleObject->getTitle();
            $fitnessStyleJson["color"] = $fitnessStyleObject->getColor();
            $finessStylesJson[] = $fitnessStyleJson;
        }

        return $this->json($finessStylesJson);
    }

    #[Route('/api/products/all', methods: ['GET'])]
    public function getAllProducts() {
        try {
            $helper = new Helper();
            $products = $this->productRepository->findAll();
            $productsJson = $helper->objectCollectionToJson($products);
            return $this->json($productsJson);
        } catch (\Exception $ex) {
            return [];
        }
    }


}