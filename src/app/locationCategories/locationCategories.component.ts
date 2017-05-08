import { Component, OnInit } from '@angular/core';
import {LocationCategoriesService} from "./services/locationCategories.service";
import {Utils} from "../utils/utils";
import {Category} from "../models/category";
import 'rxjs/add/operator/toPromise';
import {AllCategoriesService} from "../allCategories/services/allCategories.service";
import {CountriesService} from "../countries/services/countriess.service";
import {AlertService} from "../login/services/alert.service";

@Component({
    selector:'locationPref',
    moduleId: module.id,
    templateUrl: './locationCategories.component.html'
})

export class LocationCategoriesComponent implements OnInit {
    categories: Category[];
    allCategories: Category[];
    contiresArray: any;
    selectedValue: any;
    countriesMap: any;
    citiesSelectedValue: any;
    citiesSelectedArray: any;
    countrySelectedValue: any;
    locationCats: Category[];
    constructor(
        private locationCategoriesService: LocationCategoriesService,
        private allCategoriesService: AllCategoriesService,
        private countriesService: CountriesService,
        private alertService: AlertService) {
    }
    ngOnInit(): void {
        this.allCategoriesService.getAllCategories()
            .then((allCategories) => {
                this.allCategories = allCategories;
            })
            .catch(() => {
                console.log("You remembered to check for errors!");
            });

        this.countriesService.getAllCountries()
            .then((countries: any) => {
                let contiresArrayKeys = Object.keys(countries);
                this.contiresArray = this.createArray(contiresArrayKeys);
                this.countrySelectedValue = this.contiresArray[0];
                this.countriesMap = countries;
            })
            .catch(() => {
                console.log("You remembered to check for errors!");
            });
        this.locationCats = new Array<Category>();
    }
    createArray(array: any): any{
        let newArray=[];
        for(let index=0;index<array.length;index++){
            let ele= {label: array[index], value: {id: array[index], name: array[index]}};
            newArray.push(ele);
        }
        return newArray;
    }
    onCountryChange(): void{
        let citiesSelectedKeys = this.countriesMap[ this.countrySelectedValue.id];
        this.citiesSelectedArray = this.createArray(citiesSelectedKeys);
        this.citiesSelectedValue = this.citiesSelectedArray[0];
    }
    onCityChange(): void{
        this.locationCategoriesService.getLocationCategories(this.citiesSelectedValue.id)
            .then((locationCats) => {
              this.locationCats=locationCats;
            })
            .catch(() => {
                console.log("You remembered to check for errors!");
            });
    }
    saveChanges():void {
        this.alertService.success('saveUserCategories')
    }
}