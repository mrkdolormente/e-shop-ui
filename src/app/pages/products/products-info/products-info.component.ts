import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subject, takeUntil } from 'rxjs';
import { iProduct } from 'src/app/core/interfaces/product.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { LoginDialogComponent } from 'src/app/shared/dialog/login-dialog/login-dialog.component';

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
    private readonly authService: AuthService,
    private cartService: CartService,
    private readonly dialog: MatDialog,
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
    this.authService.isLoggedIn.pipe(first()).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.cartService
          .addToCart(this.productInfo._id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            if (res.insertedId) {
              this.cartService.itemCount++;
            }
            this.snackbarService.openSnackBar(
              `${this.productInfo.name} is successfully added to cart!`
            );
          });
      } else {
        this.dialog.open(LoginDialogComponent);
      }
    });
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
