<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{

    /**
     * Método para reigistro de usuarios
     * @param Request $request Petición enviada desde front con datos JSON
     * @Route("/api/register", name="registro")
     */
    public function register(
        Request $request,
        UserPasswordEncoderInterface $encode,
        ValidatorInterface $validator
    ): JsonResponse {
        try {
            $request = json_decode($request->getContent());
            $entityManager = $this->getDoctrine()->getManager();

            $user = new User();

            $user->setEmail($request->username);
            $password = $encode->encodePassword($user, $request->password);
            $user->setPassword($password);
            $user->setRoles([]);

            $errors = $validator->validate($user);
            if (count($errors) > 0) {
                return new JsonResponse(['estado' => false, 'respuesta' => 'Verifica los campos'], 400);
            }

            $entityManager->persist($user);

            $entityManager->flush();

            return new JsonResponse(['estado' => true, 'respuesta' => 'Usuario creado exitosamente'], 201);
        } catch (UniqueConstraintViolationException $e) {
            return new JsonResponse(['estado' => false, 'respuesta' => 'El correo ya existe'], 400);
        }
    }
}
