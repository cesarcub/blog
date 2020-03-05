<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Contacto;
use Exception;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ContactoController extends AbstractController
{
    /**
     * Método que guarda mensaje de contacto
     * @Route("/contacto", name="contacto")
     */
    public function crearMensajeContacto(Request $request, ValidatorInterface $validator)
    {
        try {
            $request = json_decode($request->getContent());
            $entityManager = $this->getDoctrine()->getManager();

            $contacto = new Contacto();
            $contacto->setNombre($request->nombre);
            $contacto->setCorreo($request->correo);
            $contacto->setMensaje($request->mensaje);

            $errors = $validator->validate($contacto);

            if (count($errors) > 0) {
                return new JsonResponse(['estado' => false, 'respuesta' => 'Verifica los campos'], 400);
            }

            $entityManager->persist($contacto);
            $entityManager->flush();

            return new JsonResponse(['estado' => true, 'respuesta' => 'Hemos recibido tu mensaje'], 201);
        } catch (Exception $e) {
            return new JsonResponse(['estado' => false, 'respuesta' => 'Ocurrió un error al intentar guardar el mensaje '.$e->getMessage()], 500);
        }
    }
}
