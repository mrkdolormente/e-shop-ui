import { iSeller } from './seller.interface';

export interface iProduct {
  _id: string;
  name: string;
  price: number;
  brand: string;
  img: string;
  description: string;
  category: iProductCategory;
  seller: iSeller;
}

export interface iProductCategory {
  _id: number;
  name: string;
}
