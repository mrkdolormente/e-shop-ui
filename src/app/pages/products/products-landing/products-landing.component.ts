import { Component, OnInit } from '@angular/core';
import { ProductCategories } from 'src/app/core/constants/product-category';
import { iProductCategory } from 'src/app/core/interfaces/category';

@Component({
  selector: 'app-products-landing',
  templateUrl: './products-landing.component.html',
  styleUrls: ['./products-landing.component.scss'],
})
export class ProductsLandingComponent implements OnInit {
  productCategories: iProductCategory[] = ProductCategories;

  constructor() {}

  ngOnInit(): void {
    this.productCategories = this.productCategories.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }
}
