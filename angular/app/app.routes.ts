import { provideRouter, RouterConfig } from '@angular/router';

import { DefaultComponent } from "./components/default.component";
import { ClubDetailComponent } from "./components/club.detail.component";
import { JugadorNewComponent } from "./components/jugador.new.component";

export const routes: RouterConfig = [
	{
		path: '',
		redirectTo: '/index',
		terminal: true
	},
	{path: 'index', component: DefaultComponent},
	{path: 'index/:page', component: DefaultComponent},
	{path: 'club/crearJugador/:idClub', component: JugadorNewComponent},
	{path: 'club/crearJugador/:idClub/:page', component: JugadorNewComponent},
	{path: 'club/listarJugadores/:idClub', component: ClubDetailComponent},
	{path: 'club/listarJugadores/:idClub/:page', component: ClubDetailComponent},
	{path: 'club/listarJugadores/:idClub/:page/:jugadorCreado', component: ClubDetailComponent}	
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];