import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { getProductsResolver, getStatsResolver, getStoreResolver } from './resolvers/data.resolver';
import { ProductManagerComponent } from './components/product-manager/product-manager.component';
import { ProductStatsComponent } from './components/product-stats/product-stats.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/products', pathMatch: 'prefix' },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {storeData: getStoreResolver},
    children: [
      {
        path: 'products',
        component: ProductManagerComponent,
        resolve: {productsData: getProductsResolver},
      },
      {
        path: 'stats',
        component: ProductStatsComponent,
        resolve: {statsData: getStatsResolver},
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
