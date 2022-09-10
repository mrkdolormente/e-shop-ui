import { Component, OnInit, OnDestroy } from '@angular/core';
import { iCart } from 'src/app/core/interfaces/cart.interface';
import { CartService } from 'src/app/core/services/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: iCart[] = [];

  allChecked: boolean = false;
  quantityTimeout: any;

  private readonly destroy$ = new Subject();

  constructor(
    private cartService: CartService,
    private readonly snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get someChecked(): boolean {
    return this.checkedCount > 0 && !this.allChecked;
  }

  get checkedCount(): number {
    return this.cartItems.filter((t) => t.isChecked).length;
  }

  get subTotal(): number {
    return this.cartItems
      .filter((t) => t.isChecked)
      .map((item) => (item.product.price || 0) * item.quantity)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  get shippingFee(): number {
    return 0;
  }

  get total(): number {
    return this.subTotal + this.shippingFee;
  }

  loadCartItems(): void {
    this.cartService
      .getCartItemList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((cartItemList) => {
        this.cartItems = cartItemList;
        this.cartService.itemCount = this.cartItems.length;
      });
  }

  updateAllChecked() {
    this.allChecked = this.cartItems != null && this.cartItems.every((t) => t.isChecked);
  }

  setAll(isChecked: boolean) {
    this.allChecked = isChecked;

    this.cartItems.forEach((t) => (t.isChecked = isChecked));
  }

  changeQuantity(id: string, quantity: number, isIncreased: boolean) {
    const newQuantity = isIncreased ? (quantity += 1) : (quantity -= 1);
    this.cartItems = this.cartItems.map((cartItem) => {
      return {
        ...cartItem,
        quantity: cartItem._id == id ? newQuantity : cartItem.quantity,
      };
    });

    this.updateItemInCart(id, newQuantity);
  }

  deleteItemInCart(id: string) {
    this.cartService
      .deleteItemInCart(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.loadCartItems();
        this.snackbarService.openSnackBar('Item is successfully removed!');
      });
  }

  deleteSelectedItems() {
    const ids = this.cartItems.filter((item) => item.isChecked).map((item) => item._id);

    this.cartService
      .deleteMultipleItemInCart(ids)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.loadCartItems();

        this.snackbarService.openSnackBar(`${ids.length} Item(s) are successfully removed!`);
      });
  }

  updateItemInCart(id: string, quantity: number) {
    clearTimeout(this.quantityTimeout);

    this.quantityTimeout = setTimeout(() => {
      this.cartService
        .updateItemInCart(id, { quantity })
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }, 1000);
  }

  onQuantityChange(event: any, id: string) {
    const quantity = event.target?.value || 1;

    this.updateItemInCart(id, quantity);
  }
}
