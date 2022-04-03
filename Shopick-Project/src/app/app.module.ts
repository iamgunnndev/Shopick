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
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PayComponent } from './pay/pay.component';
import { UploadComponent } from './upload/upload.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShopComponent } from './shop/shop.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    GallaryDirective,
    LoginRegisterComponent,
    ProfileComponent,
    PurchaseComponent,
    EditProfileComponent,
    PayComponent,
    UploadComponent,
    ShopComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CarouselModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
