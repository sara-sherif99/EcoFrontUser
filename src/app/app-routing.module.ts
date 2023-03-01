import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { ShopComponent } from './shop/shop.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"about",component:AboutComponent},
  {path:"cart",component:CartComponent},
  {path:"wishlist",component:WishlistComponent},
  {path:"orders",component:OrdersComponent},
  { path: "shop", component: ShopComponent, canActivate: [AuthGuard] },
  {path:"profile",component:ProfileComponent,canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full', 
        component: ErrorComponent },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
