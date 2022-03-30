import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './login-register/login-register.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'detail/:id',component:DetailComponent},
  {path:'signin',component:LoginRegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
