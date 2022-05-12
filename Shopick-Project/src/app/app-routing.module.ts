import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { PayComponent } from './pay/pay.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { UploadComponent } from './upload/upload.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { MembersPageComponent } from './members-page/members-page.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderCompletedComponent } from './order-completed/order-completed.component';


const routes: Routes = [
  {path: 'order-completed' , component: OrderCompletedComponent},
  {path: 'order-history', component: OrderHistoryComponent, canActivate: [ OktaAuthGuard ]},
  {path:'members' , component: MembersPageComponent, canActivate: [OktaAuthGuard]},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout' , component: CheckoutComponent},
  {path: 'cart-details' , component:CartDetailsComponent},
  {path: 'products/:id' , component:ProductDetailsComponent},
  {path: 'search/:keyword' , component: ProductListComponent},
  {path: 'category/:id/:name', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category' , component: ProductListComponent},
  {path: 'products' , component: ProductListComponent},
  {path:'detail/:id',component:DetailComponent},
  {path:'member',component:LoginRegisterComponent},
  {path:'user/profile',component:ProfileComponent},
  {path:'user/purchase',component:PurchaseComponent},
  {path:'user/edit-profile',component:EditProfileComponent},
  {path:'payment',component:PayComponent},
  {path:'upload',component:UploadComponent},
  {path:'shop',component:ShopComponent},
  {path:'cart',component:CartComponent},
  {path:'product-list',component:ProductListComponent},
  {path: '' , redirectTo: '/products' , pathMatch: 'full'},
  {path: '**' , redirectTo: '/products' , pathMatch: 'full'}
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
