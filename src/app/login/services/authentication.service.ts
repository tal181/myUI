import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(loginName: string, password: string) {
        let host = 'http://localhost:8080';
        return this.http.post(host + '/login', JSON.stringify({ loginName: loginName, password: password}))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let loginName = response.json();
                let user = {'loginName':'',token:''};
                user.loginName = loginName;
                user.token = response.headers.get('Authorization');
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}