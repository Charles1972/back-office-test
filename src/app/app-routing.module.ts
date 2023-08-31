import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { getProductsResolver, getStoreResolver } from './resolvers/data.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'home'
  },
  {
    path: '**',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {storeData: getStoreResolver, productsData: getProductsResolver}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
