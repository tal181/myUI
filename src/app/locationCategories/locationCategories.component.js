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
var cities_service_1 = require("../cities/services/cities.service");
var LocationCategoriesComponent = (function () {
    function LocationCategoriesComponent(locationCategoriesService, allCategoriesService, countriesService, alertService, citiesService) {
        this.locationCategoriesService = locationCategoriesService;
        this.allCategoriesService = allCategoriesService;
        this.countriesService = countriesService;
        this.alertService = alertService;
        this.citiesService = citiesService;
        this.contiresArray = [];
        this.allCities = [];
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
            _this.contiresArray = _this.createCountriesArray(countries);
            //this.contiresArray.push({label:'New York', value:{id:'12f', name: 'New York'}});
            // this.contiresArray.push({label:'Rome', value:{id:'123f', name: 'Rome'}});
        })
            .catch(function () {
            console.log("You remembered to check for errors!");
        });
        this.locationCats = new Array();
    };
    LocationCategoriesComponent.prototype.createCountriesArray = function (countries) {
        var newArray = [];
        for (var index = 0; index < countries.length; index++) {
            var ele = { label: countries[index].countryName, value: { id: countries[index].countryId } };
            newArray.push(ele);
        }
        return newArray;
    };
    LocationCategoriesComponent.prototype.createCitiesArray = function (cities) {
        var newArray = [];
        for (var index = 0; index < cities.length; index++) {
            var ele = { label: cities[index].locationName, value: { id: cities[index].locationId } };
            newArray.push(ele);
        }
        return newArray;
    };
    LocationCategoriesComponent.prototype.getCities = function (countryId) {
        var _this = this;
        this.citiesService.getAllCitiesByCountryId(countryId)
            .then(function (allCities) {
            _this.citiesSelectedArray = _this.createCitiesArray(allCities);
            _this.citiesSelectedValue = _this.citiesSelectedArray[0];
        })
            .catch(function () {
            console.log("You remembered to check for errors!");
        });
    };
    LocationCategoriesComponent.prototype.onCountryChange = function () {
        var countryId = this.countrySelectedValue.id;
        this.getCities(countryId);
    };
    LocationCategoriesComponent.prototype.onCityChange = function () {
        // this.countriesService.getAllCitiesByCountryId()
        //     .then((countries: any) => {
        //         this.contiresArray = countries;
        //     })
        //     .catch(() => {
        //         console.log("You remembered to check for errors!");
        //     });
        //
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
        alert_service_1.AlertService,
        cities_service_1.CitiesService])
], LocationCategoriesComponent);
exports.LocationCategoriesComponent = LocationCategoriesComponent;
//# sourceMappingURL=locationCategories.component.js.map