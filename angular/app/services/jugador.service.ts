import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

@Injectable()
export class JugadorService{
	public url = "http://localhost/laLiga/symfony3/web/app_dev.php";

	constructor(private _http: Http){}

	create(jugador,idEquipo){
		let json = JSON.stringify(jugador);
		let params = "json="+json+"&idEquipo="+idEquipo;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+"/club/crear-jugador/"+idEquipo, params, {headers: headers})
			.map(res => res.json());
	}
}

