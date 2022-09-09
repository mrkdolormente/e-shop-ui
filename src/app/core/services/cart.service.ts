import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { iCart } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  API_URL: string = `${environment.API_URL}/cart`;
  itemCount: number = 0;

  constructor(private readonly http: HttpClient) {}

  /**
   * @description Get cart item
   * @returns
   */
  getCartItemList(): Observable<iCart[]> {
    return this.http.get<iCart[]>(this.API_URL);
  }

  /**
   * @description Get cart item
   * @returns
   */
  addToCart(productId: number): Observable<iCart> {
    return this.http.post<iCart>(`${this.API_URL}/`, { productId });
  }
}
