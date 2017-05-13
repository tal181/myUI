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
var locationCategories_service_1 = require("./services/locationCategories.service");
var utils_1 = require("../utils/utils");
require("rxjs/add/operator/toPromise");
var UserCategoriesComponent = (function () {
    function UserCategoriesComponent(userCategoriesService) {
        this.userCategoriesService = userCategoriesService;
    }
    UserCategoriesComponent.prototype.ngOnInit = function () {
        var _this = this;
        var user = utils_1.Utils.getUserFromStorage();
        this.userCategoriesService.getLocationCategories(user.loginName)
            .then(function (categories) {
            _this.categories = categories;
        })
            .catch(function () {
            console.log("You remembered to check for errors!");
        });
    };
    return UserCategoriesComponent;
}());
UserCategoriesComponent = __decorate([
    core_1.Component({
        selector: 'userPref',
        moduleId: module.id,
        templateUrl: './locationCategories.component.html'
    }),
    __metadata("design:paramtypes", [locationCategories_service_1.UserCategoriesService])
], UserCategoriesComponent);
exports.UserCategoriesComponent = UserCategoriesComponent;
//# sourceMappingURL=locationCategories.calender-component.js.mapnt.js.map