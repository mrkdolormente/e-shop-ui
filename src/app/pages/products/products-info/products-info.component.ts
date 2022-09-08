import { Component, OnInit } from '@angular/core';
import { iProduct } from 'src/app/core/interfaces/product';
import { CartService } from 'src/app/core/services/cart.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-products-info',
  templateUrl: './products-info.component.html',
  styleUrls: ['./products-info.component.scss'],
})
export class ProductsInfoComponent implements OnInit {
  productInfo: iProduct = {
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
  };

  constructor(
    private cartService: CartService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  addToCart() {
    this.cartService.itemCount++;
    this.snackbarService.openSnackBar(
      `${this.productInfo.name} is successfully added to cart!`
    );
  }
}
