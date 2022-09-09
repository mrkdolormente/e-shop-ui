import { iProductCategory } from './category.interface';
import { iSeller } from './seller.interface';

export interface iProduct {
  _id: number;
  name: string;
  price: number;
  brand: string;
  img: string;
  description: string;
  category: iProductCategory;
  seller: iSeller;
}