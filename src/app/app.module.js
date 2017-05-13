"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var alert_service_1 = require("./login/services/alert.service");
var authentication_service_1 = require("./login/services/authentication.service");
var login_component_1 = require("./login/components/login.component");
var auth_guard_1 = require("./guard/auth.guard");
var app_routing_module_1 = require("./app-routing.module");
var avtar_component_1 = require("./avtar/avtar.component");
var navbar_module_1 = require("./navbar/navbar.module");
var userCategories_component_1 = require("./userCategories/userCategories.component");
var userCategories_service_1 = require("./userCategories/services/userCategories.service");
var locationCategories_service_1 = require("./locationCategories/services/locationCategories.service");
var allCategories_service_1 = require("./allCategories/services/allCategories.service");
var locationCategories_component_1 = require("./locationCategories/locationCategories.component");
var countriess_service_1 = require("./countries/services/countriess.service");
var compute_service_1 = require("./compute/services/compute.service");
var activity_service_1 = require("./activity/services/activity.service");
var animations_1 = require("@angular/platform-browser/animations");
var angular_calendar_1 = require("angular-calendar");
var platform_browser_1 = require("@angular/platform-browser");
var calendar_header_component_1 = require("./calender/calendar-header.component");
var calender_component_1 = require("./calender/calender-component");
var common_1 = require("@angular/common");
// import {DateTimePickerComponent} from "./calender/date-time-picker.component";
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var primeng_1 = require("primeng/primeng");
var primeng_2 = require("primeng/primeng");
var primeng_3 = require("primeng/primeng");
var primeng_4 = require("primeng/primeng");
var tripPlan_component_1 = require("./tripPlan/tripPlan.component");
var tripPlan_service_1 = require("./tripPlan/services/tripPlan.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            animations_1.BrowserAnimationsModule,
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            ng_bootstrap_1.NgbModule.forRoot(),
            angular_calendar_1.CalendarModule.forRoot(),
            forms_1.FormsModule,
            app_routing_module_1.AppRoutingModule,
            http_1.HttpModule,
            navbar_module_1.NavbarModule,
            common_1.CommonModule,
            primeng_2.AutoCompleteModule,
            primeng_3.GrowlModule,
            primeng_4.DropdownModule,
            primeng_1.InputTextModule
        ],
        declarations: [
            app_component_1.AppComponent,
            login_component_1.LoginComponent,
            avtar_component_1.AvtarComponent,
            userCategories_component_1.UserCategoriesComponent,
            locationCategories_component_1.LocationCategoriesComponent,
            calender_component_1.CalenderComponent,
            calendar_header_component_1.CalendarHeaderComponent,
            tripPlan_component_1.TripPlanComponent
            // DateTimePickerComponent
        ],
        providers: [
            auth_guard_1.AuthGuard,
            alert_service_1.AlertService,
            authentication_service_1.AuthenticationService,
            userCategories_service_1.UserCategoriesService,
            locationCategories_service_1.LocationCategoriesService,
            allCategories_service_1.AllCategoriesService,
            countriess_service_1.CountriesService,
            compute_service_1.ComputeService,
            activity_service_1.ActivityService,
            tripPlan_service_1.TripPlanService
        ],
        exports: [
            calender_component_1.CalenderComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map