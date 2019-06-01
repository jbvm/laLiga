"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var club_service_1 = require("../services/club.service");
var jugador_service_1 = require("../services/jugador.service");
var jugador_1 = require("../model/jugador");
var JugadorNewComponent = (function () {
    function JugadorNewComponent(_clubService, _jugadorService, _route, _router) {
        this._clubService = _clubService;
        this._jugadorService = _jugadorService;
        this._route = _route;
        this._router = _router;
        this.loading = 'show';
    }
    JugadorNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.jugador = new jugador_1.Jugador(1, "", null);
        this._route.params.subscribe(function (params) {
            _this.idClub = +params["idClub"];
            var page = +params["page"];
            if (!page) {
                page = 1;
            }
            _this.page = page;
            _this.getNombreClub(_this.idClub);
            _this.loading = "hide";
        });
    };
    JugadorNewComponent.prototype.getNombreClub = function (idClub) {
        var _this = this;
        this.loading = "show";
        this._clubService.getNombreClub(idClub).subscribe(function (response) {
            _this.statusNom = response.status;
            if (_this.statusNom != "success") {
                _this.statusNom = "error";
            }
            else {
                _this.nombreClub = response.data.nombre;
            }
        }, function (error) {
            _this.errorMessageNom = error;
            if (_this.errorMessageNom != null) {
                console.log(_this.errorMessageNom);
                alert("Error en la petición del nombre");
            }
        });
    };
    JugadorNewComponent.prototype.onSubmit = function () {
        var _this = this;
        this._jugadorService.create(this.jugador, this.idClub).subscribe(function (response) {
            _this.status = response.status;
            _this.jugadorCreado = response.jugadorCreado;
            if (_this.status != "success") {
                _this.status = "error";
                _this.loading = "show";
                _this._router.navigate(["/club/listarJugadores", _this.idClub, _this.page, _this.jugadorCreado]);
            }
            else {
                _this.jugadoresClub = response.data;
                console.log(_this.jugadoresClub);
                _this.loading = "hide";
                _this._router.navigate(["/club/listarJugadores", _this.idClub, _this.page, _this.jugadorCreado]);
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    JugadorNewComponent = __decorate([
        core_1.Component({
            selector: 'jugadores-new',
            templateUrl: 'app/view/jugador.new.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [club_service_1.ClubService, jugador_service_1.JugadorService]
        }), 
        __metadata('design:paramtypes', [club_service_1.ClubService, jugador_service_1.JugadorService, router_1.ActivatedRoute, router_1.Router])
    ], JugadorNewComponent);
    return JugadorNewComponent;
}());
exports.JugadorNewComponent = JugadorNewComponent;
//# sourceMappingURL=jugador.new.component.js.map