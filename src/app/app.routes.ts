import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ListProductComponent,
  },
  {
    path: 'product/:id',
    component: DetailProductComponent,
  },
  { path: 'cart', component: CartComponent },

];
