import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShophomeComponent } from './shophome/shophome.component';
import { LoginComponent } from './login/login.component';
import { DetailComponent } from './detail/detail.component';
import { ReactiveFormsModule } from '@angular/forms';
<<<<<<< Updated upstream
import { GallaryDirective } from './gallary.directive';
import { LoginRegisterComponent } from './login-register/login-register.component'; 
=======
import {GalleriaModule} from 'primeng/galleria';
import { GallaryDirective } from './gallary.directive';
import { RegisterComponent } from './register/register.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShophomeComponent,
    LoginComponent,
    DetailComponent,
    GallaryDirective,
    RegisterComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
