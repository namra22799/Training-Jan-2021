import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassOrder, Order, OrderAll, PlacedOrder } from '../Models/ClassOrder';
import { Product } from '../Product';


@Injectable({
  providedIn: 'root'
})
export class PlaceOrderService {

  constructor(private httpClient: HttpClient) { }

  URL: string = 'https://localhost:44368/api/';

  PlaceOrder(od: Order, AddressId : number): Observable<number> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.post<number>(this.URL + "PlacedOrder/Create/"+AddressId, od, { headers: reqHeader });
  }
  
  GetPlacedOrderByUser(id : number) : Observable<PlacedOrder[]>
  {var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.get<PlacedOrder[]>(this.URL+"PlacedOrder/GetOrderByUserId/"+id, { headers: reqHeader });
  }
 
  cls : ClassOrder = {UserId : 0, ProductId : 0, Quantity : 0};
  UpdatePlacedOrder(id : number, status : string) : Observable<boolean>
  {var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.put<boolean>(this.URL+"PlacedOrder/Update/"+id+"/"+status,this.cls, { headers: reqHeader });
  }

  GetProductPlacedByUser(id : number) : Observable<Product[]>
  {var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.get<Product[]>(this.URL+"PlacedOrder/GetPlacedOrderByUser/"+id, { headers: reqHeader });
  }

  PlaceOrders(orders : OrderAll, id : number, orderId : number) : Observable<boolean>
  {var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.post<boolean>(this.URL+"PlacedOrder/Creates/"+id+"/"+orderId,orders, { headers: reqHeader });
  }

  GetLastOrderId() : Observable<number>
  {var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('token')))
    });
    return this.httpClient.get<number>(this.URL+"PlacedOrder/LastPlacedOrder", { headers: reqHeader });
  }
}
