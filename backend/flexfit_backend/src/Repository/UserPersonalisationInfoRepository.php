<?php

namespace App\Repository;

use App\Entity\UserPersonalisationInfo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<UserPersonalisationInfo>
 *
 * @method UserPersonalisationInfo|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserPersonalisationInfo|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserPersonalisationInfo[]    findAll()
 * @method UserPersonalisationInfo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserPersonalisationInfoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserPersonalisationInfo::class);
    }

    public function save(UserPersonalisationInfo $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(UserPersonalisationInfo $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return UserPersonalisationInfo[] Returns an array of UserPersonalisationInfo objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('u.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?UserPersonalisationInfo
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
