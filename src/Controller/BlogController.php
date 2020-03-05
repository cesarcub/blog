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
use Symfony\Component\Filesystem\Filesystem;

class BlogController extends AbstractController
{
    /**
     * Método que selecciona todos los blogs
     * @Route("/blogs", name="blogs")
     */
    public function index()
    {
        $repository = $this->getDoctrine()->getRepository(Blog::class);
        $blogs = $repository->listarBlogUsuarios();
        return new JsonResponse(['estado' => true, 'blogs' => $blogs], 200);
    }

    /**
     * Método que trae un blog completo
     * @Route("/blog/{id}", name="verBlog")
     */
    public function verBlog($id){
        $repository = $this->getDoctrine()->getRepository(Blog::class);
        $blog = $repository->seleccionarBlog($id)[0];
        return new JsonResponse(['estado' => true, 'blog' => $blog], 200);
    }

    /**
     * Método que trae un blog completo
     * @Route("/usuario/blog/{id}", name="verBlog")
     */
    public function listarBlogsUsuario($id){
        $repository = $this->getDoctrine()->getRepository(Blog::class);
        $blog = $repository->seleccionarBlogsUsuario($id);
        return new JsonResponse(['estado' => true, 'blog' => $blog], 200);
    }

    /**
     * Método que crea blogs
     * @Route("/api/crear/blog", name="crearBlog")
     */
    public function crearBlog(
        Request $request,
        UserInterface $user,
        ValidatorInterface $validator
    ) {
        try {
            //Se captura la imagen del blog
            $file = $request->files->get('imagenBlog');
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
        } catch (Exception $e) {
            return new JsonResponse(['estado' => false, 'respuesta' => 'Ocurrió un error al intentar crear el blog'], 500);
        }
    }

    /**
     * Método que actualiza un blog existente
     * @Route("/api/actualizar/blog", name="actualizarBlog")
     */
    public function actualizarBlog(
        Request $request,
        ValidatorInterface $validator
    ) {
        try {
            $idBlog = $request->get('idBlog');

            $repository = $this->getDoctrine()->getRepository(Blog::class);
            $blog = $repository->find($idBlog);

            $entityManager = $this->getDoctrine()->getManager();

            //Se hace set de los nuevos atributos
            $blog->setTitulo($request->get('titulo'));
            $blog->setContenido($request->get('contenido'));
            
            //Se captura la imagen del blog del front
            $file = $request->files->get('imagenBlog');
            
            //Se sube imagen de blog, si esta existe
            if ($file) {
                $directorio = $this->getParameter('imagenBlog');
                $nombreImagen = $blog->getImagen();

                //Se elimina imagen anterior
                $fs = new Filesystem();
                $fs->remove("$directorio/$nombreImagen");
                
                $nombreImagen = md5(uniqid()) . '.' . $file->getClientOriginalExtension();
                $file->move($directorio, $nombreImagen);
                
                //Se actualiza nombre
                $blog->setImagen($nombreImagen);
            }

            //Se realiza validación de errores
            $errors = $validator->validate($blog);
            if (count($errors) > 0) {
                return new JsonResponse(['estado' => false, 'respuesta' => 'Verifica los campos'], 400);
            }

            $entityManager->flush();

            return new JsonResponse(['estado' => true, 'respuesta' => 'Blog actualizado exitosamente'], 200);
        } catch (Exception $e) {
            return new JsonResponse(['estado' => false, 'respuesta' => 'Ocurrió un error al intentar actualizar el blog'], 500);
        }
    }
}
