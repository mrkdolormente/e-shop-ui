import { iProduct } from './product.interface';

export interface iCart {
  id: number;
  product: iProduct;
  quantity: number;

  isChecked?: boolean;
}
