import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsLandingComponent } from './products-landing.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsLandingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsLandingRoutingModule {}
