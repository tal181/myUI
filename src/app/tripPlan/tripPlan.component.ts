import { Component, OnInit } from '@angular/core';
import {TripPlanService} from "./services/tripPlan.service";
import {Utils} from "../utils/utils";
import {User} from "../models/user";
import {UserTrip} from "../models/userTrip";
import { Router} from '@angular/router';
import {Category} from "../models/category";
import {ComputeService} from "../compute/services/compute.service";

@Component({
    selector: 'tripPlan',
    moduleId: module.id,
    templateUrl: './tripPlan.html'
})

export class TripPlanComponent implements OnInit {

    user: User;
    budget : string;
    days : string;
    userTrips: UserTrip[];
   numberOfLocations: number;
    comutedArray: Category[];

    constructor(private   tripPlanService: TripPlanService,
                private computeService:ComputeService,
                private   router: Router) {

        this.user = Utils.getUserFromStorage();
    }

    ngOnInit(): void {
        this.numberOfLocations=3;

    }

    compute(): void {

        this.computeService.compute(this.user.loginName, this.numberOfLocations)
            .then((ans: Category[]) => {
                this.comutedArray = ans;
            })
            .catch((error) => {
                console.log("You remembered to check for errors!" + error);
            });


    }

    navigateToCal(location: string): void{
        this.router.navigate(['/cal'], { queryParams: { location: location }});
    }
    getUserTrips(): void{
        this.tripPlanService.getUserPlan(this.user.loginName)
            .then((userTrips) => {
                this.userTrips  = userTrips;
            })
            .catch(() => {
                console.log('You remembered to check for errors!');
            });
    }

    saveChanges(): void {
        let plan = new UserTrip(this.user.loginName);
        plan.budget=this.budget;
        plan.days=this.days;
        this.tripPlanService.saveUserPlan(plan)
            .then(() => {
                //this.showSuccess("Saved user categories");
                this.compute();
            })
            .catch(() => {
               // this.showError("Failed to save user categories");
                console.log("You remembered to check for errors!");
            });
    }



}