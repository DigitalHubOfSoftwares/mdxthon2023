<?php

namespace App\Controller\Admin;

use App\Entity\Meal;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class MealCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Meal::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('name'),
            TextField::new('description'),
            ImageField::new('imagePath')->setUploadDir('public/uploads/meal')
        ];
    }
    
}
