import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { iCart, iCartUpsert } from '../interfaces/cart.interface';

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
   * @description add item in cart
   * @returns
   */
  addToCart(productId: string): Observable<iCartUpsert> {
    return this.http.post<iCartUpsert>(`${this.API_URL}/`, { productId });
  }

  /**
   * @description delete item in cart
   * @returns
   */
  deleteItemInCart(id: string): Observable<iCart[]> {
    return this.http.delete<iCart[]>(`${this.API_URL}/${id}`);
  }

  /**
   * @description delete item in cart
   * @returns
   */
  deleteMultipleItemInCart(ids: string[]): Observable<iCart[]> {
    return this.http.delete<iCart[]>(`${this.API_URL}`, { params: { ids } });
  }

  /**
   * @description add item in cart
   * @returns
   */
  updateItemInCart(id: string, params: { quantity: number }): Observable<iCartUpsert> {
    return this.http.put<iCartUpsert>(`${this.API_URL}/${id}`, params);
  }
}
