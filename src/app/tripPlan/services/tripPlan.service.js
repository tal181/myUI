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
var TripPlanService = (function () {
    function TripPlanService(http, alertService) {
        this.http = http;
        this.alertService = alertService;
        this.restPath = '/rest/tripPlan';
        this.host = 'http://localhost:8080';
    }
    TripPlanService.prototype.getUserPlan = function (loginName) {
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
    TripPlanService.prototype.saveUserPlan = function (userTrip) {
        var _this = this;
        var token = utils_1.Utils.getUserTokenFromStorage();
        var headers = new http_1.Headers();
        headers.append('Authorization', token);
        headers.append('Content-type', 'application/json');
        return this.http.post(this.host + this.restPath, userTrip, { headers: headers })
            .toPromise()
            .then(function (response) {
            return _this.alertService.success('saveUserPlan');
        })
            .catch(function (err) {
            console.log("Error : ", err);
        });
    };
    return TripPlanService;
}());
TripPlanService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        alert_service_1.AlertService])
], TripPlanService);
exports.TripPlanService = TripPlanService;
//# sourceMappingURL=tripPlan.service.js.map