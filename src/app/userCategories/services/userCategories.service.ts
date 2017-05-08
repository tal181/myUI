import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Utils} from "../../utils/utils";
import {Category} from "../../models/category";
import {AlertService} from "../../login/services/alert.service";

@Injectable()
export class UserCategoriesService {
    private restPath = '/rest/userCategories';
    private host = 'http://localhost:8080';

    constructor(private http: Http,
                private alertService: AlertService) {
    }
    getUserCategories(loginName: string): Promise<Category[]> {
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
    saveUserCategories(categoreis: Category[], loginName: string){

        categoreis.map(a => a.loginName=loginName);

        let token = Utils.getUserTokenFromStorage();
        let headers = new Headers();
        headers.append('Authorization' , token);
        headers.append('Content-type', 'application/json');
        return this.http.post(this.host + this.restPath + '/' + loginName, categoreis, {headers : headers})
            .toPromise()
            .then(response =>
                this.alertService.success('saveUserCategories')
            )
            .catch(err => {
                console.log("Error : ", err);
            });

    }


}