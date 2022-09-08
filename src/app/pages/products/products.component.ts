import { Component, OnInit } from '@angular/core';
import { ProductCategories } from 'src/app/core/constants/product-category';
import { iProductCategory } from 'src/app/core/interfaces/category';
import { iProduct } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productCategories: iProductCategory[] = ProductCategories;
  products: iProduct[] = [
    {
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
  ];
  constructor() {}

  ngOnInit(): void {
    this.productCategories = this.productCategories.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }
}
