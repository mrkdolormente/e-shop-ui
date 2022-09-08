import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsLandingComponent } from './products-landing/products-landing.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ProductsLandingComponent],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
