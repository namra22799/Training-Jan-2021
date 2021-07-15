import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../Models/Cart';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }
  URL: string = 'https://localhost:44368/api/';

  GetProductByUser(id: number): Observable<Product[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.get<Product[]>(this.URL + "Cart/GetProductByUser/" + id, { headers: reqHeader });
  }
  GetCartByUser(id: number): Observable<Cart[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.get<Cart[]>(this.URL + "Cart/GetByUser/" + id, { headers: reqHeader });
  }
  DeleteCart(id: number, pid: number): Observable<boolean> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.delete<boolean>(this.URL + "Cart/Delete/" + id + "/" + pid, { headers: reqHeader });
  }
  AddCart(cart: Cart): Observable<boolean> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.post<boolean>(this.URL + "Cart/Create", cart, { headers: reqHeader });
  }
}
