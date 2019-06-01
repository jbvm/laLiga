<?php

namespace AppBundle\Repository;
use \Doctrine\ORM\Tools\Pagination\Paginator;

/**
 * Description of EquipoRepository
 *
 * @author jvaldi
 */
class ClubRepository extends \Doctrine\ORM\EntityRepository
{
	
	public function getEquipos($pageSize=5, $currentPage=1){		
		
		/*$em = $this->getEntityManager();
		
		$dql = "SELECT c FROM AppBundle\Entity\Club c ORDER BY c.identificador ASC";
		
		$query = $em->createQuery($dql)
				->setFirstResult($pageSize*($currentPage-1))
				->setMaxResults($pageSize);
		
		$paginator = new Paginator($query, $fetchJoinCollection = true);
		
		return $paginator;*/
		$em = $this->getEntityManager();
		$dql = "SELECT c FROM AppBundle:Club c ORDER BY c.identificador ASC";
		//creamos la consulta
		$query = $em->createQuery($dql);
		return $query;
	}
}
