import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { ContentComponent } from './components/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path : "", pathMatch : "full", component : ContentComponent},
  {path : "content/cars", component: ContentComponent},
  {path : "content/filtered/:brandName/:colorName", component: ContentComponent},
  {path : "content/cars/brand/:brandName", component: ContentComponent},
  {path : "content/cars/color/:colorName", component: ContentComponent},
  {path : "car-detail/:carId", component: CarDetailComponent, canActivate:[LoginGuard]},
  {path : "car-detail/:carId", component: CarDetailComponent},
  {path : "login", component: LoginComponent},
  {path : "register", component: RegisterComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }