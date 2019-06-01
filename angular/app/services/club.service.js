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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var ClubService = (function () {
    function ClubService(_http) {
        this._http = _http;
        this.url = "http://localhost/laLiga/symfony3/web/app_dev.php";
    }
    ClubService.prototype.getClubs = function (page) {
        if (page === void 0) { page = null; }
        if (page == null) {
            page = 1;
        }
        return this._http.get(this.url + "/club/list?page=" + page).map(function (res) { return res.json(); });
    };
    ClubService.prototype.getClub = function (idEquipo, page) {
        if (page === void 0) { page = null; }
        if (idEquipo == null) {
            return this._http.get(this.url + "/club/list").map(function (res) { return res.json(); });
        }
        else {
            if (page == null) {
                page = 1;
            }
            return this._http.get(this.url + "/club/" + idEquipo + "?page=" + page).map(function (res) { return res.json(); });
        }
    };
    ClubService.prototype.getNombreClub = function (idEquipo) {
        return this._http.get(this.url + "/club/nombreClub/" + idEquipo).map(function (res) { return res.json(); });
    };
    ClubService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ClubService);
    return ClubService;
}());
exports.ClubService = ClubService;
//# sourceMappingURL=club.service.js.map