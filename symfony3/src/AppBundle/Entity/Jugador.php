<?php

namespace AppBundle\Entity;

/**
 * Jugadores
 */
class Jugador
{
    /**
     * @var integer
     */
    private $identificador;

    /**
     * @var string
     */
    private $nombre;

    /**
     * @var integer
     */
    private $dorsal;

    /**
     * @var \AppBundle\Entity\Club
     */
    private $idClub;


    /**
     * Get identificador
     *
     * @return integer
     */
    public function getIdentificador()
    {
        return $this->identificador;
    }

    /**
     * Set nombre
     *
     * @param string $nombre
     *
     * @return Jugadores
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get nombre
     *
     * @return string
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set dorsal
     *
     * @param integer $dorsal
     *
     * @return Jugadores
     */
    public function setDorsal($dorsal)
    {
        $this->dorsal = $dorsal;

        return $this;
    }

    /**
     * Get dorsal
     *
     * @return integer
     */
    public function getDorsal()
    {
        return $this->dorsal;
    }

    /**
     * Set idClub
     *
     * @param \AppBundle\Entity\Club $idClub
     *
     * @return Jugadores
     */
    public function setIdClub(\AppBundle\Entity\Club $idClub = null)
    {
        $this->idClub = $idClub;

        return $this;
    }

    /**
     * Get idClub
     *
     * @return \AppBundle\Entity\Club
     */
    public function getIdClub()
    {
        return $this->idClub;
    }
}

