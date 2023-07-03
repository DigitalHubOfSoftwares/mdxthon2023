<?php

namespace App\Controller\Admin;

use App\Entity\FitnessStyle;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ColorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class FitnessStyleCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return FitnessStyle::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('name'),
            TextField::new('title'),
            ColorField::new('color')
        ];
    }
    
}
