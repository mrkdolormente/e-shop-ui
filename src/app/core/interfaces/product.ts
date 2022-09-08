import { iProductCategory } from './category';
import { iSeller } from './seller';

export interface iProduct {
  id: number;
  name: string;
  price: number;
  brand: string;
  img: string;
  description: string;
  category: iProductCategory;
  seller: iSeller;
}
