<?php

namespace App\Controller\Admin;

use App\Entity\LibraryMedia;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class LibraryMediaCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return LibraryMedia::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('title'),
            TextField::new('description'),
            ImageField::new('mediaPath')->setUploadDir('public/uploads/medialibrary/videos'),
            ImageField::new('thumbnailPath')->setUploadDir('public/uploads/medialibrary/thumbnails'),
            AssociationField::new('fitnessStyle'),
            AssociationField::new('level'),
            AssociationField::new('uploadedBy')
        ];
    }
}
