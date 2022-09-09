import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { iProduct } from 'src/app/core/interfaces/product.interface';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-products-info',
  templateUrl: './products-info.component.html',
  styleUrls: ['./products-info.component.scss'],
})
export class ProductsInfoComponent implements OnInit, OnDestroy {
  productId: string;
  productInfo: iProduct;

  private readonly destroy$ = new Subject();

  constructor(
    private cartService: CartService,
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.productId = params['id'];

      this.getProductInfo();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  addToCart() {
    this.cartService.itemCount++;
    this.snackbarService.openSnackBar(`${this.productInfo.name} is successfully added to cart!`);
  }

  getProductInfo() {
    this.productService
      .getProductInfo(this.productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (productInfo: iProduct) => {
          this.productInfo = productInfo;
        },
        () => {
          this.router.navigate(['/products']);
        }
      );
  }
}
