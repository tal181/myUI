"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./login/components/login.component");
var auth_guard_1 = require("./guard/auth.guard");
var navbar_component_1 = require("./navbar/navbar.component");
var userCategories_component_1 = require("./userCategories/userCategories.component");
var locationCategories_component_1 = require("./locationCategories/locationCategories.component");
var component_1 = require("./calender/component");
var routes = [
    // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '', component: navbar_component_1.NavbarComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent }, { path: 'login', component: login_component_1.LoginComponent },
    { path: 'location', component: locationCategories_component_1.LocationCategoriesComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'nav', component: navbar_component_1.NavbarComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'userCat', component: userCategories_component_1.UserCategoriesComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'cal', component: component_1.DemoComponent },
    { path: '**', redirectTo: '' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map