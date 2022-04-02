import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GallaryDirective } from './gallary.directive';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseComponent } from './purchase/purchase.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    GallaryDirective,
    LoginRegisterComponent,
    ProfileComponent,
    PurchaseComponent,
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
