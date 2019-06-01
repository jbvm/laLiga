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
var core_1 = require('@angular/core');
//el siguiente import es para que funcione [routerLink] en el html
var router_1 = require("@angular/router");
var club_service_1 = require("../services/club.service");
var DefaultComponent = (function () {
    /*fin propiedades para la paginacion*/
    function DefaultComponent(_clubService, _route, _router) {
        this._clubService = _clubService;
        this._route = _route;
        this._router = _router;
        this.titulo = "Listado de Clubs";
        this.pagePrev = 1;
        this.pageNext = 1;
    }
    DefaultComponent.prototype.ngOnInit = function () {
        this.loading = "show";
        this.getAllClubs();
    };
    DefaultComponent.prototype.getAllClubs = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var page = +params["page"];
            if (!page) {
                page = 1;
            }
            _this.loading = "show";
            _this._clubService.getClubs(page).subscribe(function (response) {
                _this.status = response.status;
                if (_this.status != "success") {
                    _this.status = "error";
                }
                else {
                    _this.clubs = response.data;
                    console.log(_this.clubs);
                    _this.loading = "hide";
                    /*Para la paginacion de los clubs*/
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
                    if (page < (response.total_pages - 1)) {
                        _this.pageNext = (page + 1);
                    }
                    else {
                        _this.pageNext = page;
                    }
                }
            }, function (error) {
                _this.errorMessage = error;
                if (_this.errorMessage != null) {
                    console.log(_this.errorMessage);
                    alert("Error en la petición");
                }
            });
        });
    };
    DefaultComponent = __decorate([
        core_1.Component({
            selector: 'default',
            templateUrl: 'app/view/default.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [club_service_1.ClubService]
        }), 
        __metadata('design:paramtypes', [club_service_1.ClubService, router_1.ActivatedRoute, router_1.Router])
    ], DefaultComponent);
    return DefaultComponent;
}());
exports.DefaultComponent = DefaultComponent;
//# sourceMappingURL=default.component.js.map