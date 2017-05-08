import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {Utils} from "../utils/utils";

@Component({
    selector:'avtar',
    moduleId: module.id,
    templateUrl: './avtar.component.html'
})

export class AvtarComponent implements OnInit {

    private user: User;
    ngOnInit(): void {
         this.user = Utils.getUserFromStorage();
         console.log(this.user);

    }
}