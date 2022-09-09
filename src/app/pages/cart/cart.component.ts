import { Component, OnInit, OnDestroy } from '@angular/core';
import { iCart } from 'src/app/core/interfaces/cart.interface';
import { CartService } from 'src/app/core/services/cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: iCart[] = [];

  allChecked: boolean = false;

  private readonly destroy$ = new Subject();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService
      .getCartItemList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((cartItemList) => {
        this.cartItems = cartItemList;
      });
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

  updateAllChecked() {
    this.allChecked = this.cartItems != null && this.cartItems.every((t) => t.isChecked);
  }

  setAll(isChecked: boolean) {
    this.allChecked = isChecked;

    this.cartItems.forEach((t) => (t.isChecked = isChecked));
  }

  increaseQuantity(id: number) {
    this.cartItems = this.cartItems.map((cartItem) => {
      return {
        ...cartItem,
        quantity: cartItem.id == id ? (cartItem.quantity += 1) : cartItem.quantity,
      };
    });
  }

  decreaseQuantity(id: number) {
    this.cartItems = this.cartItems.map((cartItem) => {
      return {
        ...cartItem,
        quantity: cartItem.id == id ? (cartItem.quantity -= 1) : cartItem.quantity,
      };
    });
  }
}
