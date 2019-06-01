<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;
use AppBundle\Entity\Club;
use AppBundle\Entity\Jugador;

//para devolver un hash como json
use Symfony\Component\HttpFoundation\JsonResponse;


/**
 * Description of EquipoController
 *
 * @author Jorge Valdivieso
 */
class ClubController extends Controller {
	
	public function indexAction(Request $request) {		
		$helpers = $this->get("app.helpers");
		$em = $this->getDoctrine()->getManager();
		//consulta DQL
		$dql = "SELECT c FROM AppBundle:Club c ORDER BY c.nombre ASC";
		//creamos la consulta
		$query = $em->createQuery($dql);
		
		//recogemos el parametro get page, por defecto que nos lleve a la pagina 1
		$page = $request->query->getInt("page", 1);
		
		
		//Cargamos el servicio del paginador
		$paginator = $this->get("knp_paginator");
		//Numero de items por pagina (10 equipos en cada pagina)
		$items_per_page = 10;
		//lanzamos la paginacion
		$pagination = $paginator->paginate($query, $page, $items_per_page);
		//numero total de videos a mostrar
		$total_items_count = $pagination->getTotalItemCount();
		
		//Generamos array con todos los datos
		$data = array(
			"status" => "success",
			"total_items_count" => $total_items_count,
			"page_actual" => $page,
			"items_per_page" => $items_per_page,
			"total_pages" => ceil($total_items_count / $items_per_page),
			"data" => $pagination
		);
		
		return $helpers->getJson($data);
	}
	
	public function jugadoresAction(Request $request, $idEquipo) {
		$helpers = $this->get("app.helpers");
		$em = $this->getDoctrine()->getManager();
		
		//consulta DQL
		$dql = "SELECT j FROM AppBundle:Jugador j "
				. " WHERE j.idClub = $idEquipo ORDER BY j.nombre ASC";
		//creamos la consulta
		$query = $em->createQuery($dql);
		//recogemos el parametro get page, por defecto que nos lleve a la pagina 1
		$page = $request->query->getInt("page", 1);		
		
		//Cargamos el servicio del paginador
		$paginator = $this->get("knp_paginator");
		//Numero de items por pagina (10 equipos en cada pagina)
		$items_per_page = 10;
		//lanzamos la paginacion
		$pagination = $paginator->paginate($query, $page, $items_per_page);
		//numero total de jugadores a mostrar
		$total_items_count = $pagination->getTotalItemCount();
		$totalPages = ceil($total_items_count / $items_per_page);

		//Generamos array con todos los datos
		$data = array(
			"status" => "success",
			"total_items_count" => $total_items_count,
			"page_actual" => $page,
			"items_per_page" => $items_per_page,
			"total_pages" => $totalPages,
			"data" => $pagination
		);
		
		return $helpers->getJson($data);
	}
	

	public function nombreClubAction(Request $request, $idEquipo) {		
		$helpers = $this->get("app.helpers");
		$em = $this->getDoctrine()->getManager();
			
		//consulta DQL
		$dql = "SELECT c.nombre FROM AppBundle:Club c "
				. " WHERE c.identificador = $idEquipo";
		//creamos la consulta
		$query = $em->createQuery($dql);
			
		$nombre = $query->getResult();
		//Generamos array con todos los datos
		$data = array(
			"status" => "success",
			"data" => $nombre[0]
		);
		
		return $helpers->getJson($data);
	}


	public function addJugadorAction(Request $request, $idEquipo) {		
		$helpers = $this->get("app.helpers");

		$json = $request->get("json",null);
		$params = json_decode($json);
		
		if($json != null && $idEquipo != null){
			$nombre = (isset($params->nombre)) ? $params->nombre : null;
			$dorsal = (isset($params->dorsal)) ? $params->dorsal : null;
			
			if($nombre != null){
				$em = $this->getDoctrine()->getManager();
				
				//Comprobamos que existe el equipo
				$club = $em->getRepository("AppBundle:Club")->findOneBy(
							array(
								"identificador" => $idEquipo
							));			
				//print_r($club);die();
				$jugador = new Jugador();
				$jugador->setNombre($nombre);
				$jugador->setDorsal($dorsal);
				$jugador->setIdClub($club);

				$em->persist($jugador);
				$em->flush();
				//obtenemos el objeto club con el nuevo jugador
				$dql = "SELECT j FROM AppBundle:Jugador j "
				. " WHERE j.idClub = $idEquipo ORDER BY j.nombre ASC";
				//creamos la consulta
				$query = $em->createQuery($dql);

				//recogemos el parametro get page, por defecto que nos lleve a la pagina 1
				$page = $request->query->getInt("page", 1);		

				//Cargamos el servicio del paginador
				$paginator = $this->get("knp_paginator");
				//Numero de items por pagina (10 equipos en cada pagina)
				$items_per_page = 10;
				//lanzamos la paginacion
				$pagination = $paginator->paginate($query, $page, $items_per_page);
				//numero total de videos a mostrar
				$total_items_count = $pagination->getTotalItemCount();

				//Generamos array con todos los datos
				$data = array(
					"status" => "success",
					"jugadorCreado" => 1,
					"total_items_count" => $total_items_count,
					"page_actual" => $page,
					"items_per_page" => $items_per_page,
					"total_pages" => ceil($total_items_count / $items_per_page),
					"data" => $pagination
				);
			}else{
				$data = array(
					"status" => "error",
					"jugadorCreado" => 0,
					"code" => 400,
					"msg" => "Jugador not created"
				);
			}

			
		}else{
			$data = array(
				"status" => "error",
				"jugadorCreado" => 0,
				"code" => 400,
				"msg" => "Jugador not created",
				"data" => $request
			);
		}
		return $helpers->getJson($data);
	}
}
