import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { iProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API_URL: string = `${environment.API_URL}/products`;

  constructor(private readonly http: HttpClient) {}

  /**
   * @description Get all products
   * @returns
   */
  getProductList(): Observable<iProduct[]> {
    return this.http.get<iProduct[]>(this.API_URL);
  }

  /**
   * @description Get product info from server
   * @param id product id
   * @returns
   */
  getProductInfo(id: string): Observable<iProduct> {
    return this.http.get<iProduct>(`${this.API_URL}/${id}`);
  }
}
