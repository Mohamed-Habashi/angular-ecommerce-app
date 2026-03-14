import { Routes } from '@angular/router';

import {authGuard} from './Guards/auth-guard';


export const routes: Routes = [
  {path:'Home',loadComponent:()=>
      import('./components/products/products').then(m=>m.Products),canActivate:[authGuard]
  },
  {
    path:"cart",
    loadComponent:()=>import ('./components/cart/cart').then(m=>m.Cart),
  },
  {path:"Login",
  loadComponent:()=>
  import('./components/login/login').then(m=>m.Login)},
  {path:"",pathMatch:"full",redirectTo:"Home"},
  {path:"Product/:id",
    canActivate:[authGuard],
    loadComponent:()=>
      import('./components/product-details/product-details').then(m=>m.ProductDetails)},
  {path:"**",loadComponent:()=>
  import('./components/not-found/not-found').then(m=>m.NotFound)
  }
];
