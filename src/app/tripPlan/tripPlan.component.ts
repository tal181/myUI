import { Component, OnInit } from '@angular/core';
import {TripPlanService} from "./services/tripPlan.service";
import {Utils} from "../utils/utils";
import {User} from "../models/user";
import {UserTrip} from "../models/userTrip";
import { Router} from '@angular/router';

@Component({
    selector: 'tripPlan',
    moduleId: module.id,
    templateUrl: './tripPlan.html'
})

export class TripPlanComponent implements OnInit {

    user: User;
    budget : String;
    days : String;
    userTrips: UserTrip[];

    constructor(private   tripPlanService: TripPlanService,
                private   router: Router) {

        this.user = Utils.getUserFromStorage();
    }

    ngOnInit(): void {


    }

    navigateToCal(): void{
        this.router.navigate(['/cal']);
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
        let plan = new UserTrip();
        plan.loginName=this.user.loginName;
        plan.budget=this.budget;
        plan.days=this.days;
        this.tripPlanService.saveUserPlan(plan)
            .then(() => {
                //this.showSuccess("Saved user categories");
                this.navigateToCal();
            })
            .catch(() => {
               // this.showError("Failed to save user categories");
                console.log("You remembered to check for errors!");
            });
    }



}