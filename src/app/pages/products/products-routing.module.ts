import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsInfoComponent } from './products-info/products-info.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'products',
    redirectTo: '',
  },
  {
    path: 'products/:id',
    component: ProductsInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
