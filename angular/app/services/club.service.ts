import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ClubService{
	public url = "http://localhost/laLiga/symfony3/web/app_dev.php";

	constructor(private _http: Http){}

	getClubs(page = null){
		if(page == null){
			page = 1;
		}
		return this._http.get(this.url+"/club/list?page="+page).map(res => res.json());
	}

	getClub(idEquipo, page = null){
		if(idEquipo == null){
			return this._http.get(this.url+"/club/list").map(res => res.json());
		} else {
			if(page == null){
				page = 1;
			}
			return this._http.get(this.url+"/club/"+idEquipo+"?page="+page).map(res => res.json());
		}
	}

	getNombreClub(idEquipo){
		return this._http.get(this.url+"/club/nombreClub/"+idEquipo).map(res => res.json());
	}
}