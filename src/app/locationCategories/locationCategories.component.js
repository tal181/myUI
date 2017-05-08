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
var locationCategories_service_1 = require("./services/locationCategories.service");
require("rxjs/add/operator/toPromise");
var allCategories_service_1 = require("../allCategories/services/allCategories.service");
var countriess_service_1 = require("../countries/services/countriess.service");
var alert_service_1 = require("../login/services/alert.service");
var LocationCategoriesComponent = (function () {
    function LocationCategoriesComponent(locationCategoriesService, allCategoriesService, countriesService, alertService) {
        this.locationCategoriesService = locationCategoriesService;
        this.allCategoriesService = allCategoriesService;
        this.countriesService = countriesService;
        this.alertService = alertService;
    }
    LocationCategoriesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.allCategoriesService.getAllCategories()
            .then(function (allCategories) {
            _this.allCategories = allCategories;
        })
            .catch(function () {
            console.log("You remembered to check for errors!");
        });
        this.countriesService.getAllCountries()
            .then(function (countries) {
            var contiresArrayKeys = Object.keys(countries);
            _this.contiresArray = _this.createArray(contiresArrayKeys);
            _this.countrySelectedValue = _this.contiresArray[0];
            _this.countriesMap = countries;
        })
            .catch(function () {
            console.log("You remembered to check for errors!");
        });
        this.locationCats = new Array();
    };
    LocationCategoriesComponent.prototype.createArray = function (array) {
        var newArray = [];
        for (var index = 0; index < array.length; index++) {
            var ele = { label: array[index], value: { id: array[index], name: array[index] } };
            newArray.push(ele);
        }
        return newArray;
    };
    LocationCategoriesComponent.prototype.onCountryChange = function () {
        var citiesSelectedKeys = this.countriesMap[this.countrySelectedValue.id];
        this.citiesSelectedArray = this.createArray(citiesSelectedKeys);
        this.citiesSelectedValue = this.citiesSelectedArray[0];
    };
    LocationCategoriesComponent.prototype.onCityChange = function () {
        var _this = this;
        this.locationCategoriesService.getLocationCategories(this.citiesSelectedValue.id)
            .then(function (locationCats) {
            _this.locationCats = locationCats;
        })
            .catch(function () {
            console.log("You remembered to check for errors!");
        });
    };
    LocationCategoriesComponent.prototype.saveChanges = function () {
        this.alertService.success('saveUserCategories');
    };
    return LocationCategoriesComponent;
}());
LocationCategoriesComponent = __decorate([
    core_1.Component({
        selector: 'locationPref',
        moduleId: module.id,
        templateUrl: './locationCategories.component.html'
    }),
    __metadata("design:paramtypes", [locationCategories_service_1.LocationCategoriesService,
        allCategories_service_1.AllCategoriesService,
        countriess_service_1.CountriesService,
        alert_service_1.AlertService])
], LocationCategoriesComponent);
exports.LocationCategoriesComponent = LocationCategoriesComponent;
//# sourceMappingURL=locationCategories.component.js.map