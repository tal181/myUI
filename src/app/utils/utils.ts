import {User} from "../models/user";
import {RequestOptions} from "@angular/http";

export class Utils{
    public static getUserFromStorage(): User {
        let userFromStorage = localStorage.getItem('currentUser');
        let loginName = "";
        if(userFromStorage){
            loginName = JSON.parse(userFromStorage).loginName;
        }

        let user = new User(loginName);
        return user;
    }

    public static getUserTokenFromStorage(): string {
        let userFromStorage = localStorage.getItem('currentUser');
        let token = JSON.parse(userFromStorage).token;
        return token;
    }
    // public static getAuthHeader(): any {
    //     let token = Utils.getUserTokenFromStorage();
    //     let headers = new Headers();
    //
    //     headers.append('Authorization',token);
    //     // headers.append('Content-Type' , 'application/json');
    //
    //     return headers;
    // }
}