import {Component, OnInit} from '@angular/core';
//el siguiente import es para que funcione [routerLink] en el html
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import {ClubService} from "../services/club.service";
 
@Component({
    selector: 'default',
    templateUrl: 'app/view/default.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ClubService]
})

export class DefaultComponent { 
	public titulo = "Listado de Clubs";
	public clubs;
	public errorMessage;
	public status;
	public loading;
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
		this.loading = "show";
		this.getAllClubs();
	}

	getAllClubs(){

		this._route.params.subscribe(params => {
			let page = +params["page"];

			if(!page){
				page = 1;
			}

			this.loading = "show";
			this._clubService.getClubs(page).subscribe(
				response => {
					this.status = response.status;

					if(this.status != "success"){
						this.status = "error";
					}else{
						this.clubs = response.data;
						console.log(this.clubs);
						this.loading = "hide";

						/*Para la paginacion de los clubs*/
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

						if(page < (response.total_pages-1)){
							this.pageNext = (page + 1);
						}else{
							this.pageNext = page;
						}
						/*Fin para la paginacion de los clubs*/
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
		});
	}
}