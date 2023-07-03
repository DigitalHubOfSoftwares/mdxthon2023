<?php

namespace App\Controller\Admin;

use App\Entity\MealItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class MealItemCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return MealItem::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
