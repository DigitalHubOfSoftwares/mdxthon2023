<?php

namespace App\Controller\Admin;

use App\Entity\Meal;
use App\Entity\MealItem;
use App\Entity\User;
use App\Entity\LibraryMedia;
use App\Entity\Goal;
use App\Entity\Level;
use App\Entity\Product;
use App\Entity\FitnessStyle;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;


class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($adminUrlGenerator->setController(UserCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        // return $this->render('some/path/my-dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Flexfit Backend');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Users', 'fas fa-list', User::class);
        yield MenuItem::linkToCrud('Library Medias', 'fas fa-list', LibraryMedia::class);
        yield MenuItem::linkToCrud('Fitness Style', 'fas fa-list', FitnessStyle::class);
        yield MenuItem::linkToCrud('Shop Products', 'fas fa-list', Product::class);
        yield MenuItem::linkToCrud('Levels', 'fas fa-list', Level::class);
        yield MenuItem::linkToCrud('Goals', 'fas fa-list', Goal::class);
        yield MenuItem::linkToCrud('Meals', 'fas fa-list', Meal::class);
        yield MenuItem::linkToCrud('MealItem', 'fas fa-list', MealItem::class);
    }
}
