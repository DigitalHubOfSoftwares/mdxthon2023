<?php

namespace App\Helper;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;



class Helper {
    private $encoders;
    private $normalizers;
    private $serializer;

    public function __construct() {
        $this->encoders = [new XmlEncoder(), new JsonEncoder()];
        $this->normalizers = [new ObjectNormalizer()];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
    }
    public function objectToJson($object) {

        return $this->serializer->serialize($object, 'json');
    }

    public function objectCollectionToJson($objects) {
        if (!$objects || count($objects) === 0) return [];
        $jsonObjects = [];
        foreach ($objects as $object) {
            $jsonObjects[] = json_decode($this->serializer->serialize($object, 'json'), true);
        }

        return $jsonObjects;
    }
}