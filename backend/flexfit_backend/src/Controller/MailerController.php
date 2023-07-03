<?php

// src/Controller/MailerController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

class MailerController extends AbstractController
{
    #[Route('/api/emailcontactus')]
    public function sendEmail(MailerInterface $mailer, Request $request): Response
    {
        $data = $request->toArray();
        $emailDest = $data['email'];
        $email = (new Email())
            ->from('hello@example.com')
            ->to($emailDest)
            //->cc('cc@example.com')
            //->bcc('bcc@example.com')
            //->replyTo('fabien@example.com')
            //->priority(Email::PRIORITY_HIGH)
            ->subject('Inquiry')
            ->text('Thank you for your email. Our team will respond shortly.')
            ->html('Thank you for your email. Our team will respond shortly.');

        $mailer->send($email);

        // ...
        return $this->json("test");
    }

    #[Route('/api/emailorder',  methods:['POST'])]
    public function sendEmailOrder(MailerInterface $mailer, Request $request): Response
    {
        $data = $request->toArray();
        $emailDest = $data['email'];
        $orderDatajson = json_encode($data['cartItems']);
        $email = (new Email())
            ->from('hello@example.com')
            ->to($emailDest)
            //->cc('cc@example.com')
            //->bcc('bcc@example.com')
            //->replyTo('fabien@example.com')
            //->priority(Email::PRIORITY_HIGH)
            ->subject('Inquiry')
            ->text('Thank you for your email. Our team will respond shortly.')
            ->html($orderDatajson);

        $mailer->send($email);

        // ...
        return $this->json("test");
    }
}