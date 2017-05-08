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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var utils_1 = require("../../utils/utils");
var AllCategoriesService = (function () {
    function AllCategoriesService(http) {
        this.http = http;
        this.restPath = '/rest/categories';
        this.host = 'http://localhost:8080';
    }
    AllCategoriesService.prototype.getAllCategories = function () {
        var token = utils_1.Utils.getUserTokenFromStorage();
        var headers = new http_1.Headers();
        headers.append('Authorization', token);
        return this.http.get(this.host + this.restPath, { headers: headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(function (err) {
            console.log("Error : ", err);
        });
    };
    return AllCategoriesService;
}());
AllCategoriesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AllCategoriesService);
exports.AllCategoriesService = AllCategoriesService;
//# sourceMappingURL=allCategories.service.js.map