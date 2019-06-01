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
var ClubDetailComponent = (function () {
    /*fin propiedades para la paginacion*/
    function ClubDetailComponent(_clubService, _route, _router) {
        this._clubService = _clubService;
        this._route = _route;
        this._router = _router;
        this.loading = 'show';
        this.pagePrev = 1;
        this.pageNext = 1;
    }
    ClubDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        //recoger parametros de la url
        this._route.params.subscribe(function (params) {
            _this.idClub = +params["idClub"];
            var page = +params["page"];
            if (!page) {
                page = 1;
            }
            _this.page = page;
            _this.jugadorCreado = +params["jugadorCreado"];
            ;
            _this.loading = "show";
            _this.getJugadoresClub(page);
        });
    };
    ClubDetailComponent.prototype.getJugadoresClub = function (page) {
        var _this = this;
        this._clubService.getClub(this.idClub, page).subscribe(function (response) {
            _this.status = response.status;
            console.log(response);
            if (_this.status != "success" || response.total_items_count == 0) {
                _this._router.navigate(["/index"]);
            }
            else {
                if (page > response.total_pages) {
                    _this._router.navigate(["/index"]);
                    _this._router.navigate(["/club/listarJugadores", _this.idClub, response.total_pages]);
                }
                else {
                    _this.jugadoresClub = response.data;
                    _this.nombreClub = response.data[0].idClub.nombre;
                    _this.loading = 'hide';
                    /*Para la paginacion de los jugadores*/
                    _this.pages = [];
                    for (var i = 0; i < response.total_pages; i++) {
                        //push añade un nuevo elemento en el array
                        _this.pages.push(i);
                    }
                    if (page >= 2) {
                        _this.pagePrev = (page - 1);
                    }
                    else {
                        _this.pagePrev = page;
                    }
                    if (page < response.total_pages || page == 1) {
                        _this.pageNext = (page + 1);
                    }
                    else {
                        _this.pageNext = page;
                    }
                }
            }
        }, function (error) {
            _this.errorMessage = error;
            if (_this.errorMessage != null) {
                console.log(_this.errorMessage);
                alert("Error en la petición");
            }
        });
    };
    ClubDetailComponent = __decorate([
        core_1.Component({
            selector: 'jugadores-club',
            templateUrl: 'app/view/club.detail.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [club_service_1.ClubService]
        }), 
        __metadata('design:paramtypes', [club_service_1.ClubService, router_1.ActivatedRoute, router_1.Router])
    ], ClubDetailComponent);
    return ClubDetailComponent;
}());
exports.ClubDetailComponent = ClubDetailComponent;
//# sourceMappingURL=club.detail.component.js.map