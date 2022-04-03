import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'detail/:id',component:DetailComponent},
  {path:'member',component:LoginRegisterComponent},
  {path:'user/profile',component:ProfileComponent},
  {path:'user/purchase',component:PurchaseComponent},
  {path:'user/edit-profile',component:EditProfileComponent},
  {path:'payment',component:PayComponent},
  {path:'upload',component:UploadComponent},
  {path:'shop',component:ShopComponent},
  {path:'cart',component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
