import { NgModule }       from '@angular/core';

import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }         from './app.component';
import { AlertService }       from './login/services/alert.service';
import { AuthenticationService } from './login/services/authentication.service';
import { LoginComponent } from './login/components/login.component';
import {AuthGuard} from './guard/auth.guard';

import { AppRoutingModule }     from './app-routing.module';
import {AvtarComponent} from './avtar/avtar.component';
import {NavbarModule} from './navbar/navbar.module';
import {UserCategoriesComponent} from './userCategories/userCategories.component';
import {UserCategoriesService} from './userCategories/services/userCategories.service';
import {LocationCategoriesService} from "./locationCategories/services/locationCategories.service";
import {AllCategoriesService} from "./allCategories/services/allCategories.service";
import {LocationCategoriesComponent} from "./locationCategories/locationCategories.component";
import {CountriesService} from "./countries/services/countriess.service";
import {ComputeService} from "./compute/services/compute.service";
import {ActivityService} from "./activity/services/activity.service";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

import { BrowserModule } from '@angular/platform-browser';

import {CalendarHeaderComponent} from "./calender/calendar-header.component";
import {CalenderComponent} from "./calender/calender-component";
import { CommonModule } from '@angular/common';
// import {DateTimePickerComponent} from "./calender/date-time-picker.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {InputTextModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {TripPlanComponent} from "./tripPlan/tripPlan.component";
import {TripPlanService} from "./tripPlan/services/tripPlan.service";
@NgModule({
  imports: [
      BrowserAnimationsModule,
      BrowserModule,// angular 4.0+ only
      FormsModule,
      NgbModule.forRoot(),
      CalendarModule.forRoot(),
      FormsModule,
      AppRoutingModule,
      HttpModule,
      NavbarModule,
      CommonModule,
      AutoCompleteModule,
      GrowlModule,
      DropdownModule,
      InputTextModule

  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AvtarComponent,
    UserCategoriesComponent,
    LocationCategoriesComponent,
    CalenderComponent,
    CalendarHeaderComponent,
      TripPlanComponent
      // DateTimePickerComponent

  ],
  providers: [
      AuthGuard,
      AlertService,
      AuthenticationService,
      UserCategoriesService,
      LocationCategoriesService,
      AllCategoriesService,
      CountriesService,
      ComputeService,
      ActivityService,
      TripPlanService
  ],
   exports: [
       CalenderComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
