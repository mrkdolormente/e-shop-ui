import { iProduct } from './product';

export interface iCart {
  id: number;
  product: iProduct;
  quantity: number;

  isChecked?: boolean;
}
