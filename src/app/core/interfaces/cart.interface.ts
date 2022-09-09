import { iProduct } from './product.interface';

export interface iCart {
  _id: string;
  product: iProduct;
  quantity: number;

  isChecked?: boolean;
}
