export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    loginName: string;

    constructor(loginName: string) {
        this.loginName = loginName;
    }
}