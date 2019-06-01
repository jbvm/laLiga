import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from "@angular/router";
import {ClubService} from "../services/club.service";

@Component({
    selector: 'jugadores-club',
    templateUrl: 'app/view/club.detail.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ClubService]
})

export class ClubDetailComponent implements OnInit{
	public errorMessage;
	public jugadoresClub;
	public status;
	public idClub;
	public nombreClub;
	public loading = 'show';
	public page;
	public jugadorCreado;

	/*propiedades para la paginacion*/
	public pages;
	public pagePrev = 1;
	public pageNext = 1;
	/*fin propiedades para la paginacion*/

	constructor(
		private _clubService: ClubService,
		private _route: ActivatedRoute,
		private _router: Router
	){}

	ngOnInit(){
		//recoger parametros de la url
		this._route.params.subscribe(params => {
			this.idClub = +params["idClub"];
			let page = +params["page"];

			if(!page){
				page = 1;
			}
			this.page = page;

			this.jugadorCreado = +params["jugadorCreado"];;

			this.loading = "show";

			this.getJugadoresClub(page);
		});
				
	}

	getJugadoresClub(page){	
		this._clubService.getClub(this.idClub, page).subscribe(
				response => {
					this.status = response.status;
					console.log(response);
					
					if(this.status != "success" || response.total_items_count == 0){
						this._router.navigate(["/index"]);
					}else{
						if(page > response.total_pages){
							this._router.navigate(["/index"]);
							this._router.navigate(["/club/listarJugadores", this.idClub, response.total_pages]);
						} else {

							this.jugadoresClub = response.data;
							
							this.nombreClub = response.data[0].idClub.nombre;										

							this.loading = 'hide';

							/*Para la paginacion de los jugadores*/
							this.pages = [];
							for(let i = 0; i < response.total_pages; i++){
								//push añade un nuevo elemento en el array
								this.pages.push(i);
							}

							if(page >= 2){
								this.pagePrev = (page - 1);
							}else{
								this.pagePrev = page;
							}

							if(page < response.total_pages || page == 1){
								this.pageNext = (page + 1);
							}else{
								this.pageNext = page;
							}
							/*Fin para la paginacion de los clubs*/
						}
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