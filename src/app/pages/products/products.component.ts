import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';
import { iProduct, iProductCategory } from 'src/app/core/interfaces/product.interface';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  productCategories: iProductCategory[];
  products: iProduct[];

  textSearch: string = '';

  searchTimeout: any = null;
  isSearching: boolean = false;

  private readonly destroy$ = new Subject();

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadProductCategoryList();
  }

  loadProducts(filters: { categoryId?: number } = {}) {
    this.productService
      .getProductList(filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe((productList: iProduct[]) => {
        this.products = productList;
      });
  }

  loadProductCategoryList() {
    this.productService
      .getProductCategoryList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((productCategoryList: iProductCategory[]) => {
        this.productCategories = productCategoryList;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSearch() {
    this.isSearching = true;

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.productService
        .getProductList({ q: this.textSearch })
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.isSearching = false;
          })
        )
        .subscribe((productList: iProduct[]) => {
          this.products = productList;
        });
    }, 2000);
  }

  onSortChange(event: any) {
    const isLowToHigh = event.value == 0;

    if (isLowToHigh) {
      this.products = this.products.sort((a, b) => a.price - b.price);
    } else {
      this.products = this.products.sort((a, b) => b.price - a.price);
    }
  }
}
