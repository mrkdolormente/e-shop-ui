import { Component, OnInit } from '@angular/core';
import { iCart } from 'src/app/core/interfaces/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: iCart[] = [
    {
      id: 1,
      product: {
        id: 1,
        name: 'Samsung Galaxy M12 (4+64GB)',
        price: 7490,
        img: 'https://cf.shopee.ph/file/10140e5683c2cc309d66f6f1728fb2e6',
        brand: 'Samsung',
        description:
          '6.5" HD+ TFT • Exynos 850 • 4GB RAM + 64GB Internal • 48MP Main + 5MP Ultra Wide + 2MP Macro + 2MP Depth • 8MP Front Camera • 5,000mAh with 15W Fast Charging • One UI Core • Samsung Knox • Dolby Atmos • Dual SIM',
        category: {
          id: 6,
          name: 'Laptops & Computers',
        },
        seller: {
          id: 1,
          name: 'Samsung Official Store',
        },
      },
      quantity: 1,
    },
    {
      id: 2,
      product: {
        id: 1,
        name: 'Samsung Galaxy M12 (4+64GB)',
        price: 7490,
        img: 'https://cf.shopee.ph/file/10140e5683c2cc309d66f6f1728fb2e6',
        brand: 'Samsung',
        description:
          '6.5" HD+ TFT • Exynos 850 • 4GB RAM + 64GB Internal • 48MP Main + 5MP Ultra Wide + 2MP Macro + 2MP Depth • 8MP Front Camera • 5,000mAh with 15W Fast Charging • One UI Core • Samsung Knox • Dolby Atmos • Dual SIM',
        category: {
          id: 6,
          name: 'Laptops & Computers',
        },
        seller: {
          id: 1,
          name: 'Samsung Official Store',
        },
      },
      quantity: 1,
    },
  ];

  allChecked: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  get someChecked(): boolean {
    return this.checkedCount > 0 && !this.allChecked;
  }

  get checkedCount(): number {
    return this.cartItems.filter((t) => t.isChecked).length;
  }

  get subTotal(): number {
    return this.cartItems
      .filter((t) => t.isChecked)
      .map((items) => items.product.price || 0)
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
}
