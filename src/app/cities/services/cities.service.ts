import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Utils} from "../../utils/utils";
import {Category} from "../../models/category";

@Injectable()
export class CitiesService {
    private restPath = '/rest/city';
    private host = 'http://localhost:8080';

    constructor(private http: Http) {
    }
    getAllCitiesByCountryId(countryId: string): Promise<Category[]> {
        let token = Utils.getUserTokenFromStorage();
        let headers = new Headers();
        headers.append('Authorization' , token);
        return this.http.get(this.host + this.restPath +"/" + countryId, {headers : headers})
            .toPromise()
            .then(response =>
                response.json()

            )
            .catch(err => {
                console.log("Error : ", err);
            });
    }


}