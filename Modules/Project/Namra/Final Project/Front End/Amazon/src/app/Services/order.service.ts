import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassOrder, Order } from '../Models/ClassOrder';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }
  URL: string = 'https://localhost:44368/api/Order/';

  GetOrdersByUser(id: number): Observable<Order[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.get<Order[]>(this.URL + "GetOrderByUserId/" + id, { headers: reqHeader });
  }
  GetProductByUser(id: number): Observable<Product[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.get<Product[]>(this.URL + "GetProductByUser/" + id, { headers: reqHeader });
  }
  CreateOrder(clsOrder: ClassOrder): Observable<number> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.post<number>(this.URL + "CreateOrder", clsOrder, { headers: reqHeader });
  }
  UpdateOrder(orderId: number, clsOrder: ClassOrder): Observable<boolean> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.put<boolean>(this.URL + "UpdateOrder/" + orderId, clsOrder, { headers: reqHeader });
  }
  DeleteOrder(orderId: number): Observable<boolean> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.delete<boolean>(this.URL + "DeleteOrder/" + orderId, { headers: reqHeader });
  }
}
