// components
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseResolve, IsLoggedInGuard as isLoggedIn, HasTokenGuard as HasToken } from '@app/shared';
import { HomeComponent } from '@app/layout/home/home.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [HasToken],
    resolve: {
      baseResolve: BaseResolve
    },
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule',
        canActivate: [isLoggedIn]
      },
      { path: 'products', loadChildren: './products/products.module#ProductsModule' },
      { path: '', loadChildren: './checkout/checkout.module#CheckoutModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
