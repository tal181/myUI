import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Utils} from "../../utils/utils";
import {Category} from "../../models/category";
import {AlertService} from "../../login/services/alert.service";
import {UserTrip} from "../../models/userTrip";

@Injectable()
export class TripPlanService {
    private restPath = '/rest/tripPlan';
    private host = 'http://localhost:8080';

    constructor(private http: Http,
                private alertService: AlertService) {
    }
    getUserPlan(loginName: string): Promise<UserTrip[]> {
        let token = Utils.getUserTokenFromStorage();
        let headers = new Headers();
        headers.append('Authorization' , token);
        return this.http.get(this.host + this.restPath + '/' + loginName, {headers : headers})
            .toPromise()
            .then(response =>
                response.json()
            )
            .catch(err => {
                console.log("Error : ", err);
            });
    }
    saveUserPlan(userTrip: UserTrip){

        let token = Utils.getUserTokenFromStorage();
        let headers = new Headers();
        headers.append('Authorization' , token);
        headers.append('Content-type', 'application/json');
        return this.http.post(this.host + this.restPath, userTrip, {headers : headers})
            .toPromise()
            .then(response =>
                this.alertService.success('saveUserPlan')
            )
            .catch(err => {
                console.log("Error : ", err);
            });

    }


}