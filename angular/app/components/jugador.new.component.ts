import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from "@angular/router";

import {ClubService} from "../services/club.service";
import {JugadorService} from "../services/jugador.service";

import {Jugador} from "../model/jugador";

@Component({
    selector: 'jugadores-new',
    templateUrl: 'app/view/jugador.new.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ClubService, JugadorService]
})

export class JugadorNewComponent implements OnInit{
	public errorMessage;

	public errorMessageNom;
	
	public status;
	public statusNom;

	public loading = 'show';

	public jugador: Jugador;

	public jugadoresClub;

	public idClub;
	public nombreClub;
	public jugadorCreado;

	public page;

	constructor(
		private _clubService: ClubService,
		private _jugadorService: JugadorService,
		private _route: ActivatedRoute,
		private _router: Router
	){}

	ngOnInit(){
		this.jugador = new Jugador(1,"",null);	
		this._route.params.subscribe(params => {
			this.idClub = +params["idClub"];

			let page = +params["page"];

			if(!page){
				page = 1;
			}
			this.page = page;

			this.getNombreClub(this.idClub);
			this.loading = "hide";
			
		});
	}

	getNombreClub(idClub){
		this.loading = "show";
		this._clubService.getNombreClub(idClub).subscribe(
						
			response => {			
				this.statusNom = response.status;
				if(this.statusNom != "success"){
					this.statusNom = "error";
				}else{					
					this.nombreClub = response.data.nombre;
				}				
			},

			error => {
				this.errorMessageNom = <any>error;

				if(this.errorMessageNom != null){
					console.log(this.errorMessageNom);
					alert("Error en la petición del nombre");
				}
			}
		);
	}

	onSubmit(){
		this._jugadorService.create(this.jugador, this.idClub).subscribe(			
			response => {
				this.status = response.status;
				this.jugadorCreado = response.jugadorCreado;
				if(this.status != "success"){
					this.status = "error";
					this.loading = "show";
					this._router.navigate(["/club/listarJugadores", this.idClub, this.page, this.jugadorCreado]);
				}else{
					this.jugadoresClub = response.data;
					console.log(this.jugadoresClub);
					this.loading = "hide";

					this._router.navigate(["/club/listarJugadores", this.idClub, this.page, this.jugadorCreado]);
				}
			},

			error => {
				this.errorMessage = <any>error;

				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert("Error en la petición");
				}
			}
		);
	}
}