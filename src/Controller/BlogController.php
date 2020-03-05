<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Blog;
use \DateTime;
use \Exception;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class BlogController extends AbstractController
{
    /**
     * @Route("/blogs", name="blogs")
     */
    public function index()
    {
        $repository = $this->getDoctrine()->getRepository(Blog::class);
        $blogs = $repository->listarBlogUsuarios();
        return new JsonResponse(['estado' => true, 'blogs' => $blogs], 200);
    }

    /**
     * @Route("/api/crear/blog", name="crearBlog")
     */
    public function crearBlog(
        Request $request,
        UserInterface $user,
        ValidatorInterface $validator
    )
    {
        try{
            //Se captura la imagen del blog
            $file = $request->files->get('archivo');
            $nombreImagen = '';
            $fecha = DateTime::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s'));

            //Se sube imagen de blog, si esta existe
            if ($file) {
                $nombreImagen = md5(uniqid()) . '.' . $file->getClientOriginalExtension();
                $directorio = $this->getParameter('imagenBlog');
                $file->move($directorio, $nombreImagen);
            }

            $entityManager = $this->getDoctrine()->getManager();
            
            //Se instancia nueva entrada del blog
            $blog = new Blog();
            $blog->setIdUser($user);
            $blog->setTitulo($request->get('titulo'));
            $blog->setContenido($request->get('contenido'));
            $blog->setFecha($fecha);
            $blog->setImagen($nombreImagen);

            //Se realiza validación de errores
            $errors = $validator->validate($blog);
            if (count($errors) > 0) {
                return new JsonResponse(['estado' => false, 'respuesta' => 'Verifica los campos'], 400);
            }

            $entityManager->persist($blog);
            $entityManager->flush();

            return new JsonResponse(['estado' => true, 'respuesta' => 'Blog creado exitosamente'], 200);
        }
        catch(Exception $e){
            return new JsonResponse(['estado' => false, 'respuesta' => 'Ocurrió un error al intentar crear el blog'], 500);
        }
    }
}
