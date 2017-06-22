import { Component, OnInit } from '@angular/core';
import {LocationCategoriesService} from "./services/locationCategories.service";
import {Utils} from "../utils/utils";
import {Category} from "../models/category";
import 'rxjs/add/operator/toPromise';
import {AllCategoriesService} from "../allCategories/services/allCategories.service";
import {CountriesService} from "../countries/services/countriess.service";
import {AlertService} from "../login/services/alert.service";
import {CitiesService} from "../cities/services/cities.service";

@Component({
    selector:'locationPref',
    moduleId: module.id,
    templateUrl: './locationCategories.component.html'
})

export class LocationCategoriesComponent implements OnInit {
    categories: Category[];
    allCategories: Category[];
    contiresArray: any;
    allCities: any;
    countriesMap: any;
    citiesSelectedValue: any;
    citiesSelectedArray: any;
    countrySelectedValue: any;
    locationCats: Category[];
    constructor(
        private locationCategoriesService: LocationCategoriesService,
        private allCategoriesService: AllCategoriesService,
        private countriesService: CountriesService,
        private alertService: AlertService,
        private citiesService: CitiesService) {
        this.contiresArray = [];
        this.allCities = [];
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
                this.contiresArray=this.createCountriesArray(countries);


                //this.contiresArray.push({label:'New York', value:{id:'12f', name: 'New York'}});
               // this.contiresArray.push({label:'Rome', value:{id:'123f', name: 'Rome'}});
            })
            .catch(() => {
                console.log("You remembered to check for errors!");
            });
        this.locationCats = new Array<Category>();
    }
    createCountriesArray(countries: any): any{
        let newArray=[];
        for(let index=0;index<countries.length;index++){
            let ele= {label: countries[index].countryName, value: {id: countries[index].countryId}};
            newArray.push(ele);
        }
        return newArray;
    }
    createCitiesArray(cities: any): any{
        let newArray=[];
        for(let index=0;index<cities.length;index++){
            let ele= {label: cities[index].locationName, value: {id: cities[index].locationId}};
            newArray.push(ele);
        }
        return newArray;
    }

    getCities(countryId: string){
        this.citiesService.getAllCitiesByCountryId(countryId)
            .then((allCities) => {
                this.citiesSelectedArray = this.createCitiesArray(allCities);
                this.citiesSelectedValue = this.citiesSelectedArray[0];
            })
            .catch(() => {
                console.log("You remembered to check for errors!");
            });
    }
    onCountryChange(): void{
        let countryId = this.countrySelectedValue.id;
        this.getCities(countryId);
    }
    onCityChange(): void {

        // this.countriesService.getAllCitiesByCountryId()
        //     .then((countries: any) => {
        //         this.contiresArray = countries;
        //     })
        //     .catch(() => {
        //         console.log("You remembered to check for errors!");
        //     });
        //

        this.locationCategoriesService.getLocationCategories(this.citiesSelectedValue.id)
            .then((locationCats) => {
              this.locationCats=locationCats;
            })
            .catch(() => {
                console.log("You remembered to check for errors!");
            });
    }
    // saveChanges():void {
    //     this.alertService.success('saveUserCategories')
    // }
}