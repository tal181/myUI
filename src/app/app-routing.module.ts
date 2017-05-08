import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component';
import { AuthGuard } from './guard/auth.guard';
import {NavbarComponent} from './navbar/navbar.component';
import {UserCategoriesComponent} from "./userCategories/userCategories.component";
import {LocationCategoriesComponent} from "./locationCategories/locationCategories.component";
import {DemoComponent} from "./calender/component";

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', component: NavbarComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }, { path: 'login', component: LoginComponent },
  { path: 'location',     component: LocationCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'nav',     component: NavbarComponent, canActivate: [AuthGuard] },
  { path: 'userCat', component: UserCategoriesComponent, canActivate: [AuthGuard] },
  { path: 'cal', component: DemoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
