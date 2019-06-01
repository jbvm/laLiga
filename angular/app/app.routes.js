"use strict";
var router_1 = require('@angular/router');
var default_component_1 = require("./components/default.component");
var club_detail_component_1 = require("./components/club.detail.component");
var jugador_new_component_1 = require("./components/jugador.new.component");
exports.routes = [
    {
        path: '',
        redirectTo: '/index',
        terminal: true
    },
    { path: 'index', component: default_component_1.DefaultComponent },
    { path: 'index/:page', component: default_component_1.DefaultComponent },
    { path: 'club/crearJugador/:idClub', component: jugador_new_component_1.JugadorNewComponent },
    { path: 'club/crearJugador/:idClub/:page', component: jugador_new_component_1.JugadorNewComponent },
    { path: 'club/listarJugadores/:idClub', component: club_detail_component_1.ClubDetailComponent },
    { path: 'club/listarJugadores/:idClub/:page', component: club_detail_component_1.ClubDetailComponent },
    { path: 'club/listarJugadores/:idClub/:page/:jugadorCreado', component: club_detail_component_1.ClubDetailComponent }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map