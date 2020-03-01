<?php

namespace App\Controller;

use App\Entity\Usuario;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class UsuarioController extends AbstractController
{
    /**
     * @Route("/usuario", name="usuario")
     */
    public function index()
    {
        return $this->render('usuario/index.html.twig', [
            'controller_name' => 'UsuarioController',
        ]);
    }

    /**
     * @Route("/usuario/crear")
     */
    public function crearUsuario(): Response{
        $entityManager = $this->getDoctrine()->getManager();

        $usuario = new Usuario();
        $usuario->setNombre('César Cubillos');
        $usuario->setCorreo('cesarc.cubillos@gmail.com');
        $usuario->setClave('123456');
        $usuario->setImagen('imagen');

        $entityManager->persist($usuario);

        $entityManager->flush();
        return new Response('Usuario generado con ID: '.$usuario->getId());
    }
}
