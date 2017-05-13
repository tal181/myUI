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
var tripPlan_service_1 = require("./services/tripPlan.service");
var utils_1 = require("../utils/utils");
var userTrip_1 = require("../models/userTrip");
var router_1 = require("@angular/router");
var TripPlanComponent = (function () {
    function TripPlanComponent(tripPlanService, router) {
        this.tripPlanService = tripPlanService;
        this.router = router;
        this.user = utils_1.Utils.getUserFromStorage();
    }
    TripPlanComponent.prototype.ngOnInit = function () {
    };
    TripPlanComponent.prototype.navigateToCal = function () {
        this.router.navigate(['/cal']);
    };
    TripPlanComponent.prototype.getUserTrips = function () {
        var _this = this;
        this.tripPlanService.getUserPlan(this.user.loginName)
            .then(function (userTrips) {
            _this.userTrips = userTrips;
        })
            .catch(function () {
            console.log('You remembered to check for errors!');
        });
    };
    TripPlanComponent.prototype.saveChanges = function () {
        var _this = this;
        var plan = new userTrip_1.UserTrip();
        plan.loginName = this.user.loginName;
        plan.budget = this.budget;
        plan.days = this.days;
        this.tripPlanService.saveUserPlan(plan)
            .then(function () {
            //this.showSuccess("Saved user categories");
            _this.navigateToCal();
        })
            .catch(function () {
            // this.showError("Failed to save user categories");
            console.log("You remembered to check for errors!");
        });
    };
    return TripPlanComponent;
}());
TripPlanComponent = __decorate([
    core_1.Component({
        selector: 'tripPlan',
        moduleId: module.id,
        templateUrl: './tripPlan.html'
    }),
    __metadata("design:paramtypes", [tripPlan_service_1.TripPlanService,
        router_1.Router])
], TripPlanComponent);
exports.TripPlanComponent = TripPlanComponent;
//# sourceMappingURL=tripPlan.component.js.map