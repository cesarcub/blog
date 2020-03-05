<?php

namespace App\Repository;

use App\Entity\Blog;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Blog|null find($id, $lockMode = null, $lockVersion = null)
 * @method Blog|null findOneBy(array $criteria, array $orderBy = null)
 * @method Blog[]    findAll()
 * @method Blog[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BlogRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Blog::class);
    }

    /**
     * @return Blog[] Returns an array of Blog objects
     */

    public function listarBlogUsuarios(): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery(
            'SELECT b.titulo, b.fecha, b.imagen, u.name
            FROM App\Entity\Blog b
            INNER JOIN b.idUser u
            ORDER BY b.fecha DESC'
        );

        return $query->getResult();
    }

    public function seleccionarBlog($idBlog): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery(
            'SELECT b.titulo, b.fecha, b.contenido, b.imagen, u.name
            FROM App\Entity\Blog b
            INNER JOIN b.idUser u
            WHERE b.id = :id'
        );
        $query->setParameter('id', $idBlog);

        return $query->getResult();
    }

    public function seleccionarBlogsUsuario($idUsuario): array
    {
        $entityManager = $this->getEntityManager();
        $query = $entityManager->createQuery(
            'SELECT b.titulo, b.fecha, b.contenido, b.imagen, u.name
            FROM App\Entity\Blog b
            INNER JOIN b.idUser u
            WHERE b.idUser = :id
            ORDER BY b.fecha DESC'
        );
        $query->setParameter('id', $idUsuario);

        return $query->getResult();
    }
}
