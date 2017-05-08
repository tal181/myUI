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
var alert_service_1 = require("../../login/services/alert.service");
var UserCategoriesService = (function () {
    function UserCategoriesService(http, alertService) {
        this.http = http;
        this.alertService = alertService;
        this.restPath = '/rest/userCategories';
        this.host = 'http://localhost:8080';
    }
    UserCategoriesService.prototype.getUserCategories = function (loginName) {
        var token = utils_1.Utils.getUserTokenFromStorage();
        var headers = new http_1.Headers();
        headers.append('Authorization', token);
        return this.http.get(this.host + this.restPath + '/' + loginName, { headers: headers })
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(function (err) {
            console.log("Error : ", err);
        });
    };
    UserCategoriesService.prototype.saveUserCategories = function (categoreis, loginName) {
        var _this = this;
        categoreis.map(function (a) { return a.loginName = loginName; });
        var token = utils_1.Utils.getUserTokenFromStorage();
        var headers = new http_1.Headers();
        headers.append('Authorization', token);
        headers.append('Content-type', 'application/json');
        return this.http.post(this.host + this.restPath + '/' + loginName, categoreis, { headers: headers })
            .toPromise()
            .then(function (response) {
            return _this.alertService.success('saveUserCategories');
        })
            .catch(function (err) {
            console.log("Error : ", err);
        });
    };
    return UserCategoriesService;
}());
UserCategoriesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        alert_service_1.AlertService])
], UserCategoriesService);
exports.UserCategoriesService = UserCategoriesService;
//# sourceMappingURL=userCategories.service.js.map