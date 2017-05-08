"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var userCategories_service_1 = require("./services/userCategories.service");
var utils_1 = require("../utils/utils");
require("rxjs/add/operator/toPromise");
var allCategories_service_1 = require("../allCategories/services/allCategories.service");
var router_1 = require("@angular/router");
var UserCategoriesComponent = (function () {
    function UserCategoriesComponent(userCategoriesService, allCategoriesService, router) {
        this.userCategoriesService = userCategoriesService;
        this.allCategoriesService = allCategoriesService;
        this.router = router;
        this.msgs = [];
        this.user = utils_1.Utils.getUserFromStorage();
    }
    UserCategoriesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.allCategoriesService.getAllCategories()
            .then(function (allCategories) {
            _this.allCategories = allCategories;
            _this.userCategoriesService.getUserCategories(_this.user.loginName)
                .then(function (userCategories) {
                _this.userCategories = userCategories;
                var otherCategoriesTemp = _this.allCategories.filter(function (x) { return !_this.isExistInCategories(x); });
                _this.otherCategories = otherCategoriesTemp.map(function (a) { return Object.assign({}, a); });
            })
                .catch(function () {
                console.log('You remembered to check for errors!');
            });
        })
            .catch(function () {
            console.log('You remembered to check for errors!');
        });
        // this.compute();
    };
    UserCategoriesComponent.prototype.isExistInCategories = function (catToSearch) {
        for (var index = 0; index < this.userCategories.length; index++) {
            if (this.userCategories[index].categoryName === catToSearch.categoryName) {
                return true;
            }
        }
        return false;
    };
    UserCategoriesComponent.prototype.getIndex = function (cat, array) {
        for (var index = 0; index < array.length; index++) {
            if (array[index].categoryName = cat.categoryName) {
                return index;
            }
        }
        return -1;
    };
    UserCategoriesComponent.prototype.compute = function () {
        this.router.navigate(['/cal']);
    };
    UserCategoriesComponent.prototype.addCategoryToUser = function (cat) {
        //cat.loginName=this.user.loginName;
        //this.userCategories.push(cat);
        // let indexTorRemove= this.getIndex(cat,this.otherCategories);
        // this.otherCategories.splice(indexTorRemove,1);
        console.log("addCategoryToUser");
    };
    UserCategoriesComponent.prototype.removeCategoryFromUser = function (cat) {
        //let indexTorRemove= this.getIndex(cat,this.userCategories);
        //this.userCategories.splice(indexTorRemove,1);
        this.otherCategories.push(Object.assign({}, cat));
        console.log("removeCategoryFromUser");
    };
    UserCategoriesComponent.prototype.showSuccess = function (msg) {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Info Message', detail: msg });
        //hack to fix primeng bug
        setTimeout(function () { this.msgs = []; }, 3000);
    };
    UserCategoriesComponent.prototype.showError = function (msg) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: msg });
        //hack to fix primeng bug
        setTimeout(function () { this.msgs = []; }, 3000);
    };
    UserCategoriesComponent.prototype.saveChanges = function () {
        var _this = this;
        this.userCategoriesService.saveUserCategories(this.userCategories, this.user.loginName)
            .then(function () {
            _this.showSuccess("Saved user categories");
        })
            .catch(function () {
            _this.showError("Failed to save user categories");
            console.log("You remembered to check for errors!");
        });
    };
    //////////////////////////////////////////
    UserCategoriesComponent.prototype.filterCategoriesMultiple = function (event) {
        var _this = this;
        var query = event.query;
        var otherCategoriesTemp = this.allCategories.filter(function (x) { return !_this.isExistInCategories(x); });
        this.otherCategories = otherCategoriesTemp.map(function (a) { return Object.assign({}, a); });
        this.otherCategories = this.filterCategories(query, this.otherCategories);
    };
    UserCategoriesComponent.prototype.filterCategories = function (query, categories) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        var filtered = [];
        for (var i = 0; i < categories.length; i++) {
            var country = categories[i];
            if (country.categoryName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(Object.assign({}, country));
            }
        }
        return filtered;
    };
    return UserCategoriesComponent;
}());
UserCategoriesComponent = __decorate([
    core_1.Component({
        selector: 'userPref',
        moduleId: module.id,
        templateUrl: './userCategories.component.html'
    }),
    __metadata("design:paramtypes", [userCategories_service_1.UserCategoriesService,
        allCategories_service_1.AllCategoriesService,
        router_1.Router])
], UserCategoriesComponent);
exports.UserCategoriesComponent = UserCategoriesComponent;
//# sourceMappingURL=userCategories.component.js.map