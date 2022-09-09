import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductCategories } from 'src/app/core/constants/product-category';
import { iProductCategory } from 'src/app/core/interfaces/category.interface';
import { iProduct } from 'src/app/core/interfaces/product.interface';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  productCategories: iProductCategory[] = ProductCategories;
  products: iProduct[];

  private readonly destroy$ = new Subject();

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getProductList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((productList) => {
        this.products = productList;
      });

    this.productCategories = this.productCategories.sort((a, b) => a.name.localeCompare(b.name));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
