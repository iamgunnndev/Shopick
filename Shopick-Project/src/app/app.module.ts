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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule} from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Router, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './product-category-menu/product-category-menu.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartStatusComponent } from './cart-status/cart-status.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { LoginStatusComponent } from './login-status/login-status.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent
} from '@okta/okta-angular';

import shopickAppConfig from './config/shopick-app-config';

const oktaConfig = Object.assign({
  onAuthRequired: (injector:any) => {
    const router = injector.get(Router);

    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, shopickAppConfig.oidc);

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
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CarouselModule,
    NgbModule,
    HttpClientModule,
    NgbModule,
    OktaAuthModule

  ],
  providers: [ProductService, {provide: OKTA_CONFIG , useValue: oktaConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
