import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserCategoriesService} from './services/userCategories.service';
import {Utils} from '../utils/utils';
import {Category} from '../models/category';
import 'rxjs/add/operator/toPromise';
import {AllCategoriesService} from '../allCategories/services/allCategories.service';
import { Router} from '@angular/router';
import {ActivityService} from '../activity/services/activity.service';
import {Message} from 'primeng/primeng';

@Component({
    selector: 'userPref',
    moduleId: module.id,
    templateUrl: './userCategories.component.html'
})

export class UserCategoriesComponent implements OnInit {
    otherCategories: Category[];
    allCategories: Category[];
    userCategories: Category[];
    user: User;
    msgs: Message[] = [];

    filteredCategoriesMultiple: any[];
    constructor(
        private   userCategoriesService: UserCategoriesService,
        private   allCategoriesService: AllCategoriesService,
        private   router: Router) {

        this.user = Utils.getUserFromStorage();
    }
    ngOnInit(): void {

            this.allCategoriesService.getAllCategories()
            .then((allCategories) => {
                this.allCategories  = allCategories;

                this.userCategoriesService.getUserCategories(this.user.loginName)
                    .then((userCategories: Category[]) => {
                        this.userCategories = userCategories;
                        let otherCategoriesTemp = this.allCategories .filter(x => !this.isExistInCategories(x) );
                        this.otherCategories = otherCategoriesTemp.map(a => Object.assign({}, a));

                    })
                    .catch(() => {
                        console.log('You remembered to check for errors!');
                    });

            })
            .catch(() => {
                console.log('You remembered to check for errors!');
            });

       // this.compute();

    }
    isExistInCategories(catToSearch: Category): boolean {
        for(let index = 0; index<this.userCategories.length; index++) {
            if(this.userCategories[index].categoryName === catToSearch.categoryName){
                return true;
            }
        }
        return false;

    }
    getIndex(cat: Category , array: Category[]): number {
        for(let index = 0; index < array.length; index++) {
            if(array[index].categoryName = cat.categoryName){
                return index;
            }
        }
        return -1;
    }

    compute(): void{
        this.router.navigate(['/cal']);
    }
    addCategoryToUser(cat: any): void{
      //cat.loginName=this.user.loginName;
      //this.userCategories.push(cat);
      // let indexTorRemove= this.getIndex(cat,this.otherCategories);
      // this.otherCategories.splice(indexTorRemove,1);
        console.log("addCategoryToUser");
    }
    removeCategoryFromUser(cat: any): void{
        //let indexTorRemove= this.getIndex(cat,this.userCategories);
        //this.userCategories.splice(indexTorRemove,1);
        this.otherCategories.push(Object.assign({}, cat));
        console.log("removeCategoryFromUser");
    }

    showSuccess(msg: string) {
        this.msgs=[];
        this.msgs.push({severity:'success', summary:'Info Message',detail:msg});
        //hack to fix primeng bug
        setTimeout(function(){ this.msgs=[]; }, 3000);
    }

    showError(msg: string) {
        this.msgs=[];
        this.msgs.push({severity:'error', summary:'Error Message', detail:msg});
        //hack to fix primeng bug
        setTimeout(function(){ this.msgs=[]; }, 3000);
    }

    saveChanges(): void {
        this.userCategoriesService.saveUserCategories(this.userCategories, this.user.loginName)
            .then(() => {
                this.showSuccess("Saved user categories");
            })
            .catch(() => {
                this.showError("Failed to save user categories");
                console.log("You remembered to check for errors!");
            });
    }
    //////////////////////////////////////////

    filterCategoriesMultiple(event: any) {
        let query = event.query;

        let otherCategoriesTemp = this.allCategories .filter(x => !this.isExistInCategories(x) );
        this.otherCategories = otherCategoriesTemp.map(a => Object.assign({}, a));
        this.otherCategories = this.filterCategories(query, this.otherCategories);
    }

    filterCategories(query: any, categories: any[]):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < categories.length; i++) {
            let country = categories[i];
            if(country.categoryName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(Object.assign({}, country));
            }
        }
        return filtered;
    }


}