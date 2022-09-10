import { iProduct } from './product.interface';

export interface iCart {
  _id: string;
  product: iProduct;
  quantity: number;

  isChecked?: boolean;
}

export interface iCartUpsert {
  acknowledged: boolean;
  insertedId?: string;
  matchedCount?: number;
  modifiedCount?: number;
  upsertedCount?: number;
}
